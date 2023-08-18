import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private httpClient: HttpClient) { }

  getSpecialities() {
    return this.httpClient.put(this.path + '/get', null)
  }

  path: string = 'http://localhost:4000/specialities'
}
