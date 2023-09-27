<template>
   <div>高阶函数</div>
   <p id="help">Helpful notes will appear here</p>
   <p>
      E-mail:
      <input type="text" id="email" name="email" />
   </p>
   <p>
      Name:
      <input type="text" id="name" name="name" />
   </p>
   <p>
      Age:
      <input type="text" id="age" name="age" />
   </p>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import SCRIPTS from '../../../uilts/enum'
function greaterThan(n) {
   return m => m > n
}
// let greaterThan11 = greaterThan(10)(9)

//数组过滤
const array = [
   {
      name: 'Coptic',
      ranges: [
         [994, 1008],
         [11, 11508],
         [11513, 11520],
      ],
      direction: 'ltr',
      year: 100,
      living: false,
      link: 'https://en.wikipedia.org/wiki/Coptic_alphabet',
   },
   {
      name: 'Coptic889',
      ranges: [
         [994, 1008],
         [12, 11508],
         [11513, 11520],
      ],
      direction: 'ltr78',
      year: -200,
      living: true,
      link: 'https://',
   },
   {
      name: 'ntc',
      ranges: [
         [78, 100800000],
         [44, 36],
         [8855, 85],
      ],
      direction: 'rlt',
      year: 1200,
      living: true,
      link: 'https://TCIano.github.io',
   },
]

function filter(array, test) {
   let passed: any = []
   for (let element of array) {
      if (test(element)) {
         passed.push(element)
      }
   }
   return passed
}
let filterArr = filter(array, li => li.living)

//手写foreach

Array.prototype.myForeach = function (callback) {
   if (typeof callback !== 'function') return console.warn(callback + ' not a function')
   for (let index = 0; index < this.length; index++) {
      const element = array[index]
      callback(element, index, this)
   }
}

// array.myForeach((item, index, arr) => {
//    console.log(item, index)
// })

//手写map
const map = (arr, tranform) => {
   let mapped: any = []
   for (const element of arr) {
      mapped.push(tranform(element))
   }
   return mapped
}
let newMap = map(array, item => item.link)

// 手写reduce
const reduce = (arr, callback, start) => {
   let current = start
   for (const element of arr) {
      current = callback(current, element)
   }
   return current
}
let countYear = reduce(array, (curr, item, index) => curr + item.year, 0)
// console.log(countYear)
// 手写reduce

//比较列表中的数据大小
function characterCount(script) {
   return script.ranges.reduce((count, [from, to]) => {
      return count + (to - from)
   }, 0)
}

console.log(
   array.reduce((a, b) => {
      return characterCount(a) < characterCount(b) ? b : a
   })
)
//比较列表中的数据大小

//手写数组every
const every = (array: number[], test: Function) => {
   for (const element of array) {
      if (!test(element)) return false
   }
   return true
}
console.log(every([1, 3, 5], (n: number) => n < 10))
console.log(every([2, 4, 16], (n: number) => n < 10))
console.log(every([], (n: number) => n < 10))
//手写数组every

//判断字符书写
// function dominantDirection(text: string) {
//    // 计算每个字符的脚本属性
//    function characterScript(code: number) {
//       for (let script of SCRIPTS) {
//          if (
//             script.ranges.some(([from, to]) => {
//                return code >= from && code < to
//             })
//          ) {
//             return script
//          }
//       }
//       return null
//    }

//    // 统计每个书写方向的字符数量
//    function countBy(items: string, groupName: Function) {
//       let counts = []
//       for (let item of items) {
//          let name = groupName(item)
//          let known = counts.findIndex(c => c.name == name)
//          if (known == -1) {
//             counts.push({ name, count: 1 })
//          } else {
//             counts[known].count++
//          }
//       }
//       return counts
//    }

//    // 判断字符的书写方向
//    function characterDirection(char: string) {
//       let script = characterScript(char.codePointAt(0) as number)
//       return script ? script.direction : 'none'
//    }

//    // 计算主要书写方向
//    let counted = countBy(text, characterDirection).filter(({ name }) => name != 'none')

//    if (counted.length == 0) {
//       return 'ltr' // 如果没有明确的主要方向，则默认为从左到右
//    }
//    return counted.reduce((a, b) => (a.count > b.count ? a : b)).name
// }
const dominantDirection = (text: string) => {
   //字符书写方向
   const characterDirection = (char: string) => {
      //改变格式
      let script = characterScript(char.codePointAt(0) as number)
      return script ? script.direction : 'none'
   }

   //脚本计算
   const characterScript = (code: number) => {
      for (const script of SCRIPTS) {
         if (script.ranges.some(([from, to]) => code >= from && code < to)) {
            return script
         }
      }
      return null
   }

   //统计字符方向
   const countBy = (chars: string, getDir: Function) => {
      let counts = []
      for (const char of chars) {
         let dir = getDir(char)
         let know = counts.findIndex(item => item.dir === dir)
         if (know === -1) {
            counts.push({ dir, count: 1 })
         } else {
            counts[know].count++
         }
      }
      return counts
   }
   //计算主要的书写方向
   let counted = countBy(text, characterDirection).filter(item => item.dir !== 'none')
   if (counted.length === 0) {
      return 'ltr'
   }
   return counted.reduce((curr, item) => (curr.count > item.count ? curr : item)).dir
}

console.log(dominantDirection('Hello!'))
// → ltr
console.log(dominantDirection('Hey, مساء الخير'))
// → rtl
console.log(dominantDirection('我是汉语'))

function showHelp(help) {
   document.getElementById('help').textContent = help
}

function setupHelp() {
   const helpText = [
      { id: 'email', help: 'Your e-mail address' },
      { id: 'name', help: 'Your full name' },
      { id: 'age', help: 'Your age (you must be over 16)' },
   ]

   for (let i = 0; i < helpText.length; i++) {
      var item = helpText[i]
      document.getElementById(item.id).onfocus = () => {
         showHelp(item.help)
      }
   }
}
onMounted(() => {
   setupHelp()
})
</script>

<style scoped lang="less"></style>
