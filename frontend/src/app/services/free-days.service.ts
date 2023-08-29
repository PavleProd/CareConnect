import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class FreeDaysService {

  constructor(private httpClient: HttpClient) { }

  // dodavanje novog slobodnog dana
  async add(begin: Date, end: Date, doctor: Doctor) {
    let body = {
      begin: begin,
      end: end,
      doctor: doctor
    }

    return await this.httpClient.post(this.path + "/add", body).toPromise()
  }

  // proverava da li je doktor slobodan u odredjenom vremenskom periodu
  async checkIfDoctorIsFree(startDateTime: Date, duration: number, doctor: Doctor) {
    let body = {
      startDateTime: startDateTime,
      duration: duration,
      doctor: doctor
    }

    return await this.httpClient.post(this.path + "/checkIfDoctorIsFree", body).toPromise()
  }

  path: string = "http://localhost:4000/freeDays"
}
