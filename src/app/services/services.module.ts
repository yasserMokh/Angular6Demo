import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { EmployeeService } from './employee.service';



@NgModule({
  declarations: [],
  imports: [HttpClientModule], 
  providers: [EmployeeService]
})
export class ServicesModule { }
