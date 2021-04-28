import { Component, OnInit } from '@angular/core';
import { IPatient } from '../models/patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css']
})
export class WaitingListComponent implements OnInit {
  patients: IPatient[];
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.patientsChanged.subscribe((patients) =>{this.patients = patients;})
    this.getPatients();
  }
  getPatients(){
    this.patients = this.patientService.getPatients();
  }

}
