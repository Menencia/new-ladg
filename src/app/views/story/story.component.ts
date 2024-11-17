import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EventsListComponent } from '../../shared/components/list/events-list/events-list.component';
import { PartsListComponent } from '../../shared/components/list/parts-list/parts-list.component';
import { Part } from '../../shared/interfaces/part';
import { DisplaySeason } from '../../shared/interfaces/season';
import { DataService } from '../../shared/services/data.service';
import { LangUtils } from '../../shared/utils/lang.utils';
import { OrderUtils } from '../../shared/utils/order.utils';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [
    RouterModule, PartsListComponent, EventsListComponent,
    TranslateModule, DropdownModule, FormsModule, ButtonModule
  ],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {
  seasons: DisplaySeason[] = [];
  storyEvents: Part[] = [];

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
        this.getStoryEvents(lang);
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  /** Get all the seasons data for given language */
  private getSeasons(lang: string) {
    this.dataService.setLang(lang);
    this.dataService.getSeasons().subscribe(seasons => {
      this.seasons = seasons.map(season => {
        return {
          ...season,
          parts: OrderUtils.groupByPrefix(season.parts)
        };
      });
    });
  }

  /** Get all the SE data for given language */
  private getStoryEvents(lang: string) {
    this.dataService.setLang(lang);
    this.dataService.getStoryEvents().subscribe(storyEvents => this.storyEvents = storyEvents);
  }
}
