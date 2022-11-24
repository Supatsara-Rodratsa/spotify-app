import { defineStore } from 'pinia';
import {
  getFeaturedPlaylist,
  checkingToken,
  transformFeaturedPlaylistFromApi,
} from '../services/spotifyAPI';

export const useFeaturedPlaylistStore = defineStore('featuredPlaylist', {
  state: () => ({
    allFeaturedPlaylist: [],
  }),
  getters: {
    getAllFeaturedPlaylist(state) {
      return state.allFeaturedPlaylist;
    },
  },
  actions: {
    async fetchFeaturedPlaylist() {
      if (this.allFeaturedPlaylist.length == 0) {
        await checkingToken();
        const response = await getFeaturedPlaylist();
        this.allFeaturedPlaylist = transformFeaturedPlaylistFromApi(response);
      }
    },
  },
});
