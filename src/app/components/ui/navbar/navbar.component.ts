import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { filter, Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendar,
  faHome,
  faTasks,
  faSignOutAlt,
  faUser,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  currentUser: string = 'Student';
  isMenuOpen: boolean = false;
  currentRoute: string = '';

  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to authentication status
    this.subscriptions.add(
      this.authService.isAuthenticated$.subscribe((auth) => {
        this.isAuthenticated = auth;
      })
    );

    // Subscribe to current user
    this.subscriptions.add(
      this.authService.currentUser$.subscribe((user) => {
        this.currentUser = user ? user.name : 'Student';
      })
    );

    // Track current route
    this.currentRoute = this.router.url;
    this.subscriptions.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.currentRoute = event.url;
          this.closeMenu(); // Close menu on route change
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    const toggler = document.querySelector('.custom-toggler');
    toggler?.classList.toggle('active', this.isMenuOpen);
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  onLogout(): void {
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/login']);
  }

  isActive(route: string): boolean {
    return (
      this.currentRoute === route || this.currentRoute.startsWith(route + '/')
    );
  }

  faHome = faHome;
  faTasks = faTasks;
  faCalendar = faCalendar;
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;
  faCog = faCog;
}
