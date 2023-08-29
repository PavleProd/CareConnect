import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})
export class DoctorHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.doctor = JSON.parse(sessionStorage.getItem('user'));

    if (this.doctor == null) {
      this.router.navigate(['']);
    }
  }

  redirectToProfile(): void {
    this.router.navigate(['doctor']);
  }

  redirectToExaminations(): void {
    this.router.navigate(['doctor/examinations']);
  }

  redirectToMisc(): void {
    this.router.navigate(['doctor/misc']);
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate([''])
  }

  doctor: Doctor

}
