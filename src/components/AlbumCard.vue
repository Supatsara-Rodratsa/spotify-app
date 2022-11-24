<script setup>
import { computed } from 'vue';

const props = defineProps({
  newAlbum: Object,
  expanded: Boolean,
  isFeaturedPlaylist: Boolean,
});

const totalSong = computed(() => {
  if (!props.newAlbum.total_tracks) {
    return;
  }

  if (props.newAlbum.total_tracks == 1) {
    return '1 Song';
  } else {
    return `${props.newAlbum.total_tracks} Songs`;
  }
});
</script>
<template>
  <div
    class="card-container"
    :class="expanded ? 'expand' : ''"
    :style="`background-image: url(${newAlbum.image})`"
  >
    <div class="content-bg flex-col from-bottom">
      <div class="pad-20 gap-5 flex-col algin-start">
        <div class="header title" :class="{ hide: isFeaturedPlaylist }">
          {{ newAlbum.name }}
        </div>
        <div class="description">{{ totalSong || '' }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card-container {
  width: 200px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  cursor: pointer;
}

.expand {
  width: 250px !important;
  height: 250px !important;
}

.content-bg:hover {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(128, 0, 128, 1));
}

.content-bg {
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6));
  color: white;
  border-radius: 8px;
}

.pad-20 {
  padding: 20px;
}

.gap-5 {
  gap: 5px;
}

.algin-start {
  align-items: start;
}

.title {
  width: 100%;
  max-height: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.card-container .hide {
  display: none;
}

.card-container:hover .hide {
  display: block !important;
}
</style>
