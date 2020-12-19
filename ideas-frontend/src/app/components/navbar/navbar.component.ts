import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  token = false;

  ngOnInit() {
    if (this.authService.token) {
      this.token = true;
    }
  }

  burgerCntrl() {
    document.querySelector('.navbar-burger').classList.toggle('is-active');
    document.querySelector('.navbar-menu').classList.toggle('is-active');
  }

  logout() {
    if (this.token) {
      this.authService.logout();
    }
  }

  homeButton() {
    if (this.token) {
      this.router.navigateByUrl('/ideas');
      return;
    }

    this.router.navigateByUrl('/auth');
  }

}
