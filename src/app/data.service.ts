import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Episode } from './shared/interfaces/episode';
import { ResultEpisode } from './shared/interfaces/result-episode';
import { ResultPart } from './shared/interfaces/result-part';
import { Season } from './shared/interfaces/season';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  seasons: Season[] = [];

  private _lang = 'en';

  constructor(public http: HttpClient) { }

  set lang(val: string) {
    this._lang = val;
  }

  get lang(): string {
    return this._lang;
  }

  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.lang}/seasons.json`)
      .pipe(map(seasons => this.seasons = seasons));
  }

  getPart(partRef: string): Observable<ResultPart | undefined> {
    const [season, ...YParts] = partRef.split("-");
    const part = YParts.join("-");
    return this.http.get<Episode[]>(`${this.lang}/parts/season${season}/${part}.json`)
      .pipe(
        map(episodes => {
          return { ref: partRef, episodes };
        }),
        catchError(() => of(undefined))
      );
  }

  getEpisode(episodeRef: string): Observable<Episode | undefined> {
    const [season, ...rest] = episodeRef.split("-");
    const episode = rest.pop() as string;
    const part = rest.join("-");
    return this.http.get<Episode[]>(`${this.lang}/parts/season${season}/${part}.json`)
      .pipe(
        map(e => e.find(e => e.ref === episode)),
        catchError(() => of(undefined))
      );
  }

  getPreviousPart(partRef: string): Observable<ResultPart | undefined> {
    const seasons$ = (this.seasons.length === 0) ? this.getSeasons() : of(this.seasons);
    return seasons$.pipe(
      switchMap(seasons => {
        const parts = seasons.flatMap(season =>
          season.parts.map(part => ({
            ...part,
            ref: `${season.ref}-${part.ref}`
          }))
        );
        const index = parts.findIndex(item => item.ref === partRef);
        return index > 0 ? this.getPart(parts[index - 1].ref) : of(undefined);
      })
    )
  }

  getPreviousEpisode(episodeRef: string): Observable<ResultEpisode | undefined> {
    const x = this.splitXY(episodeRef);
    if (parseInt(x.Y) > 1) {
      const previousEpisode = (parseInt(x.Y) - 1);
      return this.getEpisode(x.X + '-' + previousEpisode)
        .pipe(
          map(episode => {
            if (episode) {
              return { ref: x.X + '-' + previousEpisode, episode };
            } else {
              return undefined;
            }
          })
        );
    } else {
      return this.getPreviousPart(x.X).pipe(
        map(result => {
          if (result) {
            const episode = result.episodes?.slice(-1)[0];
            return { ref: result.ref + '-' + episode.ref, episode };
          } else {
            return undefined;
          }
        })
      )
    }
  }

  private splitXY(input: string): { X: string, Y: string } {
    const lastIndex = input.lastIndexOf('-');
    if (lastIndex === -1) return { X: input, Y: '' }; // Case where there's no hyphen
    const X = input.slice(0, lastIndex);
    const Y = input.slice(lastIndex + 1);
    return { X, Y };
  }
}
