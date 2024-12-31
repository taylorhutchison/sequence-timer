import { Component, computed, input, output } from '@angular/core';
import { Timer } from './types';
import { HhmmssPipe } from './hhmmss.pipe';

@Component({
  selector: 'app-timer',
  imports: [ HhmmssPipe ],
  template: `
    <div class="timeContainer">
      <div class="controls">
        <button (click)=remove.emit() class="cancelControl">cancel</button>
        <button (click)=pause.emit() class="playPauseControl">{{playPause()}}</button>
      </div>
      <span class="time" [class]="timerClass()"> {{ timer().remaining_ms | hhmmss }}</span>
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
      font-size:0.9rem;
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
    background: none;
   }

   .cancelControl {
    color:rgba(224, 0, 0, 0.7);
   }
    .playPauseControl {
      color:rgba(0, 45, 209, 0.7);
    }

   .expired {
    color:rgb(224, 0, 0);
   }
   .active {
    color:rgb(0, 73, 28);
   }

  `
})
export class TimerComponent {
  timer = input.required<Timer>();
  remove = output();
  pause = output();

  timerClass = computed(() => this.timer().remaining_ms < 0 ? 'expired' : 'active');
  playPause = computed(() => this.timer().paused ? 'start' : 'pause');

  nonDefaultLabel = false;

  updateLabel(event: any) {
    this.nonDefaultLabel = event?.target?.innerText?.toLowerCase()?.trim() !== 'name';
  }
}
