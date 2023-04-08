<template>
   testsub1
   <div style="height: 500px; width: 100px; background-color: skyblue">two</div>
   <div style="height: 500px; width: 100px; background-color: skyblue">two</div>
</template>

<script setup lang="ts" name="testSub1">
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
// console.log(789)

onActivated(() => {
   console.log('testsub1缓存')
})
</script>

<style scoped lang="less"></style>
