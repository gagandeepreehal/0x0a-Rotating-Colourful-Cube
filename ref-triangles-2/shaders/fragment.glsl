#version 300 es

precision mediump float;

in vec3 fColorRgb;

out vec4 finalColor;

void main(void) {
  finalColor = vec4(fColorRgb, 1.0);
}