<script setup>
defineProps({ error: String });
</script>
<template>
  <div class="error-container">
    Oh! Something went wrong!!<br /><br />{{ error || 'Error: 404 Not Found' }}
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  height: 200px;
}
</style>
