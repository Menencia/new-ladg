import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
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

  @Input() partRef = '';

  constructor(private dataService: DataService) {}

  buildPath(episodeRef: string): string {
    return `/story/${this.dataService.getInstantLang()}/episode/${this.partRef}-${episodeRef}`;
  }
}
