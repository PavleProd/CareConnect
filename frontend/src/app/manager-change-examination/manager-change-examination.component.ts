import { Component, OnInit } from '@angular/core';
import { Speciality } from '../models/speciality';
import { SpecialityService } from '../services/speciality.service';
import { Router } from '@angular/router';
import { ExaminationService } from '../services/examination.service';
import { Examination } from '../models/examination';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-manager-change-examination',
  templateUrl: './manager-change-examination.component.html',
  styleUrls: ['./manager-change-examination.component.css']
})
export class ManagerChangeExaminationComponent implements OnInit {

  constructor(private specialityService: SpecialityService, private router: Router, private examinationService: ExaminationService,
    private appointmentService: AppointmentService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.examination = JSON.parse(sessionStorage.getItem('examination'))
    this.oldPrice = this.examination.price
    this.specialityService.getSpecialities().subscribe((specialities: Speciality[]) => {
      this.specialities = specialities;
    })
  }

  async changeExamination() {
    await this.examinationService.changeExamination(this.examination)
    await this.notifyPatients()
    this.router.navigate(['manager/examinations'])
  }

  async notifyPatients() {
    if (this.examination.price == this.oldPrice) {
      return
    }

    let appointments: Appointment[] = await this.appointmentService.getByExamination(this.examination)

    for (let appointment of appointments) {
      if (new Date(appointment.dateAndTime) > new Date()) {
        let text = "NOVA CENA: Cena pregleda " + this.examination.name + " je promenjena sa " + this.oldPrice + " na " + this.examination.price + ".";
        console.log(text)
        await this.notificationService.addNotification("", text, appointment.patient)
      }
    }
  }

  back() {
    this.router.navigate(['manager/examinations'])
  }

  specialities: Speciality[]
  examination: Examination
  oldPrice: number
}
