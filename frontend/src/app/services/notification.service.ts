import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  async addPromotion(promotion: string) {
    const body = {
      text: promotion,
      read: false
    }

    await this.httpClient.post(this.path + '/addPromotion', body).toPromise()
  }

  async addNotification(prefix: string, promotion: string, patient: User) {
    const body = {
      prefix: prefix,
      text: promotion,
      read: false,
      patient: patient
    }

    await this.httpClient.post(this.path + '/addNotification', body).toPromise()
  }

  async setNotifications(notifications: Notification[], patient: User) {
    const body = {
      notifications: notifications,
      patient: patient
    }

    await this.httpClient.post(this.path + '/setNotifications', body).toPromise()
  }

  path = 'http://localhost:4000/notifications'
}
