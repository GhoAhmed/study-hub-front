import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../ui/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUsers,
  faTable,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FontAwesomeModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  faUsers = faUsers;
  faTable = faTable;
  faNewspaper = faNewspaper;
}
