import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-manager-notifiactions',
  templateUrl: './manager-notifiactions.component.html',
  styleUrls: ['./manager-notifiactions.component.css']
})
export class ManagerNotifiactionsComponent implements OnInit {

  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  async addPromotion() {
    this.errorMessage = ''

    if (this.promotionText == '') {
      this.errorMessage = 'Niste uneli tekst promocije'
      return
    }

    await this.notificationService.addPromotion(this.promotionText)
    this.router.navigate(['manager/patients'])
  }

  promotionText: string = ''
  errorMessage: string = ''

}
