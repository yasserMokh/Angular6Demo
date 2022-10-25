import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeService {

  private _baseUrl:string = 'http://localhost:3000/employees'

  constructor(private _httpClient: HttpClient) {
    
  }

  getAllEmployees(): Observable<Employee[]> {    
    return this._httpClient.get<Employee[]>(this._baseUrl);
  }

  getEmployee(employeeId: number): Observable<Employee> {
    return this._httpClient.get<Employee>(`${this._baseUrl}/${employeeId}`);    
  }

  saveEmployee(employee: Employee): Observable<void> {
    return this._httpClient.put<void>(`${this._baseUrl}/${employee.id}`, employee);
  }


  createEmployee(employee: Employee): Observable<Employee> {   
    //employee.id = undefined; 
    return this._httpClient.post<Employee>(this._baseUrl, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this._baseUrl}/${id}`);    
  }
}
