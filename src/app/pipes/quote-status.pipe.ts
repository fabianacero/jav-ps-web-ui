import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'quoteStatus'
})
export class QuoteStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const index = value.toString().toLowerCase();
    const dictionary = {registered: 'Registrada', in_quotation: 'En Cotización', in_process: 'En Procedo'};
    return dictionary[index] || index;
  }

}
