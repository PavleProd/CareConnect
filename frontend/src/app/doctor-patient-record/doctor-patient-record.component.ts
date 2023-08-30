import { Component, OnInit } from '@angular/core';
import { MedicalReportService } from '../services/medical-report.service';
import { MedicalReport } from '../models/medical_report';
import { User } from '../models/user';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import { Doctor } from '../models/doctor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-patient-record',
  templateUrl: './doctor-patient-record.component.html',
  styleUrls: ['./doctor-patient-record.component.css']
})
export class DoctorPatientRecordComponent implements OnInit {

  constructor(private medicalReportService: MedicalReportService, private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    this.patient = JSON.parse(sessionStorage.getItem('patient'))
    this.doctor = JSON.parse(sessionStorage.getItem('user'))
    this.medicalReportService.getMedicalReportsByPatient(this.patient).subscribe((medicalReports: MedicalReport[]) => {
      this.medicalReports = medicalReports
      this.sortMedicalReports()

      this.appointmentService.getDoctorAndPatientAppointments(this.doctor, this.patient).subscribe((appointments: Appointment[]) => {
        this.sortAndFilterAppointments(appointments)
      })
    })
  }

  sortMedicalReports() {
    this.medicalReports.sort((a, b) => {
      return new Date(b.appointment.dateAndTime).getTime() - new Date(a.appointment.dateAndTime).getTime()
    })
  }

  sortAndFilterAppointments(appointments: Appointment[]) {
    this.appointments = []

    for (let appointment of appointments) {
      console.log(new Date(appointment.dateAndTime))
      if (new Date(appointment.dateAndTime).getTime() <= new Date().getTime()) {
        this.appointments.push(appointment)
      }
    }

    this.appointments.sort((a, b) => {
      return new Date(b.dateAndTime).getTime() - new Date(a.dateAndTime).getTime()
    })
  }

  getFormattedDate(date: Date) {
    let d = new Date(date)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
  }

  isMedicalReportAlreadyMade(appointment: Appointment) {
    for (let medicalReport of this.medicalReports) {
      if (medicalReport.appointment.examination.name == appointment.examination.name && medicalReport.appointment.dateAndTime == appointment.dateAndTime) {
        return true
      }
    }
    return false
  }

  redirectToCreateMedicalReport(appointment: Appointment) {
    sessionStorage.setItem('appointment', JSON.stringify(appointment))
    this.router.navigate(['/doctor/create-record/' + this.patient.username])
  }

  medicalReports: MedicalReport[]
  appointments: Appointment[]
  patient: User
  doctor: Doctor
}
