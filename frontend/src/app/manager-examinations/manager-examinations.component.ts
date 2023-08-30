import { Component, OnInit } from '@angular/core';
import { Speciality } from '../models/speciality';
import { SpecialityService } from '../services/speciality.service';
import { Router } from '@angular/router';
import { ExaminationService } from '../services/examination.service';
import { Examination } from '../models/examination';

@Component({
  selector: 'app-manager-examinations',
  templateUrl: './manager-examinations.component.html',
  styleUrls: ['./manager-examinations.component.css']
})
export class ManagerExaminationsComponent implements OnInit {

  constructor(private specialityService: SpecialityService, private router: Router, private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.specialityService.getSpecialities().subscribe((specialities: Speciality[]) => {
      this.specialities = specialities
    })
  }

  async addSpeciality() {
    await this.specialityService.addSpeciality(this.specialityName)
    this.ngOnInit()
  }

  redirectToAddExamination() {
    this.router.navigate(['/manager/examinations/addExamination'])
  }

  redirectToChangeExamination(examination: Examination) {
    sessionStorage.setItem('examination', JSON.stringify(examination))
    this.router.navigate(['/manager/examinations/changeExamination'])
  }

  async deleteExamination(examinationName: string, specialityName: string) {
    await this.examinationService.deleteExamination(examinationName, specialityName)
    this.ngOnInit()
  }

  async approveExamination(examinationName: string) {
    await this.examinationService.changeStatus(examinationName, 'Approved')
    this.ngOnInit()
  }

  specialities: Speciality[]
  specialityName: string
}
