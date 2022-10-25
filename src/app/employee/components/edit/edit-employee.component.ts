import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html'
})
export class EditEmployeeComponent implements OnInit {

  //#region [Members]

  //#region [Output]  

  //#endregion [Output]

  //#region [Public]

  employee: Employee = new Employee();

  //#endregion [/Public]

  //#region [Private]

  private _employeeService: EmployeeService;
  private _router: Router;
  private _activatedRoute: ActivatedRoute;

  //#endregion [/Private]

  //#endregion [/Members]

  //#region [Constructor]

  constructor(employeeService: EmployeeService, router: Router, activatedRoute: ActivatedRoute) {
    this._employeeService = employeeService;
    this._router = router;
    this._activatedRoute = activatedRoute;
  }

  //#endregion [/Constructor]

  //#region [Events]

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      const empId = params.get('id');
      if (!empId) {
        return;
      }
      this._employeeService.getEmployee(+empId).subscribe(emp => {
        if (!emp) {
          return;
        }
        this.employee = emp;
      });
    });
  }

  onFormSubmitted(employeeData: Employee): void { 
    console.log('employeeData', employeeData);   
    this._employeeService.saveEmployee(employeeData).subscribe(() => {
      this._router.navigate(['employees'])
    });
  }
  //#endregion [/Events]

  //#region [Functions]

  //#endregion [/Functions]  
}
