import { Component, computed, inject, signal } from '@angular/core';
import { TimerComponent } from './timer.component';
import { Timer } from './types';
import { TimersService } from './timers.service';

@Component({
  selector: 'app-root',
  imports: [TimerComponent],
  template: `

    <div class="container">
    <a href="https://github.com/taylorhutchison/sequence-timer/tree/main/src">Made with Angular</a>
    <h1>Sequence Timers</h1>
    <div class="mainControls">
        
        <button (click)="addTimer(0.5)" style="background: rgb(255 202 0 / 10%);">+30sec</button>
        <button (click)="addTimer(1)" style="background: rgb(255 202 0 / 20%);">+1</button>
        <button (click)="addTimer(5)" style="background: rgb(255 202 0 / 30%);">+5</button>
        <button (click)="addTimer(10)" style="background: rgb(255 202 0 / 40%);">+10</button>
        <button (click)="addTimer(30)" style="background: rgb(255 202 0 / 50%);">+30</button>
        <button (click)="addTimer(60)" style="background: rgb(255 202 0 / 60%);">+60</button>
        <div class="actions">
          <button (click)="service.resetTimers()" class="reset">Reset</button>
          <button (click)="service.toggleTimers()" class="startStop">{{startStop()}}</button>
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
      box-shadow: 12px 12px 2px 1px rgba(74, 74, 86, 0.2);
      background: #fafafa;
    }

    .container h1 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 10px;
      font-weight: 300;
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
      flex: 6;
      display: flex;
      flex-direction: column;
    }
    .paused {
      background: #f00;
    }

    a {
      text-decoration: none;
      color:#323232;
    }

    .mainControls button.reset {
      background:rgba(224, 0, 0, 0.7);
      color: #fff;
    }

    .mainControls button.startStop {
      background: rgba(0, 45, 209, 0.7);
      color: #fff;
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

}
