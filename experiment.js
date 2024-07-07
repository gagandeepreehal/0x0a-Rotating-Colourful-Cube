class Experiment {
  // Candidate Details
  static rollNo = '101917045'
  static name = 'Gagandeep Singh Reehal'

  #gl
  #programs=[]

  canvasSel = '#myCanvas'
  cameraControls

  constructor() {
    const Cls = this.constructor

    this.controls
      = new Controls('#controls', {
	submitSel: '#controls-submit'
      })

    // const handleCamera = this.handleCamera.bind(this)
    // this.cameraControls.el.addEventListener(
    //   'update', handleCamera
    // )
    // this.cameraControls.el.addEventListener(
    //   'submit', handleCamera
    // )

    // Uncomment to enable tranform controls
    // --------------------------------------------------
    this.controls.unhide()

    const {inputs} = this.controls
    console.log({inputs})
  }

  async setupPrograms(gl) {
    this.#gl = gl
    const Cls = this.constructor
    await RefTriangles2.bootstrap()

    const data = Cls.generateData(80)

    try {
      const refTriangles2 = new RefTriangles2(gl, data)
      this.#programs.push(refTriangles2)

    } catch (e) {
      console.error(e)
    }
    
  }

  loop(ms) {
    const gl = this.#gl

    const {inputs} = this.controls
    // console.log({handleCamera:true, inputs})

    gl.clearColor(0,0,0,0)
    // Clear Buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    for (const program of this.#programs) {
      program.draw(ms, inputs)
    }
  }

  // static generateData(N, redundancy=6) {
    
    
  //   const data = {
  //     pos : getRandomTriangles(N, redundancy, [-1.5,1.5]),
  //     colors : getRandomColorsRgb(N,3),
  //   }
  //   console.log({data})
  //   return data
  // }

  static generateData(N) {
    const vertices = [
      // Front face
      [-0.5, -0.5, 0.5],  // 0
      [0.5, -0.5, 0.5],   // 1
      [0.5, 0.5, 0.5],    // 2
      [-0.5, 0.5, 0.5],   // 3

      // Back face
      [-0.5, -0.5, -0.5], // 4
      [0.5, -0.5, -0.5],  // 5
      [0.5, 0.5, -0.5],   // 6
      [-0.5, 0.5, -0.5],  // 7
    ];

    const colors = [
      [1.0, 0.0, 0.0],  // Red
      [0.0, 1.0, 0.0],  // Green
      [0.0, 0.0, 1.0],  // Blue
      [1.0, 1.0, 0.0],  // Yellow
      [1.0, 0.0, 1.0],  // Magenta
      [0.0, 1.0, 1.0],  // Cyan
      [1.0, 1.0, 1.0],  // White
      [0.5, 0.5, 0.5],  // Gray
    ];

    const indices = [
      [0, 1, 2, 0, 2, 3],    // Front face
      [4, 5, 6, 4, 6, 7],    // Back face
      [1, 5, 6, 1, 6, 2],    // Right face
      [0, 4, 7, 0, 7, 3],    // Left face
      [3, 2, 6, 3, 6, 7],    // Top face
      [0, 1, 5, 0, 5, 4],    // Bottom face
    ];

    const pos = [];
    const posColors = [];

    for (let face = 0; face < indices.length; ++face) {
      const triangle = indices[face];
      const color = colors[face];

      for (let vertexIndex of triangle) {
        const vertex = vertices[vertexIndex];
        pos.push(...vertex);
        posColors.push(...color);
      }
    }

    console.log({ pos, posColors });

    return { pos, colors: posColors };
  }
  
}
