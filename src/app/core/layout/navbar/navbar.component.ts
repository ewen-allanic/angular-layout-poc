import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface NavItem {
  icon: string;
  route: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navItems: NavItem[] = [
    { icon: 'bi-house', route: '/home', label: 'Home' },
    { icon: 'bi-person', route: '/profile', label: 'Profile' },
    { icon: 'bi-gear', route: '/settings', label: 'Settings' },
    { icon: 'bi-info-circle', route: '/about', label: 'About' },
  ];
}
