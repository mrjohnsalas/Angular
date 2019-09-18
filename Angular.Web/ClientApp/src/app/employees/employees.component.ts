import { Component, OnInit } from '@angular/core';
import { Employee } from './shared/employee.model';
import { EmployeeService } from "./shared/employee.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.loadData();
  }

  delete(employee: Employee) {
    this.employeeService.deleteEmployee(employee.id.toString()).subscribe(x => this.loadData(), e => console.error(e));
  }

  loadData() {
    this.employeeService.getEmployees()
      .subscribe(x => this.employees = x, e => console.error(e));
  }
}
