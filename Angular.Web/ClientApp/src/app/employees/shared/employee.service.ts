import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiURL = this.baseUrl + "api/employees";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiURL);
  }

  getEmployee(employeeId: string): Observable<Employee> {
    let params = new HttpParams().set('withAddresses', 'true');
    return this.http.get<Employee>(this.apiURL + '/' + employeeId, { params: params });
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiURL + '/' + employee.id.toString(), employee);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiURL, employee);
  }

  deleteEmployee(employeeId: string): Observable<Employee> {
    return this.http.delete<Employee>(this.apiURL + '/' + employeeId);
  }
}
