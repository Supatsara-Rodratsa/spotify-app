<script setup>
import { computed } from 'vue';
const props = defineProps({ path: String, isAlbum: Boolean });

const transformEmbed = computed(() => {
  const position = props.path.lastIndexOf(props.isAlbum ? 'album' : 'playlist');
  return (
    props.path.substring(0, position) +
    'embed/' +
    props.path.substring(position) +
    '?utm_source=generator'
  );
});
</script>

<template>
  <div id="track">
    <div class="container">
      <iframe
        class="frame"
        :src="transformEmbed"
        allow="encrypted-media;autoplay; fullscreen"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
#track {
  position: fixed;
  bottom: 0;
  width: -webkit-fill-available;
  margin-left: -30px;
}
.container {
  left: 0;
  width: 100%;
  height: 100%;
  position: relative;
}

.frame {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  position: absolute;
  border: 0;
}

::ng-deep .as {
  background: red !important;
}

.am {
  background: beige !important;
}
</style>
