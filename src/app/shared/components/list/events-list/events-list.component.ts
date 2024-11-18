import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [TableModule, TranslateModule, RouterLink],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss'
})
export class EventsListComponent {
  @Input() data: any;
  @Input() enableSpecial = false;

  constructor(private dataService: DataService) {}

  /** Builds url for SE links */
  buildStoryEventPath(ref: string): string {
    const type = !this.enableSpecial ? 'storyEvent' : 'specialEvent';
    return `/${type}/${this.dataService.getInstantLang()}/${ref}`;
  }
}
