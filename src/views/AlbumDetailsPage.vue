<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAlbumDetails, getAlbumTracks } from '../services/spotifyAPI';
import AudioFrame from '../components/AudioFrame.vue';
import TableList from '../components/TableList.vue';
import NavigateButton from '../components/NavigateButton.vue';

const props = defineProps({ id: String });
const albumDetail = ref('');
const tracks = ref('');

await new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

onMounted(async () => {
  await getNewAlbumDetails(props.id);
});

async function getNewAlbumDetails(id) {
  try {
    albumDetail.value = await getAlbumDetails(id);
    tracks.value = await getAlbumTracks(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const date = computed(() => {
  const tempDate = new Date(albumDetail.value.release_date);
  return (
    tempDate?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }) || null
  );
});

const totalSong = computed(() => {
  if (albumDetail.value.total_tracks == 1) {
    return '1 Song';
  } else {
    return `${albumDetail.value.total_tracks} Songs`;
  }
});
</script>

<template>
  <div class="flex-col album-wrapper" v-if="albumDetail">
    <div class="wrapper">
      <div class="flex-col album-header-container">
        <div class="mrg-30">
          <NavigateButton />
        </div>
      </div>
      <div
        class="image-container"
        :style="`background-image: url(${albumDetail.images[0].url})`"
      ></div>
      <div class="header">
        <div class="flex-col">
          <h1>{{ albumDetail.name }}</h1>
          <div class="flex-row flex-wrap">
            <div
              v-for="(artist, index) in albumDetail.artists"
              :key="artist.id"
            >
              <p>
                {{ artist.name }}
                <span v-if="albumDetail.artists.length - 1 != index">
                  |&nbsp;
                </span>
              </p>
            </div>
            <p>&nbsp;&#x2022;&nbsp;</p>
            <p>{{ date }}</p>
            <p>&nbsp;&#x2022;&nbsp;</p>
            <p>{{ totalSong }}</p>
          </div>
        </div>
      </div>
    </div>
    <TableList :tracks="tracks" />
    <AudioFrame :path="albumDetail.external_urls.spotify" />
  </div>
</template>

<style scoped>
.album-wrapper {
  height: 100%;
}
.wrapper {
  position: relative;
  margin-bottom: 150px;
}

.album-header-container {
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
</style>
