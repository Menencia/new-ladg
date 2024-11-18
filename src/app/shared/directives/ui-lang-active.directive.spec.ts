import { ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UiLangActiveDirective } from './ui-lang-active.directive';

describe('UiLangActiveDirective', () => {
  it('should create an instance', () => {
    const directive = new UiLangActiveDirective(
      {} as Renderer2,
      {} as ElementRef,
      {} as TranslateService
    );
    expect(directive).toBeTruthy();
  });
});
