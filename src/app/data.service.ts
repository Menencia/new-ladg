import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Episode } from './shared/interfaces/episode';
import { Season } from './shared/interfaces/season';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _lang = 'en';

  constructor(public http: HttpClient) { }

  set lang(val: string) {
    this._lang = val;
  }

  get lang(): string {
    return this._lang;
  }

  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.lang}/seasons.json`);
  }

  getPart(partRef: string): Observable<Episode[]> {
    const [season, ...YParts] = partRef.split("-");
    const part = YParts.join("-");
    return this.http.get<Episode[]>(`${this.lang}/parts/season${season}/${part}.json`);
  }

  getEpisode(episodeRef: string): Observable<Episode | undefined> {
    const [season, ...rest] = episodeRef.split("-");
    const episode = rest.pop() as string;
    const part = rest.join("-");
    return this.http.get<Episode[]>(`${this.lang}/parts/season${season}/${part}.json`)
      .pipe(map(e => e.find(e => e.ref === episode)));
  }
}
