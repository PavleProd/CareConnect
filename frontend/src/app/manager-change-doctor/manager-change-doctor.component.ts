import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { FileService } from '../services/file.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manager-change-doctor',
  templateUrl: './manager-change-doctor.component.html',
  styleUrls: ['./manager-change-doctor.component.css']
})
export class ManagerChangeDoctorComponent implements OnInit {

  constructor(private userService: UserService, private fileService: FileService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('doctor'))
  }

  async register(): Promise<void> {
    this.errorMessage = ""

    if (this.areFieldsEmpty()) {
      return
    }

    const isProcessed = await this.processImage()
    if (!isProcessed) {
      return
    }

    await this.userService.changeDoctor(this.user)
    this.router.navigate(["/manager/doctors"])
  }

  async processImage(): Promise<boolean> {
    // ne obradjujemo sliku jer nije nijedna ucitana
    if (!this.fileService.isFileSelected()) {
      return true
    }

    let isImageValid = await this.fileService.isImageValid()

    if (!isImageValid) {
      this.errorMessage = "Slika nije u dobrom formatu ili nije u dozvoljenim dimenzijama!"
      return false
    }

    let fileName: string = await this.onUpload()
    this.user.profilePicture = "profile_pictures/" + fileName
    return true
  }


  onFileSelected(event) {
    this.fileService.onFileSelected(event)
  }

  async onUpload(): Promise<string> {
    return await this.fileService.onUpload(this.user.username)
  }

  areFieldsEmpty(): boolean {
    if (this.user.username == "" || this.user.password == "" || this.user.name == "" || this.user.surname == ""
      || this.user.address == "" || this.user.phone == "" || this.user.email == "" || this.user.department == ""
      || this.user.speciality == "" || this.user.licenceNumber == null) {
      this.errorMessage = "Sva polja moraju biti popunjena!"
      return true
    }

    return false
  }

  user: Doctor
  errorMessage: string = ""

}
