import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeTerms = false;
  errorMessage = '';
  isSubmitting = false;

  // Field errors
  fieldErrors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  // Validate first name
  validateFirstName(): void {
    if (!this.firstName.trim()) {
      this.fieldErrors.firstName = 'First name is required';
    } else if (this.firstName.trim().length < 2) {
      this.fieldErrors.firstName = 'First name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(this.firstName)) {
      this.fieldErrors.firstName = 'First name contains invalid characters';
    } else {
      this.fieldErrors.firstName = '';
    }
  }

  // Validate last name
  validateLastName(): void {
    if (!this.lastName.trim()) {
      this.fieldErrors.lastName = 'Last name is required';
    } else if (this.lastName.trim().length < 2) {
      this.fieldErrors.lastName = 'Last name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(this.lastName)) {
      this.fieldErrors.lastName = 'Last name contains invalid characters';
    } else {
      this.fieldErrors.lastName = '';
    }
  }

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
    } else if (!/(?=.*[a-z])/.test(this.password)) {
      this.fieldErrors.password =
        'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(this.password)) {
      this.fieldErrors.password =
        'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(this.password)) {
      this.fieldErrors.password = 'Password must contain at least one number';
    } else if (!/(?=.*[@$!%*?&])/.test(this.password)) {
      this.fieldErrors.password =
        'Password must contain at least one special character (@$!%*?&)';
    } else {
      this.fieldErrors.password = '';
    }

    // Re-validate confirm password if it has value
    if (this.confirmPassword) {
      this.validateConfirmPassword();
    }
  }

  // Validate confirm password
  validateConfirmPassword(): void {
    if (!this.confirmPassword) {
      this.fieldErrors.confirmPassword = 'Please confirm your password';
    } else if (this.password !== this.confirmPassword) {
      this.fieldErrors.confirmPassword = 'Passwords do not match';
    } else {
      this.fieldErrors.confirmPassword = '';
    }
  }

  // Email validation helper
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Check if form is valid
  private isFormValid(): boolean {
    // Validate all fields
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    // Check terms
    if (!this.agreeTerms) {
      this.fieldErrors.agreeTerms = 'You must agree to the Terms of Service';
    } else {
      this.fieldErrors.agreeTerms = '';
    }

    // Check if any field has errors
    return Object.values(this.fieldErrors).every((error) => error === '');
  }

  onRegister(): void {
    this.errorMessage = '';

    // Validate form
    if (!this.isFormValid()) {
      this.errorMessage = 'Please correct the errors below';
      return;
    }

    this.isSubmitting = true;
    const fullName = `${this.firstName.trim()} ${this.lastName.trim()}`;

    this.authService
      .register(fullName, this.email.trim(), this.password)
      .subscribe({
        next: () => {
          // Automatically log in after registration
          this.authService.login(this.email.trim(), this.password).subscribe({
            next: () => {
              this.isSubmitting = false;
              this.router.navigate(['/home']);
            },
            error: (err) => {
              this.isSubmitting = false;
              this.errorMessage =
                err.error?.message || 'Login failed after registration';
            },
          });
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage =
            err.error?.message || 'Registration failed. Please try again.';
        },
      });
  }
}
