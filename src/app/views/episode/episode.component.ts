import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { YoutubePlayerComponent } from 'ngx-youtube-player';
import { DataService } from '../../data.service';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { Episode } from '../../shared/interfaces/episode';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [YoutubePlayerComponent, NavbarComponent, TranslateModule],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss'
})
export class EpisodeComponent {
  episode?: Episode;
  episodeRef = '';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.episodeRef = params.get('ref') ?? '';
      this.dataService.getEpisode(this.episodeRef).subscribe(episode => this.episode = episode);
    });
  }

}
