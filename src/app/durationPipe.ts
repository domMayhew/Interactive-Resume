import { Pipe, PipeTransform } from "@angular/core";
import typia from "typia";

@Pipe({
  standalone: true,
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(start: [number, number] | undefined, end: [number, number] | undefined): string {
    if (start === undefined) {
      return '';
    } else {
      if (!typia.is<[number, number]>(end)) {
        end = [new Date().getMonth(), new Date().getFullYear()];
      }
      const [startYear, startMonth] = typia.assertEquals<[number, number]>(start);
      const [endYear, endMonth] = typia.assertEquals<[number, number]>(end);
      const months = (endYear - startYear) * 12 + endMonth - startMonth;
      if (months > 12) {
        return Math.floor(months / 12) + 'y ' + months % 12 + 'm';
      } else {
        return months % 12 + ' mos.';
      }
    }
  }
}
