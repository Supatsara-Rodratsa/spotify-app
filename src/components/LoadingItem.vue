<template>
  <div class="loader">Loading...</div>
</template>
<style scoped>
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: loading 1.8s infinite ease-in-out;
}
.loader {
  color: var(--pink);
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
  top: 35%;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
}
.loader:before {
  left: -3.5em;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
</style>
