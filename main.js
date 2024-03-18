async function main() {
  const sel = '#myCanvas'
  canvasSetup(sel, 'webgl2')
  const {canvas, ctx:gl, bb} = getCanvas(sel, 'webgl2', {
    alpha: true
  })

  console.log({canvas, gl, bb})

  // const {
  //   shaderProgram,
  //   aPositionLoc,
  //   aColorRgbLoc,
  //   posVerts,
  //   colorVerts,
  //   vao,
  //   N,
  // } = await getReferenceTrianglesDrawSetup(gl)

  // gl.clearColor(0,0,0,0)
  // // Clear Buffers
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // drawReferenceTriangles(gl, {
  //   shaderProgram,
  //   aPositionLoc,
  //   aColorRgbLoc,
  //   posVerts,
  //   colorVerts,
  //   vao,
  //   N,
  // })

  const {drawFn: drawReferenceTriangles}
	= await getReferenceTrianglesDrawSetup(gl)

  gl.clearColor(0,0,0,0)
  // Clear Buffers
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  drawReferenceTriangles()
}
