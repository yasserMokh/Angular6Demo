import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateEmployeeComponent } from './components/create/create-employee.component';
import { EditEmployeeComponent } from './components/edit/edit-employee.component';
import { ListEmployeesComponent } from './components/list/list-employees.component';

const routes: Routes = [
  {
    path: 'employees', children: [
      { path: '', component: ListEmployeesComponent },
      { path: 'create', component: CreateEmployeeComponent },
      { path: 'edit/:id', component: EditEmployeeComponent },
    ]
  },
  { path: '', redirectTo: '/employees', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
