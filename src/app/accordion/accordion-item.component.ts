import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .ng-animating #panel .mat-expansion-panel-content {
        display: none !important;
      }
    `,
  ],
})

/**
 * Template for accordion list item, must be wrapped by <mat-accordion>
 */
export class AccordionItemComponent {
  @Input() title = '';
  @Input() iconName = '';
  @Input() description = '';
}
