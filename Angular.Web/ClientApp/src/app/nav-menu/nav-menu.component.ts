import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  isExpanded = false;

  constructor(private accountService: AccountService, private router: Router) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}
