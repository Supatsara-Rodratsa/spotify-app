import { defineStore } from 'pinia';
import {
  checkingToken,
  getNewRelease,
  transformAlbumFromApi,
} from '../services/spotifyAPI';

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
      if (this.allAlbumRelease.length == 0) {
        await checkingToken();
        const response = await getNewRelease();
        this.allAlbumRelease = transformAlbumFromApi(response);
      }
    },
  },
});
