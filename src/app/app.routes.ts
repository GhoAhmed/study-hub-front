import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { MainComponent } from './components/layouts/main/main.component';

export const routes: Routes = [
  // Public pages (NO navbar)
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected pages (WITH navbar)
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tasks', component: TaskListComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];
