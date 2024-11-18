import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
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
