import { defineStore } from 'pinia';
import { getFeaturedPlaylist, checkingToken } from '../services/spotifyAPI';

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
      await checkingToken();
      const response = await getFeaturedPlaylist();
      this.transformFeaturedPlaylist(response);
    },
    transformFeaturedPlaylist(playlists) {
      let temp = [];
      for (let playlist of playlists.playlists.items) {
        temp.push({
          id: playlist.id,
          description: playlist.description,
          url: playlist.external_urls.spotify,
          image: playlist.images[0].url,
          name: playlist.name,
        });
      }
      this.allFeaturedPlaylist = [...temp];
    },
  },
});
