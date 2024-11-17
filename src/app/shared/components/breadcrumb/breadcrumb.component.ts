import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbScope, BreadcrumbType } from '../../enums/breadcrumb';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() ref = '';

  @Input() type = BreadcrumbType.STORY;

  @Input() scope = BreadcrumbScope.PART;

  constructor(private dataService: DataService) {}

  getStoryUrl(): string {
    return `/story/${this.dataService.getInstantLang()}`
  }

  buildChapterUrl(): string {
    if (this.type === BreadcrumbType.STORY) {
      const chapterRef = this.ref.split('-').slice(0, -1).join('-');
      return `/story/${this.dataService.getInstantLang()}/${chapterRef}`;
    }
    return '';
  }

  buildChapterLabel(): string {
    return this.ref.split('-').slice(0, -1).join('-');
  }
}
