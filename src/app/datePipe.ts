import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  standalone: true,
  name: 'vectorDate'
})
export class VectorDate implements PipeTransform {
  transform(value: [number, number]): string {
    const month = value[1] < 10 ? '0' + value[1] : value[1];
    return value[0] + "/" + month;
  }
}
