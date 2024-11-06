import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangUtils } from './shared/utils/lang.utils';

const DEFAULT_LANG = 'en';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  lang = 'en';

  constructor(
    private translateService: TranslateService
  ) {
    this.lang = LangUtils.determineLang(
      localStorage.getItem('lang'),
      this.translateService.getBrowserLang()
    );
  }

  ngOnInit() {
    this.translateService.use(this.lang);
  }
}
