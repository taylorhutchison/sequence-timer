import { Component, computed, inject } from '@angular/core';
import { TimerComponent } from './timer.component';
import { Timer } from './types';
import { TimersService } from './timers.service';

@Component({
  selector: 'app-root',
  imports: [TimerComponent],
  template: `
    <div class="container">
      <a href="https://github.com/taylorhutchison/sequence-timer/tree/main/src">Made with Angular by Taylor Hutchison</a>
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
          <button (click)="service.toggleTimers()" class="startStop">{{ startStop() }}</button>
        </div>
      </div>
    @for (timer of timers(); track $index) {
      <app-timer [timer]="timer" (remove)="removeTimer(timer)" (pause)="pauseTimer(timer)"></app-timer>
    }
   </div>


  `,
  styles: ``
})
export class AppComponent {
  service = inject(TimersService);
  timers = this.service.timers;
  startStop = computed(() => this.service.timerState() === 'on' ? 'Pause' : 'Start');

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
