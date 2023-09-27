<template>
   <div style="text-align: center; margin: auto">
      <a-divider>利用缓冲绘制多个点</a-divider>
      <canvas ref="canvas" width="500" height="500"></canvas>
   </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { initShaders, getWebGLContext } from '../../../uilts/uilts'
const canvas = ref<HTMLCanvasElement>()
const A_POSITION = 'a_Position'
const A_POINT_SIZE = 'a_PointSize'
const U_FRAG_COLOR = 'u_FragColor'
//顶点着色器
const VERTEX_SHADER_SOURCE = `
   attribute float ${A_POINT_SIZE};
   attribute vec4 ${A_POSITION};
   void main() {
      gl_Position = ${A_POSITION};
      gl_PointSize = ${A_POINT_SIZE};
   }
`
//片元着色器
const FRAG_SHADER_SOURCE = `
   precision mediump float;
   uniform vec4 ${U_FRAG_COLOR};
   void main() {
      gl_FragColor = ${U_FRAG_COLOR};
   }
`
//设置顶点位置

const init = () => {
   if (canvas.value) {
      const gl = getWebGLContext(canvas.value)
      let program = initShaders(gl!, VERTEX_SHADER_SOURCE, FRAG_SHADER_SOURCE)
      //设置顶点位置
      const n = initVertexBuffers(gl!, program)
      if (n < 0) {
         console.log('顶点缓存区设置失败')
         return
      }
      gl?.clearColor(0.0, 0.0, 0.0, 1.0)
      gl?.clear(gl.COLOR_BUFFER_BIT)
      gl?.drawArrays(gl.POINTS, 0, n)
   }
}
//设置attribute和uniform变量
const initVertexBuffers = (gl: WebGLRenderingContext, program: WebGLProgram) => {
   //每两个数据为一个坐标
   const certices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
   console.log(certices)

   let n = 3
   //创建缓冲区对象
   const vertexBuffer = gl.createBuffer()
   if (!vertexBuffer) {
      console.error('创建缓冲区对象失败')
      return -1
   }
   //缓冲区对象绑定到目标
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
   //向缓冲区写入数据
   gl.bufferData(gl.ARRAY_BUFFER, certices, gl.STATIC_DRAW)

   const a_Position = gl.getAttribLocation(program, A_POSITION)
   if (a_Position < 0) {
      console.error('获取position对象失败')
      return -1
   }
   const a_PointSize = gl.getAttribLocation(program, A_POINT_SIZE)
   const u_FragColor = gl.getUniformLocation(program, U_FRAG_COLOR)
   // gl.ver
   gl.vertexAttrib1f(a_PointSize, 15.0)

   gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0)
   //从当前缓冲区读取数据 (将绑定到gl.Array_BUFFER 的缓冲区的对象分配给，attribute对象)
   gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
   //连接变量分给其缓冲区对象
   gl.enableVertexAttribArray(a_Position)
   return n
}
onMounted(() => {
   init()
})
</script>

<style scoped lang="less"></style>
