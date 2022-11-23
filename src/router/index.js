import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import AlbumDetailsPage from '../views/AlbumDetailsPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import NewReleasePage from '../views/NewReleasePage.vue';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
  },
  // {
  //     path: '/about',
  //     name: 'about',
  //     component: AboutPage,
  //     children: [
  //         {
  //             path: '/about/me',
  //             name: 'about-me',
  //             component: AboutMe,
  //         },
  //         {
  //             path: 'my-projects',
  //             name: 'my-projects',
  //             component: AboutProject
  //         }
  //     ]
  // },
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
