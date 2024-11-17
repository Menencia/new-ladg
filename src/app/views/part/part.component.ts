import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { EpisodesListComponent } from '../../shared/components/list/episodes-list/episodes-list.component';
import { Episode } from '../../shared/interfaces/episode';
import { Part } from '../../shared/interfaces/part';
import { ResultPart } from '../../shared/interfaces/result-part';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [RouterModule, EpisodesListComponent, BreadcrumbComponent, TranslateModule, ButtonModule],
  templateUrl: './part.component.html',
  styleUrl: './part.component.scss'
})
export class PartComponent {
  episodes: Episode[] = [];
  partRef = '';
  part?: Part;
  previousPart?: ResultPart;
  nextPart?: ResultPart;

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
        this.partRef = partRef;
        this.dataService.setLang(lang);
        this.dataService.getSeasonsPart(this.partRef).subscribe(part => this.part = part);
        this.dataService.getPart(this.partRef).subscribe(result => this.episodes = result?.episodes ?? []);
        this.dataService.getPreviousPart(this.partRef).subscribe(result => this.previousPart = result);
        this.dataService.getNextPart(this.partRef).subscribe(result => this.nextPart = result);
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  buildUrl(ref: string): string {
    return `/story/${this.dataService.getInstantLang()}/part/${ref}`;
  }
}
