import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html'
})
export class CreateEmployeeComponent implements OnInit {

  //#region [Members]

  //#region [Output]  

  //#endregion [Output]

  //#region [Public]

  //#endregion [/Public]

  //#region [Private]

  private _employeeService: EmployeeService;
  private _router: Router;

  //#endregion [/Private]

  //#endregion [/Members]

  //#region [Constructor]

  constructor(employeeService: EmployeeService, router: Router) {
    this._employeeService = employeeService;
    this._router = router;
  }

  //#endregion [/Constructor]

  //#region [Events]

  ngOnInit(): void {
  }

  onFormSubmitted(employeeData: Employee): void {
    console.log('onFormSubmitted', employeeData);
    this._employeeService.createEmployee(employeeData).subscribe(() => {
      this._router.navigate(['employee.list'])
    });
  }
  //#endregion [/Events]

  //#region [Functions]

  //#endregion [/Functions]  

}
