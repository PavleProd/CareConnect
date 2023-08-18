import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-patient-doctor-profile',
  templateUrl: './patient-doctor-profile.component.html',
  styleUrls: ['./patient-doctor-profile.component.css']
})
export class PatientDoctorProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.doctor = JSON.parse(sessionStorage.getItem('doctor'))
    this.profilePicturePath = "http://localhost:4000/" + this.doctor.profilePicture
  }

  doctor: Doctor
  profilePicturePath: string
}
