import { Component, OnInit } from '@angular/core';
import { Speciality } from '../models/speciality';
import { SpecialityService } from '../services/speciality.service';
import { Router } from '@angular/router';
import { ExaminationService } from '../services/examination.service';

@Component({
  selector: 'app-manager-create-examination',
  templateUrl: './manager-create-examination.component.html',
  styleUrls: ['./manager-create-examination.component.css']
})
export class ManagerCreateExaminationComponent implements OnInit {

  constructor(private specialityService: SpecialityService, private router: Router, private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.specialityService.getSpecialities().subscribe((specialities: Speciality[]) => {
      this.specialities = specialities;
    })
  }

  async addExamination() {
    await this.examinationService.addExamination(this.selectedSpeciality, this.name, this.duration, this.price, 'Approved')
    this.router.navigate(['manager/examinations'])
  }

  back() {
    this.router.navigate(['manager/examinations'])
  }

  specialities: Speciality[]
  duration: number
  price: number
  name: string

  selectedSpeciality: string
}
