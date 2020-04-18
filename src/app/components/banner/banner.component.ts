import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  private slideInterval = 4000;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.moveBanner();
    }, this.slideInterval);
  }

  public moveBanner() {
    let pointer = 0;
    const figures = this.getBannerElements();
    for (let i = 0; i < figures.length; i++) {
      if (figures[i].className === 'visible') {
        figures[i].className = 'hidden';
        pointer = i;
      }
    }
    if (++pointer === figures.length) {
      pointer = 0;
    }
    figures[pointer].className = 'visible';
    setTimeout(() => {
      this.moveBanner();
    }, this.slideInterval);
  }

  private getBannerElements() {
    return document.querySelector('.banner').getElementsByTagName('figure');
  }
}
