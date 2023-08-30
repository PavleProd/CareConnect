import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-patient-notifications',
  templateUrl: './patient-notifications.component.html',
  styleUrls: ['./patient-notifications.component.css']
})
export class PatientNotificationsComponent implements OnInit {

  constructor(private notificationService: NotificationService, private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'))

    this.appointmentService.getPatientAppointments(this.user).subscribe((appointments: Appointment[]) => {
      this.filterAppointments(appointments)
      this.addExaminationNotification()
    })
  }

  // ostavljamo zakazivanja koja su u narednih 24 sata
  filterAppointments(appointments: Appointment[]) {
    let filteredAppointments = []

    let now = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(now.getDate() + 1)

    for (let appointment of appointments) {
      let appointmentDate = new Date(appointment.dateAndTime)
      if (appointmentDate >= now && appointmentDate <= tomorrow) {
        filteredAppointments.push(appointment)
      }
    }

    this.appointments = filteredAppointments
  }

  getFormattedDate(date: Date) {
    let d = new Date(date)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
  }

  // dodajemo novu notifikaciju za pregled u narednih 24 sata ako jos uvek ne postoji
  async addExaminationNotification() {
    for (let appointment of this.appointments) {
      let flag = false
      let text = "USKORO PREGLED: " + appointment.examination.name + " kod doktora " + appointment.doctor.name + " " + appointment.doctor.surname
        + " u " + this.getFormattedDate(appointment.dateAndTime)

      for (let notification of this.user.notifications) {
        if (notification.text == text) {
          flag = true
          break
        }
      }

      // ako vec postoji ova notifikacija, preskacemo je, inace je dodajemo u listu notifikacija
      if (flag) {
        continue
      }

      let notification = new Notification()
      notification.text = text
      notification.read = false

      this.user.notifications.push(notification)
    }

    sessionStorage.setItem('user', JSON.stringify(this.user))
    await this.notificationService.setNotifications(this.user.notifications, this.user)
  }

  shouldHighlight(notification) {
    return !notification.read
  }

  async setAsRead() {
    for (let notification of this.user.notifications) {
      notification.read = true
    }

    await this.notificationService.setNotifications(this.user.notifications, this.user)
    sessionStorage.setItem('user', JSON.stringify(this.user))
    this.ngOnInit()
  }

  user: User
  appointments: Appointment[]
}
