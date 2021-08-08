import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  visible$ = new BehaviorSubject(true);

  show() {
    this.visible$.next(true);
  }

  hide() {
    this.visible$.next(false);
  }

  toggleVisibility() {
    this.visible$.next(!this.visible$.getValue());
  }
}
