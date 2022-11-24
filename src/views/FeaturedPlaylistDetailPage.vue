<script setup>
import { ref, onMounted } from 'vue';
import {
  getPlayListDetails,
  getPlayListTrack,
  checkingToken,
} from '../services/spotifyAPI';
import NavigateButton from '../components/NavigateButton.vue';
import TableList from '../components/TableList.vue';
import AudioFrame from '../components/AudioFrame.vue';

const props = defineProps({ id: String });
const playlistDetail = ref('');
const tracks = ref('');

await new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

onMounted(async () => {
  await fetchPlayListDetails(props.id);
});

async function fetchPlayListDetails(id) {
  await checkingToken();
  playlistDetail.value = await getPlayListDetails(id);
  tracks.value = await getPlayListTrack(id);
}
</script>
<template>
  <div class="flex-col playlist-wrapper" v-if="playlistDetail">
    <div class="wrapper" data-aos="fade-zoom-in" data-aos-duration="1500">
      <div class="flex-col playlist-header-container">
        <div class="mrg-30">
          <NavigateButton />
        </div>
      </div>
      <div
        class="image-container"
        :style="`background-image: url(${playlistDetail.images[0].url})`"
      ></div>
      <div class="header">
        <div class="flex-col">
          <h1>{{ playlistDetail.name }}</h1>
          <div class="flex-row flex-wrap">
            <p class="description">{{ playlistDetail.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <TableList v-if="tracks" :playlists="tracks" />
    <AudioFrame :path="playlistDetail.external_urls.spotify" />
  </div>
</template>
<style scoped>
.playlist-wrapper {
  height: 100%;
}

.wrapper {
  position: relative;
  margin-bottom: 150px;
}

.playlist-header-container {
  position: relative;
  margin: -30px;
  height: 300px;
  background: linear-gradient(
    to right,
    var(--pink),
    var(--light_purple),
    var(--purple),
    var(--purple_blue),
    var(--blue)
  );
}

.image-container {
  width: 250px;
  height: 250px;
  border-radius: 8px;
  position: absolute;
  top: 100px;
  left: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.header {
  position: absolute;
  left: 330px;
  bottom: 0px;
}

h1 {
  font-weight: 700;
  font-size: 65px;
  margin: 0;
  letter-spacing: 1.5px;
  color: var(--background);
  text-transform: capitalize;
  margin-bottom: 5px;
}

.mrg-30 {
  margin: 30px;
}

.gap-10 {
  gap: 10px;
}

.description {
  color: darkslategray;
  font-size: 14px;
}
</style>
