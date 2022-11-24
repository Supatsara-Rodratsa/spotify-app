<script setup>
defineProps({ img: String, name: String });
</script>
<template>
  <div
    class="flex-col center gap"
    data-aos="fade-zoom-in"
    data-aos-duration="1500"
  >
    <div class="flex-row gap center">
      <img :src="img" alt="Avatar" />
      <div class="contents">{{ name || '' }}</div>
    </div>
  </div>
</template>
<style scoped>
img {
  border-radius: 50%;
  width: 75px;
  height: 75px;
}

.center {
  align-items: center;
  justify-content: center;
}

.contents {
  font-size: 16px;
}

.flex-row {
  align-self: flex-start;
}
</style>
