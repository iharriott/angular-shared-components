import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstKey',
})
export class FirstKeyPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    return Object.keys(value)[0];
  }
}
