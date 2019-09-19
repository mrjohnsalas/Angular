import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { LogInterceptorService } from './services/log-interceptor.service';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeeService } from "./employees/shared/employee.service";
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { AddressService } from './addresses/shared/address.service';
import { LeaveFormService } from "./employees/shared/leave-form.service";
import { RegistersComponent } from './accounts/registers/registers.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AccountService } from './services/account.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    EmployeesComponent,
    EmployeeFormComponent,
    RegistersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService] },
      { path: 'employee-add', component: EmployeeFormComponent, canDeactivate: [LeaveFormService] },
      { path: 'employee-edit/:id', component: EmployeeFormComponent, canDeactivate: [LeaveFormService] },
      { path: 'register-login', component: RegistersComponent }
    ])
  ],
  providers: [EmployeeService, AddressService, LeaveFormService, AccountService, AuthGuardService, {
    provide: HTTP_INTERCEPTORS,
    useClass: LogInterceptorService,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
