import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appUiLangActive]',
  standalone: true
})
export class UiLangActiveDirective {
  @Input('checkLang') checkLang = 'en';
  @Input('classToApply') classToApply = '';

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private translateService: TranslateService
  ) {
    this.updateClass();
  }

  private updateClass(): void {
    this.translateService.onLangChange.subscribe((langChange) => {
      if (langChange.lang.includes(this.checkLang)) {
        this.renderer.addClass(this.el.nativeElement, this.classToApply);
      } else {
        this.renderer.removeClass(this.el.nativeElement, this.classToApply);
      }
    });
  }
}
