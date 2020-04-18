import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'div[appProductService]'
})
export class ProductsDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('click', ['$event.target.classList'])
  onClick(element) {
    const toggledClass = 'clicked';
    const addedClass = 'added';
    const isBackButton = element.contains('back');
    const isAddButton = element.contains('button');
    const image = this.el.nativeElement.querySelector('.prodserv__image');
    const form = this.el.nativeElement.querySelector('.prodserv__form');
    if (!form.classList.contains(toggledClass) || isBackButton) {
      image.classList.toggle(toggledClass);
      form.classList.toggle(toggledClass);
    } else if (isAddButton) {
      const box = this.el.nativeElement.querySelector('.products__inner');
      const back = this.el.nativeElement.querySelector('.prodserv__form--header > span.back');
      this.el.nativeElement.classList.add(addedClass);
      setTimeout(() => {
        this.el.nativeElement.classList.remove(addedClass);
      }, 1000);
      back.click();
    }
  }

}
