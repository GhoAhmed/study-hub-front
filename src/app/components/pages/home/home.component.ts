import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../ui/navbar/navbar.component';
import {
  faClock,
  faBook,
  faBullseye,
  faChartLine,
  faFileAlt,
  faCalendarDays,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  faClock = faClock;
  faBook = faBook;
  faBullseye = faBullseye;
  faChartLine = faChartLine;
  faFileAlt = faFileAlt;
  faCalendarDays = faCalendarDays;
  faHeart = faHeart;

  currentUser: string = 'Student';
  private subscriptions: Subscription = new Subscription();

  // Sample Data
  upcomingClasses = [
    { name: 'Advanced Mathematics', time: '10:00 AM', color: '#3b82f6' },
    { name: 'Physics Lab', time: '2:00 PM', color: '#10b981' },
    { name: 'Computer Science', time: '4:30 PM', color: '#8b5cf6' },
  ];

  recentActivities = [
    { action: 'Completed quiz', subject: 'Chemistry', time: '2 hours ago' },
    { action: 'Uploaded notes', subject: 'History', time: '5 hours ago' },
    { action: 'Joined study group', subject: 'Biology', time: '1 day ago' },
  ];

  studyProgress = [
    { name: 'Mathematics', progress: 85, color: '#3b82f6' },
    { name: 'Physics', progress: 72, color: '#10b981' },
    { name: 'Computer Science', progress: 90, color: '#8b5cf6' },
    { name: 'Chemistry', progress: 65, color: '#f59e0b' },
  ];

  assignments = [
    {
      title: 'Calculus Problem Set',
      course: 'Mathematics',
      dueDate: 'Tomorrow',
      urgent: true,
    },
    {
      title: 'Lab Report',
      course: 'Physics',
      dueDate: 'In 3 days',
      urgent: false,
    },
    {
      title: 'Programming Project',
      course: 'Computer Science',
      dueDate: 'Next week',
      urgent: false,
    },
    {
      title: 'Research Paper',
      course: 'Chemistry',
      dueDate: 'Today',
      urgent: true,
    },
  ];

  weekSchedule = [
    {
      day: 'Mon',
      sessions: [
        { name: 'Math', time: '10:00 AM', color: '#3b82f6' },
        { name: 'Physics', time: '2:00 PM', color: '#10b981' },
      ],
    },
    {
      day: 'Tue',
      sessions: [
        { name: 'CS', time: '9:00 AM', color: '#8b5cf6' },
        { name: 'Chemistry', time: '3:00 PM', color: '#f59e0b' },
      ],
    },
    {
      day: 'Wed',
      sessions: [{ name: 'Math', time: '10:00 AM', color: '#3b82f6' }],
    },
    {
      day: 'Thu',
      sessions: [
        { name: 'Physics Lab', time: '1:00 PM', color: '#10b981' },
        { name: 'CS', time: '4:00 PM', color: '#8b5cf6' },
      ],
    },
    {
      day: 'Fri',
      sessions: [{ name: 'Chemistry', time: '11:00 AM', color: '#f59e0b' }],
    },
    { day: 'Sat', sessions: [] },
    { day: 'Sun', sessions: [] },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to currentUser from AuthService
    this.subscriptions.add(
      this.authService.currentUser$.subscribe((user) => {
        this.currentUser = user?.name || 'Student';
      })
    );
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
