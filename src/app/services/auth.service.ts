import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  username: string;
  password: string;
  isLoggedIn$: boolean = false;

  authenticate(username: string, password: string){
    this.isLoggedIn$ = true;
    this.username = username;
    this.password = password;

    if(this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/portal']);
    }
    
  }

  logout(){
    this.isLoggedIn$ = false;
    this.username = '';
    this.password = '';
  }
  
}
