import { Doctor } from "./doctor"
import { Examination } from "./examination"
import { User } from "./user"

export class Appointment {
    patient: User
    doctor: Doctor
    dateAndTime: Date
    examination: Examination
}