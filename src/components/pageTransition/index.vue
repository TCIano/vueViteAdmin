<template>
   <transition name="zoom-fade" mode="in-out" appear>
      <div style="height: 100%">
         <slot></slot>
      </div>
   </transition>
   <!-- <div v-else>
      <slot></slot>
   </div> -->
</template>

<script setup lang="ts" name="pageTrantision">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
</script>

<style lang="less">
.zoom-out-enter-active,
.zoom-out-leave-active {
   transition: opacity 0.1 ease-in-out, transform 0.15s ease-out;
}

.zoom-out-enter-from,
.zoom-out-leave-to {
   opacity: 0;
   transform: scale(0);
}
.zoom-fade-enter-active,
.zoom-fade-leave-active {
   // transition: transform 0.2s, opacity 0.3s ease-out;
   transition: transform 0.2s, opacity 0.3s ease-out;
}

.zoom-fade-enter-from {
   opacity: 0;
   transform: scale(0.92);
}
.zoom-fade-enter-to {
   opacity: 1;
   transform: scale(1);
}

.zoom-fade-leave-to {
   opacity: 0;
   transform: scale(1.06);
}
</style>
