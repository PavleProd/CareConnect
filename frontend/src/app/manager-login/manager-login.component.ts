import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {

  constructor(private router: Router, private managerService: ManagerService) { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    this.errorMessage = ""

    let manager = await this.managerService.login(this.username, this.password)

    if (!manager) {
      this.errorMessage = "Pogresno korisnicko ime ili lozinka"
      return
    }

    sessionStorage.setItem("manager", JSON.stringify(manager))
    this.router.navigate(["/manager/patients"])
  }

  username: string = "";
  password: string = "";
  errorMessage: string = ""
}
