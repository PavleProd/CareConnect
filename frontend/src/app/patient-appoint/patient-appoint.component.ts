import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { User } from '../models/user';
import { Examination } from '../models/examination';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-appoint',
  templateUrl: './patient-appoint.component.html',
  styleUrls: ['./patient-appoint.component.css']
})
export class PatientAppointComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    this.doctor = JSON.parse(sessionStorage.getItem('doctor'))
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.examination = JSON.parse(sessionStorage.getItem('examination'))
  }

  async makeAppointment() {
    this.errorMessage = ""

    let dateAndTime = await this.checkDateAndTime()

    if (dateAndTime == null) {
      return
    }

    this.appointmentService.addApointment(this.user.username, this.doctor.username, dateAndTime, this.examination.name, "Pending")

    alert("Uspesno ste zakazali pregled")
    this.router.navigate(['/patient/appointments'])
  }

  // proverava da li je datum ispravan i ako jeste vraca taj datum i vreme, u suprtonom vraca null
  async checkDateAndTime(): Promise<Date> {
    if (this.date == null || this.time == null) {
      this.errorMessage = "Morate uneti datum i vreme"
      return null
    }

    const dateAndTime: Date = this.createDate()

    if (dateAndTime < new Date()) {
      this.errorMessage = "Datum i vreme moraju biti u budućnosti"
      return null
    }

    const isDoctorAvailable = await this.appointmentService.isDoctorAvailable(this.doctor.username, dateAndTime,
      this.examination.name, this.examination.duration)


    if (!isDoctorAvailable) {
      this.errorMessage = "Doktor nije slobodan u tom terminu"
      return null
    }

    return dateAndTime
  }

  // pravi datum od date i time stringova
  createDate(): Date {

    const selectedDate = new Date(this.date);

    const [hours, minutes] = this.time.split(':');

    const combinedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      parseInt(hours, 10),
      parseInt(minutes, 10)
    );

    return combinedDateTime
  }

  doctor: Doctor
  user: User
  examination: Examination

  date: string
  time: string

  errorMessage: string = ""
}
