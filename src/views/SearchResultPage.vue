<script setup>
import { onMounted, watch, ref, onUpdated } from 'vue';
import {
  getSearchForItem,
  transformAlbumFromApi,
  transformFeaturedPlaylistFromApi,
} from '../services/spotifyAPI';
import AlbumCard from '../components/AlbumCard.vue';
import router from '../router/index';
import ToggleList from '../components/ToggleList.vue';

const props = defineProps({ search: String });
const searchResult = ref(null);
const searchProps = ref('');
const toggleList = ['All', 'Album', 'Playlist'];
const selectedToggle = ref('All');

onMounted(async () => {
  searchProps.value = props.search;
  await fetchSearchItem(props.search);
});

onUpdated(() => {
  searchProps.value = props.search;
});

watch(searchProps, async (newValue) => {
  if (newValue) {
    await fetchSearchItem(newValue);
  }
});

async function fetchSearchItem(search) {
  const response = await getSearchForItem(search);
  const result = {
    albums: transformAlbumFromApi(response),
    playlists: transformFeaturedPlaylistFromApi(response),
  };
  searchResult.value = result;
}

function onClickedPlaylist(playlist) {
  router.push({
    name: 'playlist',
    params: { id: playlist.id },
  });
}

function onClickedAlbum(album) {
  router.push({
    name: 'album',
    params: { id: album.id },
  });
}

function getSelectedToggle(item) {
  selectedToggle.value = item;
}
</script>
<template>
  <div
    class="flex-col"
    v-if="searchResult"
    data-aos="fade-zoom-in"
    data-aos-duration="1500"
  >
    <div class="flex-row gap">
      <h1>Search Results</h1>
      <ToggleList
        :lists="toggleList"
        @selectedToggle="getSelectedToggle($event)"
      ></ToggleList>
    </div>
    <div class="flex-col">
      <template class="grid">
        <template v-if="selectedToggle != 'Playlist'">
          <div v-for="(item, index) in searchResult.albums" v-bind:key="index">
            <AlbumCard
              :newAlbum="item"
              :expanded="true"
              :isHideSong="true"
              @click="onClickedAlbum(item)"
              :style="
                index == searchResult.length - 1 ? 'margin-right:30px' : ''
              "
            ></AlbumCard>
          </div>
        </template>
        <template v-if="selectedToggle != 'Album'">
          <div
            v-for="(item, index) in searchResult.playlists"
            v-bind:key="index"
          >
            <AlbumCard
              :newAlbum="item"
              :expanded="true"
              :isFeaturedPlaylist="true"
              :isHideName="false"
              @click="onClickedPlaylist(item)"
              :style="
                index == searchResult.length - 1 ? 'margin-right:30px' : ''
              "
            ></AlbumCard>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
<style scoped>
.flex-row {
  flex-wrap: wrap;
}

.grid {
  justify-content: center;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, 250px);
  margin-bottom: 50px;
}

h1 {
  margin: 0px;
  display: flex;
  align-items: center;
}

.gap {
  gap: 20px;
  margin: 15px 0 30px 0;
}
</style>
