<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ placeholder: String, currentValue: String });
const search = ref(props.currentValue || '');
const emit = defineEmits(['onSearchItem']);

function onSearch(value) {
  emit('onSearchItem', value);
}

watch(search, (newSearch) => {
  onSearch(newSearch);
});
</script>

<template>
  <div class="search-container">
    <div class="icon-container">
      <i class="fa fa-search"></i>
    </div>
    <input
      v-on:keyup.enter="onSearch(search)"
      type="text"
      :placeholder="placeholder || 'Search..'"
      v-model="search"
    />
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  width: 400px;
}

.search-container:before {
  z-index: -1;
  content: '';
  position: absolute;
  background: white;
  opacity: 30%;
  width: 100%;
  border: transparent;
  border-radius: 20px;
  height: 40px;
}

input {
  padding: 10px 38px;
  border: transparent;
  border-radius: 20px;
  width: 320px;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  background-color: transparent;
  color: white;
}

input:focus {
  outline: none;
}

.icon-container {
  position: absolute;
  top: 7px;
  left: 15px;
}

.fa {
  color: var(--purple);
}
</style>
