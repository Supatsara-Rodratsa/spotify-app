<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({ lists: Array });
const emit = defineEmits(['selectedToggle']);

const currentStatus = ref([]);
onMounted(() => {
  let index = 0;
  props.lists.forEach(() => {
    if (index == 0) currentStatus.value.push(true);
    else currentStatus.value.push(false);
    index++;
  });
});

function onSelectedItem(index) {
  currentStatus.value[index] = !currentStatus.value[index];
  currentStatus.value.forEach((status, id) => {
    if (id != index && currentStatus.value[index]) {
      currentStatus.value[id] = false;
    }

    if (!currentStatus.value[index]) {
      currentStatus.value[0] = true;
    }
  });
  const selectedIndex = currentStatus.value.findIndex((val) => val);
  emit('selectedToggle', props.lists[selectedIndex]);
}
</script>
<template>
  <div class="toggle-container">
    <div class="flex-row gap">
      <div v-for="(list, index) in lists" :key="index">
        <div
          class="toggle"
          @click="onSelectedItem(index)"
          :class="{ active: currentStatus[index] }"
        >
          {{ list }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.toggle-container {
  margin: 10px 0;
}

.toggle {
  padding: 8px 20px;
  background-color: var(--light_purple);
  border-radius: 30px;
  cursor: pointer;
}

.gap {
  gap: 10px;
}

.active {
  background-color: purple;
  color: white;
}
</style>
