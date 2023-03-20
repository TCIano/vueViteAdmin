<template>
   789789
   <div ref="ganttContainer" style="height: 500px; width: 100%"></div>
</template>

<script setup lang="ts">
import { gantt } from 'dhtmlx-gantt'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
let ganttContainer = ref<HTMLElement | string>()
let tasks = {
   data: [
      {
         id: 1,
         text: 'Task #1',
         start_date: '2022-12-11',
         end_date: '2022-12-20',
         color: 'red',
      },
   ],
   links: [],
}
gantt.init(ganttContainer.value)
gantt.parse(tasks)

gantt.config.date_format = '%Y-%m-%d'
gantt.config.autofit = true
//自适应甘特图的尺寸大小, 使得在不出现滚动条的情况下, 显示全部任务
gantt.config.autosize = true
//只读模式
gantt.config.readonly = true
//是否显示左侧树表格
gantt.config.show_grid = false
gantt.i18n.setLocale('cn') // 设置中文
// //当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度
// gantt.config.fit_tasks = true
gantt.config.scales = [
   { unit: 'month', step: 1, date: '%Y' + '年' + '%M' },
   { unit: 'day', step: 1, date: '%d' + '日' },
]
gantt.config.columns = [
   { name: 'text', label: '阶段名字', tree: true, width: '200' },
   {
      name: 'duration',
      label: '时长',
      align: 'center',
      template: function (obj: any) {
         return obj.duration + '天'
      },
   },
   { name: 'start_date', label: '开始时间', align: 'center' },

   { name: 'end_date', label: '结束时间', align: 'center' },
]
// gantt.config.scroll_size = 10
// gantt.config.open_tree_initially = true
gantt.templates.task_text = function (start, end, task) {
   return task.text + '(' + task.duration + '天)'
}
gantt.config.inherit_scale_class = true
</script>

<style scoped lang="less"></style>
