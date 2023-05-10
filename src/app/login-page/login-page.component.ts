import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit() {
  }
  username: string;
  password: string;
  isLoggedIn: boolean = this.authService.isLoggedIn$;

  login(){
    this.authService.authenticate(this.username,this.password);
  }
}
