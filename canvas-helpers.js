// let getDom = (...args) => (document.querySelector(...args))
const getDom = document.querySelector.bind(document)

function canvasSetup(sel) {
  const canvas = getDom(sel)

  const {width: W, height: H} = canvas.getBoundingClientRect()
  canvas.width = parseFloat(W)
  canvas.height = parseFloat(H)
}

function getCanvas(sel, context='2d') {
  const canvas = getDom(sel)
  return {
    canvas,
    ctx: canvas.getContext(context),
    bb: canvas.getBoundingClientRect()
  }
}
