import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LangActiveDirective } from '../../directives/lang-active.directive';
import { DataService } from '../../services/data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LangActiveDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  theme: string;

  constructor(
    private dataService: DataService,
    private themeService: ThemeService
  ) {
    this.theme = this.themeService.theme;
  }

  isEN(): boolean {
    return this.dataService.getInstantLang() === 'en';
  }

  isFR(): boolean {
    return this.dataService.getInstantLang() === 'fr';
  }

  isLighTheme(): boolean {
    return this.themeService.isLighTheme();
  }

  toggleDark() {
    this.themeService.toggleDark();
  }
}
