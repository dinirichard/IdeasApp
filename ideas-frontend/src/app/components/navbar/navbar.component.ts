import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

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

}
