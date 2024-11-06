import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
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
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.lang = this.route.snapshot.firstChild?.paramMap.get('lang') ?? 'en';
      });
  }

  ngOnInit() {
    this.translateService.use(LangUtils.determineLang(
      localStorage.getItem('lang'),
      this.translateService.getBrowserLang()
    ));
  }
}
