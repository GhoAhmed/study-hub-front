import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
    {
      day: 'Sat',
      sessions: [],
    },
    {
      day: 'Sun',
      sessions: [],
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
