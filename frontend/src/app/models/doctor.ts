import { User } from "./user";

export class Doctor extends User {
    licenceNumber: number
    speciality: string
    department: string
}