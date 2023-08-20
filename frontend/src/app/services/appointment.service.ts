import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }

  async addApointment(patient: string, doctor: string, dateAndTime: Date, examination: string, status: string) {
    const body = {
      patient: patient,
      doctor: doctor,
      dateAndTime: dateAndTime,
      examination: examination,
      status: status
    }

    await this.httpClient.post(this.path + '/add', body).toPromise()

  }

  getPatientAppointments(patient: string) {
    const body = {
      patient: patient
    }

    return this.httpClient.post(this.path + '/getByPatient', body)
  }

  getDoctorAppointments(doctor: string) {
    const body = {
      doctor: doctor
    }

    return this.httpClient.post(this.path + '/getByDoctor', body)

  }

  async isDoctorAvailable(doctor: string, date: Date, examinationName: string, duration: number) {
    const body = {
      doctor: doctor,
      date: date,
      examinationName: examinationName,
      duration: duration
    }

    let response = await this.httpClient.post(this.path + '/isDoctorFree', body).toPromise()

    return response['available']
  }

  path: string = "http://localhost:4000/appointments"
}
