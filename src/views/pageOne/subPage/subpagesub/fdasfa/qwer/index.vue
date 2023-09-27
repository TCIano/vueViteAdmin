<template>
   <div>
      <canvas ref="webgl" width="500px" height="500px"></canvas>
   </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, computed } from 'vue'
import * as glMatrix from 'gl-matrix'
const webgl = ref<HTMLCanvasElement>()
let gl = ref<WebGLRenderingContext | null>()
function initShaderProgram(gl, vsSource, fsSource) {
   const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
   const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

   // 创建着色器程序

   const shaderProgram = gl.createProgram()
   gl.attachShader(shaderProgram, vertexShader)
   gl.attachShader(shaderProgram, fragmentShader)
   gl.linkProgram(shaderProgram)

   // 如果创建失败，alert
   if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram))
      return null
   }

   return shaderProgram
}

//
// 创建指定类型的着色器，上传 source 源码并编译
//
function loadShader(gl, type, source) {
   const shader = gl.createShader(type)

   // Send the source to the shader object

   gl.shaderSource(shader, source)

   // Compile the shader program

   gl.compileShader(shader)

   // See if it compiled successfully

   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
   }

   return shader
}

const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
const main = function () {
   gl.value = webgl.value!.getContext('webgl')
   if (!gl.value) {
      alert('无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。')
      return
   } else {
      gl.value.clearColor(0.0, 0.0, 0.0, 1)
      gl.value.clear(gl.value.COLOR_BUFFER_BIT)
      const vsSource = `
        attribute vec4 aVertexPosition;
    
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
    
        void main() {
          gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
      `
      const fsSource = `
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    
      `
   }
}
onMounted(() => {
   main()
})
</script>

<style scoped lang="less"></style>
