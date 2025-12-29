import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  errorMessage = '';
  isSubmitting = false;

  // Field errors
  fieldErrors = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  // Validate email
  validateEmail(): void {
    if (!this.email.trim()) {
      this.fieldErrors.email = 'Email is required';
    } else if (!this.isValidEmail(this.email)) {
      this.fieldErrors.email = 'Please enter a valid email address';
    } else {
      this.fieldErrors.email = '';
    }
  }

  // Validate password
  validatePassword(): void {
    if (!this.password) {
      this.fieldErrors.password = 'Password is required';
    } else if (this.password.length < 8) {
      this.fieldErrors.password = 'Password must be at least 8 characters';
    } else {
      this.fieldErrors.password = '';
    }
  }

  // Email validation helper
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Check if form is valid
  private isFormValid(): boolean {
    this.validateEmail();
    this.validatePassword();

    return Object.values(this.fieldErrors).every((error) => error === '');
  }

  onLogin(): void {
    this.errorMessage = '';

    // Validate form
    if (!this.isFormValid()) {
      this.errorMessage = 'Please correct the errors below';
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.email.trim(), this.password).subscribe({
      next: (user) => {
        this.isSubmitting = false;
        // Navigate after successful login
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isSubmitting = false;
        // Display backend error message
        this.errorMessage =
          err.error?.message || 'Invalid email or password. Please try again.';
      },
    });
  }
}
