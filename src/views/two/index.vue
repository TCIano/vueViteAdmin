<template>
   <s-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column, text }">
         <!-- <template v-if="column.dataIndex === 'gender'">
            {{ text === 'Male' ? '男' : '女' }}
         </template> -->
         {{ text }}
      </template>
      <template
         #cellEditor="{ column, modelValue, save, closeEditor, editorRef, getPopupContainer }"
      >
         <template v-if="column.dataIndex === 'date'">
            <a-date-picker
               :ref="editorRef"
               :bordered="false"
               :value="dayjs(modelValue.value)"
               style="width: 100%"
               :get-popup-container="getPopupContainer"
               open
               :allow-clear="false"
               @update:value="
                  v => {
                     modelValue.value = v?.format('YYYY-MM-DD') ?? ''
                     save()
                  }
               "
               @blur="closeEditor"
               @keydown.esc="closeEditor"
               @click.stop="closeEditor"
            ></a-date-picker>
         </template>
         <template v-else="column.dataIndex === 'gender'">
            <a-select
               :ref="editorRef"
               :bordered="false"
               :value="modelValue.value"
               style="width: 200px"
               :get-popup-container="getPopupContainer"
               :options="[
                  {
                     value: 'Male',
                     label: 'Male',
                  },
                  {
                     value: 'Female',
                     label: 'Female',
                  },
               ]"
               open
               @update:value="
                  v => {
                     modelValue.value = v
                     save()
                  }
               "
               @blur="closeEditor"
               @keydown.esc="closeEditor"
               @click.stop="closeEditor"
            ></a-select>
         </template>
      </template>
   </s-table>
</template>
<script lang="ts">
import type { Ref, UnwrapRef } from 'vue'
import { defineComponent, reactive, ref } from 'vue'
import dayjs from 'dayjs'

interface DataItem {
   key: string
   name: string
   date: string
   gender: 'Male' | 'Female'
}

export default defineComponent({
   setup() {
      const columns = [
         {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            autoHeight: true,
            editable: ({ record }) => {
               console.log(record)
               return record.name === 'Edward King 0'
            },
         },
         {
            title: 'date',
            dataIndex: 'date',
            editable: 'cellEditorSlot',
         },
         {
            title: 'gender',
            dataIndex: 'gender',
            editable: 'cellEditorSlot',
         },
      ]
      const dataSource: Ref<DataItem[]> = ref([
         {
            key: '0',
            name: 'Edward King 0',
            date: '2023-12-12',
            gender: 'Male',
         },
         {
            key: '1',
            name: 'Edward King 1',
            date: '2023-10-10',
            gender: 'Female',
         },
         {
            key: '2',
            name: 'Edward King 2',
            date: '2023-11-11',
            gender: 'Female',
         },
         {
            key: '3',
            name: 'Edward King 3',
            date: '2023-11-11',
            gender: 'Female',
         },
         {
            key: '4',
            name: 'Edward King 4',
            date: '2023-11-11',
            gender: 'Female',
         },
         {
            key: '5',
            name: 'Edward King 5',
            date: '2023-11-11',
            gender: 'Female',
         },
         {
            key: '6',
            name: 'Edward King 6',
            date: '2023-11-11',
            gender: 'Female',
         },
      ])
      // const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})

      return {
         columns,
         dataSource,
         // editableData,
         dayjs,
      }
   },
})
</script>
