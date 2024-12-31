import { Component, input, output } from '@angular/core';
import { Timer } from './types';
import { HhmmssPipe } from './hhmmss.pipe';

@Component({
  selector: 'app-timer',
  imports: [ HhmmssPipe ],
  template: `
    <div class="timeContainer">
      <button (click)=remove.emit()>❌</button>
      <span class="time">{{ timer().remaining_ms | hhmmss }}</span>
    </div>
  `,
  styles: `
    .timeContainer {
      display: flex;
    }
   .timeContainer .time {
      font-size: 2em;
      display: inline;
   }
   .timeContainer button {
      border: none;
      background: none;
   }
  `
})
export class TimerComponent {
  timer = input.required<Timer>();
  remove = output();
}
