<script setup>
import NavigateButton from '../components/NavigateButton.vue';
import AlbumCard from '../components/AlbumCard.vue';
import { useNewReleaseStore } from '@/stores/newRelease';
import { storeToRefs } from 'pinia';
import router from '../router/index';

const newReleaseStore = useNewReleaseStore();
const { getAllAlbumRelease } = storeToRefs(newReleaseStore);

await new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

if (getAllAlbumRelease.value.length == 0) {
  const { fetchNewAlbumRelease } = newReleaseStore;
  await fetchNewAlbumRelease();
}

function onClickedAlbum(album) {
  router.push({
    name: 'album',
    params: { id: album.id },
  });
}
</script>

<template>
  <div class="flex-col">
    <div class="navigation-container">
      <NavigateButton />
      <h1>New Album Releases</h1>
    </div>
    <div class="flex-col">
      <template class="grid">
        <div v-for="(item, index) in getAllAlbumRelease" v-bind:key="index">
          <AlbumCard
            data-aos="zoom-in-up"
            data-aos-duration="1500"
            :newAlbum="item"
            :expanded="true"
            @click="onClickedAlbum(item)"
            :style="
              index == getAllAlbumRelease.length - 1 ? 'margin-right:30px' : ''
            "
          ></AlbumCard>
        </div>
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
  margin: 2px 0px 35px 80px;
}
</style>
