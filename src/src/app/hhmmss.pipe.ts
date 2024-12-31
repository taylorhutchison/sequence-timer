import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hhmmss',
  standalone: true
})
export class HhmmssPipe implements PipeTransform {

  transform(value: number): unknown {
    const pad = (val: number) => val.toString().padStart(2, '0');
    const seconds = Math.abs(Math.floor(value / 1000));
    const minutes = Math.floor(seconds / 60) % 60;
    const hours = Math.floor(seconds / 3600) % 99;
    const remainingSeconds = Math.floor(seconds % 60);

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  }

}
