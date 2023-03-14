<template>
    <a-layout-header style="background: #fff; padding: 0">
        123
        <!-- <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" /> -->
        <!-- <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" /> -->
        <a-layout-content :style="{ margin: '30px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
            <router-view></router-view>
        </a-layout-content>
    </a-layout-header>
</template>

<script setup lang='ts' name='headerView'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
const collapsed = ref(false)
</script>

<style scoped lang='less'></style>