import { Component, signal } from '@angular/core';
import { TimerComponent } from './timer.component';
import { Timer } from './types';

@Component({
  selector: 'app-root',
  imports: [TimerComponent],
  template: `
    @for (timer of timers(); track $index) {
      <app-timer [timer]="timer" (remove)="removeTimer(timer)"></app-timer>
    }

    <div class="addMinuteButtons">
    <button (click)="addTimer(0.5)">+30sec</button>
    <button (click)="addTimer(1)">+1</button>
      <button (click)="addTimer(5)">+5</button>
      <button (click)="addTimer(10)">+10</button>
      <button (click)="addTimer(30)">+30</button>
      <button (click)="addTimer(60)">+60</button>
    </div>

  `,
  styles: `
    .addMinuteButtons {
      display: flex;
      flex-wrap: wrap;
      width:100px;
    }
    .addMinuteButtons button {
      flex: 1;
      box-sizing: border-box;
    }
  `,
})
export class AppComponent {
  timers = signal([] as Timer[]);

  addTimer(minutes: number) {
    const ms = minutes * 60 * 1000;
    this.timers.update(timers => [
      ...timers,
      { remaining_ms: ms },
    ]);
  }

  removeTimer(timer: Timer) {
    this.timers.update(timers => timers.filter(t => t !== timer));
  }

  constructor() {
    setInterval(() => {
      this.timers.update(timers => timers.map(timer => ({
        remaining_ms: timer.remaining_ms - 1000,
      })));
    }, 1000);
  }

}
