<script setup>
defineProps({ error: String });
</script>
<template>
  <div class="error-container" data-aos="fade-zoom-in" data-aos-duration="1500">
    <div class="flex-col gap">
      <h1>Connection Error</h1>
      {{ error || 'Error: 404 Not Found' }}
    </div>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  text-align: center;
  padding: 80px 50px;
  margin: 30px;
  background-color: var(--light_purple_1);
  border-radius: 10px;
}

h1 {
  margin: 0;
}
</style>
