import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatient } from '../models/patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css']
})
export class DeletePatientComponent implements OnInit {
  patient: IPatient;
  constructor(private patientService: PatientService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPatientById();
  }
  getPatientById(){
    this.patient = this.patientService.getPatientById(+this.activatedRoute.snapshot.paramMap.get('id'), );
  }
  onDeletePatient(){
    this.patientService.deletePatient(this.patient.orderNumber);
    this.router.navigate(['/']);
  }
  onCancel(){
    this.router.navigate(['/']);
  }
}
