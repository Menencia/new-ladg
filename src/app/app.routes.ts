import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'story',
    loadComponent: () => import('./views/story/story.component').then(m => m.StoryComponent)
  },
  {
    path: 'story/part/:ref',
    loadComponent: () => import('./views/part/part.component').then(m => m.PartComponent)
  },
  {
    path: 'story/episode/:ref',
    loadComponent: () => import('./views/episode/episode.component').then(m => m.EpisodeComponent)
  },
  {
    path: '',
    redirectTo: 'story',
    pathMatch: 'full'
  }
];
