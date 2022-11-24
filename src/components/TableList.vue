<script setup>
import { ref } from 'vue';
import { CONSTANTS } from '../constants/constants';
import router from '../router/index';

const props = defineProps({ tracks: Object, playlists: Object });
const PROPERTY = CONSTANTS.PROPERTY;
const tracksRef = ref(props.tracks);
const playlistsRef = ref(props.playlists);

const sortName = ref(false);
const sortAlbum = ref(false);
const sortDate = ref(false);
const sortByNameKey = [PROPERTY.NAME, PROPERTY.TRACK, PROPERTY.ALBUM];

function calculateDurationTime(time) {
  let minutes = Math.floor(time / 60000);
  let seconds = ((time % 60000) / 1000).toFixed(0);
  return (
    (minutes < 10 ? '0' : '') +
    minutes +
    ':' +
    (seconds < 10 ? '0' : '') +
    seconds
  );
}

function formatDate(date) {
  let options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-ZA', options);
}

function sorting(item) {
  if (sortByNameKey.includes(item)) {
    if (item == PROPERTY.ALBUM) {
      sortAlbum.value = !sortAlbum.value;
    } else {
      sortName.value = !sortName.value;
    }
  } else {
    sortDate.value = !sortDate.value;
  }

  const sort = tracksRef.value ? tracksRef : playlistsRef;
  sort.value.items.sort((item1, item2) => sortByKey(item1, item2, item));
}

function sortByKey(item1, item2, key) {
  const property1 =
    playlistsRef.value && sortByNameKey.includes(key)
      ? key == PROPERTY.ALBUM
        ? item1.track[key][PROPERTY.NAME]
        : item1[key][PROPERTY.NAME]
      : key == PROPERTY.DATE_ADDED
      ? new Date(item1[key])
      : item1[key];
  const property2 =
    playlistsRef.value && sortByNameKey.includes(key)
      ? key == PROPERTY.ALBUM
        ? item2.track[key][PROPERTY.NAME]
        : item2[key][PROPERTY.NAME]
      : key == PROPERTY.DATE_ADDED
      ? new Date(item2[key])
      : item2[key];
  const sort =
    key == PROPERTY.NAME || key == PROPERTY.TRACK
      ? sortName.value
      : key == PROPERTY.ALBUM
      ? sortAlbum.value
      : sortDate.value;
  if (property1 < property2) {
    return sort ? -1 : 1;
  }
  if (property1 > property2) {
    return sort ? 1 : -1;
  }
  return 0;
}

function goToAlbum(id) {
  router.push({
    name: 'album',
    params: { id: id },
  });
}
</script>

<template>
  <div class="flex-col space-between table width-tracks" v-if="tracksRef">
    <div class="table-row table-header">
      <div class="table-row-item flex-grow-1">#</div>
      <div class="table-row-item flex-grow">
        <div class="flex-row gap-10 center">
          <div>Song</div>
          <i
            class="fa fa-caret-down"
            @click="sorting(PROPERTY.NAME)"
            :class="sortName == true ? 'sorting' : 'un-sorting'"
          ></i>
        </div>
      </div>
      <div class="table-row-item flex-grow-1">
        <i class="fa fa-clock-o"></i>
      </div>
    </div>
    <template v-for="(track, index) in tracksRef.items" :key="index">
      <div class="table-row">
        <div class="table-row-item flex-grow-1">
          {{ index + 1 }}
        </div>
        <div class="table-row-item flex-grow">
          {{ track.name }}
        </div>
        <div class="table-row-item flex-grow-1">
          {{ calculateDurationTime(track.duration_ms) }}
        </div>
      </div>
    </template>
  </div>
  <div class="flex-col space-between table" v-if="playlistsRef">
    <div class="table-row table-header">
      <div class="table-row-item width-id">#</div>
      <div class="table-row-item width-song">
        <div class="flex-row gap-10 center">
          <div>Song</div>
          <i
            class="fa fa-caret-down"
            @click="sorting(PROPERTY.TRACK)"
            :class="sortName == true ? 'sorting' : 'un-sorting'"
          ></i>
        </div>
      </div>
      <div class="table-row-item width-album">
        <div class="flex-row gap-10 center">
          <div>Album</div>
          <i
            class="fa fa-caret-down"
            @click="sorting(PROPERTY.ALBUM)"
            :class="sortAlbum == true ? 'sorting' : 'un-sorting'"
          ></i>
        </div>
      </div>
      <div class="table-row-item width-date">
        <div class="flex-row gap-10 center">
          <div>Date Added</div>
          <i
            class="fa fa-caret-down"
            @click="sorting(PROPERTY.DATE_ADDED)"
            :class="sortDate == true ? 'sorting' : 'un-sorting'"
          ></i>
        </div>
      </div>
      <div class="table-row-item">
        <i class="fa fa-clock-o"></i>
      </div>
    </div>
    <template v-for="(playlist, index) in playlistsRef.items" :key="playlist">
      <div class="table-row">
        <div class="table-row-item width-id">
          {{ index + 1 }}
        </div>
        <div class="table-row-item width-song">
          <div class="flex-row gap">
            <img :src="playlist.track.album.images[1].url" alt="album-image" />
            <div class="flex-col">
              <p>{{ playlist.track.name }}</p>
              <p class="name">{{ playlist.track.artists[0].name }}</p>
            </div>
          </div>
        </div>
        <div class="table-row-item width-album">
          <div class="album-name" @click="goToAlbum(playlist.track.album.id)">
            {{ playlist.track.album.name }}
          </div>
        </div>
        <div class="table-row-item width-date">
          {{ formatDate(playlist.added_at) }}
        </div>
        <div class="table-row-item">
          {{ calculateDurationTime(playlist.track.duration_ms) }}
        </div>
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
  align-items: center;
}

.table-row:nth-of-type(odd) {
  background-color: transparent;
}

.table-row:nth-of-type(even) {
  background: linear-gradient(
    to right,
    var(--light_purple_1),
    var(--light_purple_2)
  );
}

.table-row-item {
  display: flex;
  padding: 1em;
  word-break: break-word;
  min-width: 50px;
}

.table-header .table-row-item:last-child {
  justify-content: center;
}

.width-id {
  width: 5%;
}

.width-song {
  width: 40%;
}

.width-album {
  width: 30%;
}

.width-date {
  width: 30%;
}

.flex-grow {
  flex-grow: 100;
}

.flex-grow-1 {
  flex-grow: 1 !important;
}

.name {
  font-size: 14px;
  color: darkslategray;
  margin: 5px 0;
  text-transform: capitalize;
}

.image-container {
  width: 100%;
  height: 100%;
}

.width-tracks {
  width: 75%;
}

img {
  border-radius: 2px;
  width: 50px;
  height: 50px;
}

.gap-10 {
  gap: 10px;
}

.center {
  align-items: center;
}

.fa-caret-down {
  cursor: pointer;
}

.sorting {
  transform: rotate(180deg);
  transition: transform 0.5s ease-in-out;
}

.un-sorting {
  transform: rotate(360deg);
  transition: transform 0.5s ease-in-out;
}

.album-name:hover {
  text-decoration: underline;
  color: purple;
  cursor: pointer;
}
</style>
