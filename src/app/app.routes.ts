import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'story/:lang',
    loadComponent: () => import('./views/story/story.component').then(m => m.StoryComponent)
  },
  {
    path: ':type/:lang/:ref',
    loadComponent: () => import('./views/part/part.component').then(m => m.PartComponent)
  },
  {
    path: ':type/:lang/episode/:ref',
    loadComponent: () => import('./views/episode/episode.component').then(m => m.EpisodeComponent)
  },
  // {
  //   path: 'storyEvent/:lang/:ref',
  //   loadComponent: () => import('./views/story-event/story-event.component').then(m => m.StoryEventComponent)
  // },
  // {
  //   path: 'storyEvent/:lang/episode/:ref',
  //   loadComponent: () => import('./views/story-event-episode/story-event-episode.component')
  //     .then(m => m.StoryEventEpisodeComponent)
  // },
  {
    path: 'settings',
    loadComponent: () => import('./views/settings/settings.component')
      .then(m => m.SettingsComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/home' }
];
