import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'spaceSeparator'})
export class SpaceSeparatorPipe implements PipeTransform {
  transform(key: string | null): string | null {
    if (key) {
      return key.replaceAll(',', ' ').replaceAll('.', ',');
    } else {
      return key;
    }
  }
}
