# 0x0a : Rotating Colourful Cube #

|                  |                              |
|------------------|------------------------------|
| Code             | 0x0a                         |
| Submission Opens | Wed 24 Apr 2024 17:00 hrs    |
| Deadline         | Mon 29 Apr 2024 08:00 hrs    |
| Weightage        | 2 marks                      |

## Assignment ##

Recall the [003-gl
exercise](https://github.com/tiet-ucs505/003-gl) to
draw points, lines and triads with WebGL.

The objective is to 
+ Create a canonical cube of side length 2 units placed
  at (-1,-1,-1);
+ Looked at towards its center from a given position,
  so that the up-vector always pointing towards the +Z
  of the model; and
+ Render it with WebGL.

### Given : A reference render pipeline for triangle ###

Draw a triangle $\Delta PQR$ with its vertex positions
given as,

$$\begin{align}\notag
\begin{bmatrix}\mathbf{p}&\mathbf{q}&\mathbf{r}
\end{bmatrix}& \equiv
\begin{bmatrix}0.5&0&-0.5\\0.5&-0.5&0.5\\0&0&0
\end{bmatrix}\end{align}$$

Create a vertex buffer 

## Resources ##

1. [MDN WebGL
   Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial)
   simple but effective.
2. [The Red
   Book](https://www.cs.utexas.edu/users/fussell/courses/cs354/handouts/Addison.Wesley.OpenGL.Programming.Guide.8th.Edition.Mar.2013.ISBN.0321773039.pdf) :
   A very good overall coverage.  Especially what
   transformations mean *w.r.t.* the Standard Graphics
   pipeline.
2. [WebGL
   Workshop](https://github.com/stackgl/webgl-workshop)
   to get started with WebGL.
2. [Shader
   School](https://github.com/stackgl/shader-school) to
   understand GLSL.
3. Both the Tutorials listed above are on [Node
   School](https://nodeschool.io/), which is a general
   collection of tutorials for javascript based
   programming.
4. [Cheatsheets from
   Khronos](https://www.khronos.org/developers/reference-cards/),
   look for WebGL and follow the link to Slideshare, to
   access a downloadable copy.
5. [Linear Algebra and
   Transformations](https://www.3blue1brown.com/topics/linear-algebra)
   by Grant Sanderson.
