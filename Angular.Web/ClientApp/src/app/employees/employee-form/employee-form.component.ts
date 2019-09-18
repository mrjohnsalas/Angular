import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AddressService } from '../../addresses/shared/address.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  formGroup: FormGroup;
  editMode: boolean = false;
  employeeId: number;
  addressesToRemove: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private addressService: AddressService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: '',
      birthdate: '',
      addresses: this.formBuilder.array([])
    });

    this.activatedRoute.params.subscribe(params => {
      this.editMode = !(params["id"] == undefined);
      if (this.editMode) {
        this.employeeId = params["id"];
        this.employeeService.getEmployee(this.employeeId.toString())
          .subscribe(x => this.loadEmployee(x), e => this.router.navigate(["/employees"]));
      }
      return;
    });
  }

  addAddress() {
    let addressArr = this.formGroup.get('addresses') as FormArray;
    let addressFg = this.buildAddress();
    addressArr.push(addressFg);
  }

  buildAddress() {
    return this.formBuilder.group({
      id: '0',
      street: '',
      city: '',
      employeeId: this.employeeId != null ? this.employeeId : 0
    });
  }

  removeAddress(index: number) {
    let addressArr = this.formGroup.get('addresses') as FormArray;
    let addressFg = addressArr.at(index) as FormGroup;
    if (addressFg.controls['id'].value != '0') {
      this.addressesToRemove.push(<number>addressFg.controls['id'].value);
    }
    addressArr.removeAt(index);
  }

  loadEmployee(employee: Employee) {
    var dp = new DatePipe(navigator.language);
    var dateFormat = "yyyy-MM-dd";

    this.formGroup.patchValue({
      name: employee.name,
      birthdate: dp.transform(employee.birthdate, dateFormat)
    });

    let addressArr = this.formGroup.get('addresses') as FormArray;
    employee.addresses.forEach(x => {
      let addressFg = this.buildAddress();
      addressFg.patchValue(x);
      addressArr.push(addressFg);
    });
  }

  save() {
    let employee: Employee = Object.assign({}, this.formGroup.value);
    console.table(employee);

    if (this.editMode) {
      employee.id = this.employeeId;
      this.employeeService.updateEmployee(employee).subscribe(x => this.removeAddresses(), e => console.error(e));
    } else {
      this.employeeService.createEmployee(employee).subscribe(x => this.onSaveSuccess(), e => console.error(e));
    }
  }

  removeAddresses() {
    if (this.addressesToRemove.length === 0) {
      this.onSaveSuccess();
      return;
    }

    this.addressService.deleteAddresses(this.addressesToRemove)
      .subscribe(() => this.onSaveSuccess(), e => console.error(e));
  }

  onSaveSuccess() {
    this.router.navigate(["/employees"]);
  }

}
