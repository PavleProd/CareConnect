import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  async login(username: string, password: string): Promise<User> {
    const body = {
      username: username,
      password: password
    }

    let response = await this.httpClient.post<User>(this.path + "/get", body).toPromise()
    return response
  }

  async register(user: any) {
    await this.httpClient.post(this.path + "/add", user).toPromise()
  }

  async checkIfUsernameIsUnique(username: string) {
    const body = {
      username: username
    }

    let response = await this.httpClient.post(this.path + "/checkUsername", body).toPromise()

    if (response['response'] == "error") {
      return false
    }

    return response['response']
  }

  async checkIfEmailIsUnique(email: string) {
    const body = {
      email: email
    }

    let response = await this.httpClient.post(this.path + "/checkEmail", body).toPromise()

    if (response['response'] == "error") {
      return false
    }

    return response['response']
  }

  getDoctors(name: string, surname: string, speciality: string, department: string = "") {
    const body = {
      name: name,
      surname: surname,
      speciality: speciality,
      department: department,
    }

    return this.httpClient.post(this.path + "/getDoctors", body)
  }

  getPatients(status = "Approved") {
    const body = {
      status: status
    }

    return this.httpClient.post(this.path + "/getPatients", body)
  }

  async changePassword(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }

    await this.httpClient.post(this.path + "/changePassword", body).toPromise()
  }

  async changeStatus(username: string, status: string) {
    const body = {
      username: username,
      status: status
    }

    await this.httpClient.post(this.path + "/changeStatus", body).toPromise()
  }

  path: String = "http://localhost:4000/users"
}
