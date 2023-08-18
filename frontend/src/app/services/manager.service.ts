import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manager } from '../models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private httpClient: HttpClient) { }

  async login(username: string, password: string): Promise<Manager> {
    const body = {
      username: username,
      password: password
    }

    let response = await this.httpClient.post<Manager>(this.path + "/get", body).toPromise()
    return response
  }

  path: string = "http://localhost:4000/managers"
}
