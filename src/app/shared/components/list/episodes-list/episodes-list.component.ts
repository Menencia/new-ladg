import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { DataService } from '../../../services/data.service';

export enum EpisodeType {
  CHAPTER = 'chapter',
  STORY_EVENT = 'storyEvent'
}

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [TableModule, TranslateModule, RouterLink],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss'
})
export class EpisodesListComponent {
  @Input() data: any;

  @Input() type = EpisodeType.CHAPTER;

  @Input() parentRef = '';

  constructor(private dataService: DataService) {}

  buildPath(episodeRef: string): string {
    if (this.type === EpisodeType.CHAPTER) {
      return `/story/${this.dataService.getInstantLang()}/episode/${this.parentRef}-${episodeRef}`;
    }
    if (this.type === EpisodeType.STORY_EVENT) {
      return `/storyEvent/${this.dataService.getInstantLang()}/episode/${this.parentRef}-${episodeRef}`;
    }
    return '';
  }
}
