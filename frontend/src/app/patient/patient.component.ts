import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.profilePicturePath = "http://localhost:4000/" + this.user.profilePicture
  }

  redirectToResetPassword() {
    this.router.navigate(['patient/resetPassword'])
  }

  redirectToChangeProfile() {
    this.router.navigate(['patient/change-profile'])
  }

  profilePicturePath: string
  user: User
}
