<script setup>
defineProps({ tracks: Object });

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
</script>
<template>
  <div class="flex-col space-between table" v-if="tracks">
    <div class="table-row table-header">
      <div class="table-row-item">#</div>
      <div class="table-row-item flex-grow">Song</div>
      <div class="table-row-item">
        <i class="fa fa-clock-o" aria-hidden="true"></i>
      </div>
    </div>
    <template v-for="track in tracks.items" :key="track">
      <div class="table-row">
        <div class="table-row-item" data-header="Header2">
          {{ track.track_number }}
        </div>
        <div class="table-row-item flex-grow" data-header="Header1">
          {{ track.name }}
        </div>
        <div class="table-row-item" data-header="Header2">03:12</div>
      </div>
    </template>
  </div>
</template>
<style scoped>
.table {
  gap: 2px;
  padding-bottom: 120px;
}

.table-header {
  font-weight: 700;
}
.table-row {
  display: flex;
  flex-flow: row nowrap;
  border-radius: 5px;
}

.table-row:nth-of-type(odd) {
  background-color: transparent;
}
.table-row:nth-of-type(even)::before {
  z-index: -1;
  content: '';
  position: absolute;
  background: white;
  opacity: 15%;
  width: calc(100% - 260px);
  height: 58px;
  border-radius: 5px;
}

.table-row-item {
  display: flex;
  flex-grow: 1;
  padding: 1em;
  word-break: break-word;
  min-width: 50px;
}

.flex-grow {
  flex-grow: 100;
}

.table-header .table-row-item:last-child {
  justify-content: center;
}
</style>
