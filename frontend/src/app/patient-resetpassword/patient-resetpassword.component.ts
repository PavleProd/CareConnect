import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-patient-resetpassword',
  templateUrl: './patient-resetpassword.component.html',
  styleUrls: ['./patient-resetpassword.component.css']
})
export class PatientResetpasswordComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  async reset() {
    this.errorMessage = ""

    if (!this.isPasswordIsCorrect()) {
      return
    }

    await this.userService.changePassword(this.user.username, this.newPassword)

    this.user.password = this.newPassword
    sessionStorage.setItem('user', JSON.stringify(this.user))
    this.back()
  }

  back() {
    this.router.navigate(['patient/profile'])
  }

  isPasswordIsCorrect(): boolean {
    if (this.user.password != this.oldPassword) {
      this.errorMessage = "Stara lozinka nije ispravna!"
      return false
    }

    if (this.newPassword != this.confirmPassword) {
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

  oldPassword: string
  newPassword: string
  confirmPassword: string
  user: User

  errorMessage: string
}
