import { Component, OnInit } from '@angular/core';
import { Speciality } from '../models/speciality';
import { SpecialityService } from '../services/speciality.service';

@Component({
  selector: 'app-manager-examinations',
  templateUrl: './manager-examinations.component.html',
  styleUrls: ['./manager-examinations.component.css']
})
export class ManagerExaminationsComponent implements OnInit {

  constructor(private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.specialityService.getSpecialities().subscribe((specialities: Speciality[]) => {
      this.specialities = specialities
    })
  }

  specialities: Speciality[]

}
