import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-doctor-resetpassword',
  templateUrl: './doctor-resetpassword.component.html',
  styleUrls: ['./doctor-resetpassword.component.css']
})
export class DoctorResetpasswordComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.doctor = JSON.parse(sessionStorage.getItem('user'))
  }

  async reset() {
    this.errorMessage = ""

    if (!this.isPasswordIsCorrect()) {
      return
    }

    await this.userService.changePassword(this.doctor.username, this.newPassword)

    this.doctor.password = this.newPassword
    sessionStorage.setItem('user', JSON.stringify(this.doctor))
    this.back()
  }

  back() {
    this.router.navigate(['patient/profile'])
  }

  isPasswordIsCorrect(): boolean {
    if (this.doctor.password != this.oldPassword) {
      this.errorMessage = "Stara lozinka nije ispravna!"
      return false
    }

    if (this.newPassword != this.confirmPassword) {
      this.errorMessage = "Lozinke se ne poklapaju!"
      return false
    }

    // lozinka mora pocinjati slovom
    if (!this.doctor.password[0].match(/[a-zA-Z]/)) {
      this.errorMessage = "Lozinka mora pocinjati slovom!"
      return false
    }

    // lozinka mora da sadrzi bar jedno veliko slovo, jedan broj i jedan specijalni karakter.
    let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,14})")
    if (!regex.test(this.doctor.password)) {
      this.errorMessage = "Lozinka nije u dobrom formatu! lozinka mora da sadrzi bar jedno veliko slovo,"
        + "\njedan broj i jedan specijalni karakter. Lozinka mora biti duzine od 8 do 14 karaktera."
      return false
    }

    // dva susedna znaka ne smeju biti ista
    for (let i = 0; i < this.doctor.password.length - 1; i++) {
      if (this.doctor.password[i] == this.doctor.password[i + 1]) {
        this.errorMessage = "Dva susedna znaka ne smeju biti ista!"
        return false
      }
    }

    return true
  }

  oldPassword: string
  newPassword: string
  confirmPassword: string
  doctor: Doctor

  errorMessage: string

}
