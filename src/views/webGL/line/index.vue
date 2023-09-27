<template>
   <div>线段</div>
   <canvas width="400" height="500" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { getWebGLContext, initShaders } from '@/uilts/uilts'
const canvas = ref<HTMLCanvasElement | null>(null)
// const gl = ref<WebGLRenderingContext>()

//顶点位置
const A_POSITION = 'a_Position'
//顶点大小
const A_POINT_SIZE = 'a_PointSize'
//顶点颜色
const U_FRAG_COLOR = 'u_FragColor'
//顶点着色器
const vertexShaderSource = `
   attribute vec4 ${A_POSITION};
   attribute float ${A_POINT_SIZE};
   void main(){
      gl_Position = ${A_POSITION};
      gl_PointSize = ${A_POINT_SIZE};
   }
`

//片元着色器
const fragmentShaderSource = `
   precision mediump float;
   uniform vec4 ${U_FRAG_COLOR};
   void main(){
      gl_FragColor = ${U_FRAG_COLOR};
   }
`
const g_Ponints = ref<number[][]>([])
const g_Colors = ref<number[][]>([])
const initWebGl = () => {
   const gl = getWebGLContext(canvas.value!)
   let program = initShaders(gl!, vertexShaderSource, fragmentShaderSource)
   getAttrlocation(gl!, program)
   gl?.clearColor(0.0, 0.0, 0.0, 1.0)
   gl?.clear(gl.COLOR_BUFFER_BIT)
}
/**
 * 获取并且传递实时的attribute,和uniform变量
 * @param gl
 * @param program
 */
const getAttrlocation = (gl: WebGLRenderingContext, program: WebGLProgram) => {
   //获取attribute变量的存储位置，参数：(包含片元着色器和顶点着色器的程序对象，变量名称)
   const a_Position = gl!.getAttribLocation(program, A_POSITION) //位置
   const a_PointSize = gl!.getAttribLocation(program, A_POINT_SIZE) //大小
   //获取uniform变量的存储位置，参数：(包含片元着色器和顶点着色器的程序对象，变量名称)
   const u_FragColor = gl!.getUniformLocation(program, U_FRAG_COLOR) //颜色
   if (a_Position && a_Position < 0) {
      return console.warn('无法获取存储位置')
   }
   //把 顶点大小传输给attribute变量
   gl?.vertexAttrib1f(a_PointSize, 15.0)
   canvas.value!.onmousedown = (e: MouseEvent) => {
      handleClick(e, gl!, canvas.value!, a_Position, u_FragColor!)
   }
}
//CAVAN设置点击事件
const handleClick = (
   e: MouseEvent,
   gl: WebGLRenderingContext,
   canvas: HTMLCanvasElement,
   a_Position: number,
   u_FragColor: WebGLUniformLocation
) => {
   const cX = e.clientX //鼠标在浏览器中的坐标
   const cy = e.clientY
   const rect = (e.target as Element).getBoundingClientRect()
   const ch = canvas.height
   const cw = canvas.width
   /**
    * cx-left 为鼠标在canvas中的坐标
    * cH /2 , cW / 2 :canvas中心点坐标
    */
   const x = (cX - rect.left - cw / 2) / (cw / 2)
   const y = (ch / 2 - (cy - rect.top)) / (ch / 2)
   g_Ponints.value.push([x, y])
   //添加颜色
   g_Colors.value.push([Math.random(), Math.random(), Math.random(), 1.0])

   //清除canvas,必须每次点击时候重新调用，因为每次绘制点之后，颜色缓冲区会被webgl重置为默认颜色（白色（0.0，0.0，0.0，0.0））
   gl.clear(gl.COLOR_BUFFER_BIT)

   const leng = g_Ponints.value.length
   for (let i = 0; i < leng; i++) {
      const itemPoint = g_Ponints.value[i]
      const itemColor = g_Colors.value[i]
      //点的位置传输到a_Position中
      gl.vertexAttrib3f(a_Position, itemPoint[0], itemPoint[1], 0.0)
      gl.uniform4f(u_FragColor, itemColor[0], itemColor[1], itemPoint[2], itemColor[3])
      gl.drawArrays(gl.POINTS, 0, 1)
   }
}

onMounted(() => {
   initWebGl()
})
</script>

<style scoped lang="less"></style>
