<template></template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
   beforeRouteEnter(to, from, next) {
      console.log(to, from)
      next(vm => {
         vm.$router.replace(from.path)
      })
   },
})
</script>

<style scoped lang="less"></style>
