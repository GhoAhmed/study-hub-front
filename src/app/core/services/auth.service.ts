import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  login(email: string, password: string): boolean {
    // Add your authentication logic here
    this.isAuthenticatedSubject.next(true);
    return true;
  }

  register(name: string, email: string, password: string): boolean {
    // Add your registration logic here
    this.isAuthenticatedSubject.next(true);
    return true;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
