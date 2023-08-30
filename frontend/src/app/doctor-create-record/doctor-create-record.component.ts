import { Component, OnInit } from '@angular/core';
import { MedicalReportService } from '../services/medical-report.service';
import { MedicalReport } from '../models/medical_report';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-create-record',
  templateUrl: './doctor-create-record.component.html',
  styleUrls: ['./doctor-create-record.component.css']
})
export class DoctorCreateRecordComponent implements OnInit {

  constructor(private medicalReportService: MedicalReportService, private router: Router) { }

  ngOnInit(): void {
  }

  async createMedicalReport() {
    this.errorMessage = "";

    if (this.visitReason == "" || this.diagnosis == "" || this.therapy == "" || this.date == "" || this.time == "") {
      this.errorMessage = "Sva polja moraju biti popunjena!";
      return;
    }

    let controlDate = this.createDate();
    let medicalReport = new MedicalReport()
    medicalReport.visitReason = this.visitReason
    medicalReport.diagnosis = this.diagnosis
    medicalReport.therapy = this.therapy
    medicalReport.controlDate = controlDate
    medicalReport.patient = JSON.parse(sessionStorage.getItem('patient'))
    medicalReport.doctor = JSON.parse(sessionStorage.getItem('user'))
    medicalReport.appointment = JSON.parse(sessionStorage.getItem('appointment'))

    await this.medicalReportService.createMedicalReport(medicalReport)
    alert("Izveštaj je uspešno kreiran!")
    this.router.navigate(['/doctor/patient-record/' + medicalReport.patient.username])
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

  visitReason: string = "";
  diagnosis: string = "";
  therapy: string = "";
  date: string = "";
  time: string = "";

  errorMessage: string = "";
}
