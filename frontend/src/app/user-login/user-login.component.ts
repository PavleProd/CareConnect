import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    this.errorMessage = ""

    let user = await this.userService.login(this.username, this.password)

    // menadzer ima posebnu stranicu za login pa ne bi trebalo ovde da se prijavljuje
    if (!user || user.type == "Manager" || user.status == "Rejected") {
      this.errorMessage = "Nepostojece korisnicko ime ili lozinka"
      return
    }

    if (user.status == "Pending") {
      this.errorMessage = "Vas zahtev za registraciju je jos uvek u obradi. Pokusajte kasnije."
      return
    }

    sessionStorage.setItem("user", JSON.stringify(user))
    if (user.type == "Patient") {
      this.router.navigate(["/patient/profile"])
    }
    else if (user.type == "Doctor") {
      this.router.navigate(["/doctor/profile"])
    }

  }

  back() {
    this.router.navigate(['']);
  }

  username: string = "";
  password: string = "";
  errorMessage: string = ""
}
