import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Router } from '@angular/router';
import { SpecialityService } from '../services/speciality.service';
import { Examination } from '../models/examination';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private router: Router, private specialityService: SpecialityService, private userService: UserService) { }

  ngOnInit(): void {
    this.doctor = JSON.parse(sessionStorage.getItem('user'));

    this.specialityService.getExaminationsForSpeciality(this.doctor.speciality).subscribe((examinations: Examination[]) => {
      this.allExaminations = examinations;

      for (let examination of this.allExaminations) {
        this.examinationChosen.set(examination, this.isExaminationChosen(examination));
      }
    })
  }

  isExaminationChosen(examination: Examination): boolean {
    for (let ex of this.doctor.examinations) {
      if (ex.name === examination.name) {
        return true
      }
    }

    return false
  }

  getExaminationStatus(examination: Examination): boolean {
    return this.examinationChosen.get(examination);
  }

  changeExaminationStatus(examination: Examination, event: any) {
    this.examinationChosen.set(examination, event.target.checked);
  }

  async updateExaminations() {
    let examinations: Examination[] = []

    for (let examination of this.allExaminations) {
      if (this.examinationChosen.get(examination)) {
        examinations.push(examination)
      }
    }

    this.doctor.examinations = examinations
    sessionStorage.setItem('user', JSON.stringify(this.doctor))

    await this.userService.updateExaminationsForDoctor(this.doctor.username, examinations)
    this.ngOnInit()
  }

  redirectToResetPassword() {
    this.router.navigate(['doctor/resetPassword'])
  }

  doctor: Doctor
  allExaminations: Examination[]
  examinationChosen = new Map<Examination, boolean>()
}
