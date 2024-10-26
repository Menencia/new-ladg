import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DataService } from '../../data.service';
import { Season } from '../../shared/interfaces/season';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [RouterModule, TableModule, TranslateModule, DropdownModule, FormsModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {
  seasons: Season[] = [];
  lang = 'en';

  constructor(
    private dataService: DataService,
    private translateService: TranslateService
  ) {
    this.getSeasons();
    const navigatorLang = this.translateService.getBrowserLang() ?? 'en';
    this.translateService.use(navigatorLang);
  }

  private getSeasons() {
    this.dataService.lang = this.lang;
    this.dataService.getSeasons().subscribe(seasons => {
      this.seasons = seasons;
    });
  }

  switchVideoLang() {
    this.lang = this.lang === 'en' ? 'fr' : 'en';
    this.getSeasons();
  }

  switchUILang() {
    const current = this.translateService.currentLang;
    console.log(current)
    this.translateService.use(current === 'en' ? 'fr' : 'en');
  }

  buildPath(seasonRef: string, partRef: string): string {
    return `/story/part/${seasonRef}-${partRef}`;
  }
}
