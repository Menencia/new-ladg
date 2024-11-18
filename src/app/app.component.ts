import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { LangUtils } from './shared/utils/lang.utils';

const DEFAULT_LANG = 'en';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    const savedLang = localStorage.getItem('lang');
    this.translateService.use(LangUtils.determineLang(
      savedLang,
      this.translateService.getBrowserLang()
    ));
  }
}
