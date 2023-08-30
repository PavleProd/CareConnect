import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-patients',
  templateUrl: './manager-patients.component.html',
  styleUrls: ['./manager-patients.component.css']
})
export class ManagerPatientsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getPatients("Approved").subscribe((response: User[]) => {
      this.approvedPatients = response
    })

    this.userService.getPatients("Pending").subscribe((response: User[]) => {
      this.pendingPatients = response
    })
  }

  async approvePatient(patient: User) {
    await this.userService.changeStatus(patient.username, "Approved")
    this.ngOnInit()
  }

  async rejectPatient(patient: User) {
    await this.userService.changeStatus(patient.username, "Rejected")
    this.ngOnInit()
  }

  redirectToChangePatients(patient: User) {
    sessionStorage.setItem('patient', JSON.stringify(patient))
    this.router.navigate(['/manager/change-patient'])
  }

  approvedPatients: User[]
  pendingPatients: User[]

}
