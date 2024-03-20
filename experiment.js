class Experiment {
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

  static generateData(N, redundancy=6) {
    const data = {
      pos : getRandomTriangles(N, redundancy, [-1.5,1.5]),
      colors : getRandomColorsRgb(N,3),
    }
    console.log({data})
    return data
  }
}
