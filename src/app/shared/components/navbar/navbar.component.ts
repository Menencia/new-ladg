import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LangActiveDirective } from '../../directives/lang-active.directive';
import { UiLangActiveDirective } from '../../directives/ui-lang-active.directive';
import { ThemeService } from '../../services/theme.service';
import { LangUtils } from '../../utils/lang.utils';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LangActiveDirective, UiLangActiveDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  theme: string;

  constructor(
    private translateService: TranslateService,
    private themeService: ThemeService
  ) {
    this.theme = this.themeService.theme;
  }

  isLighTheme(): boolean {
    return this.themeService.isLighTheme();
  }

  toggleDark() {
    this.themeService.toggleDark();
  }

  changeLang(lang: string): void {
    this.translateService.use(LangUtils.determineLang(lang))
  }
}
