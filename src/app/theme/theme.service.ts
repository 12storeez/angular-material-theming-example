import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public isDark$ = new BehaviorSubject(
    localStorage.getItem('dark-mode') === 'true'
  );

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.body.classList.add(this.getClassName());
  }

  private getClassName() {
    return this.isDark$.getValue() ? 'dark-theme' : 'light-theme';
  }

  public toggle() {
    this.document.body.classList.remove(this.getClassName());
    localStorage.setItem('dark-mode', `${!this.isDark$.getValue()}`);
    this.isDark$.next(!this.isDark$.getValue());
    this.document.body.classList.add(this.getClassName());
  }
}
