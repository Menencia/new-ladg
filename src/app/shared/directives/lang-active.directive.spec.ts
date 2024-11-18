import { ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LangActiveDirective } from './lang-active.directive';

describe('LangActiveDirective', () => {
  it('should create an instance', () => {
    const directive = new LangActiveDirective(
      {} as Renderer2,
      {} as ElementRef,
      {} as Router
    );
    expect(directive).toBeTruthy();
  });
});
