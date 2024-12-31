import { Component, computed, input, output } from '@angular/core';
import { Timer } from './types';
import { HhmmssPipe } from './hhmmss.pipe';

@Component({
  selector: 'app-timer',
  imports: [ HhmmssPipe ],
  template: `
    <div class="timeContainer">
      <div class="controls">
        <button (click)=remove.emit()>❌</button>
        <button (click)=pause.emit()>{{playPause()}}</button>
      </div>
      <span class="time">{{ timer().remaining_ms | hhmmss }}</span>
      <input type="text" (input)="updateLabel($event)" [class.nonDefaultLabel]="nonDefaultLabel" placeholder="name">
    </div>
  `,
  styles: `
    .timeContainer {
      display: flex;
      justify-content: space-between;
    }
   .timeContainer .time {
      font-size: 3em;
      display: inline;
      margin: 0 7px;
   }
   .timeContainer button {
      border: none;
      background: none;
      font-size:1.1rem;
   }

   .timeContainer .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
   }

   input {
    width: 120px;
    font-size: 1.1rem;
    border: none;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 300;
   }
  `
})
export class TimerComponent {
  timer = input.required<Timer>();
  remove = output();
  pause = output();

  playPause = computed(() => this.timer().paused ? '▶️' : '⏸');

  nonDefaultLabel = false;

  updateLabel(event: any) {
    this.nonDefaultLabel = event?.target?.innerText?.toLowerCase()?.trim() !== 'name';
  }
}
