import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    if (token) {
      this.isAuthenticatedSubject.next(true);
      if (userString) {
        try {
          this.currentUserSubject.next(JSON.parse(userString));
        } catch {
          this.currentUserSubject.next(null);
        }
      }
    }
  }

  // LOGIN
  login(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(res.user);
        }),
        // Map to user for easy subscription
        map((res) => res.user)
      );
  }

  // REGISTER
  register(name: string, email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/register`, {
        name,
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(res.user);
        }),
        map((res) => res.user)
      );
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  // CHECK LOGIN
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // GET TOKEN (for HTTP Interceptor)
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // GET CURRENT USER
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
