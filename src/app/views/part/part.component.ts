import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { EpisodesListComponent } from '../../shared/components/list/episodes-list/episodes-list.component';
import { BreadcrumbScope, BreadcrumbType } from '../../shared/enums/breadcrumb';
import { Episode } from '../../shared/interfaces/episode';
import { Part } from '../../shared/interfaces/part';
import { ResultPart } from '../../shared/interfaces/result-part';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [RouterModule, EpisodesListComponent, BreadcrumbComponent, TranslateModule, ButtonModule],
  templateUrl: './part.component.html',
  styleUrl: './part.component.scss'
})
export class PartComponent {
  /** list of episodes to display */
  episodes: Episode[] = [];
  /** ref of part */
  ref = '';
  /** type of part */
  type = BreadcrumbType.STORY;
  /** scope of part */
  scope = BreadcrumbScope.PART;
  /** part infos */
  part?: Part;
  /** next part to the current */
  previousPart?: ResultPart;
  /** previous part to the current */
  nextPart?: ResultPart;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      const lang = params.get('lang');
      const ref = params.get('ref');
      if (type && lang && ref) {
        this.type = type as BreadcrumbType;
        this.ref = ref;
        this.dataService.setLang(lang);
        if (type === BreadcrumbType.STORY) {
          this.dataService.getSeasonsPart(this.ref).subscribe(part => this.part = part);
          this.dataService.getPart(this.ref).subscribe(result => this.episodes = result?.episodes ?? []);
          this.dataService.getPreviousPart(this.ref).subscribe(result => this.previousPart = result);
          this.dataService.getNextPart(this.ref).subscribe(result => this.nextPart = result);
        }
        if (type === BreadcrumbType.STORY_EVENT) {
          this.dataService.getStoryEvents().subscribe(events => this.part = events.find(event => event.ref === this.ref));
          this.dataService.getStoryEvent(this.ref).subscribe(episodes => this.episodes = episodes);
        }
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  isStory(): boolean {
    return this.type === BreadcrumbType.STORY;
  }

  isStoryEvent(): boolean {
    return this.type === BreadcrumbType.STORY_EVENT;
  }

  buildUrl(ref: string): string {
    return `/chapter/${this.dataService.getInstantLang()}/${ref}`;
  }
}
