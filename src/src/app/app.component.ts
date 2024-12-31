import { Component, computed, inject, signal } from '@angular/core';
import { TimerComponent } from './timer.component';
import { Timer } from './types';
import { TimersService } from './timers.service';

@Component({
  selector: 'app-root',
  imports: [TimerComponent],
  template: `

    <div class="mainControls">
      <button class="startStop" (click)="service.toggleTimer()">{{startStop()}}</button>
    </div>

    @for (timer of timers(); track $index) {
      <app-timer [timer]="timer" (remove)="removeTimer(timer)"></app-timer>
    }

    <div class="addTimerButtons">
      <button (click)="addTimer(0.5)">+30sec</button>
      <button (click)="addTimer(1)">+1</button>
      <button (click)="addTimer(5)">+5</button>
      <button (click)="addTimer(10)">+10</button>
      <button (click)="addTimer(30)">+30</button>
      <button (click)="addTimer(60)">+60</button>
    </div>
  `,
  styles: `

    .mainControls button{
      font-size: 2em;
      border: none;
      background: none;
    }



    .addTimerButtons {
      display: flex;
      flex-wrap: wrap;
      width:100px;
    }
    .addTimerButtons button {
      flex: 1;
      box-sizing: border-box;
    }
  `,
})
export class AppComponent {
  
  service = inject(TimersService);

  timers = this.service.timers;

  startStop = computed(() => this.service.timerState() ? '⏸️' : '▶️');

  addTimer(minutes: number) {
    this.service.addTimer(minutes);
  }

  removeTimer(timer: Timer) {
    this.service.removeTimer(timer);
  }

  constructor() {
    this.service.start();
  }

}
