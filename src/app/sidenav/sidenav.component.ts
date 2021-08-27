import { Component, HostListener, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { SidenavService } from './sidenav.service';
import { animations } from './sidenav.animations';
import { MatSidenav } from '@angular/material/sidenav';

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
  visible$ = this.sidenavService.visible$;
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
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

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
  ngOnInit() {
    this.setSidenavGap(innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setSidenavGap((<Window>event?.target)?.innerWidth);
  }

  setSidenavGap(innerWidth: number) {
    if (innerWidth <= 599) {
      this.sidenav.fixedTopGap = 56;
    } else {
      this.sidenav.fixedTopGap = 64;
    }
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService
  ) {}
}
