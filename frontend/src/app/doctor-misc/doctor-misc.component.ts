import { Component, OnInit } from '@angular/core';
import { ExaminationService } from '../services/examination.service';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-doctor-misc',
  templateUrl: './doctor-misc.component.html',
  styleUrls: ['./doctor-misc.component.css']
})
export class DoctorMiscComponent implements OnInit {

  constructor(private examinationService: ExaminationService, private router: Router) { }

  ngOnInit(): void {
    this.doctor = JSON.parse(sessionStorage.getItem('user'))
  }

  async addExamination() {
    await this.examinationService.addExamination(this.doctor.speciality, this.name, this.duration, this.price, 'Pending')
    this.router.navigate(['doctor/profile'])
  }

  duration: number
  price: number
  name: string
  doctor: Doctor
}
