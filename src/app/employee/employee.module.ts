import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateEmployeeComponent } from './components/create/create-employee.component';
import { ListEmployeesComponent } from './components/list/list-employees.component';
import { EmployeeFormComponent } from './components/form/employee-form.component';
import { EditEmployeeComponent } from './components/edit/edit-employee.component';



@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent,
    EmployeeFormComponent,
    EditEmployeeComponent
  ],
  imports: [    
    SharedModule,
    EmployeeRoutingModule    
  ]
})
export class EmployeeModule { }
