<script setup>
import { ref, onMounted } from 'vue';
import { getAlbumDetails } from '../services/spotifyAPI';
import router from '../router/index';

const props = defineProps({ id: String });
const response = ref('');

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
    const res = await getAlbumDetails(id);
    response.value = res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function goBack() {
  router.back();
}
</script>
<template>
  <div class="flex-col">
    <div class="flex-row gap">
      <button @click="goBack()">back</button>
    </div>
    <h1>{{ response }}</h1>
  </div>

  <!-- <AlbumDetail></AlbumDetail> -->
</template>
