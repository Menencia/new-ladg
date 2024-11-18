import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[appLangActive]',
  standalone: true
})
export class LangActiveDirective {
  @Input('checkLang') checkLang = 'en';
  @Input('classToApply') classToApply = '';

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {
    this.updateClass();
  }

  private updateClass(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('>', event instanceof NavigationEnd, event.url.includes(this.checkLang))
        if (event.url.includes(this.checkLang)) {
          console.log('here')
          this.renderer.addClass(this.el.nativeElement, this.classToApply);
        } else {
          this.renderer.removeClass(this.el.nativeElement, this.classToApply);
        }
      }
    });
  }

}
