import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import AlbumDetailsPage from '../views/AlbumDetailsPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import NewReleasePage from '../views/NewReleasePage.vue';
import FeaturedPlaylistPage from '../views/FeaturedPlaylistPage.vue';
import FeaturedPlaylistDetailPage from '../views/FeaturedPlaylistDetailPage.vue';
import DefaultPage from '../views/DefaultPage.vue';
import SearchResultPage from '../views/SearchResultPage.vue';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
    children: [
      {
        path: '',
        name: 'main',
        component: DefaultPage,
      },
      {
        path: '/search/:search',
        name: 'search-result',
        component: SearchResultPage,
        props: true,
        deep: true,
      },
    ],
  },
  {
    path: '/album/:id',
    name: 'album',
    component: AlbumDetailsPage,
    props: true,
  },
  {
    path: '/new-release',
    name: 'newRelease',
    component: NewReleasePage,
  },
  {
    path: '/featured-playlists',
    name: 'featuredPlaylists',
    component: FeaturedPlaylistPage,
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: FeaturedPlaylistDetailPage,
    props: true,
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notFound',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
