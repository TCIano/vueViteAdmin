<template>
   <a-divider>绘制三角形</a-divider>
   <canvas ref="canvas" width="800" height="700"></canvas>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { initShaders, getWebGLContext } from '../../../uilts/uilts'
const A_POSITION = 'a_Position'
const A_POINT_SIZE = 'a_PointSize'
const U_FRAG_COLOR = 'u_FragColor'
const canvas = ref<HTMLCanvasElement>()
//顶点着色器
const VSHADER_SOURCE = `
    attribute vec4 ${A_POSITION};
    void main() {
        gl_Position = ${A_POSITION};
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
const randomNumber = () => Math.random() * 2 - 1
const initVertexBuffers = (gl: WebGLRenderingContext, program: WebGLProgram) => {
   const vertices = new Float32Array([-0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5])
   const n = 3 //四个点可以组成矩形，三个点可画三角形
   //创建缓冲区对象
   const vertexBuffer = gl.createBuffer()
   //绑定缓冲区对象·
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

   //缓冲区绑定数据
   gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
   //获取attribute地址
   const a_Position = gl.getAttribLocation(program, A_POSITION)
   const u_FragColor = gl.getUniformLocation(program, U_FRAG_COLOR)
   //给attribute绑定变量
   gl.uniform4f(u_FragColor, 0.0, 1.0, 1.0, 1.0)

   gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
   //开启缓冲区和变量连接
   gl.enableVertexAttribArray(a_Position)
   return n
}
const init = () => {
   const gl = getWebGLContext(canvas.value!)
   if (!gl) {
      console.log('Failed to get the rendering context for WebGL')
      return
   }
   //初始化着色器
   const program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
   //设置顶点位置
   const n = initVertexBuffers(gl!, program)
   gl.clearColor(0.0, 0.0, 0.0, 1.0)
   gl.clear(gl.COLOR_BUFFER_BIT)
   gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}
onMounted(init)
</script>

<style scoped lang="less"></style>
