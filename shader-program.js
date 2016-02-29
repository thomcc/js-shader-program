var ShaderProgram = (function() {
	'use strict';

	function ShaderProgram(gl, vertex, fragment, attribLocs) {
		var ve = document.getElementById(vertex);
		if (ve) {
			vertex = ve.textContent;
		}
		var fe = document.getElementById(fragment);
		if (fe) {
			fragment = fe.textContent;
		}

		this.vertexSource = vertex;
		this.fragmentSource = fragment;
		this.attribLocs = attribLocs;
		this.gl = gl;

		this.program = null;
		this.uniforms = {};
		this.attributes = {};

		compile(this);
	}

	function compile(self) {
		var gl = self.gl;
		function compileShader(src, typestr) {
			var shader = gl.createShader(gl[typestr]);
			gl.shaderSource(shader, src);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.error("Failed to compile "+typestr+": "+gl.getShaderInfoLog(shader));
			}
			return shader;
		}
		var fs = compileShader(self.fragmentSource, 'FRAGMENT_SHADER');
		var vs = compileShader(self.vertexSource, 'VERTEX_SHADER');

		var program = gl.createProgram();
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);

		if (self.attribLocs) {
			Object.keys(self.attribLocs).forEach(function(attrib) {
				var loc = self.attribLocs[attrib];
				gl.bindAttribLocation(program, loc, attrib);
			});
		}

		gl.linkProgram(program);
		gl.deleteShader(vs);
		gl.deleteShader(fs);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error("shader link failed: program info log:\n"+gl.getProgramInfoLog(program));
		}

		if (self.program) {
			gl.deleteProgram(self.program);
		}
		self.program = program;


		var uniforms = self.uniforms = {};
		var len = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) || 0;
		for (var i = 0; i < len; ++i) {
			var info = gl.getActiveUniform(program, i);
			if (info) {
				uniforms[info.name] = {
					name: info.name,
					size: info.size,
					type: info.type,
					loc: gl.getUniformLocation(program, info.name)
				};
			}
		}

		var attributes = self.attributes = {}
		var len = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES) || 0;
		for (var i = 0; i < len; ++i) {
			var info = gl.getActiveAttrib(program, i);
			if (info) {
				attributes[info.name] = {
					name: info.name,
					size: info.size,
					type: info.type,
					loc: gl.getAttribLocation(program, info.name)
				};
			}
		}
	}

	ShaderProgram.prototype.destroy = function() {
		this.uniforms = {};
		this.attributes = {};
		if (this.program) {
			this.gl.deleteProgram(this.program);
			this.program = null;
		}
	};

	ShaderProgram.prototype.use = function() { this.gl.useProgram(this.program); };
	ShaderProgram.prototype.unuse = function() { this.gl.useProgram(null); }

	ShaderProgram.prototype.uniformActive = function(name) { return !!this.uniforms[name]; };

	ShaderProgram.prototype.uniform1f = function(name, x)          { var u = this.uniforms[name]; if (u) this.gl.uniform1f(u.loc, x); };
	ShaderProgram.prototype.uniform2f = function(name, x, y)       { var u = this.uniforms[name]; if (u) this.gl.uniform2f(u.loc, x, y); };
	ShaderProgram.prototype.uniform3f = function(name, x, y, z)    { var u = this.uniforms[name]; if (u) this.gl.uniform3f(u.loc, x, y, z); };
	ShaderProgram.prototype.uniform4f = function(name, x, y, z, w) { var u = this.uniforms[name]; if (u) this.gl.uniform4f(u.loc, x, y, z, w); };

	ShaderProgram.prototype.uniform1i = function(name, x)          { var u = this.uniforms[name]; if (u) this.gl.uniform1i(u.loc, x); };
	ShaderProgram.prototype.uniform2i = function(name, x, y)       { var u = this.uniforms[name]; if (u) this.gl.uniform2i(u.loc, x, y); };
	ShaderProgram.prototype.uniform3i = function(name, x, y, z)    { var u = this.uniforms[name]; if (u) this.gl.uniform3i(u.loc, x, y, z); };
	ShaderProgram.prototype.uniform4i = function(name, x, y, z, w) { var u = this.uniforms[name]; if (u) this.gl.uniform4i(u.loc, x, y, z, w); };

	ShaderProgram.prototype.uniform1fv = function(name, arr) { var u = this.uniforms[name]; if (u) this.gl.uniform1fv(u.loc, arr); };
	ShaderProgram.prototype.uniform2fv = function(name, arr) { var u = this.uniforms[name]; if (u) this.gl.uniform2fv(u.loc, arr); };
	ShaderProgram.prototype.uniform3fv = function(name, arr) { var u = this.uniforms[name]; if (u) this.gl.uniform3fv(u.loc, arr); };
	ShaderProgram.prototype.uniform4fv = function(name, arr) { var u = this.uniforms[name]; if (u) this.gl.uniform4fv(u.loc, arr); };

	ShaderProgram.prototype.uniform1iv = function(name, arr) { var u = this.uniforms[name]; if (u) this.gl.uniform1iv(u.loc, arr); };
	ShaderProgram.prototype.uniform2iv = function(name, arr) { var u = this.uniforms[name]; if (u) this.gl.uniform2iv(u.loc, arr); };
	ShaderProgram.prototype.uniform3iv = function(name, arr) { var u = this.uniforms[name]; if (u) this.gl.uniform3iv(u.loc, arr); };
	ShaderProgram.prototype.uniform4iv = function(name, arr) { var u = this.uniforms[name]; if (u) this.gl.uniform4iv(u.loc, arr); };

	ShaderProgram.prototype.uniformMatrix1fv = function(name, m) { var u = this.uniforms[name]; if (u) this.gl.uniformMatrix1fv(u.loc, false, m); };
	ShaderProgram.prototype.uniformMatrix2fv = function(name, m) { var u = this.uniforms[name]; if (u) this.gl.uniformMatrix2fv(u.loc, false, m); };
	ShaderProgram.prototype.uniformMatrix3fv = function(name, m) { var u = this.uniforms[name]; if (u) this.gl.uniformMatrix3fv(u.loc, false, m); };
	ShaderProgram.prototype.uniformMatrix4fv = function(name, m) { var u = this.uniforms[name]; if (u) this.gl.uniformMatrix4fv(u.loc, false, m); };

	return ShaderProgram;
}());


if (typeof module !== 'undefined' && module.exports) {
	module.exports = ShaderProgram;
}
