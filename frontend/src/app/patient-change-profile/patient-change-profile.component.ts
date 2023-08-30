import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FileService } from '../services/file.service';
import { User } from '../models/user';

@Component({
  selector: 'app-patient-change-profile',
  templateUrl: './patient-change-profile.component.html',
  styleUrls: ['./patient-change-profile.component.css']
})
export class PatientChangeProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private fileService: FileService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  back() {
    this.router.navigate(['']);
  }

  async changeProfile(): Promise<void> {
    this.errorMessage = ""

    if (this.areFieldsEmpty()) {
      return
    }

    const isProcessed = await this.processImage()

    if (!isProcessed) {
      return
    }

    // korisnik ceka da mu menadzer odobri registraciju. Do tad se vraca na pocetnu stranu.
    this.user.status = "Pending"
    this.user.type = "Patient"
    this.userService.changePatient(this.user)
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

  user: User
  errorMessage: string = ""
}
