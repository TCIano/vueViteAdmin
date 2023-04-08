<template>
   <div style="height: 500px; width: 100px; background-color: skyblue">two</div>
   <a-button>123</a-button>
   <a-input></a-input>
</template>

<script setup lang="ts" name="two">
import {
   ref,
   reactive,
   toRefs,
   onBeforeMount,
   onMounted,
   watchEffect,
   computed,
   onActivated,
} from 'vue'
console.log('刷新')
onActivated(() => {
   console.log('缓存')
})
</script>

<style scoped lang="less"></style>
