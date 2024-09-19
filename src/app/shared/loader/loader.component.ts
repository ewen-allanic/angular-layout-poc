import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LoaderStateService } from './loader.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-container">
      <div 
        [ngClass]="['overlay', overlayClass]" 
        *ngIf="isLoading$ | async"
        [@fadeInOut]
      >
        <img 
          [ngClass]="['loader-image', imageClass]" 
          src="assets/img/loader.gif" 
          alt="Loading..." 
        />
      </div>
      <div class="content" [class.loading]="isLoading$ | async">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .loader-container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 900;
    }

    .loader-image {
      pointer-events: none;
      user-select: none;
      width: 10rem;
      height: auto;
      animation: float 3s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
    }

    .content {
      position: relative;
      z-index: 1;
    }

    .content.loading {
      pointer-events: none;
      user-select: none;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-20px) rotate(-5deg); }
      50% { transform: translateY(-40px) rotate(0deg); }
      75% { transform: translateY(-20px) rotate(5deg); }
    }

    @media (min-width: 768px) {
      .loader-image {
        width: 25rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoaderComponent implements OnInit {
  @Input() overlayClass = '';
  @Input() imageClass = '';
  
  isLoading$!: Observable<boolean>;

  constructor(private loaderStateService: LoaderStateService) {}

  ngOnInit() {
    this.isLoading$ = this.loaderStateService.isLoading$;
  }
}