import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen/index';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { firstValueFrom } from 'rxjs';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { EpisodesListComponent } from '../../shared/components/list/episodes-list/episodes-list.component';
import { BreadcrumbScope, BreadcrumbType } from '../../shared/enums/breadcrumb';
import { Episode } from '../../shared/interfaces/episode';
import { Part } from '../../shared/interfaces/part';
import { ResultPart } from '../../shared/interfaces/result-part';
import { DataService } from '../../shared/services/data.service';
import { SummaryUtils } from '../../shared/utils/summary.utils';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [RouterModule, EpisodesListComponent, BreadcrumbComponent, TranslateModule, ButtonModule, CloudinaryModule],
  templateUrl: './part.component.html',
  styleUrl: './part.component.scss',
})
export class PartComponent {
  /** list of episodes to display */
  episodes: Episode[] = [];
  /** summary of the part to display */
  summary: SafeHtml = '';
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
  /** Path to part logo */
  logoPart?: CloudinaryImage;

  constructor(private dataService: DataService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const type = params.get('type');
      const lang = params.get('lang');
      const ref = params.get('ref');
      if (type && lang && ref) {
        this.type = type as BreadcrumbType;
        this.ref = ref;
        this.dataService.setLang(lang);
        if (type === BreadcrumbType.STORY) {
          this.loadStory(lang);
        }
        if (type === BreadcrumbType.STORY_EVENT && lang === 'fr') {
          this.loadStoryEvent();
        }
        if (type === BreadcrumbType.SPECIAL_EVENT && lang === 'fr') {
          this.loadSpecialEvent();
        }
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  private async loadStory(lang: string): Promise<void> {
    this.part = await firstValueFrom(this.dataService.getSeasonsPart(this.ref));
    const resultPart = await firstValueFrom(this.dataService.getPart(this.ref));
    if (!this.part || !resultPart) {
      return;
    }
    this.episodes = resultPart.episodes ?? [];
    this.previousPart = await firstValueFrom(this.dataService.getPreviousPart(this.ref));
    this.nextPart = await firstValueFrom(this.dataService.getNextPart(this.ref));
    if (this.part.summary) {
      const summary = await firstValueFrom(this.dataService.getSummary(this.ref));
      this.summary = this.sanitizer.bypassSecurityTrustHtml(SummaryUtils.postProcess(summary));
    }
    if (!this.part.noLogo && lang === 'en') {
      const [season, ...rest] = this.ref.split('-');
      const part = this.part.ref.replaceAll('-', '_');
      const cld = new Cloudinary({ cloud: { cloudName: environment.cloudinary.cloud_name } });
      this.logoPart = cld.image(`${lang}/season${season}/memory_plate_chapter_${part}`).format('auto').quality('auto');
    }
  }

  private async loadStoryEvent(): Promise<void> {
    const events = await firstValueFrom(this.dataService.getStoryEvents());
    this.part = events.find((event) => event.ref === this.ref);
    this.episodes = await firstValueFrom(this.dataService.getStoryEvent(this.ref));
  }

  private async loadSpecialEvent(): Promise<void> {
    const events = await firstValueFrom(this.dataService.getSpecialEvents());
    this.part = events.find((event) => event.ref === this.ref);
    this.episodes = await firstValueFrom(this.dataService.getSpecialEvent(this.ref));
  }

  isStory(): boolean {
    return this.type === BreadcrumbType.STORY;
  }

  isStoryEvent(): boolean {
    return this.type === BreadcrumbType.STORY_EVENT;
  }

  isSpecialEvent(): boolean {
    return this.type === BreadcrumbType.SPECIAL_EVENT;
  }

  buildUrl(ref: string): string {
    return `/chapter/${this.dataService.getInstantLang()}/${ref}`;
  }
}
