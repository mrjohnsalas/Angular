import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeaveFormService implements CanDeactivate<EmployeeFormComponent> {

  canDeactivate(component: EmployeeFormComponent): boolean {
    if (component.pendingFieldsExists()) {
      return confirm("It has pending changes. Do you want to leave anyway?");
    }
    return true;
  }

  constructor() { }
}
