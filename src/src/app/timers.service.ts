import { Injectable, signal } from '@angular/core';
import { Timer } from './types';

@Injectable({
  providedIn: 'root'
})
export class TimersService {

  private interval = 1000;

  private intervalClock: any;

  timerState = signal('on' as 'on' | 'off');

  timers = signal([] as Timer[]);

  addTimer(minutes: number) {
    const lastTimer = this.timers()?.at(-1);

    this.timers.update(timers => [...timers, {
      remaining_ms: (lastTimer?.remaining_ms ?? 0) + (minutes * 60 * 1000),
    }]);
  }

  removeTimer(timer: Timer) { 
    this.timers.update(timers => timers.filter(t => t !== timer));
  }

  pauseTimer(timer: Timer) {
    this.timers.update(timers => timers.map(t => {
      if (t === timer) {
        return {
          paused: !t.paused,
          remaining_ms: t.remaining_ms,
        };
      }
      return t;
    }));

    console.log(this.timers());
  }

  resetTimers() {
    this.timers.set([]);
  }

  start() {
    this.intervalClock = setInterval(() => {
      this.timers.update(timers => timers.map(timer => {
        return {
          ...timer,
          remaining_ms: timer.remaining_ms - (timer.paused ? 0 : this.interval),
        }
      }));
    }, this.interval);
    this.timerState.set('on');
  }

  stop() {
    clearInterval(this.intervalClock);
    this.timerState.set('off');
  }

  toggleTimers() {
    this.timerState() == 'on' ? this.stop() : this.start();
  }

}
