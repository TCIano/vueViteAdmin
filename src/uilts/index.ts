
//声明初始化着色器函数
export function initShader(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
    //创建顶点着色器对象
    var vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
    //创建片元着色器对象
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader
    //引入顶点、片元着色器源代码
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    //编译顶点、片元着色器
    gl.compileShader(vertexShader)
    gl.compileShader(fragmentShader)

    //创建程序对象program
    var program = gl.createProgram() as WebGLProgram
    console.log(program);

    //附着顶点着色器和片元着色器到program
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    //链接program
    gl.linkProgram(program)
    //使用program
    gl.useProgram(program)
    //返回程序program对象
    return program
}