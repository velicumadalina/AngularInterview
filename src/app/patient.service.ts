import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPatient } from './models/patient';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientsChanged = new Subject<IPatient[]>();
  patients:IPatient[] = (localStorage.getItem('patients') && localStorage.getItem('patients') != "[]") ? JSON.parse(localStorage.getItem('patients')) : [
    {firstName:"Jane",
    lastName:"Doe",
    birthDate:"2021-04-07",
    cnp:"12345678910111",
    gender:"F",
    phoneNumber:"1234567891",
    orderNumber:1},
    {firstName:"John",
    lastName:"Doe",
    birthDate:"2021-03-07",
    cnp:"12345678910111",
    gender:"M",
    phoneNumber:"1234567891",
    orderNumber:2}];
    
  constructor() { }

  addPatient(patient: IPatient){
    this.patients.push(patient);
    localStorage.setItem('patients',JSON.stringify(this.patients));
    this.patientsChanged.next(this.patients);
  }

  getPatientById(patientId: number){
    return this.patients.find(p => p.orderNumber == patientId);
  }

  getPatients(){
    return this.patients.slice();
  }

  editPatient(patient: IPatient){
    let patientIndex = this.patients.findIndex(p => p.orderNumber == patient.orderNumber);
    this.patients[patientIndex] = patient;
    localStorage.setItem('patients',JSON.stringify(this.patients));
    this.patientsChanged.next(this.patients.slice());
  }

  deletePatient(patientId: number){
    let index = this.patients.findIndex(d => d.orderNumber === patientId);
    this.patients.splice(index, 1);
    localStorage.setItem('patients', JSON.stringify(this.patients));
  }

  getNextOrderNumber(){
    return this.patients[this.patients.length -1].orderNumber +1;
  }
}
