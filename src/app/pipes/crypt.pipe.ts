import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'crypt'
})
export class CryptPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    return btoa(JSON.stringify(value));
  }

}
