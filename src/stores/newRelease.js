import { defineStore } from 'pinia';

export const useNewReleaseStore = defineStore('newRelease', {
  state: () => ({
    allAlbumRelease: 'Hi',
  }),
  getters: {
    getAllAlbumRelease(state) {
      console.log(state);
      return state.allAlbumRelease;
    },
  },
  actions: {
    transformAlbum(albums) {
      let temp = [];
      for (let item of albums.albums.items) {
        // console.log(item)
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
        // this.allAlbumRelease.push(temp);
      }
      console.log(temp, 'temp');
    //   this.allAlbumRelease = albums.albums.items[0].name
    },
  },
});
