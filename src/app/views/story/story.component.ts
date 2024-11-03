import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DataService } from '../../data.service';
import { DisplaySeason } from '../../shared/interfaces/season';
import { LangUtils } from '../../shared/utils/lang.utils';
import { OrderUtils } from '../../shared/utils/order.utils';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [RouterModule, TableModule, TranslateModule, DropdownModule, FormsModule, ButtonModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {
  seasons: DisplaySeason[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const lang = params.get('lang');
      if (lang && LangUtils.isValidVideoLang(lang)) {
        this.getSeasons(lang);
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  /** Get all the seasons data for given language */
  private getSeasons(lang: string) {
    this.dataService.lang = lang;
    this.dataService.getSeasons().subscribe(seasons => {
      this.seasons = seasons.map(season => {
        return {
          ...season,
          parts: OrderUtils.groupByPrefix(season.parts)
        };
      });
    });
  }

  /** Builds url for part links */
  buildPath(seasonRef: string, partRef: string): string {
    return `/story/${this.dataService.lang}/part/${seasonRef}-${partRef}`;
  }
}
