import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.doctor = JSON.parse(sessionStorage.getItem('user'));
  }

  redirectToResetPassword() {
    this.router.navigate(['doctor/resetPassword'])
  }

  doctor: Doctor

}
