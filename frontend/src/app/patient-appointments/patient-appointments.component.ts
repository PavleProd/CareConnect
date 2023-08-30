import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment';
import { User } from '../models/user';
import { MedicalReport } from '../models/medical_report';
import { MedicalReportService } from '../services/medical-report.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {

  constructor(private appointementService: AppointmentService, private medicalReportService: MedicalReportService, private fileService: FileService) { }

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

  // u svakom redu po jedan podatak o pregledu ali u vidu stringa
  medicalReportData(medicalReport: MedicalReport) {
    let data = []


    data.push('Pacijent: ' + medicalReport.patient.name + ' ' + medicalReport.patient.surname)
    data.push('Doktor: ' + medicalReport.doctor.name + ' ' + medicalReport.doctor.surname)
    data.push('Pregled: ' + medicalReport.appointment.examination.name)
    data.push('Datum i vreme: ' + this.getFormattedDate(medicalReport.appointment.dateAndTime))
    data.push('Dijagnoza: ' + medicalReport.diagnosis)
    data.push('Terapija: ' + medicalReport.therapy)
    return data
  }

  exportToPdf(medicalReport: MedicalReport) {
    const text = this.medicalReportData(medicalReport).join('\n')
    const d = new Date(medicalReport.appointment.dateAndTime)
    const fileName = medicalReport.patient.username + d.getTime()
    const filePath = 'pdf/' + fileName + '.pdf'
    this.fileService.exportToPdf(text, filePath).subscribe(
      (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
      },
      error => {
        console.error('Error downloading PDF:', error);
      }
    );
    let path: string = 'http://localhost:4000/'
    this.sendMail(medicalReport.patient.email, path + filePath, path + 'qr/', fileName + '.png')
  }

  sendMail(mail: string = "pavle.prodanovic01@gmail.com", link: string, qrCodePath: string, qrCodeFileName: string) {
    this.fileService.generateQRCode(link, 'assets/qr/' + qrCodeFileName, qrCodeFileName).subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'image/png' });

      this.fileService.sendEmailWithQRCode(mail, link, 'http://localhost:4000/qr/' + qrCodeFileName).subscribe((data: any) => {
      })
    })
  }

  exportAllToPdf() {
    if (this.medicalReports.length == 0) {
      return
    }

    let textArray = []
    for (let medicalReport of this.medicalReports) {
      textArray.push(this.medicalReportData(medicalReport).join('\n'))
    }

    const text = textArray.join('\n\n')
    const fileName = this.medicalReports[0].patient.username + new Date().getTime()
    const filePath = 'pdf/' + fileName + '.pdf'
    this.fileService.exportToPdf(text, filePath).subscribe(
      (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
      },
      error => {
        console.error('Error downloading PDF:', error);
      }
    );
    let path: string = 'http://localhost:4000/'
    this.sendMail(this.medicalReports[0].patient.email, path + filePath, path + 'qr/', fileName + '.png')
  }

  appointments: Appointment[]
  medicalReports: MedicalReport[]
  patient: User
}
