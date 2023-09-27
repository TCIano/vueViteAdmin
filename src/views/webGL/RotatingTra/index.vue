<template>
   <a-divider>旋转</a-divider>
   <canvas ref="canvas" width="500" height="500"></canvas>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { getWebGLContext, initShaders } from '../../../uilts/uilts'
const canvas = ref<HTMLCanvasElement>()
const U_FRAG_COLOR = 'u_FragColor'
const A_POINT_SIZE = 'a_PointSize'
const angle = 10.0
//顶点着色器
// x' = xcosb - ysinb
// y' = xsinb + ycosb
const VSHADER_SOURCE = `
     attribute vec4 a_Position;
     attribute float a_PointSize;
     uniform float u_CosB;
     uniform float u_SinB;
     void main() {
         gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
         gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
         gl_Position.z = a_Position.z;
         gl_Position.w = 1.0;
         gl_PointSize = ${A_POINT_SIZE};
     }
 `
//片元着色器
const FSHADER_SOURCE = `
     precision mediump float;
     uniform vec4 ${U_FRAG_COLOR};
     void main() {
         gl_FragColor = ${U_FRAG_COLOR};
     }
 `
const init = () => {
   if (canvas.value) {
      //获取gl对象
      const gl = getWebGLContext(canvas.value)
      const program = initShaders(gl!, VSHADER_SOURCE, FSHADER_SOURCE)
      //创建缓冲区
      const n = initVertexBuffers(gl!, program)
      //将旋转图形的数据传播递给顶点着色器
      const radian = (Math.PI * angle) / 180.0
      const cosB = Math.cos(radian)
      const sinB = Math.sin(radian)
      const u_CosB = gl!.getUniformLocation(program, 'u_CosB')
      const u_SinB = gl!.getUniformLocation(program, 'u_SinB')
      gl!.uniform1f(u_CosB, cosB)
      gl!.uniform1f(u_SinB, sinB)
      gl?.clearColor(0.0, 0.0, 0.0, 1.0)
      gl?.clear(gl.COLOR_BUFFER_BIT)
      gl?.drawArrays(gl.TRIANGLES, 0, n)
   }
}
//缓冲区
const initVertexBuffers = (gl: WebGLRenderingContext, program: WebGLProgram) => {
   const n = 3
   const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
   const vertexBuffer = gl.createBuffer()
   if (!vertexBuffer) {
      console.error('创建缓冲区对象失败')
      return -1
   }
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
   gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
   //获取变量位置
   const u_FragColor = gl.getUniformLocation(program, 'u_FragColor')
   const a_Position = gl.getAttribLocation(program, 'a_Position')
   const a_PointSize = gl.getAttribLocation(program, 'a_PointSize')
   gl.uniform4f(u_FragColor, Math.random(), Math.random(), Math.random(), 1.0)
   gl.vertexAttrib1f(a_PointSize, 5.0)
   gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
   gl.enableVertexAttribArray(a_Position)
   return n
}
onMounted(init)
</script>

<style scoped lang="less"></style>
