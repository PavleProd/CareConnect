import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

    let response = await this.httpClient.post(this.path + '/addPromotion', body).toPromise()

    if (response['message'] == 'error') {
      console.log(response['message'])
    }
  }

  path = 'http://localhost:4000/notifications'
}
