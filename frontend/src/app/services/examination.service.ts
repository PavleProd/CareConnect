import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(private httpClient: HttpClient) { }

  async addExamination(speciality: string, name: string, duration: number, price: number, status: string) {
    const body = {
      speciality: speciality,
      name: name,
      duration: duration,
      price: price,
      status: status
    }

    await this.httpClient.post(this.path + '/add', body).toPromise()
  }

  async deleteExamination(examination: string, speciality: string) {
    const body = {
      examination: examination,
      speciality: speciality
    }

    await this.httpClient.post(this.path + '/delete', body).toPromise()
  }

  async changeStatus(examination: string, status: string) {
    const body = {
      examination: examination,
      status: status
    }

    await this.httpClient.post(this.path + '/changeStatus', body).toPromise()
  }

  path = 'http://localhost:4000/examinations'
}
