<script setup>
import { ref, onErrorCaptured } from 'vue';
import router from '../router/index';
import NewReleaseAlbum from '../components/NewReleaseAlbum.vue';
import LazyLoadCard from '../components/LazyLoadCard.vue';
import SearchItem from '../components/SearchItem.vue';
import ErrorMessage from '../components/ErrorMessage.vue';

const error = ref('');

function getAlbum(item) {
  router.push({
    name: 'album',
    params: { id: item.id },
  });
}

onErrorCaptured((err) => {
  error.value = err;
  return true;
});
</script>
<template>
  <section class="search-container">
    <div class="flex-row space-between">
      <SearchItem></SearchItem>
    </div>
  </section>
  <Suspense>
    <div class="flex-col">
      <div class="flex-row space-between">
        <h1 class="flex topic">New Album Releases</h1>
        <div class="underline">
          <p>See All</p>
        </div>
      </div>
      <NewReleaseAlbum @selectedAlbum="getAlbum($event)" />
      <router-view></router-view>
    </div>
    <template #fallback>
      <div class="flex-row gap mrt-20" v-if="!error">
        <div v-for="item in 5" v-bind:key="item">
          <LazyLoadCard />
        </div>
      </div>
      <ErrorMessage :error="error" v-else />
    </template>
  </Suspense>
</template>

<style scoped>
.search-container {
  height: 50px;
}

.mrt-20 {
  margin-top: 20px;
}
</style>
