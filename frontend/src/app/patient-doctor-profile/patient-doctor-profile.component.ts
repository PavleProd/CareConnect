import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Examination } from '../models/examination';
import { SpecialityService } from '../services/speciality.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-doctor-profile',
  templateUrl: './patient-doctor-profile.component.html',
  styleUrls: ['./patient-doctor-profile.component.css']
})
export class PatientDoctorProfileComponent implements OnInit {

  constructor(private router: Router, private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.doctor = JSON.parse(sessionStorage.getItem('doctor'))

    this.specialityService.getExaminationsForSpeciality(this.doctor.speciality).subscribe((examinations: Examination[]) => {
      this.examinations = examinations
    })

    this.profilePicturePath = "http://localhost:4000/" + this.doctor.profilePicture
  }

  redirectToAppoint(examination: Examination) {
    sessionStorage.setItem('examination', JSON.stringify(examination))
    this.router.navigate(['patient/appoint'])
  }

  doctor: Doctor
  examinations: Examination[]
  profilePicturePath: string
}
