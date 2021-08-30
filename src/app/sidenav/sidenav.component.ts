import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { SidenavService } from './sidenav.service';
import { animations } from './sidenav.animations';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations,
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      tap((state) => {
        this.show();
        this.increase();
        this.setSidenavGap(state);
      }),
      shareReplay()
    );
  visible$ = this.sidenavService.visible$;
  mini$ = this.sidenavService.mini$;
  fixedTopGap$ = this.sidenavService.fixedTopGap$;
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
  isDark$ = this.themeService.isDark$;

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('sidenavContent', { static: true })
  sidenavContent!: MatSidenavContent;

  show() {
    this.sidenavService.show();
  }

  hide() {
    this.sidenavService.hide();
  }

  increase() {
    this.sidenavService.increase();
  }

  toggleVisibility() {
    this.sidenavService.toggleVisibility();
  }

  toggleSize() {
    this.sidenavService.toggleSize();
  }

  setAnimation() {
    return this.mini$.getValue() ? 'sidenav-mini' : 'sidenav-huge';
  }

  setSidenavGap(isHandset: boolean) {
    this.fixedTopGap$.next(isHandset ? 56 : 64);
  }

  toggleTheme() {
    this.themeService.toggle();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
    private themeService: ThemeService
  ) {}
}
