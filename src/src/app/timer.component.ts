import { Component, input, output } from '@angular/core';
import { Timer } from './types';
import { HhmmssPipe } from './hhmmss.pipe';

@Component({
  selector: 'app-timer',
  imports: [ HhmmssPipe ],
  template: `
    <span>{{ timer().remaining_ms | hhmmss }}</span>
    <button (click)=remove.emit()>x</button>
  `,
  styles: ``
})
export class TimerComponent {
  timer = input.required<Timer>();
  remove = output();
}
