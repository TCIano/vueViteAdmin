<template>
   <a-table ref="table" :data-source="dataSource" :columns="customColumns">
      <template v-for="(slot, name) in slots" #[name]="slotData">
         <slot v-if="name !== 'bodyCell' && name !== 'edit'" :name="name" v-bind="slotData"></slot>
      </template>
      <template #bodyCell="slotData">
         <slot name="edit" v-if="isShowEditSlot" v-bind="{ ...slotData, save, modelValue }"></slot>
      </template>
   </a-table>
</template>

<script setup lang="ts" name="VTable">
import { ref, onMounted, useSlots, computed } from 'vue'
import { ColumnsType } from '@/types/table'
import { cloneDeep } from 'lodash'
let slots = useSlots()
const props = defineProps<{
   columns: ColumnsType[]
   dataSource: Array<any>
}>()
const rowContentIndex = ref<any>()
const isShowEditSlot = ref<any>(false)
const columnContentIndex = ref<any>()
const editCell = (p: number) => {}
let modelValue = ref<string>()
const customColumns = cloneDeep(props.columns).map(item => {
   const dataIndex = item.dataIndex
   return {
      ...item,
      ...(typeof item.editCell !== 'undefined'
         ? {
              customCell: (record, rowIndex, column) => {
                 return {
                    // editContentShow: false,
                    onDblclick: (e: MouseEvent) => {
                       isShowEditSlot.value = true
                       const evenTarget = e.target as HTMLElement
                       const EleNode: any = []
                       evenTarget.childNodes.forEach(item => {
                          if (item.nodeType !== Node.COMMENT_NODE) {
                             EleNode.push(item)
                          }
                       })
                       //    modelValue.value = EleNode[0]
                       //    textNode[0].style.display = 'block'

                       if (item.editCell && typeof item.editCell === 'function') {
                          //如果editCell是一个回调
                          const ableEdit = item.editCell(record)
                          if (ableEdit) {
                             console.log(ableEdit)
                             const index = props.columns.findIndex(item => item.key === column?.key)
                             rowContentIndex!.value = rowIndex
                             columnContentIndex.value = index
                             props.columns[index].readonly = true
                          }
                       } else if (item.editCell) {
                          //如果editCell是一个boolean
                       }
                    },
                 }
              },
           }
         : {}),
   }
}) as ColumnsType[]
console.log(customColumns)
const save = (e: MouseEvent) => {
   console.log(e)
}
onMounted(() => {})
</script>

<style scoped lang="less">
.edit-content {
   display: none;
}
</style>
