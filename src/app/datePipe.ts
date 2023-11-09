import { Pipe, PipeTransform } from "@angular/core";
import typia from "typia";

@Pipe({
  standalone: true,
  name: 'vectorDate'
})
export class VectorDate implements PipeTransform {
  transform(value: [number, number] | undefined): string {
    if (value === undefined) {
      return 'Present'
    } else {
      const [year, month] = typia.assertEquals<[number, number]>(value);
      const paddedMonth = month < 10 ? '0' + month : month;
      return year + '/' + paddedMonth;
    }
  }
}
