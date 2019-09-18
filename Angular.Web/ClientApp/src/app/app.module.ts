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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    EmployeesComponent,
    EmployeeFormComponent
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
      { path: 'employees', component: EmployeesComponent },
      { path: 'employee-add', component: EmployeeFormComponent },
      { path: 'employee-edit/:id', component: EmployeeFormComponent }
    ])
  ],
  providers: [EmployeeService, AddressService, {
    provide: HTTP_INTERCEPTORS,
    useClass: LogInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
