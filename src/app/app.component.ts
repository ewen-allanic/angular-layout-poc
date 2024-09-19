import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { LoaderComponent } from "./shared/loader/loader.component";
import { LoaderStateService } from './shared/loader/loader.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./core/layout/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, LoaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('footer') footerElement!: ElementRef;
  @ViewChild('content') contentElement!: ElementRef;

  private readonly loaderService: LoaderStateService = inject(LoaderStateService);
  private readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  
  title = 'angular-layout-poc';

  isDesktop = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    /* I. Loading part */
    this.loaderService.startLoading('Loader1');
    setTimeout(() => {
      this.loaderService.stopLoading('Loader1');
    }, 3000);

    /* II. Responsive part */
    this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isDesktop = result.matches;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
