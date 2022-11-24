<script setup>
import { ref } from 'vue';
import AlbumCard from './AlbumCard.vue';
import { useNewReleaseStore } from '@/stores/newRelease';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['selectedAlbum']);

const error = ref(null);
const newReleaseData = ref([]);

const newReleaseStore = useNewReleaseStore();
const { fetchNewAlbumRelease } = newReleaseStore;
const { getAllAlbumRelease } = storeToRefs(newReleaseStore);

try {
  await fetchNewAlbumRelease();
  newReleaseData.value = getAllAlbumRelease.value;
} catch (err) {
  error.value = err;
  throw err;
}

function getAlbum(item) {
  emit('selectedAlbum', item);
}
</script>
<template>
  <div class="scrolling-wrapper">
    <template class="flex-row gap">
      <div v-for="(item, index) in newReleaseData" v-bind:key="index">
        <AlbumCard
          :newAlbum="item"
          @click="getAlbum(item)"
          :style="index == newReleaseData.length - 1 ? 'margin-right:30px' : ''"
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
