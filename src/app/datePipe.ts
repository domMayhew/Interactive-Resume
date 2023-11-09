import { Pipe, PipeTransform } from "@angular/core";
import typia from "typia";

@Pipe({
  standalone: true,
  name: 'vectorDate'
})
export class VectorDate implements PipeTransform {
  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  transform(value: [number, number] | undefined): string {
    if (value === undefined) {
      return 'Present'
    } else {
      const [year, month] = typia.assertEquals<[number, number]>(value);
      return this.months[month - 1] + " " + year;
    }
  }
}
