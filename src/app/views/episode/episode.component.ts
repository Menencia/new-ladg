import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { YoutubePlayerComponent } from 'ngx-youtube-player';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { Episode } from '../../shared/interfaces/episode';
import { ResultEpisode } from '../../shared/interfaces/result-episode';
import { DataService } from '../../shared/services/data.service';
import { RefUtil } from '../../shared/utils/ref.utils';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [YoutubePlayerComponent, BreadcrumbComponent, TranslateModule, RouterModule, ButtonModule],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss'
})
export class EpisodeComponent {
  episode?: Episode;
  videoId?: string;
  episodeRef = '';
  previousEpisode?: ResultEpisode;
  nextEpisode?: ResultEpisode;

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
        const { part, episode } = RefUtil.getPartFromEpisode(this.episodeRef);
        this.dataService.setLang(lang);
        this.dataService.getPart(part).subscribe(result => {
          if (result) {
            this.episode = result.episodes.find(e => e.ref === episode);
            if (this.episode) {
              this.dataService.getPreviousEpisode(this.episodeRef, result).subscribe(episode => this.previousEpisode = episode);
              this.dataService.getNextEpisode(this.episodeRef, result).subscribe(episode => this.nextEpisode = episode);
              this.videoId = this.episode.video.yt;
            }
          }
        });
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  buildUrl(ref: string): string {
    return `/story/${this.dataService.getInstantLang()}/episode/${ref}`;
  }
}
