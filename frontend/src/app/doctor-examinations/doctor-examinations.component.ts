import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment';
import { Doctor } from '../models/doctor';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-examinations',
  templateUrl: './doctor-examinations.component.html',
  styleUrls: ['./doctor-examinations.component.css']
})
export class DoctorExaminationsComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.doctor = JSON.parse(sessionStorage.getItem('user'))
    this.appointmentService.getDoctorAppointments(this.doctor).subscribe((appointemnts: Appointment[]) => {
      this.sortAndFilterApointments(appointemnts)
    })
  }

  sortAndFilterApointments(appointments: Appointment[]) {
    this.appointments = []

    appointments.sort((a, b) => {
      let aDate = new Date(a.dateAndTime).getTime()
      let bDate = new Date(b.dateAndTime).getTime()
      return aDate - bDate
    })

    let brojac = 0
    for (let i = 0; i < appointments.length; i++) {
      if (new Date(appointments[i].dateAndTime).getTime() < new Date().getTime()) {
        continue
      }
      this.appointments.push(appointments[i])
      brojac++
      if (brojac == 3) {
        break
      }
    }
  }

  getFormattedDate(date: Date) {
    let d = new Date(date)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
  }

  redirectToPatientRecord(patient: User) {
    sessionStorage.setItem('patient', JSON.stringify(patient))
    this.router.navigate(['/doctor/patient-record/' + patient.username])
  }

  async cancelAppointment(appointment: Appointment) {
    let cancelMessage = prompt("Unesite razlog otkazivanja termina: ")
    await this.appointmentService.deleteAppointemnt(appointment)
    await this.notificationService.addNotification('OTKAZAN PREGLED ' + appointment.examination.name + ". Poruka doktora:", cancelMessage, appointment.patient)
    this.ngOnInit()
  }

  appointments: Appointment[]
  doctor: Doctor
}
