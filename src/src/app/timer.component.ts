import { Component, computed, input, output } from '@angular/core';
import { Timer } from './types';
import { HhmmssPipe } from './hhmmss.pipe';

@Component({
  selector: 'app-timer',
  imports: [ HhmmssPipe ],
  template: `
    <div class="timeContainer">
      <div class="controls">
        <button (click)="remove.emit()" class="cancelControl">cancel</button>
        <button (click)="pause.emit()" class="playPauseControl">{{ playPause() }}</button>
      </div>
      <span class="time" [class]="timerClass()"> {{ timer().remaining_ms | hhmmss }}</span>
      <input type="text" (input)="updateLabel($event)" [class.nonDefaultLabel]="nonDefaultLabel" placeholder="name">
    </div>
  `,
  styles: ``
})
export class TimerComponent {
  timer = input.required<Timer>();
  remove = output();
  pause = output();

  nonDefaultLabel = false;

  timerClass = computed(() => this.timer().remaining_ms < 0 ? 'expired' : 'active');
  playPause = computed(() => this.timer().paused ? 'start' : 'pause');

  updateLabel(event: any) {
    this.nonDefaultLabel = event?.target?.innerText?.toLowerCase()?.trim() !== 'name';
  }
}
