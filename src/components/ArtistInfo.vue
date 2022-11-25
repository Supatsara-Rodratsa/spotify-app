<script setup>
defineProps({ img: String, name: String, follower: Number });
</script>
<template>
  <div
    class="flex-col center gap"
    data-aos="fade-zoom-in"
    data-aos-duration="1500"
  >
    <div class="flex-row gap center">
      <img :src="img" alt="Avatar" />
      <div class="flex-col gap-10">
        <div class="contents">{{ name || '' }}</div>
        <div class="contents">{{ follower.toLocaleString() }} followers</div>
      </div>
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

.gap-10 {
  gap: 10px;
}
</style>
