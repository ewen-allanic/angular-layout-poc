import { Component } from '@angular/core';
import { HeaderComponent } from "../../core/layout/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  nbParagraphes: number = 100;
}
