import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DataService } from '../../data.service';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { Episode } from '../../shared/interfaces/episode';
import { Part } from '../../shared/interfaces/part';
import { ResultPart } from '../../shared/interfaces/result-part';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [RouterModule, TableModule, BreadcrumbComponent, TranslateModule, ButtonModule],
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
        this.dataService.lang = lang;
        this.dataService.getSeasonsPart(this.partRef).subscribe(part => this.part = part);
        this.dataService.getPart(this.partRef).subscribe(result => this.episodes = result?.episodes ?? []);
        this.dataService.getPreviousPart(this.partRef).subscribe(result => this.previousPart = result);
        this.dataService.getNextPart(this.partRef).subscribe(result => this.nextPart = result);
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  buildPath(episodeRef: string): string {
    return `/story/${this.dataService.lang}/episode/${this.partRef}-${episodeRef}`;
  }

  buildUrl(ref: string): string {
    return `/story/${this.dataService.lang}/part/${ref}`;
  }
}
