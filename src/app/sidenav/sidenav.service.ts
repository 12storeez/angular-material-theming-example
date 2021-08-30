import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  visible$ = new BehaviorSubject(true);
  mini$ = new BehaviorSubject(false);
  fixedTopGap$ = new BehaviorSubject(64);

  show() {
    this.visible$.next(true);
  }

  hide() {
    this.visible$.next(false);
  }

  increase() {
    this.mini$.next(false);
  }

  decrease() {
    this.mini$.next(true);
  }

  toggleVisibility() {
    this.visible$.next(!this.visible$.getValue());
  }

  toggleSize() {
    this.mini$.next(!this.mini$.getValue());
  }
}
