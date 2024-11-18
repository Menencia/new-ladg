import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { BreadcrumbType } from '../../../enums/breadcrumb';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [TableModule, TranslateModule, RouterLink],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss'
})
export class EpisodesListComponent {
  @Input() data: any;

  @Input() type = BreadcrumbType.STORY;

  @Input() parentRef = '';

  constructor(private dataService: DataService) {}

  buildPath(episodeRef: string): string {
    if (this.type === BreadcrumbType.STORY) {
      return `/story/${this.dataService.getInstantLang()}/episode/${this.parentRef}-${episodeRef}`;
    }
    if (this.type === BreadcrumbType.STORY_EVENT) {
      return `/storyEvent/${this.dataService.getInstantLang()}/episode/${this.parentRef}-${episodeRef}`;
    }
    if (this.type === BreadcrumbType.SPECIAL_EVENT) {
      return `/specialEvent/${this.dataService.getInstantLang()}/episode/${this.parentRef}-${episodeRef}`;
    }
    return '';
  }
}
