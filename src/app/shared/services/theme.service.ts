import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    // default theme
    const theme = localStorage.getItem('theme') as Theme;
    this.theme = theme || Theme.Light;
    this.applyTheme();
  }

  public isLighTheme(): boolean {
    return this.theme === Theme.Light;
  }

  public toggleDark(): void {
    this.theme = this.isLighTheme() ? Theme.Dark : Theme.Light;
    this.applyTheme();
  }

  private applyTheme(): void {
    localStorage.setItem('theme', this.theme);
    const htmlNode = this.document.querySelector('html');
    if (htmlNode) {
      if (this.theme === Theme.Dark) {
        htmlNode.classList.add('dark');
      } else {
        htmlNode.classList.remove('dark');
      }
    }
  }
}
