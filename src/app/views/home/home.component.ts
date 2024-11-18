import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, TranslateModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  lang = 'en';

  constructor(private translateService: TranslateService) {
    this.lang = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe((changeLang) => {
      this.lang = changeLang.lang;
    })
  }
}
