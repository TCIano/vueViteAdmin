<template>
   <a-divider>平移</a-divider>
   <canvas ref="canvas" width="600" height="600"></canvas>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { initShaders, getWebGLContext } from '../../../uilts/uilts'
const A_POSITION = 'a_Position'
const A_POINT_SIZE = 'a_PointSize'
const U_FRAG_COLOR = 'u_FragColor'
const U_TRANSLATE = 'u_Translate'
const Tx = 0.0
const Ty = 0.5
const Tz = 0.0
const canvas = ref<HTMLCanvasElement>()
//顶点着色器
const VSHADER_SOURCE = `
    attribute vec4 ${A_POSITION};
    attribute float ${A_POINT_SIZE};
    uniform vec4 ${U_TRANSLATE};
    void main() {
        gl_PointSize = ${A_POINT_SIZE};
        gl_Position = ${A_POSITION} + ${U_TRANSLATE};
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
      const gl = getWebGLContext(canvas.value)
      const program = initShaders(gl!, VSHADER_SOURCE, FSHADER_SOURCE)
      //缓冲区
      const n = initVertexBuffers(gl!, program)
      gl?.clearColor(0.0, 0.0, 0.0, 1.0)
      gl?.clear(gl.COLOR_BUFFER_BIT)
      gl?.drawArrays(gl.LINE_LOOP, 0, n)
   }
}
const initVertexBuffers = (gl: WebGLRenderingContext, program: WebGLProgram) => {
   const n = 3
   const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
   const vertexBuffer = gl.createBuffer()
   if (!vertexBuffer) {
      console.error('创建缓冲区对象失败')
      return -1
   }
   //绑定缓冲区
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
   //给缓冲区绑定对象
   gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
   //获取变量位置
   const a_Position = gl.getAttribLocation(program, A_POSITION)
   const a_PointSize = gl.getAttribLocation(program, A_POINT_SIZE)
   const u_FragColor = gl.getUniformLocation(program, U_FRAG_COLOR)
   //平移参数传递给着色器
   const u_Translate = gl?.getUniformLocation(program, U_TRANSLATE)
   gl.vertexAttrib1f(a_PointSize, 10.0)
   gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0)
   gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
   gl.enableVertexAttribArray(a_Position)
   gl?.uniform4f(u_Translate!, Tx, Ty, Tz, 0.0)
   return n
}
onMounted(init)
</script>

<style scoped lang="less"></style>
