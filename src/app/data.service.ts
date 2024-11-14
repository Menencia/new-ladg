import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Episode } from './shared/interfaces/episode';
import { Part } from './shared/interfaces/part';
import { ResultEpisode } from './shared/interfaces/result-episode';
import { ResultPart } from './shared/interfaces/result-part';
import { Season } from './shared/interfaces/season';
import { StoryEvent } from './shared/interfaces/story-event';
import { RefUtil } from './shared/utils/ref.utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  seasons: Season[] = [];

  storyEvents: StoryEvent[] = [];

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

  getSeasonsPart(partRef: string): Observable<Part | undefined> {
    const [seasonRef, ...rest] = partRef.split("-");
    const onlyPartRef = rest.join('-');
    return this.http.get<Season[]>(`${this.lang}/seasons.json`)
      .pipe(map(seasons => {
        const season = seasons.find(season => season.ref === seasonRef);
        if (season) {
          return season.parts.find(part => part.ref === onlyPartRef);
        }
        return undefined;
      }));
  }

  getStoryEvents(): Observable<StoryEvent[]> {
    return this.http.get<StoryEvent[]>(`${this.lang}/se.json`)
      .pipe(map(storyEvents => this.storyEvents = storyEvents));
  }

  getStoryEvent(seRef: string): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.lang}/se/${seRef}.json`);
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

  getNextPart(partRef: string): Observable<ResultPart | undefined> {
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
        return index + 1 < parts.length ? this.getPart(parts[index + 1].ref) : of(undefined);
      })
    )
  }

  getPreviousEpisode(episodeRef: string, resultPart: ResultPart): Observable<ResultEpisode | undefined> {
    const { part: X, episode: Y } = RefUtil.getPartFromEpisode(episodeRef);
    if (parseInt(Y) > 1) {
      const previousEpisode = (parseInt(Y) - 1);
      const episode = resultPart.episodes[previousEpisode - 1];
      return of({ ref: X + '-' + previousEpisode, episode });
    } else {
      return this.getPreviousPart(X).pipe(
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

  getNextEpisode(episodeRef: string, resultPart: ResultPart): Observable<ResultEpisode | undefined> {
    const { part: X, episode: Y } = RefUtil.getPartFromEpisode(episodeRef);
    if (parseInt(Y) < resultPart.episodes.length) {
      const nextEpisode = (parseInt(Y) + 1);
      const episode = resultPart.episodes[ nextEpisode - 1 ];
      return of({ ref: X + '-' + nextEpisode, episode });
    } else {
      return this.getNextPart(X).pipe(
        map(result => {
          if (result) {
            const episode = result.episodes[0];
            return { ref: result.ref + '-' + episode.ref, episode };
          } else {
            return undefined;
          }
        })
      )
    }
  }
}
