import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { YoutubePlayerComponent } from 'ngx-youtube-player';
import { DataService } from '../../data.service';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { Episode } from '../../shared/interfaces/episode';
import { ResultEpisode } from '../../shared/interfaces/result-episode';

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

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.episodeRef = params.get('ref') ?? '';
      this.videoId = undefined;
      this.dataService.getEpisode(this.episodeRef).subscribe(episode => {
        this.episode = episode;
        if (this.episode) {
          this.videoId = this.episode.video.yt;
        }
      });
      this.dataService.getPreviousEpisode(this.episodeRef).subscribe(episode => this.previousEpisode = episode);
    });
  }
}
