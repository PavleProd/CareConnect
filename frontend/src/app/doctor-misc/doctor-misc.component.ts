import { Component, OnInit } from '@angular/core';
import { ExaminationService } from '../services/examination.service';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';
import { FreeDaysService } from '../services/free-days.service';

@Component({
  selector: 'app-doctor-misc',
  templateUrl: './doctor-misc.component.html',
  styleUrls: ['./doctor-misc.component.css']
})
export class DoctorMiscComponent implements OnInit {

  constructor(private examinationService: ExaminationService, private router: Router, private freeDaysService: FreeDaysService) { }

  ngOnInit(): void {
    this.doctor = JSON.parse(sessionStorage.getItem('user'))
  }

  async addExamination() {
    this.errorMessage2 = ""

    if (this.duration == null || this.name == null) {
      this.errorMessage2 = "Morate uneti naziv i trajanje pregleda"
      return
    }

    if (this.duration <= 0) {
      this.errorMessage2 = "Trajanje pregleda mora biti pozitivan broj"
      return
    }

    if (this.price && this.price < 0) {
      this.errorMessage2 = "Cena pregleda mora biti pozitivan broj"
      return
    }

    await this.examinationService.addExamination(this.doctor.speciality, this.name, this.duration, this.price, 'Pending')
    this.router.navigate(['doctor/profile'])
  }

  async addFreeDays() {
    this.successMessage = ""
    this.errorMessage = ""

    if (this.begin == null || this.end == null) {
      this.errorMessage = "Morate uneti pocetni i krajnji datum"
      return
    }

    let beginDate = new Date(this.begin)
    let endDate = new Date(this.end)

    if (beginDate > endDate) {
      this.errorMessage = "Pocetni datum mora biti pre krajnjeg datuma"
      return
    }

    await this.freeDaysService.add(beginDate, endDate, this.doctor)
    this.successMessage = "Uspesno ste dodali slobodne dane"
  }

  begin: string
  end: string

  duration: number
  price: number
  name: string
  doctor: Doctor

  errorMessage2: string = ""
  errorMessage: string = ""
  successMessage: string = ""
}
