<template>
   <div>webgl</div>
   <canvas ref="canvas" width="600" height="600" style="background-color: #ccc"></canvas>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { initShader } from '../../../uilts/index'
import { mat4 } from 'gl-matrix'
const canvas = ref<HTMLCanvasElement>()
const webgl = ref<WebGLRenderingContext>()
console.log(mat4)

function greaterThan(n) {
   return m => m > n
}
let is = greaterThan(10)(9)
console.log(is)

const init = () => {
   webgl.value = canvas.value!.getContext('webgl') as WebGLRenderingContext
   console.log(webgl)

   //顶点着色器源码
   // let vertexShaderSource =
   //    '' +
   //    'void main(){' +
   //    //给内置变量gl_PointSize赋值像素大小
   //    '   gl_PointSize=10.0;' +
   //    //顶点位置，位于坐标原点
   //    '   gl_Position =vec4(-0.1,0.5,0.0,1.0);' +
   //    '}'

   let vertexShaderSource = `
   void main(){
      gl_PointSize = 10.0;
      gl_Position = vec4(-0.2,0.2,0.0,1.0);
   }
   `

   //片元着色器源码
   let fragShaderSource = `
   void main() {
      gl_FragColor = vec4(0.5,0.5,0.0,1.0);
   }
   `
   // '' +
   //    'void main(){' +
   //    //定义片元颜色 rgba
   //    '   gl_FragColor = vec4(1.0,0.6,0.5,1.0);' +
   //    '}'
   //初始化着色器
   var program = initShader(webgl.value, vertexShaderSource, fragShaderSource)
   //开始绘制，显示器显示结果
   webgl.value.drawArrays(webgl.value.POINTS, 0, 1)
}
//声明初始化着色器函数

onMounted(() => {
   init()
})
</script>

<style scoped lang="less"></style>
