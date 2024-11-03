import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
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
    return `/story/${this.dataService.lang}`
  }
}
