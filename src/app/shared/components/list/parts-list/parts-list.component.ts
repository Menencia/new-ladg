import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-parts-list',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './parts-list.component.html',
  styleUrl: './parts-list.component.scss'
})
export class PartsListComponent {
  @Input() data: any;

  @Input() seasonRef = '';

  constructor(private dataService: DataService) {}

  /** Builds url for season links */
  buildPath(seasonRef: string, partRef: string): string {
    return `/story/${this.dataService.getInstantLang()}/${seasonRef}-${partRef}`;
  }
}
