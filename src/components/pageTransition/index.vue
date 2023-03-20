<template>
   <transition name="slide" mode="out-in">
      <div>
         <slot></slot>
      </div>
   </transition>
</template>

<script setup lang="ts" name="pageTrantision">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
</script>

<style scoped lang="less">
.slide-enter-active,
.slide-leave-active {
   transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
   margin-left: -200px;
}
</style>
