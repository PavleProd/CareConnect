import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment';
import { User } from '../models/user';
import { MedicalReport } from '../models/medical_report';
import { MedicalReportService } from '../services/medical-report.service';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {

  constructor(private appointementService: AppointmentService, private medicalReportService: MedicalReportService) { }

  ngOnInit(): void {
    this.patient = JSON.parse(sessionStorage.getItem('user'))
    this.appointementService.getPatientAppointments(this.patient).subscribe((appointments: Appointment[]) => {
      this.sortAndFilterAppointments(appointments)

      this.medicalReportService.getMedicalReportsByPatient(this.patient).subscribe((medicalReports: MedicalReport[]) => {
        this.medicalReports = medicalReports
        this.sortMedicalReports()
      })
    })
  }

  getFormattedDate(date: Date) {
    let d = new Date(date)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
  }

  sortAndFilterAppointments(appointments: Appointment[]) {
    this.appointments = []

    for (let appointment of appointments) {
      if (new Date(appointment.dateAndTime).getTime() > new Date().getTime()) {
        this.appointments.push(appointment)
      }
    }

    this.appointments.sort((a, b) => {
      return new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime()
    })
  }

  sortMedicalReports() {
    this.medicalReports.sort((a, b) => {
      return new Date(b.appointment.dateAndTime).getTime() - new Date(a.appointment.dateAndTime).getTime()
    })
  }

  async deleteAppointment(appointment: Appointment) {
    await this.appointementService.deleteAppointemnt(appointment)
    this.ngOnInit()
  }

  appointments: Appointment[]
  medicalReports: MedicalReport[]
  patient: User
}
