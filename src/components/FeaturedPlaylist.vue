<script setup>
import { onMounted } from 'vue';
import { useFeaturedPlaylistStore } from '@/stores/featuredPlaylist';
import { storeToRefs } from 'pinia';
import AlbumCard from './AlbumCard.vue';

const emit = defineEmits(['selectedPlaylist']);
const featuredPlaylistStore = useFeaturedPlaylistStore();
const { fetchFeaturedPlaylist } = featuredPlaylistStore;
const { getAllFeaturedPlaylist } = storeToRefs(featuredPlaylistStore);

onMounted(async () => await fetchFeaturedPlaylist());

if (getAllFeaturedPlaylist.value.length == 0) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

function getPlaylist(playlist) {
  emit('selectedPlaylist', playlist);
}
</script>
<template>
  <div class="scrolling-wrapper">
    <template class="flex-row gap">
      <div v-for="(item, index) in getAllFeaturedPlaylist" v-bind:key="index">
        <AlbumCard
          data-aos="fade-up"
          data-aos-duration="2000"
          :newAlbum="item"
          @click="getPlaylist(item)"
          :isFeaturedPlaylist="true"
          :isHideName="true"
          :style="
            index == getAllFeaturedPlaylist.length - 1
              ? 'margin-right:30px'
              : ''
          "
        ></AlbumCard>
      </div>
    </template>
  </div>
</template>
<style scoped>
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
