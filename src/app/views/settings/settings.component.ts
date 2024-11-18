import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { DataService } from '../../shared/services/data.service';
import { LangUtils } from '../../shared/utils/lang.utils';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, DropdownModule, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  langs: any;
  uiLang: string;
  videoLang = 'en';

  constructor(
    private translateService: TranslateService,
    private dataService: DataService
  ) {
    this.uiLang = this.translateService.currentLang;
    this.videoLang = this.dataService.getInstantLang();
    this.langs = [
      {
        name: this.translateService.instant('settings.langs.en'),
        code: 'en'
      }, {
        name: this.translateService.instant('settings.langs.fr'),
        code: 'fr'
      }
    ]
  }

  onUiLang(event: { value: string }) {
    this.translateService.use(LangUtils.determineLang(event.value));
  }

  onVideoLang(event: { value: string }) {
    this.dataService.setLang(event.value);
  }
}
