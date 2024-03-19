// ----------------------------------------------------
// Canvas
// ----------------------------------------------------

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


// ----------------------------------------------------
// URL/ Path
// ----------------------------------------------------
function currentScript() {
  const domel = document.currentScript
  , location = domel.src
  return {domel, location}
}

// ----------------------------------------------------
// Random Triangles Using d3-delaunay
//
// https://d3js.org/d3-delaunay/delaunay#Delaunay
// ----------------------------------------------------
// const delaunay = new d3.Delaunay(
//   Float64Array.of(0, 0, 0, 1, 1, 0, 1, 1));
// const {points, triangles} = delaunay;
// const t0 = triangles[i * 3 + 0];
// const t1 = triangles[i * 3 + 1];
// const t2 = triangles[i * 3 + 2];
// context.moveTo(points[t0 * 2], points[t0 * 2 + 1]);
// context.lineTo(points[t1 * 2], points[t1 * 2 + 1]);
// context.lineTo(points[t2 * 2], points[t2 * 2 + 1]);
// context.closePath();
function getRandomTriangles(n, redundancyFactor=3) {
  const N = n * 2 * redundancyFactor
  const arr = [...Array(N)].map(Math.random)

  const delaunay = new d3.Delaunay(
    new Float64Array(arr))
  const {points, triangles} = delaunay
  const pos = []

  for (const i of getRandomIndices(n, N>>1)) {
    const t0 = triangles[i * 3 + 0];
    const t1 = triangles[i * 3 + 1];
    const t2 = triangles[i * 3 + 2];
    pos.push(
      [points[t0 * 2], points[t0 * 2 + 1], 0],
      [points[t1 * 2], points[t1 * 2 + 1], 0],
      [points[t2 * 2], points[t2 * 2 + 1], 0],
    )
  }

  return pos
}

// ----------------------------------------------------
// Random Indices
// ----------------------------------------------------
function getRandomIndices(n, N) {
  const I = [...Array(n+10)]
	.map(()=>~~(Math.random()*N))
	.toSorted()
	.filter((el, i, A) => (0<i) && (el != A[i-1]))
	.slice(0,n)
  return I
}

// ----------------------------------------------------
// Random Colors
// ----------------------------------------------------
function getRandomColorsRgb(n, repeats=1) {
  const N = n * 3
  const arr = [...Array(N)].map(Math.random)
  repeats = Math.max(1, repeats)

  const colors = []
  for (const i of range(n)) {
    colors.push(
      ...Array(repeats)
	.fill([...arr.slice(i*3,(i+1)*3)])
    )
  }

  return colors
}

// ----------------------------------------------------
// Range
// ----------------------------------------------------
function range(a,b) {
  if (b === undefined || b === null) {
    return range(0, a)
  }
  if (b<=0) return []
  if (0<a) return range(0, b-a).map(x=>a+x)
  return [...Array(b).keys()]
}
