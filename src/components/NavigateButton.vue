<script setup>
import router from '../router/index';

function goBack() {
  router.back();
}
</script>
<template>
  <div class="wrapper">
    <div class="flex-row gap absolute-wrapper">
      <div class="icon-wrapper flex center" @click="goBack()">
        <i class="fa fa-angle-left"></i>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}
.absolute-wrapper {
  position: absolute;
  z-index: 10;
}

.icon-wrapper {
  border-radius: 50%;
  width: 42px;
  height: 42px;
  cursor: pointer;
  align-items: center;
  background-color: transparent;
}

.icon-wrapper::before {
  z-index: -1;
  content: '';
  position: absolute;
  background: white;
  opacity: 80%;
  border: transparent;
  border-radius: 50%;
  width: 42px;
  height: 42px;
}

.icon-wrapper:hover::before {
  background: var(--purple) !important;
  opacity: 100%;
}

.gap {
  gap: 15px;
}

.fa {
  font-size: 26px;
  color: var(--purple);
  margin-left: -3px;
}

.icon-wrapper:hover .fa {
  color: var(--background);
}
</style>
