import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manager-patients',
  templateUrl: './manager-patients.component.html',
  styleUrls: ['./manager-patients.component.css']
})
export class ManagerPatientsComponent implements OnInit {

  constructor(private userService: UserService) { }

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

  approvedPatients: User[]
  pendingPatients: User[]

}
