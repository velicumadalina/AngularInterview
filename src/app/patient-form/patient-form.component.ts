import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatient } from '../models/patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  patientForm: FormGroup;
  submitAttemptFailed = false;
  orderNumber: number;
  gender: string;
  editMode = false;
  patientToEdit:IPatient;

  constructor(private fb: FormBuilder, private patientService: PatientService,  private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createPatientForm();
    this.getOrderNumber();
  }

  attemptSubmit(){
    this.submitAttemptFailed = true;

  }

  getOrderNumber(){
    if(+this.activatedRoute.snapshot.paramMap.get('id')){
      this.orderNumber = +this.activatedRoute.snapshot.paramMap.get('id');
      this.setEditMode(this.orderNumber);
    }else{
      this.orderNumber = this.patientService.getNextOrderNumber();
      this.patientForm.controls['orderNumber'].setValue(this.orderNumber);
    }
  }

  setEditMode(orderNumber){
    this.editMode=true;
    this.patientToEdit = this.patientService.getPatientById(orderNumber);
    this.patientForm.controls['orderNumber'].setValue(this.orderNumber);
    this.patientForm.controls['firstName'].setValue(this.patientToEdit.firstName);
    this.patientForm.controls['lastName'].setValue(this.patientToEdit.lastName);
    this.patientForm.controls['birthDate'].setValue(this.patientToEdit.birthDate);
    this.patientForm.controls['cnp'].setValue(this.patientToEdit.cnp);
    this.patientForm.controls['gender'].setValue(this.patientToEdit.gender);
    this.patientForm.controls['phoneNumber'].setValue(this.patientToEdit.phoneNumber);
  }

  createPatientForm() {
    
    this.patientForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      birthDate: [null, [Validators.required, this.validateDOB]],
      cnp: [null, [Validators.required, this.validateCNP]],
      gender: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      orderNumber: [this.orderNumber],

    })
  }
  
  setGender(gender){
    this.gender = gender;
  }

  get patientFormControls(){
    return this.patientForm.controls;
  }

  createNewPatient(){
    if(this.patientForm.invalid){
      this.attemptSubmit()
    }else{
    let newPatient: IPatient = {
      firstName: this.patientForm.get('firstName').value,
      lastName: this.patientForm.get('lastName').value,
      birthDate: this.patientForm.get('birthDate').value,
      cnp: this.patientForm.get('cnp').value,
      gender: this.patientForm.get('gender').value,
      phoneNumber: this.patientForm.get('phoneNumber').value,
      orderNumber: this.patientService.getNextOrderNumber()
    }
    this.patientService.addPatient(newPatient);
    this.router.navigate(['/']);
  }

  }

  editPatient(){
    let patientEdit: IPatient = {
      firstName: this.patientForm.get('firstName').value,
      lastName: this.patientForm.get('lastName').value,
      birthDate: this.patientForm.get('birthDate').value,
      cnp: this.patientForm.get('cnp').value,
      gender: this.patientForm.get('gender').value,
      phoneNumber: this.patientForm.get('phoneNumber').value,
      orderNumber: this.orderNumber
       }
    this.patientService.editPatient(patientEdit);
    this.router.navigate(['/']);


  }

  validateDOB(control: AbstractControl)
  {
      let currentDate = new Date();
      currentDate.setHours(0,0,0,0);
      let controlDate = new Date(control.value);
      controlDate.setHours(0,0,0,0);
      if(currentDate<=controlDate)
      {
          return {response: true};
      }
      return null;
  }

  validateCNP(control: AbstractControl)
  {
      let cnp = control.value;

      if(cnp)
      {
          if(cnp.toString().length != 13)
          return {response: true};
      }
      return null;
  }

  onCancel(){
    this.patientForm.reset();
    this.router.navigate(['/']);
  }

  

}
