import { Component, computed, inject, signal } from '@angular/core';
import { TimerComponent } from './timer.component';
import { Timer } from './types';
import { TimersService } from './timers.service';

@Component({
  selector: 'app-root',
  imports: [TimerComponent],
  template: `

    <div class="container">
    <h1>Sequence Timers</h1>
    <div class="mainControls">
        
        <button (click)="addTimer(0.1)">+30sec</button>
        <button (click)="addTimer(1)">+1</button>
        <button (click)="addTimer(5)">+5</button>
        <button (click)="addTimer(10)">+10</button>
        <button (click)="addTimer(30)">+30</button>
        <button (click)="addTimer(60)">+60</button>
        <div class="actions">
          <button (click)="service.toggleTimers()">{{startStop()}}</button>
        </div>
    </div>

    @for (timer of timers(); track $index) {
      <app-timer [timer]="timer" (remove)="removeTimer(timer)" (pause)="pauseTimer(timer)"></app-timer>
    }

  </div>


  `,
  styles: `

    .container {
      width:500px;
      margin: 50px auto;
      padding:5px;
      border: 1px solid #000;
      border-radius: 4px;
      box-shadow: 12px 12px 2px 1px rgb(74 74 86 / 20%);
    }

    .container h1 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .mainControls {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .mainControls button {
      flex: 2;
      box-sizing: border-box;
      font-size: 1.5rem;
      background: #fff;
      margin-right:1px;
      border-radius: 4px;
      border: 1px solid #bbb;
      color: #343434;
      font-family: 'Noto Sans', sans-serif;
      font-weight: 300;
    }

    .mainControls .actions {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .startStop{
      font-size: 2em;
      border: none;
      background: none;
    }

    .paused {
      background: #f00;
    }

  `,
})
export class AppComponent {
  
  service = inject(TimersService);

  timers = this.service.timers;

  startStop = computed(() => this.service.timerState() == 'on' ? 'Pause' : 'Start');

  addTimer(minutes: number) {
    this.service.addTimer(minutes);
  }

  removeTimer(timer: Timer) {
    this.service.removeTimer(timer);
  }

  pauseTimer(timer: Timer) {
    this.service.pauseTimer(timer);
  }

  constructor() {
    this.service.start();
  }

}
