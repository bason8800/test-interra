<template>
  <div class="top"></div>

  <main class="main-wrapper">
    <router-view />
  </main>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
.top {
  height: 80px;
  background: $color-dark;
}

.main-wrapper {
  box-sizing: border-box;
  width: 866px;
  min-height: calc(100vh - 80px);
  padding: 23px 30px 30px;
  margin: 0 auto;
  background: $color-white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
