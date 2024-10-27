import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { YoutubePlayerComponent } from 'ngx-youtube-player';
import { DataService } from '../../data.service';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { Episode } from '../../shared/interfaces/episode';
import { ResultEpisode } from '../../shared/interfaces/result-episode';
import { RefUtil } from '../../shared/utils/ref.utils';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [YoutubePlayerComponent, NavbarComponent, TranslateModule, RouterModule],
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.episodeRef = params.get('ref') ?? '';
      this.videoId = undefined;
      const { part, episode } = RefUtil.getPartFromEpisode(this.episodeRef);
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
    });
  }
}
