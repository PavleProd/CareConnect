import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Examination } from '../models/examination';
import { Doctor } from '../models/doctor';
import { User } from '../models/user';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }

  async addApointment(patient: User, doctor: Doctor, dateAndTime: Date, examination: Examination) {
    const body = {
      patient: patient,
      doctor: doctor,
      dateAndTime: dateAndTime,
      examination: examination
    }

    await this.httpClient.post(this.path + '/add', body).toPromise()

  }

  async deleteAppointemnt(appointment: Appointment) {
    const body = {
      appointment: appointment
    }

    await this.httpClient.post(this.path + '/delete', body).toPromise()
  }

  getPatientAppointments(patient: User) {
    const body = {
      patient: patient
    }

    return this.httpClient.post(this.path + '/getByPatient', body)
  }

  getDoctorAppointments(doctor: Doctor) {
    const body = {
      doctor: doctor
    }

    return this.httpClient.post(this.path + '/getByDoctor', body)

  }

  getDoctorAndPatientAppointments(doctor: Doctor, patient: User) {
    const body = {
      doctor: doctor,
      patient: patient
    }

    return this.httpClient.post(this.path + '/getByDoctorAndPatient', body)
  }

  async isDoctorAvailable(doctor: Doctor, date: Date, duration: number) {
    const body = {
      doctor: doctor,
      date: date,
      duration: duration
    }

    let response = await this.httpClient.post(this.path + '/isDoctorFree', body).toPromise()

    return response['available']
  }

  async getByExamination(examination: Examination) {
    const body = {
      examination: examination
    }

    return await this.httpClient.post<Appointment[]>(this.path + '/getByExamination', body).toPromise()
  }

  path: string = "http://localhost:4000/appointments"
}
