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

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'You must agree to the Terms of Service';
      return;
    }

    const fullName = `${this.firstName} ${this.lastName}`;

    this.authService.register(fullName, this.email, this.password).subscribe({
      next: () => {
        // Automatically log in after registration
        this.authService.login(this.email, this.password).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.errorMessage =
              err.error?.message || 'Login failed after registration';
          },
        });
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      },
    });
  }
}
