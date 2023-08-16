import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { PatientResetpasswordComponent } from './patient-resetpassword/patient-resetpassword.component';
import { DoctorResetpasswordComponent } from './doctor-resetpassword/doctor-resetpassword.component';
import { PatientDoctorsComponent } from './patient-doctors/patient-doctors.component';
import { PatientDoctorProfileComponent } from './patient-doctor-profile/patient-doctor-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'patient/profile', component: PatientComponent },
  { path: 'patient/resetPassword', component: PatientResetpasswordComponent },
  { path: 'patient/doctors', component: PatientDoctorsComponent },
  { path: 'patient/doctors/:username', component: PatientDoctorProfileComponent },
  { path: 'doctor/profile', component: DoctorComponent },
  { path: 'doctor/resetPassword', component: DoctorResetpasswordComponent },
  { path: 'register/doctor', component: DoctorRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
