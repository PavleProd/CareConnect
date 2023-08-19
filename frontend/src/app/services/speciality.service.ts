import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private httpClient: HttpClient) { }

  getSpecialities() {
    return this.httpClient.post(this.path + '/get', null)
  }

  async addSpeciality(name: string) {
    const body = {
      name: name
    }

    await this.httpClient.post(this.path + '/add', body).toPromise()
  }

  path: string = 'http://localhost:4000/specialities'
}
