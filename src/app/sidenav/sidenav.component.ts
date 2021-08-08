import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { SidenavService } from './sidebar.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
      tap((state) => {
        this.show();
      })
    );
  opened$ = this.sidenavService.visible$;

  show() {
    this.sidenavService.show();
  }

  hide() {
    this.sidenavService.hide();
  }

  toggleVisibility() {
    this.sidenavService.toggleVisibility();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService
  ) {}
}
