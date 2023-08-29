import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

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

  path: string = 'http://localhost:4000/medicalReports'
}
