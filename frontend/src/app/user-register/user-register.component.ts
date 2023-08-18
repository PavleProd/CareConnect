import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private fileService: FileService) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['']);
  }

  async register(): Promise<void> {
    this.errorMessage = ""

    if (this.areFieldsEmpty()) {
      return
    }

    if (!this.isPasswordIsCorrect()) {
      return
    }

    const isUnique = await this.checkIfUnique()

    if (!isUnique) {
      return
    }

    const isProcessed = await this.processImage()

    if (!isProcessed) {
      return
    }

    // korisnik ceka da mu menadzer odobri registraciju. Do tad se vraca na pocetnu stranu.
    this.user.status = "Pending"
    this.user.type = "Patient"
    this.userService.register(this.user)
    this.router.navigate(['']);
  }

  async processImage(): Promise<boolean> {
    // ne obradjujemo sliku jer nije nijedna ucitana
    if (!this.fileService.isFileSelected()) {
      return true
    }

    let isImageValid = await this.fileService.isImageValid()

    if (!isImageValid) {
      this.errorMessage = "Slika nije u dobrom formatu ili nije u dozvoljenim dimenzijama!"
      return false
    }

    let fileName: string = await this.onUpload()
    this.user.profilePicture = "profile_pictures/" + fileName
    return true
  }


  onFileSelected(event) {
    this.fileService.onFileSelected(event)
  }

  async onUpload(): Promise<string> {
    return await this.fileService.onUpload(this.user.username)
  }

  areFieldsEmpty(): boolean {
    if (this.user.username == "" || this.user.password == "" || this.user.name == "" || this.user.surname == ""
      || this.user.address == "" || this.user.phone == "" || this.user.email == "") {
      this.errorMessage = "Sva polja moraju biti popunjena!"
      return true
    }

    return false
  }

  async checkIfUnique(): Promise<boolean> {
    const isUsernameUnique = await this.userService.checkIfUsernameIsUnique(this.user.username)

    if (isUsernameUnique == "error") {
      this.errorMessage = "Greska na serveru!"
      return false
    }

    if (!isUsernameUnique) {
      this.errorMessage = "Korisnicko ime vec postoji!"
      return false
    }

    const isEmailUnique = await this.userService.checkIfEmailIsUnique(this.user.email)

    if (isEmailUnique == "error") {
      this.errorMessage = "Greska na serveru!"
      return false
    }

    if (!isEmailUnique) {
      this.errorMessage = "Email adresa vec postoji!"
      return false
    }


    return true
  }

  isPasswordIsCorrect(): boolean {
    if (this.user.password != this.passwordConfirm) {
      this.errorMessage = "Lozinke se ne poklapaju!"
      return false
    }

    // lozinka mora pocinjati slovom
    if (!this.user.password[0].match(/[a-zA-Z]/)) {
      this.errorMessage = "Lozinka mora pocinjati slovom!"
      return false
    }

    // lozinka mora da sadrzi bar jedno veliko slovo, jedan broj i jedan specijalni karakter.
    let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,14})")
    if (!regex.test(this.user.password)) {
      this.errorMessage = "Lozinka nije u dobrom formatu! lozinka mora da sadrzi bar jedno veliko slovo,"
        + "\njedan broj i jedan specijalni karakter. Lozinka mora biti duzine od 8 do 14 karaktera."
      return false
    }

    // dva susedna znaka ne smeju biti ista
    for (let i = 0; i < this.user.password.length - 1; i++) {
      if (this.user.password[i] == this.user.password[i + 1]) {
        this.errorMessage = "Dva susedna znaka ne smeju biti ista!"
        return false
      }
    }

    return true
  }

  user: User = new User()
  passwordConfirm: string = ""
  errorMessage: string = ""
}
