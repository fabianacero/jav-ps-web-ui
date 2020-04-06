import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const _self = this;
    document.querySelectorAll('.header__nav > a').forEach(function (menu) {
      menu.addEventListener('click', (event) => {
        event.preventDefault();
        const destination = menu.getAttribute("href");
        const element = document.querySelector(destination);
        _self.scrollIt(
          element,
          300,
          'easeOutQuad',
          () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
        );
      });
    });
  }

  @HostListener("window:scroll", ['$event'])
  public onScrollMove(event: Event) {
    let reverseMenuItems = this.getReverseItems();
    //let scrollOffset = event.srcElement.children[0].scrollTop;
    const currentScrollPosition = window.scrollY + 30;
    reverseMenuItems.every((menuItem, key) => {
      let section = menuItem.getAttribute("href");
      let elementToStroll = document.querySelector(section);
      if (elementToStroll.offsetTop > 0 && currentScrollPosition >= Number.parseInt(elementToStroll.offsetTop)) {
        document.querySelectorAll('.active').forEach((menu) => {
          menu.classList.remove('active');
        });
        menuItem.classList.add('active')
        return false;
      }
      return true;
    });
  }

  private getReverseItems() {
    const menuItems = document.querySelectorAll(".header__nav > a");
    let reverseMenuItems = [];
    menuItems.forEach((menuItem, key) => {
      reverseMenuItems[key] = menuItem;
    });
    return reverseMenuItems.reverse();
  }

  private scrollIt(destination, duration = 200, easing = 'linear', callback) {

    const easings = {
      linear(t) {
        return t;
      },
      easeInQuad(t) {
        return t * t;
      },
      easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic(t) {
        return (--t) * t * t + 1;
      },
      easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
      },
      easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      },
      easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint(t) {
        return 1 + (--t) * t * t * t * t;
      },
      easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      }
    };

    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }

    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }

      requestAnimationFrame(scroll);
    }

    scroll();
  }
}
