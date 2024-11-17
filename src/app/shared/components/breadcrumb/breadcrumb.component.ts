import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  season = '';
  chapter = '';
  part = '';
  episode = '';

  constructor(private dataService: DataService) {}

  @Input()
  set ref(val: string) {
    const { S, C, P, E } = this.parseString(val);
    this.season = S;
    this.chapter = C;
    this.part = P;
    this.episode = E;
  }

  private parseString(input: string) {
    const [S, C, P, E] = input.split('-');
    return { S, C, P, E };
  }

  getStoryUrl(): string {
    return `/story/${this.dataService.getInstantLang()}`
  }
}
