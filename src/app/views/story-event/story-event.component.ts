import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Episode } from '../../shared/interfaces/episode';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-story-event',
  standalone: true,
  imports: [RouterModule, TableModule, TranslateModule, ButtonModule],
  templateUrl: './story-event.component.html',
  styleUrl: './story-event.component.scss'
})
export class StoryEventComponent {
  episodes: Episode[] = [];
  seRef = '';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const lang = params.get('lang');
      const partRef = params.get('ref');
      if (lang && partRef) {
        this.seRef = partRef;
        this.dataService.setLang(lang);
        this.dataService.getStoryEvent(this.seRef).subscribe(episodes => this.episodes = episodes);
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  buildPath(episodeRef: string): string {
    return `/storyEvent/${this.dataService.getInstantLang()}/episode/${this.seRef}-${episodeRef}`;
  }
}
