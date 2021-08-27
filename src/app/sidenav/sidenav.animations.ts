import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const SIDENAV_HUGE_SIZE = '280px';
const SIDENAV_MINI_SIZE = '80px';

export const animations = [
  trigger('sidenav-size', [
    state(
      'sidenav-huge',
      style({
        width: SIDENAV_HUGE_SIZE,
      })
    ),
    state(
      'sidenav-mini',
      style({
        width: SIDENAV_MINI_SIZE,
      })
    ),
    state('sidenav-over', style({ width: SIDENAV_HUGE_SIZE })),
    transition('sidenav-mini <=> sidenav-huge', [animate('0.1s')]),
  ]),

  trigger('content-margin', [
    state(
      'sidenav-huge',
      style({
        marginLeft: SIDENAV_HUGE_SIZE,
      })
    ),
    state(
      'sidenav-mini',
      style({
        marginLeft: SIDENAV_MINI_SIZE,
      })
    ),
    state('sidenav-over', style({ marginLeft: 0 })),
    transition('sidenav-mini <=> sidenav-huge', [animate('0.1s')]),
  ]),

  trigger('list-accordion-opacity', [
    // transition('* => void', [
    //   animate(
    //     '0.14s',
    //     style({
    //       transform: 'translateX(100px)',
    //       opacity: 0,
    //     })
    //   ),
    // ]),
    // transition('void => *', [
    //   style({
    //     opacity: 0,
    //     transform: 'translateX(-100px)',
    //   }),
    //   animate('0.14s'),
    // ]),
  ]),
  trigger('list-icons-opacity', [
    // transition('* => void', [animate('0.14s')]),
    // transition('void => *', [animate('0.14s')]),
  ]),
];
