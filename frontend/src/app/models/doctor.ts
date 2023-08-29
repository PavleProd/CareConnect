import { Examination } from "./examination";
import { User } from "./user";

export class Doctor extends User {
    licenceNumber: number
    speciality: string
    department: string
    examinations: Examination[]
}