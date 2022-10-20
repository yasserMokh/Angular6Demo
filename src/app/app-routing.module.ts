import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './employee/components/create/create-employee.component';
import { EditEmployeeComponent } from './employee/components/edit/edit-employee.component';
import { ListEmployeesComponent } from './employee/components/list/list-employees.component';

const routes: Routes = [
  { path: 'employee.list', component: ListEmployeesComponent },
  { path: 'employee.create', component: CreateEmployeeComponent },
  { path: 'employee.edit/:id', component: EditEmployeeComponent },
  { path: '', redirectTo: '/employee.list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
