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
import { PatientAppointComponent } from './patient-appoint/patient-appoint.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { PatientNotificationsComponent } from './patient-notifications/patient-notifications.component';
import { DoctorExaminationsComponent } from './doctor-examinations/doctor-examinations.component';
import { DoctorMiscComponent } from './doctor-misc/doctor-misc.component';
import { DoctorPatientRecordComponent } from './doctor-patient-record/doctor-patient-record.component';
import { DoctorCreateRecordComponent } from './doctor-create-record/doctor-create-record.component';
import { ManagerChangeExaminationComponent } from './manager-change-examination/manager-change-examination.component';
import { PatientChangeProfileComponent } from './patient-change-profile/patient-change-profile.component';
import { DoctorChangeProfileComponent } from './doctor-change-profile/doctor-change-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'patient/profile', component: PatientComponent },
  { path: 'patient/resetPassword', component: PatientResetpasswordComponent },
  { path: 'patient/change-profile', component: PatientChangeProfileComponent },
  { path: 'patient/doctors', component: PatientDoctorsComponent },
  { path: 'patient/doctors/:username', component: PatientDoctorProfileComponent },
  { path: 'patient/appoint', component: PatientAppointComponent },
  { path: 'patient/appointments', component: PatientAppointmentsComponent },
  { path: 'patient/notifications', component: PatientNotificationsComponent },
  { path: 'doctor/profile', component: DoctorComponent },
  { path: 'doctor/change-profile', component: DoctorChangeProfileComponent },
  { path: 'doctor/resetPassword', component: DoctorResetpasswordComponent },
  { path: 'doctor/examinations', component: DoctorExaminationsComponent },
  { path: 'doctor/misc', component: DoctorMiscComponent },
  { path: 'doctor/patient-record/:username', component: DoctorPatientRecordComponent },
  { path: 'doctor/create-record/:username', component: DoctorCreateRecordComponent },
  { path: 'manager', component: ManagerLoginComponent },
  { path: 'manager/patients', component: ManagerPatientsComponent },
  { path: 'manager/doctors', component: ManagerDoctorsComponent },
  { path: 'manager/examinations', component: ManagerExaminationsComponent },
  { path: 'manager/examinations/addExamination', component: ManagerCreateExaminationComponent },
  { path: 'manager/examinations/changeExamination', component: ManagerChangeExaminationComponent },
  { path: 'manager/notifications', component: ManagerNotifiactionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
