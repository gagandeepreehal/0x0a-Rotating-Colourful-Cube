// This variable is only for namespacing variables
// vulnerable to be repeated.
const drawTrianglesOnZequals0Config = {

  // Vertex Shader Text
  // --------------------------------------------------
  vShaderUrl : './shaders/trianglesAtZequals0.vertex.glsl',

  // Fragment Shader Text
  // --------------------------------------------------
  fShaderUrl: './shaders/trianglesAtZequals0.vertex.glsl',

  // Vertex positions
  // --------------------------------------------------
  pos: [
    [0.5,   0.5, 1.0],
    [0.0,  -0.5, 1.0],
    [-0.5,  0.5, 1.0],
  ],

  // Vertex Colors
  // --------------------------------------------------
  colors: [
    [0.8,0.1,0.05],
    [0.8,0.1,0.05],
    [0.8,0.1,0.05],
  ],
}


// Usage
// ----------------------------------------------------
// To setup do:
// 
// const {drawFn} = await getReferenceTrianglesDraw (gl)
//
// To draw in the render loop, do:
//
// drawFn()
async function getReferenceTrianglesDrawSetup (gl) {
  // Compile program to memory
  // --------------------------------------------------
  const {
    shaderProgram, aPositionLoc, aColorRgbLoc
  } = await setupTrianglesOnZequals0Shaders(gl)


  // Copy data to memory 
  // --------------------------------------------------
  const vao = gl.createVertexArray();
  let {pos, colors} = drawTrianglesOnZequals0Config
  pos = pos.flat()
  colors = colors.flat()
  const N = pos.length
  const {
    pos: posVerts, colors: colorVerts,
  } = setupDataBuffers(gl, {pos, colors}, vao)

  console.log({posVerts, colorVerts, pos, colors})

  // Setup memory mapping
  // --------------------------------------------------
  bindTrianglesOnZequals0VertexArray(
    gl,
    {
      shaderProgram,
      aPositionLoc,
      aColorRgbLoc,
      vao,
      posVerts,
      colorVerts,
    }
  )


  // return {
  //   shaderProgram,
  //   aPositionLoc,
  //   aColorRgbLoc,
  //   posVerts,
  //   colorVerts,
  //   vao,
  //   N,
  // }

  return {
    drawFn() {
      gl.useProgram(shaderProgram);
      gl.bindVertexArray(vao)
      gl.drawArrays(gl.TRIANGLES, 0, N);
      gl.bindVertexArray(null)
      gl.useProgram(null);
    }
  }    
}


function drawReferenceTriangles(
  gl,
  {
    shaderProgram,
    aPositionLoc,
    aColorRgbLoc,
    posVerts,
    colorVerts,
    vao,
    N
  }
) {
  console.log({shaderProgram, vao})
  gl.useProgram(shaderProgram);
  gl.bindVertexArray(vao)
  gl.drawArrays(gl.TRIANGLES, 0, N);
  gl.bindVertexArray(null)
  gl.useProgram(null);
}


async function setupTrianglesOnZequals0Shaders(gl) {

  const {vShaderTxt, fShaderTxt}
	= await getTrianglesOnZequals0Shaders(
	  drawTrianglesOnZequals0Config
	)

  // ----------------------------------------------------
  // Create Program
  // ----------------------------------------------------
  // // For clarity
  // writeTextToDomSelector(vShaderTxt, '#vShader code')
  // writeTextToDomSelector(fShaderTxt, '#fShader code')
  const vShader = compileShader(gl, vShaderTxt, gl.VERTEX_SHADER)
  const fShader = compileShader(gl, fShaderTxt, gl.FRAGMENT_SHADER)
  const shaderProgram = linkShaders(
    gl, vShader, fShader, true
  )

  // ----------------------------------------------------
  // Extract Program Pointers
  // ----------------------------------------------------
  gl.useProgram(shaderProgram);
  const aPositionLoc
	= gl.getAttribLocation(
	  shaderProgram, "aPosition"
	)
  , aColorRgbLoc
	= gl.getAttribLocation(
	  shaderProgram, "aColorRgb"
	)

  // This is just a boilerplate to use for getting
  // uniforms.
  // , uPointSizeLoc	= gl.getUniformLocation(
  //   shaderProgram,
  //   "uPointSize"
  // )

  gl.useProgram(null);

  return {
    shaderProgram, aPositionLoc, aColorRgbLoc
  }
}  

async function getTrianglesOnZequals0Shaders(
  {vShaderUrl, fShaderUrl}
) {
  return {
    vShaderTxt: await cachedLoad(
      './shaders/trianglesAtZequals0.vertex.glsl',
      'text'
    ),
    fShaderTxt: await cachedLoad(
      './shaders/trianglesAtZequals0.fragment.glsl',
      'text'
    )
  }
}

function bindTrianglesOnZequals0VertexArray(
  gl,
  {
    shaderProgram,
    aPositionLoc,
    aColorRgbLoc,
    vao,
    posVerts,
    colorVerts,
  }
) {
  // ----------------------------------------------------
  // Bind Program Pointers to Data & Buffers
  // ----------------------------------------------------

  //Activate the Shader
  gl.useProgram(shaderProgram);
  gl.bindVertexArray(vao);

  // Uniforms
  // ----------------------------------------------------
  // Store data to the shader's uniform variable
  // uPointSize
  // gl.uniform1f(uPointSizeLoc, pointSize);

  // r = fgColor.r
  // g = fgColor.g
  // b = fgColor.b
  // a = fgColor.a
  // console.log({fgColor: [r,g,b,a]})
  // gl.uniform3fv(uFgColorRgbLoc, new Float32Array([r,g,b]));


  // Attributes
  // ----------------------------------------------------
  // Tell gl which buffer we want to use at the moment
  gl.bindBuffer(gl.ARRAY_BUFFER, posVerts);
  // Set which buffer the attribute will pull its data from
  gl.vertexAttribPointer(aPositionLoc,3,gl.FLOAT,false,0,0);

  // Tell gl which buffer we want to use at the moment
  gl.bindBuffer(gl.ARRAY_BUFFER, colorVerts);
  // Set which buffer the attribute will pull its data from
  gl.vertexAttribPointer(aColorRgbLoc,3,gl.FLOAT,false,0,0);

  // Enable the attributes in the shader. (Because they
  // are disabled by default! Probably some code
  // optimisation)
  gl.enableVertexAttribArray(aPositionLoc);
  gl.enableVertexAttribArray(aColorRgbLoc);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindVertexArray(null);
  // Done setting up the buffer
  // ----------------------------------------------------

  gl.useProgram(shaderProgram);
}
