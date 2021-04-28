import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeletePatientComponent } from './delete-patient/delete-patient.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { WaitingListComponent } from './waiting-list/waiting-list.component';

const routes: Routes = [
  { path: '', component: WaitingListComponent},
  { path: 'add-patient', component: PatientFormComponent},
  { path: 'patient/:id', component: PatientFormComponent},
  { path: 'delete-patient/:id', component: DeletePatientComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
