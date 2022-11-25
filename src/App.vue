<script setup>
import { ref, onErrorCaptured } from 'vue';
import LoadingItem from './components/LoadingItem.vue';
import ErrorMessage from './components/ErrorMessage.vue';

const error = ref('');

onErrorCaptured((err) => {
  error.value = err;
  return true;
});
</script>

<template>
  <div class="flex-row app-container">
    <header class="flex-col">
      <div class="flex-row icon router-container">
        <img src="./assets/icons/homePage.png" alt="home" />
        <router-link :to="{ name: 'main' }">Home</router-link>
      </div>
      <div class="flex-row icon router-container">
        <img src="./assets/icons/album.png" alt="album" />
        <router-link to="/new-release">Albums</router-link>
      </div>
      <div class="flex-row icon router-container">
        <img src="./assets/icons/playlist.png" alt="playlist" />
        <router-link to="/featured-playlists">Playlists</router-link>
      </div>
    </header>
    <main>
      <div class="content" v-if="!error">
        <router-view v-slot="{ Component }">
          <suspense timeout="0">
            <component :is="Component" />
            <template #fallback>
              <LoadingItem />
            </template>
          </suspense>
        </router-view>
      </div>
      <ErrorMessage :error="error" v-else />
    </main>
  </div>
</template>
<style scoped>
header {
  width: 200px;
  margin: 0;
  gap: 10px;
  padding-top: 100px !important;
  background: linear-gradient(
    to right top,
    var(--blue),
    var(--purple_blue),
    var(--purple),
    var(--light_purple),
    var(--pink)
  );
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
}

.content {
  height: 90%;
}
.app-container {
  height: 100%;
}

.router-container {
  position: relative;
  padding-bottom: 10px;
}

.router-container:hover::before {
  z-index: -1;
  content: '';
  position: absolute;
  background: white;
  opacity: 15%;
  width: 100%;
  height: 100%;
  margin-left: -30px;
}

main {
  width: calc(100% - 200px);
  margin-left: 200px;
}

.content {
  z-index: 9;
  padding: 30px;
}

.icon {
  gap: 10px;
  align-items: center;
  color: white;
  padding: 10px 30px;
}

img {
  width: 24px;
  height: 24px;
}
</style>
