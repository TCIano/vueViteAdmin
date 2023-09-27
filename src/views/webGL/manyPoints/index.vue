<template>
   <div>多点绘制</div>
   <div class="canvas">
      <canvas ref="canvas" width="600" height="600"></canvas>
   </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { mat4 } from 'gl-matrix'
import { initShader } from '../../../uilts/index'
const canvas = ref<HTMLCanvasElement>()
const webgl = ref<WebGLRenderingContext>()
const shaderProgram = ref<WebGLProgram>()
let POINTS: number[] = []
let vertexShaderSource = `
   void main(){
      attribute vec4 aVertexPosition;
      gl_PointSize = 10.0;
      gl_Position = aVertexPosition; 
   }
   `
let projMat4 = mat4.create()
//片元着色器源码
let fragShaderSource = `
   void main() {
      gl_FragColor = vec4(1.0,0.1,0.0,1.0);
   }
   `
const initWebGl = () => {
   webgl.value = canvas.value!.getContext('webgl') as WebGLRenderingContext
   webgl.value.viewport(0, 0, canvas.value!.clientWidth, canvas.value!.clientHeight)
   mat4.ortho(
      projMat4 as any,
      canvas.value!.clientWidth,
      canvas.value!.clientHeight,
      0,
      -1.0,
      1.0,
      projMat4 as any
   )
}
const initShaderFun = () => {
   if (webgl.value) {
      shaderProgram.value = initShader(webgl.value, vertexShaderSource, fragShaderSource)
   }
}
const initBuffer = () => {
   let aPosition = webgl.value?.getAttribLocation(
      shaderProgram.value as WebGLProgram,
      'aVertexPosition'
   )
   document?.addEventListener('click', (e: MouseEvent) => {
      let clientX = e.clientX
      let clientY = e.clientY
      let rect = canvas.value?.getBoundingClientRect()
      let top = rect!.top
      let left = rect!.left
      let x = (clientX - left - canvas.value!.width / 2) / (canvas.value!.width / 2)
      let y = -(clientY - top - canvas.value!.height / 2) / (canvas.value!.height / 2)
      console.log(x, y)
      POINTS.push(x)
      POINTS.push(y)
      POINTS.push(0.0)
      POINTS.push(1.0)
      let pointPositon = new Float32Array(POINTS)
      let pointBuffer = webgl.value!.createBuffer()
      webgl.value!.bindBuffer(webgl.value!.ARRAY_BUFFER, pointBuffer)
      webgl.value!.bufferData(webgl.value!.ARRAY_BUFFER, pointPositon, webgl.value!.STATIC_DRAW)
      webgl.value!.enableVertexAttribArray(aPosition as number)
      webgl.value!.vertexAttribPointer(aPosition as number, 4, webgl.value!.FLOAT, false, 4 * 4, 0)

      //计算webgl点击的坐标
   })
}
const draw = () => {
   webgl.value?.clearColor(0.0, 0.0, 0.0, 1.0)
   webgl.value?.clear(webgl.value.COLOR_BUFFER_BIT | webgl.value.DEPTH_BUFFER_BIT)
   webgl.value?.drawArrays(webgl.value.POINTS, 0, POINTS.length)
}
const init = () => {
   initWebGl()
   initShaderFun()
   initBuffer()
   draw()
}
onMounted(() => {
   init()
})
</script>

<style scoped lang="less">
.canvas {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;
   canvas {
      width: 700px;
      height: 700px;
      background-color: #ccc;
   }
}
</style>
