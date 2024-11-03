import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangUtils } from './shared/utils/lang.utils';

const DEFAULT_LANG = 'en';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.use(
      LangUtils.determineLang(
        localStorage.getItem('lang'),
        this.translateService.getBrowserLang()
      )
    );
  }
}
