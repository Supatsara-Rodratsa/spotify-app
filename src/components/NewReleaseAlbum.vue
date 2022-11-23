<script setup>
import { ref } from 'vue';
import { getToken, getNewRelease, getArtistInfo } from '../services/spotifyAPI';
import { CONSTANTS } from '../constants/constants';
import AlbumCard from './AlbumCard.vue';
import { useNewReleaseStore } from '@/stores/newRelease';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['selectedAlbum']);

const error = ref(null);
const selectedAlbum = ref(null);
const newReleaseData = ref([]);
const artistsInfo = ref([]);

const newReleaseStore = useNewReleaseStore();
const { transformAlbum } = newReleaseStore;
const { getAllAlbumRelease } = storeToRefs(newReleaseStore);
console.log(getAllAlbumRelease, 'allAlbumRelease');
try {
  await getToken(CONSTANTS.SPOTIFY_CLIENT_ID, CONSTANTS.SPOTIFY_CLIENT_SECRET);
  const response = await getNewRelease();
  console.log(response, 'res');
  transformAlbum(response);
  // newReleaseData.value = getAllAlbumRelease;
  console.log(getAllAlbumRelease, 'allAlbumRelease');
} catch (err) {
  error.value = err;
  throw err;
}
async function transformData(albums) {
  if (albums.albums) {
    // let index = 0;
    for (let item of albums.albums.items) {
      newReleaseData.value.push({
        id: item.id,
        album_type: item.album_type,
        artists: item.artists,
        url: item.external_urls.spotify,
        image: item.images[0].url,
        name: item.name,
        release_date: item.release_date,
        total_tracks: item.total_tracks,
      });

      // if (index == 0) {
      //     showDetail(newReleaseData.value[0]);
      // }
      // index++;
    }
  }
}

async function showDetail(album) {
  try {
    selectedAlbum.value = null;
    artistsInfo.value = [];
    for (let artist of album.artists) {
      const response = await getArtistInfo(artist.id);
      if (response) {
        artistsInfo.value.push({
          id: artist.id,
          name: response.name,
          image: response.images[0].url,
        });
      }
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        selectedAlbum.value = album;
        emit('selectedAlbum', selectedAlbum.value);
      }, 500);
      resolve();
    });
  } catch (err) {
    error.value = err;
    throw err;
  }
}
</script>
<template>
  <div class="scrolling-wrapper">
    <template class="flex-row gap">
      <div v-for="(item, index) in newReleaseData" v-bind:key="index">
        <AlbumCard
          :newAlbum="item"
          @click="showDetail(item)"
          :style="index == newReleaseData.length - 1 ? 'margin-right:30px' : ''"
        ></AlbumCard>
      </div>
    </template>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding-bottom: 60px;
  margin-right: -30px;
}
Album {
  display: inline-block;
}

Album:last-child {
  margin-right: 30px;
}

.mgr-30 {
  margin-right: 30px;
}
</style>
