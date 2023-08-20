import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.css']
})
export class PatientHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let user: User = JSON.parse(sessionStorage.getItem('user'))
    if (user == null || user.type != "Patient") {
      this.logout()
    }
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate([''])
  }

  redirectToProfile() {
    this.router.navigate(['patient/profile'])
  }

  redirectToDoctors() {
    this.router.navigate(['patient/doctors'])
  }

  redirectToAppointments() {
    this.router.navigate(['patient/appointments'])
  }

  redirectToNotifications() {
    this.router.navigate(['patient/notifications'])
  }

}
