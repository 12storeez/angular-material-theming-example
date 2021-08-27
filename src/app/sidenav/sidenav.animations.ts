import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animations = [
  trigger('sidenav-size', [
    state(
      'sidenav-big',
      style({
        width: '280px',
      })
    ),
    state(
      'sidenav-mini',
      style({
        width: '80px',
      })
    ),
    transition('sidenav-mini <=> sidenav-big', [animate('0.1s')]),
  ]),

  trigger('content-margin', [
    state(
      'sidenav-big',
      style({
        marginLeft: '280px',
      })
    ),
    state(
      'sidenav-mini',
      style({
        marginLeft: '80px',
      })
    ),
    transition('sidenav-mini <=> sidenav-big', [animate('0.1s')]),
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
