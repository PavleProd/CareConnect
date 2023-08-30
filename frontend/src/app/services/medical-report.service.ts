import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { MedicalReport } from '../models/medical_report';

@Injectable({
  providedIn: 'root'
})
export class MedicalReportService {

  constructor(private httpClient: HttpClient) { }

  getMedicalReportsByPatient(patient: User) {
    const body = {
      patient: patient
    }

    return this.httpClient.post(this.path + '/getByPatient', body)
  }

  async createMedicalReport(medicalReport: MedicalReport) {
    await this.httpClient.post(this.path + '/create', medicalReport).toPromise()
  }

  path: string = 'http://localhost:4000/medicalReports'
}
