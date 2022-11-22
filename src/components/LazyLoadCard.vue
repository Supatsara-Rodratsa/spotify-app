<template>
  <div class="flex-col gap-10">
    <div class="card-container"></div>
    <div class="content-1"></div>
    <div class="content-2"></div>
  </div>
</template>
<style scoped>
.card-container {
  width: 250px;
  height: 150px;
  background-color: lightgray;
  border-radius: 8px;
  animation: loadingColor 1s linear infinite alternate;
}

.gap-10 {
  gap: 10px;
}

.content-1 {
  width: 200px;
  height: 10px;
  background-color: lightgray;
  animation: loadingColor 1s linear infinite alternate;
}

.content-2 {
  width: 150px;
  height: 10px;
  background-color: lightgray;
  animation: loadingColor 1s linear infinite alternate;
}
</style>
