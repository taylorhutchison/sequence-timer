import { Injectable, signal } from '@angular/core';
import { Timer } from './types';

@Injectable({
  providedIn: 'root'
})
export class TimersService {

  private intervalClock: any;

  timerState = signal(0);

  timers = signal([] as Timer[]);

  addTimer(minutes: number) {
    this.timers.update(timers => [...timers, {
      remaining_ms: minutes * 60 * 1000,
    }]);
  }

  removeTimer(timer: Timer) { 
    this.timers.update(timers => timers.filter(t => t !== timer));
  }

  start() {
    this.intervalClock = setInterval(() => {
      this.timers.update(timers => timers.map(timer => ({
        remaining_ms: timer.remaining_ms - 1000,
      })));
    }, 1000);
    this.timerState.set(1);
  }

  stop() {
    clearInterval(this.intervalClock);
    this.timerState.set(0);
  }

  toggleTimer() {
    this.timerState() ? this.stop() : this.start();
  }

}
