# Shader Program

Abstraction that helps out with compiling shader programs, reflecting over attributes/uniforms, and setting uniforms. Pulled out from other code I had, since I'm tired of copy/pasting it.

## Usage

`shader-program.js` can be used as a commonjs module or as a standalone javascript file, adding `ShaderProgram` to the global scope.

- `new ShaderProgram(gl, vertex, fragment, attribLocs=null)`. `gl` should be a WebGL context. `vertex` and `fragment` should either be the shader source or the id's of elements that contain the shader source. `attribLocs` is an optional object where the keys are attribute names, and the values are the locations where they should be bound to.
- On `ShaderProgram` intances, the following properties are available:
	- `vertexSource`: Vertex shader source string.
	- `fragmentSource`: Fragment shader source string.
	- `gl`: GL context provided at creation
	- `attribLocs`: attribute locations provided at construction.
	- `program`: Shader program handle
	- `uniforms`: Object where the keys are the names of active uniforms, and the values are Objects containing `{name, size, type, loc}`.
	- `attributes`: Object where the keys are the names of active attributes, and the values are Objects containing `{name, size, type, loc}`.
- `ShaderProgram.prototype.destroy()`: delete the shader program.
- `ShaderProgram.prototype.use()`: same as `this.gl.useProgram(this.program)`.
- `ShaderProgram.prototype.unuse()`: same as `this.gl.useProgram(null)`. Rarely necessary.
- `ShaderProgram.prototype.uniformActive(name)`: returns true if there is an active uniform named `name`.
- `ShaderProgram.prototype.uniform1f(name, x)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform2f(name, x, y)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform3f(name, x, y, z)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform4f(name, x, y, z, w)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform1i(name, x)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform2i(name, x, y)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform3i(name, x, y, z)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform4i(name, x, y, z, w)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform1fv(name, arr)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform2fv(name, arr)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform3fv(name, arr)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform4fv(name, arr)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform1iv(name, arr)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform2iv(name, arr)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform3iv(name, arr)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniform4iv(name, arr)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniformMatrix1fv(name, m)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniformMatrix2fv(name, m)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniformMatrix3fv(name, m)`: Does what it sounds like, but only if `name` is an active uniform.
- `ShaderProgram.prototype.uniformMatrix4fv(name, m)`: Does what it sounds like, but only if `name` is an active uniform.

## License

The MIT License (MIT)

Copyright (c) 2016 Thom Chiovoloni

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
