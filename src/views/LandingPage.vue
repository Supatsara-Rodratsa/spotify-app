<script setup>
import { ref } from 'vue';
import router from '../router/index';
import SearchItem from '../components/SearchItem.vue';

const currentSearch = ref('');
await new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

function searchItem(search) {
  if (search != '') {
    router.push({
      name: 'search-result',
      params: { search: search },
    });
  } else {
    router.push({
      name: 'main',
    });
  }
}
</script>
<template>
  <section class="search-container">
    <div class="flex-row space-between">
      <SearchItem
        :currentValue="currentSearch"
        @onSearchItem="searchItem($event)"
      ></SearchItem>
    </div>
  </section>
  <router-view></router-view>
</template>

<style scoped>
.search-container {
  height: 50px;
}

.mrt-20 {
  margin-top: 20px;
}
</style>
