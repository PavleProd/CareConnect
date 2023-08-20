import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Manager } from '../models/manager';

@Component({
  selector: 'app-manager-header',
  templateUrl: './manager-header.component.html',
  styleUrls: ['./manager-header.component.css']
})
export class ManagerHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.manager = JSON.parse(sessionStorage.getItem('manager'));

    if (this.manager == null) {
      this.router.navigate(['manager']);
    }
  }

  redirectToPatients(): void {
    this.router.navigate(['manager/patients']);
  }

  redirectToDoctors(): void {
    this.router.navigate(['manager/doctors']);
  }

  redirectToExaminations(): void {
    this.router.navigate(['manager/examinations']);
  }

  redirectToNotifications(): void {
    this.router.navigate(['manager/notifications']);
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['manager'])
  }

  manager: Manager
}
