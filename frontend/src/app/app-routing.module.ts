import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientResetpasswordComponent } from './patient-resetpassword/patient-resetpassword.component';
import { DoctorResetpasswordComponent } from './doctor-resetpassword/doctor-resetpassword.component';
import { PatientDoctorsComponent } from './patient-doctors/patient-doctors.component';
import { PatientDoctorProfileComponent } from './patient-doctor-profile/patient-doctor-profile.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { ManagerPatientsComponent } from './manager-patients/manager-patients.component';
import { ManagerDoctorsComponent } from './manager-doctors/manager-doctors.component';
import { ManagerExaminationsComponent } from './manager-examinations/manager-examinations.component';
import { ManagerCreateExaminationComponent } from './manager-create-examination/manager-create-examination.component';
import { ManagerNotifiactionsComponent } from './manager-notifiactions/manager-notifiactions.component';

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
  { path: 'manager', component: ManagerLoginComponent },
  { path: 'manager/patients', component: ManagerPatientsComponent },
  { path: 'manager/doctors', component: ManagerDoctorsComponent },
  { path: 'manager/examinations', component: ManagerExaminationsComponent },
  { path: 'manager/examinations/addExamination', component: ManagerCreateExaminationComponent },
  { path: 'manager/notifications', component: ManagerNotifiactionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
