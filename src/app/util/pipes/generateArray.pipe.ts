import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generateArray',
  standalone: true
})
export class GenerateArrayPipe implements PipeTransform {
  transform(num: number): number[] {
    return Array.from({ length: num }, (_, i) => i + 1);
  }
}
