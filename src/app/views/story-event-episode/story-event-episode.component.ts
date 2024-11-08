import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { YoutubePlayerComponent } from 'ngx-youtube-player';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../data.service';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { Episode } from '../../shared/interfaces/episode';
import { RefUtil } from '../../shared/utils/ref.utils';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [YoutubePlayerComponent, NavbarComponent, TranslateModule, RouterModule, ButtonModule],
  templateUrl: './story-event-episode.component.html',
  styleUrl: './story-event-episode.component.scss'
})
export class StoryEventEpisodeComponent {
  episode?: Episode;
  videoId?: string;
  episodeRef = '';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const lang = params.get('lang');
      const episodeRef = params.get('ref');
      if (lang && episodeRef) {
        this.episodeRef = episodeRef;
        this.videoId = undefined;
        const { se, episode } = RefUtil.getPartFromStoryEventEpisode(this.episodeRef);
        this.dataService.lang = lang;
        this.dataService.getStoryEvent(se).subscribe(episodes => {
          this.episode = episodes.find(e => e.ref === episode);
          if (this.episode) {
            this.videoId = this.episode.video.yt;
          }
        });
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  buildUrl(ref: string): string {
    return `/story/${this.dataService.lang}/episode/${ref}`;
  }
}
