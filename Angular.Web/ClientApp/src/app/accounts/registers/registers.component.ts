import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserInfo } from '../../models/userinfo.model';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css']
})
export class RegistersComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) { }

  formGroup: FormGroup;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  login() {
    let userInfo: UserInfo = Object.assign({}, this.formGroup.value);
    this.accountService.Login(userInfo).subscribe(token => this.getToken(token), e => this.handleError(e));
  }

  register() {
    let userInfo: UserInfo = Object.assign({}, this.formGroup.value);
    this.accountService.createUser(userInfo).subscribe(token => this.getToken(token), e => this.handleError(e));
  }

  getToken(token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiration);
    this.router.navigate([""]);
  }

  handleError(error) {
    if (error && error.error) {
      alert(error.error[""]);
    }
  }

}
