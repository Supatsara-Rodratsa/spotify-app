<script setup>
import { ref, onErrorCaptured } from 'vue';
import router from '../router/index';
import NewReleaseAlbum from '../components/NewReleaseAlbum.vue';
import LazyLoadCard from '../components/LazyLoadCard.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import FeaturedPlaylist from '../components/FeaturedPlaylist.vue';

const error = ref('');

function getAlbum(item) {
  router.push({
    name: 'album',
    params: { id: item.id },
  });
}

function getSelectedPlaylist(item) {
  router.push({
    name: 'playlist',
    params: { id: item.id },
  });
}

onErrorCaptured((err) => {
  error.value = err;
  return true;
});

function goNext(name) {
  router.push({
    name: name,
  });
}
</script>
<template>
  <div class="flex-col">
    <Suspense>
      <div class="flex-col">
        <div class="flex-row space-between">
          <h1 class="flex topic">New Album Releases</h1>
          <div class="underline" @click="goNext('newRelease')">
            <p>See All</p>
          </div>
        </div>
        <NewReleaseAlbum @selectedAlbum="getAlbum($event)" />
      </div>
      <template #fallback>
        <div class="flex-row gap mrt-20" v-if="!error">
          <div v-for="item in 4" v-bind:key="item">
            <LazyLoadCard />
          </div>
        </div>
        <ErrorMessage :error="error" v-else />
      </template>
    </Suspense>
    <Suspense>
      <div class="flex-col">
        <div class="flex-row space-between">
          <h1 class="flex topic">Featured Playlists</h1>
          <div class="underline" @click="goNext('featuredPlaylists')">
            <p>See All</p>
          </div>
        </div>
        <FeaturedPlaylist @selectedPlaylist="getSelectedPlaylist($event)" />
      </div>
      <template #fallback>
        <div class="flex-row gap mrt-20" v-if="!error">
          <div v-for="item in 4" v-bind:key="item">
            <LazyLoadCard />
          </div>
        </div>
        <ErrorMessage :error="error" v-else />
      </template>
    </Suspense>
  </div>
</template>
<style scoped>
.mrt-20 {
  margin-top: 20px;
}
</style>
