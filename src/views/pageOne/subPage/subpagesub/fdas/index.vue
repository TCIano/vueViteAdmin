<template>
   <div class="content">
      <div class="card">
         <div class="inner">内容</div>
      </div>
      <div class="card">
         <div class="inner">内容dafadsf</div>
      </div>
      <div class="card">
         <div class="inner">内容fadsfasf</div>
      </div>
      <div class="card">
         <div class="inner">内容fadsfasdf</div>
      </div>
      <div class="card">
         <div class="inner">内容fadsfadsgh</div>
      </div>
      <div class="card">
         <div class="inner">内容45gafdsg</div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
onMounted(() => {
   const content: HTMLElement | null = document.querySelector('.content')
   const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card')
   content!.onmousemove = function (e) {
      cards.forEach(card => {
         const re = card.getBoundingClientRect()
         const x = e.clientX - re.left
         const y = e.clientY - re.top
         card.style.setProperty('--x', `${x}px`)
         card.style.setProperty('--y', `${y}px`)
      })
   }
})
onUnmounted(() => {})
</script>

<style scoped lang="less">
.content {
   padding: 10px;
   width: 100%;
   height: 100%;
   display: flex;
   background: rgb(10, 10, 10);
   flex-wrap: wrap;
   gap: 10px;
}
.card {
   position: relative;
   width: calc(100% / 3 - 10px);
   height: 400px;
   border-radius: 8px;
   display: flex;
   justify-content: center;
   align-items: center;
   overflow: hidden;
   background-color: rgba(255, 255, 255, 0.2);
}
.inner {
   position: absolute;
   inset: 2px;
   z-index: 3;
   display: flex;
   justify-content: center;
   align-items: center;
   color: #ccc;
   background-color: #171717;
   border-radius: inherit;
}
.card::before,
.card::after {
   width: 100%;
   height: 100%;
   position: absolute;
   z-index: 2;
   content: '';
   border-radius: inherit;
   //    background: radial-gradient(closest-side circle, rgba(255, 255, 255, 0.5) 0%, transparent);
   background: radial-gradient(
      500px circle at var(--x) var(--y),
      rgba(255, 255, 255, 0.6),
      transparent 40%
   );
   //    top: var(--x, 1000px);
   //    left: var(--y, 1000px);
   top: 0;
   left: 0;
   //    transform: translate(-50%, -50%);
}
.card:hover::before {
   opacity: 1;
}
</style>
