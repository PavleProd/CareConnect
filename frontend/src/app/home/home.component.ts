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

  doctors: Doctor[]
  name: string = ""
  surname: string = ""
  speciality: string = ""
}
