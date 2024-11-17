import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  theme: string;

  constructor(private themeService: ThemeService) {
    this.theme = this.themeService.theme;
  }

  isLighTheme(): boolean {
    return this.themeService.isLighTheme();
  }

  toggleDark() {
    this.themeService.toggleDark();
  }
}
