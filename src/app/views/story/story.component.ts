import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DataService } from '../../data.service';
import { Season } from '../../shared/interfaces/season';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [RouterModule, TableModule, TranslateModule, DropdownModule, FormsModule, ButtonModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {
  seasons: Season[] = [];
  uiLang = 'en';
  videoLang = 'en';

  constructor(
    private dataService: DataService,
    private translateService: TranslateService
  ) {
    this.getSeasons();
    const navigatorLang = this.translateService.getBrowserLang() ?? 'en';
    this.translateService.use(navigatorLang);
  }

  private getSeasons() {
    this.dataService.lang = this.videoLang;
    this.dataService.getSeasons().subscribe(seasons => {
      this.seasons = seasons;
    });
  }

  switchVideoLang() {
    this.videoLang = this.videoLang === 'en' ? 'fr' : 'en';
    this.getSeasons();
  }

  switchUILang() {
    const current = this.getUIlLand();
    this.translateService.use(current === 'en' ? 'fr' : 'en');
  }

  getUIlLand(): string {
    return this.translateService.currentLang;
  }

  buildPath(seasonRef: string, partRef: string): string {
    return `/story/part/${seasonRef}-${partRef}`;
  }
}
