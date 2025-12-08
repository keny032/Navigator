
import { Injectable, signal, effect } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  
  constructor(private router: Router) {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedIn.set(loggedIn);
    effect(() => {
        localStorage.setItem('isLoggedIn', this.isLoggedIn().toString());
    });
  }

  login(email: string, pass: string): Promise<boolean> {
    // Mock login logic
    if (email && pass) {
      this.isLoggedIn.set(true);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  register(email: string, pass: string): Promise<boolean> {
    // Mock register logic
    if (email && pass) {
        this.isLoggedIn.set(true);
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
  
  logout() {
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
