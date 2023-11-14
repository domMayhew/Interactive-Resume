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
      const yearStr = months > 12 ? Math.floor(months / 12) + ' yrs, ' : '';
      const monthStr = months % 12 + 'mos.';
      return yearStr + monthStr;
    }
  }
}
