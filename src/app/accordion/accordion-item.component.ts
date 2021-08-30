import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./accordion-item.component.scss'],
})

/**
 * Template for accordion list item, must be wrapped by <mat-accordion>
 */
export class AccordionItemComponent {
  @Input() title = '';
  @Input() iconName = '';
  @Input() description = '';
}
