import { Component, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { DataService } from './shared/services/data.service';
import { LangUtils } from './shared/utils/lang.utils';

const DEFAULT_LANG = 'en';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  lang = 'en';

  private sub: Subscription;

  constructor(
    private translateService: TranslateService,
    private dataService: DataService
  ) {
    this.sub = this.dataService.getLang().subscribe(lang => this.lang = lang);
  }

  ngOnInit() {
    const savedLang = localStorage.getItem('lang');
    this.translateService.use(LangUtils.determineLang(
      savedLang,
      this.translateService.getBrowserLang()
    ));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
