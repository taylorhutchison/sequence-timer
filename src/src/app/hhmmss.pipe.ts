import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hhmmss'
})
export class HhmmssPipe implements PipeTransform {

  transform(value: number): string {
    const pad = (val: number) => val.toString().padStart(2, '0');
    const seconds = Math.abs(Math.floor(value / 1000));
    const hours = Math.floor(seconds / 3600) % 99;
    const minutes = Math.floor(seconds / 60) % 60;
    const remainingSeconds = seconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  }

}
