import { Appointment } from "./appointment";
import { Doctor } from "./doctor";
import { User } from "./user";

export class MedicalReport {
    appointment: Appointment
    doctor: Doctor
    patient: User
    visitReason: string
    diagnosis: string
    therapy: string
    controlDate: Date
}