import { defineStore } from 'pinia';
import { checkingToken, getNewRelease } from '../services/spotifyAPI';

export const useNewReleaseStore = defineStore('newRelease', {
  state: () => ({
    allAlbumRelease: [],
  }),
  getters: {
    getAllAlbumRelease(state) {
      return state.allAlbumRelease;
    },
  },
  actions: {
    async fetchNewAlbumRelease() {
      await checkingToken();
      const response = await getNewRelease();
      this.allAlbumRelease = this.transformAlbum(response);
    },
    transformAlbum(albums) {
      let temp = [];
      for (let item of albums.albums.items) {
        temp.push({
          id: item.id,
          album_type: item.album_type,
          artists: item.artists,
          url: item.external_urls.spotify,
          image: item.images[0].url,
          name: item.name,
          release_date: item.release_date,
          total_tracks: item.total_tracks,
        });
      }
      return temp;
    },
  },
});
