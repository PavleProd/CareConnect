import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { FooterComponent } from './footer/footer.component';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { ManagerHeaderComponent } from './manager-header/manager-header.component';
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

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    HomeComponent,
    PatientComponent,
    DoctorComponent,
    UserHeaderComponent,
    FooterComponent,
    DoctorHeaderComponent,
    PatientHeaderComponent,
    ManagerHeaderComponent,
    PatientResetpasswordComponent,
    DoctorResetpasswordComponent,
    PatientDoctorsComponent,
    PatientDoctorProfileComponent,
    ManagerLoginComponent,
    ManagerPatientsComponent,
    ManagerDoctorsComponent,
    ManagerExaminationsComponent,
    ManagerCreateExaminationComponent,
    ManagerNotifiactionsComponent,
    PatientAppointComponent,
    PatientAppointmentsComponent,
    PatientNotificationsComponent,
    DoctorExaminationsComponent,
    DoctorMiscComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
