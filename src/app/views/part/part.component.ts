import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { DataService } from '../../data.service';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { Episode } from '../../shared/interfaces/episode';
import { ResultPart } from '../../shared/interfaces/result-part';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [RouterModule, TableModule, NavbarComponent, TranslateModule],
  templateUrl: './part.component.html',
  styleUrl: './part.component.scss'
})
export class PartComponent {
  episodes: Episode[] = [];
  partRef = '';
  previousPart?: ResultPart;
  nextPart?: ResultPart;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.partRef = params.get('ref') ?? '';
      this.dataService.getPart(this.partRef).subscribe(result => this.episodes = result?.episodes ?? []);
      this.dataService.getPreviousPart(this.partRef).subscribe(result => this.previousPart = result);
      this.dataService.getNextPart(this.partRef).subscribe(result => this.nextPart = result);
    });
  }

  buildPath(episodeRef: string): string {
    return `/story/episode/${this.partRef}-${episodeRef}`;
  }
}
