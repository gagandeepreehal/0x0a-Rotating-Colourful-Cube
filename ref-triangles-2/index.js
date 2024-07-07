class RefTriangles2 {
  #gl = null
  #inputs = null

  vao
  buffers
  shader
  N

  static vShaderUrl = './shaders/vertex.glsl'
  static fShaderUrl = './shaders/fragment.glsl'
  static scriptName = document.currentScript.src
  static vShaderTxt = ''
  static fShaderTxt = ''

  constructor (gl, {pos, colors}) {
    this.#gl = gl
    
    if (pos.length !== colors.length) {
      throw new TypeError({
	pos: pos.length,
	required:'equal',
	colors: colors.length
      })
    }

    // Num elements required to be rendered
    this.N = pos.length

    // Compile program to memory
    // --------------------------------------------------
    this.setupShaders()

    // Copy data to memory 
    // --------------------------------------------------
    this.setupBuffers({pos, colors})

    // Setup memory mapping
    // --------------------------------------------------
    this.setupVao()
  }

  // setupShaders() {
  //   const gl = this.#gl
  //   const {vShaderTxt, fShaderTxt} = this.constructor

  //   console.log("VERTEX_SHADER")
  //   console.log(vShaderTxt)
  //   console.log("FRAGMENT_SHADER")
  //   console.log(fShaderTxt)

  //   // ----------------------------------------------------
  //   // Create Program
  //   // ----------------------------------------------------
  //   // // For clarity
  //   // writeTextToDomSelector(vShaderTxt, '#vShader code')
  //   // writeTextToDomSelector(fShaderTxt, '#fShader code')
  //   const vShader = compileShader(gl, vShaderTxt, gl.VERTEX_SHADER)
  //   const fShader = compileShader(gl, fShaderTxt, gl.FRAGMENT_SHADER)
  //   const shaderProgram = linkShaders(
  //     gl, vShader, fShader, true
  //   )

  //   // ----------------------------------------------------
  //   // Extract Program Pointers
  //   // ----------------------------------------------------
  //   gl.useProgram(shaderProgram);
  //   const aPositionLoc
	//   = gl.getAttribLocation(
	//     shaderProgram, "aPosition"
	//   )
  //   , aColorRgbLoc
	//   = gl.getAttribLocation(
	//     shaderProgram, "aColorRgb"
	//   )

  //   // This is just a boilerplate to use for getting
  //   // uniforms.
  //   // , uPointSizeLoc	= gl.getUniformLocation(
  //   //   shaderProgram,
  //   //   "uPointSize"
  //   // )

  //   gl.useProgram(null);

  //   this.shader = {
  //     program: shaderProgram,
  //     attributes: {
	// aPosition: aPositionLoc,
	// aColorRgb: aColorRgbLoc,
  //     },
  //     uniforms: {
	// // uPointSize: uPointSizeLoc,
  //     }
  //   }

  //   console.log({shader:this.shader})
  // }

  setupShaders() {
    const gl = this.#gl
    const {vShaderTxt, fShaderTxt} = this.constructor
  
    console.log("VERTEX_SHADER")
    console.log(vShaderTxt)
    console.log("FRAGMENT_SHADER")
    console.log(fShaderTxt)
  
    // Create Program
    const vShader = compileShader(gl, vShaderTxt, gl.VERTEX_SHADER)
    const fShader = compileShader(gl, fShaderTxt, gl.FRAGMENT_SHADER)
    const shaderProgram = linkShaders(gl, vShader, fShader, true)
  
    // Extract Program Pointers
    gl.useProgram(shaderProgram);
    const aPositionLoc = gl.getAttribLocation(shaderProgram, "aPosition")
    const aColorRgbLoc = gl.getAttribLocation(shaderProgram, "aColorRgb")
    const uModelMatrixLoc = gl.getUniformLocation(shaderProgram, "uModelMatrix")
    const uViewMatrixLoc = gl.getUniformLocation(shaderProgram, "uViewMatrix")
    const uProjectionMatrixLoc = gl.getUniformLocation(shaderProgram, "uProjectionMatrix")
  
    gl.useProgram(null);
  
    this.shader = {
      program: shaderProgram,
      attributes: {
        aPosition: aPositionLoc,
        aColorRgb: aColorRgbLoc,
      },
      uniforms: {
        uModelMatrix: uModelMatrixLoc,
        uViewMatrix: uViewMatrixLoc,
        uProjectionMatrix: uProjectionMatrixLoc,
      }
    }
  
    console.log({shader: this.shader})
  }

  setupBuffers({pos, colors}) {
    const gl = this.#gl

    pos = pos.flat()
    colors = colors.flat()

    const {pos: posVerts, colors: colorVerts}
	  = setupDataBuffers(gl, {pos, colors})

    this.buffers = {
      pos: posVerts, colors: colorVerts
    }

    console.log({buffers:this.buffers})

  }

  // setupVao() {
  //   const gl = this.#gl

  //   const {
  //     program,
  //     attributes: {
	// aPosition, aColorRgb
  //     }
  //   } = this.shader

  //   const {pos, colors} = this.buffers

  //   const vao = gl.createVertexArray()

  //   // ----------------------------------------------------
  //   // Bind Program Pointers to Data & Buffers
  //   // ----------------------------------------------------

  //   //Activate the Shader
  //   gl.useProgram(program);
  //   gl.bindVertexArray(vao);

  //   // Uniforms
  //   // ----------------------------------------------------
  //   // Store data to the shader's uniform variable
  //   // uPointSize
  //   // gl.uniform1f(uPointSizeLoc, pointSize);

  //   // r = fgColor.r
  //   // g = fgColor.g
  //   // b = fgColor.b
  //   // a = fgColor.a
  //   // console.log({fgColor: [r,g,b,a]})
  //   // gl.uniform3fv(uFgColorRgbLoc, new Float32Array([r,g,b]));


  //   // Attributes
  //   // ----------------------------------------------------
  //   // Tell gl which buffer we want to use at the moment
  //   gl.bindBuffer(gl.ARRAY_BUFFER, pos);
  //   // Set which buffer the attribute will pull its data from
  //   gl.vertexAttribPointer(aPosition,3,gl.FLOAT,false,0,0);

  //   // Tell gl which buffer we want to use at the moment
  //   gl.bindBuffer(gl.ARRAY_BUFFER, colors);
  //   // Set which buffer the attribute will pull its data from
  //   gl.vertexAttribPointer(aColorRgb,3,gl.FLOAT,false,0,0);

  //   // Enable the attributes in the shader. (Because they
  //   // are disabled by default! Probably some code
  //   // optimisation)
  //   gl.enableVertexAttribArray(aPosition);
  //   gl.enableVertexAttribArray(aColorRgb);

  //   gl.bindBuffer(gl.ARRAY_BUFFER, null);
  //   gl.bindVertexArray(null);
  //   // Done setting up the buffer
  //   // ----------------------------------------------------

  //   // gl.bindVertexArray(null);
  //   gl.useProgram(null);

  //   this.vao = vao

  //   console.log({vao:this.vao})
  // }


  setupVao() {
    const gl = this.#gl;
  
    const {
          program,
          attributes: {
            aPosition, aColorRgb
          },
          uniforms: {
            uModelMatrix, uViewMatrix, uProjectionMatrix
          }
        } = this.shader
      
    const {pos, colors} = this.buffers

    const vao = gl.createVertexArray();
  //  console.log("Position buffer size:", pos.length);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
  
    // Bind position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, pos);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
  
    // Bind color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, colors);
    gl.vertexAttribPointer(aColorRgb, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aColorRgb);
  
    // Unbind buffers and VAO
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
    gl.useProgram(null);
  
    this.vao = vao;
  
    console.log({ vao: this.vao });
      // Log buffer sizes
  // console.log("Position buffer size:", pos.byteLength);
  // console.log("Color buffer size:", colors.byteLength);

  // console.log("VAO setup complete:", this.vao);
  }
  static async bootstrap() {
    const Cls = this
    
    if (Cls.vShaderUrl instanceof URL === false) {
      Cls.vShaderUrl = new URL(Cls.vShaderUrl, Cls.scriptName)
    }
    if (Cls.fShaderUrl instanceof URL === false) {
      Cls.fShaderUrl = new URL(Cls.fShaderUrl, Cls.scriptName)
    }

    console.log({
      vShaderUrl: Cls.vShaderUrl,
      fShaderUrl: Cls.fShaderUrl,
    })

    Cls.vShaderTxt = await cachedLoad(
      Cls.vShaderUrl, 'text'
    )
    Cls.fShaderTxt = await cachedLoad(
      Cls.fShaderUrl, 'text'
    )
  }


 
  draw(ms, inputs) {
    this.#debugInputs(inputs)
    const gl = this.#gl
    const N = this.N
    const vao = this.vao
  
    const {
      program,
      uniforms: {
        uModelMatrix, uViewMatrix, uProjectionMatrix
      }
    } = this.shader
  
    // Compute transformation matrices
    
  
    const viewMatrix = mat4.create()
    if (inputs.isCamTranslate) {
      mat4.translate(viewMatrix, viewMatrix, [inputs.x, inputs.y, inputs.z])
    }
    // console.log({viewMatrix})
    if (inputs.isCamRotate) {
      mat4.rotateX(viewMatrix, viewMatrix, inputs.pitchRadians)
      mat4.rotateY(viewMatrix, viewMatrix, inputs.yawRadians)
      mat4.rotateZ(viewMatrix, viewMatrix, inputs.rollRadians)
    }
    console.log({viewMatrix})
  
    // Continuous rotation

    // Ensure ms and cubeRpm are valid numbers
    // console.log('ms:', ms);
    // console.log('cubeRpm:', inputs.cubeRpm);

    const angle = ms * inputs.cubeRpm * 0.06 * (Math.PI / 180); // Converts rpm to radians per millisecond

    // console.log('angle:', angle);

    const modelMatrix = mat4.create();
    mat4.rotateY(modelMatrix, modelMatrix, angle);

    console.log({modelMatrix})
     // Ensure inputs are valid numbers
  const isValidNumber = (num) => typeof num === 'number' && !isNaN(num) && isFinite(num);

  if (!isValidNumber(inputs.camfov) || inputs.camfov<=0) {
    // console.error('Invalid camfov value:', inputs.camfov);
    inputs.camfov = Math.PI / 4; // Default to 45 degrees if invalid
  }
  if (!isValidNumber(inputs.camNear) || inputs.camNear <= 0) {
    // console.error('Invalid camNear value:', inputs.camNear);
    inputs.camNear = 0.002; // Default to 0.1 if invalid
  }
  if (!isValidNumber(inputs.camFar) || inputs.camFar <= inputs.camNear) {
    // console.error('Invalid camFar value:', inputs.camFar);
    inputs.camFar = 0.1; // Default to 1000 if invalid
  }

  const aspectRatio = gl.canvas.width / gl.canvas.height;
  if (!isValidNumber(aspectRatio) || aspectRatio <= 0) {
    console.error('Invalid aspect ratio:', aspectRatio);
    // Default aspect ratio
  }

  const projectionMatrix = mat4.create();
  if (inputs.isCamPerspective) {
    mat4.perspective(projectionMatrix, inputs.camfov, gl.canvas.width / gl.canvas.height, inputs.camNear, inputs.camFar);
  } else {
    mat4.ortho(projectionMatrix, -1, 1, -1, 1, inputs.camNear, inputs.camFar);
  }
  // console.log(gl.canvas.width / gl.canvas.height);
  console.log({ projectionMatrix });
  // console.log({ projectionMatrix });
  // Compute transformation matrices

    // Set the uniforms
    gl.useProgram(program);
    gl.uniformMatrix4fv(uModelMatrix, false, modelMatrix);
    gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix);
    gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);
  
    gl.bindVertexArray(this.vao)
    // gl.drawElements(gl.TRIANGLES, N, gl.UNSIGNED_SHORT, 0);
    gl.drawArrays(gl.TRIANGLES, 0, this.N);
    gl.bindVertexArray(null)
    gl.useProgram(null);
  }

  #debugInputs(inputs) {
    if (!deepEqual(inputs, this.#inputs)) {
      // console.log({inputs})
    }
    this.#inputs = inputs
  }
  
}

/**
 * Deep Equal for object comparison.
 *
 * Adapted from this SO exchange:
 * https://stackoverflow.com/a/32922084
 */
function deepEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}
