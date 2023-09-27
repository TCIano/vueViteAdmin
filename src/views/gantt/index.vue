<template>
   <v-table :data-source="tableData" :columns="columns">
      <template #edit="{ column, text, save, modelValue, ...arg }">
         <template v-if="column.dataIndex === 'name'">
            {{ modelValue }}
            <a-select
               style="width: 120px"
               :value="modelValue"
               :bordered="false"
               @update:value="
                  (v:string) => {
                     onChange(v)
                  }
               "
            >
               <a-select-option :value="text">{{ text }}</a-select-option>
               <a-select-option value="123">123</a-select-option>
            </a-select>
         </template>
      </template>
   </v-table>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from '@/store/modules/globalSetting'
import { ref, onBeforeMount, onMounted } from 'vue'
import { ColumnsType } from '@/types/table'
import vTable from '@/components/vTable.vue'

const store = useGlobalSettingStore()
const rowContentIndex = ref<any>()
const columnContentIndex = ref<any>()
const props = defineProps()
const editorRef = ref<HTMLElement>()
const columns = ref<ColumnsType[]>([
   {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      readonly: false,
      editType: 'input',
      editCell: record => {
         return record.key === '1'
      },
      // customRender({ column, text, index, renderIndex }) {
      //    return (
      //       ((column as ColumnsType)!.readonly && rowContentIndex.value === index && (
      //          <a-select
      //             size='small'
      //             value={text}
      //             bordered={false}
      //             style={{ width: '90%', margin: '0px' }}
      //             autofocus
      //             defaultOpen
      //             onChange={(value: string) =>
      //                (tableData.value[index as number][column.key] = value)
      //             }
      //             onBlur={() => {
      //                columns.value[columnContentIndex.value].readonly = false
      //             }}
      //             onClick={() => {
      //                columns.value[columnContentIndex.value].readonly = false
      //             }}
      //          >
      //             <a-select-option value='mikeTom'>mikeTom</a-select-option>
      //             <a-select-option value='Tencheo'>Tencheo</a-select-option>
      //          </a-select>
      //       )) ||
      //       text
      //    )
      // },
      width: 250,
   },
   {
      title: 'Cash Assets',
      // className: 'column-money',
      dataIndex: 'money',
   },
   {
      title: 'Address',
      dataIndex: 'address',
   },
])
const tableData = ref([
   {
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
   },
   {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
   },
   {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
   },
])
// const onChangeSelect = (value: string,) => {
//   tableData
// }
const onChange = (value: any) => {
   console.log(value)
}
onMounted(() => {
   console.log(editorRef.value)
})
</script>
<style scoped lang="less">
:deep(.ant-select) {
   .ant-select-selector {
      padding: 0 0 !important;
   }
}
</style>
