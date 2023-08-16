import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getDoctors(this.name, this.surname, this.speciality)
  }

  getDoctors(name: string, surname: string, speciality: string) {
    this.userService.getDoctors(name, surname, speciality).subscribe((doctors: Doctor[]) => {
      this.doctors = doctors;
    })
  }

  search() {
    this.getDoctors(this.name, this.surname, this.speciality)
  }

  getImage(field: keyof Doctor) {
    if (this.myMap.get(field) == 1) {
      return this.sortDecreasingImage
    }
    return this.sortIncreasingImage
  }

  sort(field: keyof Doctor) {
    this.myMap.set(field, this.myMap.get(field) * -1)
    this.doctors.sort(this.sortDoctorsByField(field, this.myMap.get(field)))
  }

  sortDoctorsByField(field: keyof Doctor, order: number) {
    if (order == 1) { // opadajuce
      return (a: Doctor, b: Doctor) => a[field] < b[field] ? 1 : -1;
    }

    return (a: Doctor, b: Doctor) => a[field] > b[field] ? 1 : -1; // rastuce
  }

  myMap = new Map<string, number>([['name', 1], ['surname', 1], ['speciality', 1]])
  sortDecreasingImage = "http://localhost:4000/icons/sort-down.svg"
  sortIncreasingImage = "http://localhost:4000/icons/sort-up.svg"

  doctors: Doctor[]
  name: string = ""
  surname: string = ""
  speciality: string = ""
}
