<template>
   <div style="height: 500px; width: 100px; background-color: skyblue">two</div>
   <a-button>123</a-button>
   <a-input></a-input>
   <a-switch v-model:checked="toc"></a-switch>
   <a-table></a-table>
   <a-tree
      block-node
      draggable
      show-line
      show-icon
      :auto-expand-parent="autoExpandParent"
      :expandedKeys="expandedKeys"
      :tree-data="tree"
      @expand="onExpand"
   >
      <template #title="{ title, key }">
         <!-- 右键菜单 -->
         <a-dropdown :trigger="['contextmenu']">
            <span v-if="title.indexOf(searchText) > -1">
               {{ title?.substr(0, title.indexOf(searchText)) }}
               <span style="color: #f03e3e">{{ searchText }}</span>
               {{ title?.substr(title.indexOf(searchText) + searchText.length) }}
            </span>
            <span v-else>{{ title }}</span>
            <template #overlay>
               <a-menu>
                  <a-menu-item key="1">1st menu item</a-menu-item>
                  <a-menu-item key="2">2nd menu item</a-menu-item>
                  <a-menu-item key="3">3rd menu item</a-menu-item>
               </a-menu>
            </template>
         </a-dropdown>
      </template>
   </a-tree>
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
const toc = ref(false) // toc: Checkbox to control the state.
console.log('刷新')
const expandedKeys = ref<(string | null)[]>([])
const autoExpandParent = ref<boolean>(true)
import type { TreeProps } from 'ant-design-vue'
const tree = ref<TreeProps['treeData']>([
   {
      title: 'parent 1',
      key: '0-0',
      children: [
         {
            title: 'parent 1-0',
            key: '0-0-0',
            children: [
               { title: 'leaf222', key: '0-0-0-0' },
               {
                  key: '0-0-0-1',
                  title: 'lea00001f',
               },
               { title: 'leaf112', key: '0-0-0-2' },
            ],
         },
         {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [{ title: 'leaf11', key: '0-0-1-0' }],
         },
         {
            title: 'parent 1-2',
            key: '0-0-2',
            children: [
               { title: 'leaf 1', key: '0-0-2-0' },
               {
                  title: 'leaf 21',
                  key: '0-0-2-1',
               },
               { title: 'leaf 1', key: '0-0-2-5' },
               {
                  title: 'leaf 22',
                  key: '0-0-2-2',
               },
               { title: 'leaf 1', key: '0-0-2-4' },
               {
                  title: 'leaf 23',
                  key: '0-0-2-3',
               },
               {
                  title: 'leaf 24',
                  key: '0-0-2-6',
               },
               {
                  title: 'leaf 25',
                  key: '0-0-2-7',
               },
               {
                  title: 'leaf 26',
                  key: '0-0-2-8',
               },
               {
                  title: 'leaf 27',
                  key: '0-0-2-19',
               },
               {
                  title: 'leaf 28',
                  key: '0-0-2-29',
               },
               {
                  title: 'leaf 29',
                  key: '0-0-2-39',
               },
               {
                  title: 'leaf 222',
                  key: '0-0-2-49',
               },
            ],
         },
      ],
   },
])
const searchText = ref('')
const onExpand = (keys: string[]) => {
   expandedKeys.value = keys
   autoExpandParent.value = false
}
//组织机构搜索
const dataList: TreeProps['treeData'] = []
const getParentKey = (key: string | number, tree: TreeProps['treeData'] | any): string => {
   let parentKey: any
   for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
         if (node.children.some((item: DataNode) => item.key === key)) {
            parentKey = node.key
         } else if (getParentKey(key, node.children)) {
            parentKey = getParentKey(key, node.children)
         }
      }
   }
   return parentKey
}
//扁平化
const generateList = (data: TreeProps['treeData']) => {
   if (data?.length) {
      for (let i = 0; i < data.length; i++) {
         const node = data[i]
         const key = node.key
         const title = node.title
         dataList.push({ key, title })
         if (node.children) {
            generateList(node.children)
         }
      }
   }
   // return data.reduce((res:DataNode[], node) => {
   //   const key = node.key
   //   const title = node.title
   //   res.push({ key, title })
   // }, [])
}
generateList(tree.value)
const getExpanded = (value: string) => {
   const expanded = dataList
      .map((item: DataNode, index: number, arr) => {
         if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, tree.value)
         }
         return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
   expandedKeys.value = expanded
   searchText.value = value
   autoExpandParent.value = true
}
onActivated(() => {
   console.log('缓存')
})
</script>

<style scoped lang="less"></style>
