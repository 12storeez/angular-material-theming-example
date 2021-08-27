import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { SidenavService } from './sidenav.service';
import { animations } from './sidenav.animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations,
})
export class SidenavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      tap((state) => {
        console.log(Breakpoints.Handset);
        console.log(state);
        this.show();
      }),
      map((result) => result.matches),
      shareReplay()
    );
  opened$ = this.sidenavService.visible$;
  mini$ = this.sidenavService.mini$;
  options = [
    {
      name: 'Интеграция',
      icon: 'vertical_align_center',
      variants: [],
      onClick: () => {},
    },
    {
      name: 'Интеграция',
      icon: 'vertical_align_center',
      variants: [],
      onClick: () => {},
    },
  ];

  show() {
    this.sidenavService.show();
  }

  hide() {
    this.sidenavService.hide();
  }

  toggleVisibility() {
    this.sidenavService.toggleVisibility();
  }

  toggleSize() {
    this.sidenavService.toggleSize();
  }

  setAnimation() {
    return this.mini$.getValue() ? 'sidenav-mini' : 'sidenav-big';
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService
  ) {}
}
