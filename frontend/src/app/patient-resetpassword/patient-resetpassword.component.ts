import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-patient-resetpassword',
  templateUrl: './patient-resetpassword.component.html',
  styleUrls: ['./patient-resetpassword.component.css']
})
export class PatientResetpasswordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  reset() {

  }

  back() {
    this.router.navigate(['patient/profile'])
  }

  oldPassword: string
  newPassword: string
  confirmPassword: string
  user: User

  errorMessage: string
}
