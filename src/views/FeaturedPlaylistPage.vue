<script setup>
import { ref } from 'vue';
import NavigateButton from '../components/NavigateButton.vue';
import AlbumCard from '../components/AlbumCard.vue';
import { useFeaturedPlaylistStore } from '@/stores/featuredPlaylist';
import { storeToRefs } from 'pinia';
import router from '../router/index';
import ErrorMessage from '../components/ErrorMessage.vue';

const error = ref('');
const featuredPlaylist = useFeaturedPlaylistStore();
const { getAllFeaturedPlaylist } = storeToRefs(featuredPlaylist);

await new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

if (getAllFeaturedPlaylist.value.length == 0) {
  const { fetchFeaturedPlaylist } = featuredPlaylist;
  try {
    await fetchFeaturedPlaylist();
  } catch (err) {
    error.value = err;
  }
}

function onClickedPlaylist(playlist) {
  router.push({
    name: 'playlist',
    params: { id: playlist.id },
  });
}
</script>

<template>
  <div class="flex-col" v-if="!error">
    <div class="navigation-container">
      <NavigateButton />
      <h1>Featured Playlists</h1>
    </div>
    <div class="flex-col">
      <template class="grid">
        <div v-for="(item, index) in getAllFeaturedPlaylist" v-bind:key="index">
          <AlbumCard
            data-aos="zoom-in-up"
            data-aos-duration="1500"
            :newAlbum="item"
            :expanded="true"
            :isFeaturedPlaylist="true"
            :isHideName="true"
            @click="onClickedPlaylist(item)"
            :style="
              index == getAllFeaturedPlaylist.length - 1
                ? 'margin-right:30px'
                : ''
            "
          ></AlbumCard>
        </div>
      </template>
    </div>
  </div>
  <ErrorMessage :error="error" v-else />
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
  margin: 2px 0px 35px 80px;
}
</style>
