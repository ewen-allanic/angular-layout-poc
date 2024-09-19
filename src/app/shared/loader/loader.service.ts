import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderStateService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  private loadingStack: string[] = [];

  constructor() {}

  startLoading(loaderId: string = 'default'): void {
    this.loadingStack.push(loaderId);
    this.updateLoadingState();
  }

  stopLoading(loaderId: string = 'default'): void {
    const index = this.loadingStack.indexOf(loaderId);
    if (index > -1) {
      this.loadingStack.splice(index, 1);
    }
    this.updateLoadingState();
  }

  private updateLoadingState(): void {
    this.loadingSubject.next(this.loadingStack.length > 0);
  }

  clearAllLoaders(): void {
    this.loadingStack = [];
    this.updateLoadingState();
  }
}