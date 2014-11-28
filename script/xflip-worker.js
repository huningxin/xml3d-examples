/**
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@version: DEVELOPMENT SNAPSHOT (16.11.2014 15:59:52 CST)
**/
XML3D = {};
XML3D.math = {};
XML3D.debug = {};
XML3D.debug.logError = function(msg){
    self.postMessage({type: "error", msg: msg})
};
XML3D.debug.logWarning = function(msg){
    self.postMessage({type: "warning", msg: msg})
};
var exports = XML3D.math;
window = this;
// Add convienent array methods if non-existant
if (!Array.forEach) {
    Array.forEach = function(array, fun, thisp) {
        var len = array.length;
        for ( var i = 0; i < len; i++) {
            if (i in array) {
                fun.call(thisp, array[i], i, array);
            }
        }
    };
}
if (!Array.map) {
    Array.map = function(array, fun, thisp) {
        var len = array.length;
        var res = [];
        for ( var i = 0; i < len; i++) {
            if (i in array) {
                res[i] = fun.call(thisp, array[i], i, array);
            }
        }
        return res;
    };
}
if (!Array.filter) {
    Array.filter = function(array, fun, thisp) {
        var len = array.length;
        var res = [];
        for ( var i = 0; i < len; i++) {
            if (i in array) {
                var val = array[i];
                if (fun.call(thisp, val, i, array)) {
                    res.push(val);
                }
            }
        }
        return res;
    };
}

if (!Array.erase) {
    Array.erase = function(array, object) {
        var erased = false;
        var idx = -1;
        while( (idx = array.indexOf(object) ) != -1){
            array.splice(idx, 1);
            erased = true;
        }
        return erased;
    };
}

if (!Array.set) {
    Array.set = function(array, offset, value) {
        for (var i=0; i < value.length; i++)
            array[offset+i] = value[i];
    };
}

if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) == '[object Array]';
    };
}
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.0
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  shim.exports = _global;

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }

        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }

        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }

        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }

        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }

        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }

        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }

    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a1 * b2;
    out[1] = a0 * b1 + a1 * b3;
    out[2] = a2 * b0 + a3 * b2;
    out[3] = a2 * b1 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a1 * s;
    out[1] = a0 * -s + a1 * c;
    out[2] = a2 *  c + a3 * s;
    out[3] = a2 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v1;
    out[2] = a2 * v0;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx,ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0
 *  c, d, 0
 *  tx,ty,1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5],
        ba = b[0], bb = b[1], bc = b[2], bd = b[3],
        btx = b[4], bty = b[5];

    out[0] = aa*ba + ab*bc;
    out[1] = aa*bb + ab*bd;
    out[2] = ac*ba + ad*bc;
    out[3] = ac*bb + ad*bd;
    out[4] = ba*atx + bc*aty + btx;
    out[5] = bb*atx + bd*aty + bty;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var aa = a[0],
        ab = a[1],
        ac = a[2],
        ad = a[3],
        atx = a[4],
        aty = a[5],
        st = Math.sin(rad),
        ct = Math.cos(rad);

    out[0] = aa*ct + ab*st;
    out[1] = -aa*st + ab*ct;
    out[2] = ac*ct + ad*st;
    out[3] = -ac*st + ct*ad;
    out[4] = ct*atx + st*aty;
    out[5] = ct*aty - st*atx;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var vx = v[0], vy = v[1];
    out[0] = a[0] * vx;
    out[1] = a[1] * vy;
    out[2] = a[2] * vx;
    out[3] = a[3] * vy;
    out[4] = a[4] * vx;
    out[5] = a[5] * vy;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4] + v[0];
    out[5] = a[5] + v[1];
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }

    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[3] = xy + wz;
    out[6] = xz - wy;

    out[1] = xy - wz;
    out[4] = 1 - (xx + zz);
    out[7] = yz + wx;

    out[2] = xz + wy;
    out[5] = yz - wx;
    out[8] = 1 - (xx + yy);

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
* Calculates a 4x4 matrix from the given quaternion
*
* @param {mat4} out mat4 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat4} out
*/
mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;

    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;

    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = view[0];
        matr[5] = view[1];
        matr[8] = view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        // "from" and "to" quaternions are very close
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;

    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = (function() {
    // benchmarks:
    //    http://jsperf.com/typed-array-access-speed
    //    http://jsperf.com/conversion-of-3x3-matrix-to-quaternion

    var s_iNext = (typeof(Int8Array) !== 'undefined' ? new Int8Array([1,2,0]) : [1,2,0]);

    return function(out, m) {
        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        var fTrace = m[0] + m[4] + m[8];
        var fRoot;

        if ( fTrace > 0.0 ) {
            // |w| > 1/2, may as well choose w > 1/2
            fRoot = Math.sqrt(fTrace + 1.0);  // 2w
            out[3] = 0.5 * fRoot;
            fRoot = 0.5/fRoot;  // 1/(4w)
            out[0] = (m[7]-m[5])*fRoot;
            out[1] = (m[2]-m[6])*fRoot;
            out[2] = (m[3]-m[1])*fRoot;
        } else {
            // |w| <= 1/2
            var i = 0;
            if ( m[4] > m[0] )
              i = 1;
            if ( m[8] > m[i*3+i] )
              i = 2;
            var j = s_iNext[i];
            var k = s_iNext[j];

            fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
            out[i] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
            out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
            out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
        }

        return out;
    };
})();

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;



  })(shim.exports);
})(XML3D.math);window = this;
var Xflow = {};

(function () {
    Xflow.EPSILON = 0.000001;

    /**
     * Type of DataEntry
     * @enum
     */
    Xflow.DATA_TYPE = {
        UNKNOWN: 0,
        FLOAT: 1,
        FLOAT2: 2,
        FLOAT3: 3,
        FLOAT4: 4,
        FLOAT3X3 : 5,
        FLOAT4X4: 10,
        INT: 20,
        INT4: 21,
        BOOL: 30,
        TEXTURE: 40,
        BYTE: 50,
        UBYTE: 60
    };

    Xflow.DATA_TYPE_MAP = {
        'float': Xflow.DATA_TYPE.FLOAT,
        'float2': Xflow.DATA_TYPE.FLOAT2,
        'float3': Xflow.DATA_TYPE.FLOAT3,
        'float4': Xflow.DATA_TYPE.FLOAT4,
        'float3x3' : Xflow.DATA_TYPE.FLOAT3X3,
        'float4x4': Xflow.DATA_TYPE.FLOAT4X4,
        'int': Xflow.DATA_TYPE.INT,
        'int4': Xflow.DATA_TYPE.INT4,
        'bool': Xflow.DATA_TYPE.BOOL,
        'texture': Xflow.DATA_TYPE.TEXTURE,
        'byte': Xflow.DATA_TYPE.BYTE,
        'ubyte': Xflow.DATA_TYPE.UBYTE
    };

    // Values are chosen to be in line with DATA_TYPE
    Xflow.TEXTURE_TYPE = {
        UNKNOWN: 0,
        FLOAT: 1,
        UBYTE: 60,
        USHORT_5_6_5: 70,
        USHORT_4_4_4_4: 71,
        USHORT_5_5_5_1: 72
    };

    Xflow.TEXTURE_FORMAT = {
        UNKNOWN: 0,
        ALPHA: 100,
        RGB: 101,
        RGBA: 102,
        LUMINANCE: 103,
        LUMINANCE_ALPHA: 104
    };

    Xflow.DATA_TYPE_TUPLE_SIZE = {};
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.FLOAT] = 1;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.FLOAT2] = 2;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.FLOAT3] = 3;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.FLOAT4] = 4;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.FLOAT3X3] = 9;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.FLOAT4X4] = 16;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.INT] = 1;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.INT4] = 4;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.BOOL] = 1;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.TEXTURE] = 1;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.BYTE] = 1;
    Xflow.DATA_TYPE_TUPLE_SIZE[Xflow.DATA_TYPE.UBYTE] = 1;

    Xflow.TYPED_ARRAY_MAP = {};
    Xflow.TYPED_ARRAY_MAP[Xflow.DATA_TYPE.FLOAT] = Float32Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.DATA_TYPE.FLOAT2] = Float32Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.DATA_TYPE.FLOAT3] = Float32Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.DATA_TYPE.FLOAT4] = Float32Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.DATA_TYPE.FLOAT4X4] = Float32Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.DATA_TYPE.INT] = Int32Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.DATA_TYPE.INT4] = Int32Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.DATA_TYPE.BOOL] = Int8Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.DATA_TYPE.BYTE] = Int8Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.DATA_TYPE.UBYTE] = Uint8Array;

    // texture formats
    // float and ubyte are mapped to DATA_TYPE values above
    Xflow.TYPED_ARRAY_MAP[Xflow.TEXTURE_TYPE.USHORT_4_4_4_4] = Uint16Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.TEXTURE_TYPE.USHORT_5_6_5] = Uint16Array;
    Xflow.TYPED_ARRAY_MAP[Xflow.TEXTURE_TYPE.USHORT_5_5_5_1] = Uint16Array;

    Xflow.TEXTURE_FORMAT_TUPLE_SIZE = {};
    Xflow.TEXTURE_FORMAT_TUPLE_SIZE[Xflow.TEXTURE_FORMAT.ALPHA] = 1;
    Xflow.TEXTURE_FORMAT_TUPLE_SIZE[Xflow.TEXTURE_FORMAT.RGB] = 3;
    Xflow.TEXTURE_FORMAT_TUPLE_SIZE[Xflow.TEXTURE_FORMAT.RGBA] = 4;
    Xflow.TEXTURE_FORMAT_TUPLE_SIZE[Xflow.TEXTURE_FORMAT.LUMINANCE] = 1;
    Xflow.TEXTURE_FORMAT_TUPLE_SIZE[Xflow.TEXTURE_FORMAT.LUMINANCE_ALPHA] = 2;

    Xflow.getTypeName = function (type) {
        var i;
        for (i in Xflow.DATA_TYPE_MAP) {
            if (Xflow.DATA_TYPE_MAP[i] === type) {
                return i;
            }
        }
    };

    /**
     * @enum {number}
     */
    Xflow.TEX_FILTER_TYPE = {
        NEAREST: 0x2600,
        LINEAR: 0x2601,
        MIPMAP_NEAREST: 0x2700,
        MIPMAP_LINEAR: 0x2701

    };
    /**
     * @enum {number}
     */
    Xflow.TEX_WRAP_TYPE = {
        CLAMP: 0x812F,
        REPEAT: 0x2901
    };
    /**
     * @enum {number}
     */
    Xflow.TEX_TYPE = {
        TEXTURE_2D: 0x0DE1
    };

    Xflow.SHADER_CONSTANT_KEY = {
        WORLD_TRANSFORM: 1,
        VIEW_TRANSFORM: 2,
        SCREEN_TRANSFORM: 3,
        WORLD_TRANSFORM_NORMAL: 4,
        VIEW_TRANSFORM_NORMAL: 5,
        SCREEN_TRANSFORM_NORMAL: 6,
        OBJECT_ID: 7
    };

    Xflow.VS_ATTRIB_TRANSFORM = {
        NONE: 0,
        VIEW_POINT: 1,
        WORLD_POINT: 2,
        VIEW_NORMAL: 3,
        WORLD_NORMAL: 4
    };


    /**
     * Filter Type of DataNode
     * KEEP - Keep only the provided names
     * REMOVE - Remove provided names (ignores name mapping)
     * RENAME - Only apply name mapping
     * @enum
     */
    Xflow.DATA_FILTER_TYPE = {
        RENAME: 0,
        KEEP: 1,
        REMOVE: 2
    };


    /**
     * @enum {number}
     */
    Xflow.DATA_ENTRY_STATE = {
        CHANGED_VALUE: 1,
        CHANGED_NEW: 2,
        LOAD_START: 3,
        LOAD_END: 4,
        CHANGED_SIZE: 5,
        CHANGED_REMOVED: 6,
        CHANGED_SIZE_TYPE: 7
    };

    Xflow.RESULT_TYPE = {
        COMPUTE: 0,
        VS: 1
    };


    /**
     * Type of Modification, used internally only
     * @private
     * @enum
     */
    Xflow.RESULT_STATE = {
        NONE: 0,
        CHANGED_DATA_VALUE: 1,
        CHANGED_DATA_SIZE: 2,
        CHANGED_STRUCTURE: 3,
        LOAD_START: 4,
        LOAD_END: 5,
        IMAGE_LOAD_START: 6,
        IMAGE_LOAD_END: 7
    };


    /**
     * Type of Sequence access - used by operators
     * @private
     * @enum
     */
    Xflow.SEQUENCE = {
        NO_ACCESS: 0,
        PREV_BUFFER: 1,
        NEXT_BUFFER: 2,
        LINEAR_WEIGHT: 3
    };


    Xflow.ITERATION_TYPE = {
        NULL: 0,
        ONE: 1,
        MANY: 2
    };

    /**
     * Type of Information Extraction - used by operators
     * @private
     * @enum
     */
    Xflow.EXTRACT = {
        NO_EXTRAC: 0,
        TEX_WIDTH: 1,
        TEX_HEIGHT: 2
    };

    Xflow.ORIGIN = {
        CHILD: 1,
        COMPUTE: 2,
        PROTO: 3
    };

    /**
     * Types of platforms to perform computation on
     * @type {Object}
     */
    Xflow.PLATFORM = {
        JAVASCRIPT: 0,
        GLSL: 1,
        CL: 2,
        ASYNC: 3
    };

    Xflow.PROCESS_STATE = {
        MODIFIED: 0,
        LOADING: 1,
        NEEDS_VALIDATION: 2,
        INVALID: 3,
        UNPROCESSED: 4,
        PROCESSED: 5
    };

    // Error Callbacks:
    var c_errorCallbacks = [];
    Xflow.registerErrorCallback = function (callback) {
        c_errorCallbacks.push(callback);
    };

    Xflow.notifyError = function (message, node) {
        if (c_errorCallbacks.length > 0) {
            var i;
            for (i = 0; i < c_errorCallbacks.length; ++i) {
                c_errorCallbacks[i](message, node);
            }
        } else {
            // TODO: Do Default error printing
        }
    };


    /* Tools */

    /**
     *
     * @param {Object} ctor Constructor
     * @param {Object} parent Parent class
     * @param {Object=} methods Methods to add to the class
     * @returns {Object}
     */
    Xflow.createClass = function (ctor, parent, methods) {
        methods = methods || {};
        if (parent) {
            /** @constructor */
            var F = function () {
            };
            F.prototype = parent.prototype;
            ctor.prototype = new F();
            ctor.prototype.constructor = ctor;
            ctor.superclass = parent.prototype;
        }
        for (var m in methods) {
            ctor.prototype[m] = methods[m];
        }
        return ctor;
    };


    var c_listedCallbacks = [];
    var c_listedCallbacksData = [];
    Xflow._listCallback = function (object, data) {
        var index;
        if (( index = c_listedCallbacks.indexOf(object)) == -1) {
            index = c_listedCallbacks.length;
            c_listedCallbacks.push(object);
        }
        var prevData = c_listedCallbacksData[index];
        if (!prevData || prevData < data) {
            c_listedCallbacksData[index] = data;
        }
    };

    Xflow._callListedCallback = function () {
        if (c_listedCallbacks.length) {
            var i;
            for (i = 0; i < c_listedCallbacks.length; ++i) {
                c_listedCallbacks[i]._onListedCallback(c_listedCallbacksData[i]);
            }
            c_listedCallbacks = [];
            c_listedCallbacksData = [];
        }
    };
}());





(function(){
/**
 * Content of this file:
 * All Code for handling data structures connected to Xflow including:
 *  - Typed value buffers (e.g float3 buffer)
 *  - Images
 *
 * This file also includes the Xflow.DataChangeNotifier used to react to changes on Xflow data structures
 */

//----------------------------------------------------------------------------------------------------------------------
// Xflow.SamplerConfig
//----------------------------------------------------------------------------------------------------------------------


/**
 * SamplerConfig is used to define sampler properties of an Xflow.TextureEntry or Xflow.ImageDataTextureEntry
 * @constructor
 */
Xflow.SamplerConfig = function(){
    this.minFilter = 0;
    this.magFilter = 0;
    this.mipFilter = 0;
    this.wrapS = 0;
    this.wrapT = 0;
    this.wrapU = 0;
    this.textureType = 0;
    this.colorR = 0;
    this.colorG = 0;
    this.colorB = 0;
    this.generateMipMap = 0;
};
Xflow.SamplerConfig.prototype.setDefaults = function() {
    // FIXME Generate this from the spec ?
    this.minFilter = Xflow.TEX_FILTER_TYPE.LINEAR;
    this.magFilter = Xflow.TEX_FILTER_TYPE.LINEAR;
    this.mipFilter = Xflow.TEX_FILTER_TYPE.NEAREST;
    this.wrapS = Xflow.TEX_WRAP_TYPE.CLAMP;
    this.wrapT = Xflow.TEX_WRAP_TYPE.CLAMP;
    this.wrapU = Xflow.TEX_WRAP_TYPE.CLAMP;
    this.textureType = Xflow.TEX_TYPE.TEXTURE_2D;
    this.colorR = 0;
    this.colorG = 0;
    this.colorB = 0;
    this.generateMipMap = 0;
};
Xflow.SamplerConfig.prototype.set = function(other) {
    this.minFilter = other.minFilter;
    this.magFilter = other.magFilter;
    this.mipFilter = other.mipFilter;
    this.wrapS = other.wrapS;
    this.wrapT = other.wrapT;
    this.wrapU = other.wrapU;
    this.textureType = other.textureType;
    this.colorR = other.colorR;
    this.colorG = other.colorG;
    this.colorB = other.colorB;
    this.generateMipMap = other.generateMipMap;
};
var SamplerConfig = Xflow.SamplerConfig;


//----------------------------------------------------------------------------------------------------------------------
// Xflow.DataEntry
//----------------------------------------------------------------------------------------------------------------------


/**
 * The abstract base class for all DataEntries connected to an xflow graph.
 * @abstract
 * @param {Xflow.DATA_TYPE} type Type of DataEntry
 */
Xflow.DataEntry = function(type){
    this._type = type;
    this._listeners = [];
    this.userData = {};
};
var DataEntry = Xflow.DataEntry;

Object.defineProperty(DataEntry.prototype, "type", {
    /** @param {Xflow.DATA_TYPE} v */
    set: function(v){
        throw new Error("type is read-only");
    },
    /** @return {Xflow.DATA_TYPE} */
    get: function(){ return this._type; }
});

/**
 * @param {function(Xflow.DataEntry, Xflow.DATA_ENTRY_STATE)} callback
 */
DataEntry.prototype.addListener = function(callback){
    this._listeners.push(callback);
};

/**
 * @param {function(Xflow.DataEntry, Xflow.DATA_ENTRY_STATE)} callback
 */
DataEntry.prototype.removeListener = function(callback){
    Array.erase(this._listeners, callback);
};

DataEntry.prototype._notifyChanged = function(){
    notifyListeners(this, Xflow.DATA_ENTRY_STATE.CHANGED_VALUE);
}

//----------------------------------------------------------------------------------------------------------------------
// Xflow.BufferEntry
//----------------------------------------------------------------------------------------------------------------------

/**
 * A typed value buffer basically linking to a typed array.
 * @constructor
 * @extends {Xflow.DataEntry}
 * @param {Xflow.DATA_TYPE} type
 * @param {Object} value A typed array
 */
Xflow.BufferEntry = function(type, value){
    Xflow.DataEntry.call(this, type);
    this._value = value;
    notifyListeners(this, Xflow.DATA_ENTRY_STATE.CHANGED_NEW);
};
Xflow.createClass(Xflow.BufferEntry, Xflow.DataEntry);
var BufferEntry = Xflow.BufferEntry;


/** @param {Object} v */
BufferEntry.prototype.setValue = function(v){
    this._setValue(v);
    Xflow._callListedCallback();
}

function getSizeType(size, tupleSize){
    if(size >= tupleSize*2)
        return 2;
    else if(size >= tupleSize)
        return 1;
    else
        return 0;
}

BufferEntry.prototype._setValue = function(v){
    var oldSize = (this._value ? this._value.length : 0), newSize = (v ? v.length : 0), tupleSize = this.getTupleSize();
    var notification;
    if(getSizeType(oldSize, tupleSize) != getSizeType(newSize, tupleSize))
        notification = Xflow.DATA_ENTRY_STATE.CHANGED_SIZE_TYPE;
    else if(oldSize != newSize){
        notification = Xflow.DATA_ENTRY_STATE.CHANGED_SIZE;
    }
    else{
        notification = Xflow.DATA_ENTRY_STATE.CHANGED_VALUE;
    }
    this._value = v;
    notifyListeners(this, notification);
}

/** @return {Object} */
BufferEntry.prototype.getValue = function(){
    return this._value;
};

/** @return {Object} */
BufferEntry.prototype.getLength = function(){
    return this._value ? this._value.length : 0;
};


BufferEntry.prototype.getTupleSize = function() {
    if (!this._tupleSize) {
        this._tupleSize = Xflow.DATA_TYPE_TUPLE_SIZE[this._type];
    }
    return this._tupleSize;
};

/**
 * @return {number}
 */
BufferEntry.prototype.getIterateCount = function(){
    return this.getLength() / this.getTupleSize();
};

BufferEntry.prototype.isEmpty = function(){
    return !this._value || !this.getLength();
};


//----------------------------------------------------------------------------------------------------------------------
// Xflow.TextureEntry
//----------------------------------------------------------------------------------------------------------------------

var tmpCanvas, tmpContext;

Xflow.toImageData = function(imageData) {
    if(imageData instanceof ImageData)
        return imageData;
    if(!imageData.data)
        throw new Error("no data property");
    if(!imageData.width)
        throw new Error("no width property");
    if(!imageData.height)
        throw new Error("no height property");
    if(!tmpContext) {
        tmpCanvas = document.createElement('canvas');
        tmpContext = tmpCanvas.getContext('2d');
    }
    var newImageData = tmpContext.createImageData(imageData.width, imageData.height);
    for(var i = 0; i < imageData.data.length; ++i) {
        var v = imageData.data[i];
        if(v > 255)
            v = 255;
        if(v < 0)
            v = 0;
        newImageData.data[i] = v;
    }
    return newImageData;
}

function TexelSource(sourceOrWidth, height, format, type) {
    if (typeof sourceOrWidth === "object") {
        if (sourceOrWidth.nodeName) {
            var nodeName = sourceOrWidth.nodeName.toLowerCase();
            if (nodeName === "video" && (typeof sourceOrWidth.complete === "undefined")) {
                Object.defineProperties(sourceOrWidth, {
                    width: {
                        get: function () {
                            return this.videoWidth;
                        }
                    },
                    height: {
                        get: function () {
                            return this.videoHeight;
                        }
                    },
                    complete: {
                        get: function () {
                            return !(this.readyState == 0 || this.videoWidth <= 0 || this.videoHeight <= 0);
                        }
                    }
                });
            }
            sourceOrWidth.texelFormat = Xflow.TEXTURE_FORMAT.RGBA;
            sourceOrWidth.texelType = Xflow.TEXTURE_TYPE.UBYTE;
        }
        //assume source is a image data like object
        this._source = sourceOrWidth;
    } else {
        format = format || Xflow.TEXTURE_FORMAT.RGBA;
        type =  type || Xflow.TEXTURE_TYPE.UBYTE;
        //create a new texel source backed by type array
        this._source = {
            width: sourceOrWidth,
            height: height,
            texelFormat: format,
            texelType: type,
            data: new Xflow.TYPED_ARRAY_MAP[type](sourceOrWidth * height * Xflow.TEXTURE_FORMAT_TUPLE_SIZE[format])
        }
    }
}

Object.defineProperties(TexelSource.prototype, {
    imageData: {
        get: function () {
            if (this._source instanceof HTMLElement) {
                var canvas = document.createElement("canvas");
                canvas.width = this._source.width;
                canvas.height = this._source.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(this._source, 0, 0);
                var source = ctx.getImageData(0, 0, this._source.width, this._source.height);
                source.texelFormat = this._source.texelFormat;
                source.texelType = this._source.texelType;
                this._source = source;
            }
            return this._source;
        }
    },
    glTextureData: {
        get: function () {
            return this._source;
        }
    },
    complete: {
        get: function () {
            return typeof this._source.complete === "undefined" ? true : this._source.complete;
        }
    },
    width: {
        get: function () {
            return this._source ? this._source.width : -1;
        }
    },
    height: {
        get: function () {
            return this._source ? this._source.height : -1;
        }
    },
    texelFormat: {
        get: function () {
            return this._source ? this._source.texelFormat: Xflow.TEXTURE_FORMAT.UNKNOWN;
        }
    },
    texelType: {
        get: function () {
            return this._source ? this._source.texelType: Xflow.TEXTURE_TYPE.UNKNOWN;
        }
    }
});

/**
 * A data entry for a texture.
 * Note: each TextureEntry includes a samplerConfig.
 * @constructor
 * @extends {Xflow.DataEntry}
 * @param {Object} image
 */
Xflow.TextureEntry = function(source){
    Xflow.DataEntry.call(this, Xflow.DATA_TYPE.TEXTURE);
    this._samplerConfig = new SamplerConfig();
    this._loading = false;
    this.setImage(source);

    notifyListeners(this, Xflow.DATA_ENTRY_STATE.CHANGED_NEW);
};

Xflow.createClass(Xflow.TextureEntry, Xflow.DataEntry);
var TextureEntry = Xflow.TextureEntry;

Object.defineProperties(Xflow.TextureEntry.prototype, {
    width: {
        get: function () {
            return this._source ? this._source.width : -1;
        }
    },
    height: {
        get: function () {
            return this._source ? this._source.height : -1;
        }
    },
    texelFormat: {
        get: function () {
            return this._source ? this._source.texelFormat: Xflow.TEXTURE_FORMAT.UNKNOWN;
        }
    },
    texelType: {
        get: function () {
            return this._source ? this._source.texelType: Xflow.TEXTURE_TYPE.UNKNOWN;
        }
    }
});

TextureEntry.prototype.isLoading = function() {
    if (!this._source)
        return false;

    return !this._source.complete;
};

TextureEntry.prototype._createImage = function(width, height, format, type, samplerConfig) {
    if (!this._source || this.width != width || this.height != height || this.format != format || this.type != type) {
        var source = new TexelSource(width, height, format, type);

        if (!samplerConfig) {
            samplerConfig = new Xflow.SamplerConfig();
            samplerConfig.setDefaults();
        }

        this._samplerConfig.set(samplerConfig);
        this._setImage(source);
    } else {
        this._notifyChanged();
    }

    return this._source;
};

TextureEntry.prototype.setImage = function (s) {
    this._setImage(s);
    Xflow._callListedCallback();
};

TextureEntry.prototype._setImage = function (s) {
    if (!s)
        this._setSource(null);
    else if (s instanceof TexelSource)
        this._setSource(s);
    else
        this._setSource(new TexelSource(s));
};

TextureEntry.prototype._setSource = function(s) {
    this._source = s;
    var loading = this.isLoading();
    if(loading){
        this._loading = true;
        notifyListeners(this, Xflow.DATA_ENTRY_STATE.LOAD_START);
    }
    else if(this._loading){
        this._loading = false;
        notifyListeners(this, Xflow.DATA_ENTRY_STATE.LOAD_END);
    }
    else
        notifyListeners(this, Xflow.DATA_ENTRY_STATE.CHANGED_VALUE);
};

TextureEntry.prototype.asGLTextureValue = function () {
    return this._source.glTextureData;
};

/** @return {ImageData} */
TextureEntry.prototype.getValue = function() {
    if (!this._source)
        return null;
    if (!this.isLoading())
        return this._source.imageData;
    else
        return null;
};

/** @return {SamplerConfig} */
TextureEntry.prototype.getSamplerConfig = function(){
    return this._samplerConfig;
};

/** @return {number} */
TextureEntry.prototype.getLength = function(){
    return 1;
};
TextureEntry.prototype.isEmpty = function(){
    return false;
};

/** @return {number} */
TextureEntry.prototype.getIterateCount = function() {
    return 1;
};

//----------------------------------------------------------------------------------------------------------------------
// Xflow.ImageDataTextureEntry
//----------------------------------------------------------------------------------------------------------------------

/**
 * Same as Xflow.TextureEntry, only based on imageData.
 * This class is used for xflow running inside Web Workers (which don't support HTML images)
 * @param imageData
 * @constructor
 */
Xflow.ImageDataTextureEntry = function(imageData){
    Xflow.DataEntry.call(this, Xflow.DATA_TYPE.TEXTURE);
    this._samplerConfig = new SamplerConfig();
    this._imageData = null;
    this._texelFormat = Xflow.TEXTURE_FORMAT.RGBA;
    this._texelType = Xflow.TEXTURE_TYPE.UBYTE;

    this._updateImageData(imageData);

    notifyListeners(this, Xflow.DATA_ENTRY_STATE.CHANGED_NEW);
};

Xflow.createClass(Xflow.ImageDataTextureEntry, Xflow.DataEntry);
var ImageDataTextureEntry = Xflow.ImageDataTextureEntry;


Object.defineProperties(Xflow.ImageDataTextureEntry.prototype, {
    width: {
        get: function () {
            return this._imageData ? this._imageData.width : -1;
        }
    },
    height: {
        get: function () {
            return this._imageData ? this._imageData.height : -1;
        }
    },
    texelFormat: {
        get: function () {
            return this._texelFormat;
        }
    },
    texelType: {
        get: function () {
            return this._texelType;
        }
    }
});



ImageDataTextureEntry.prototype.isLoading = function() {
    return !this._imageData;
};

ImageDataTextureEntry.prototype._updateImageData = function(imageData) {
    this._texelFormat = Xflow.TEXTURE_FORMAT.RGBA;
    this._texelType = Xflow.TEXTURE_TYPE.UBYTE;
    this._imageData = imageData;
};

/** Create new image
 *
 * @param width
 * @param height
 * @param formatType
 * @param samplerConfig
 * @return {Image|Canvas}
 */
ImageDataTextureEntry.prototype._createImage = function(width, height, format, type, samplerConfig) {
    if (!this._image || this.getWidth() != width || this.getHeight() != height || this._format != format || this._type != type) {
        if (!width || !height)
            throw new Error("Width or height is not specified");
        this._texelFormat = format;
        this._texelType = type;
        if (!samplerConfig) {
            samplerConfig = new Xflow.SamplerConfig();
            samplerConfig.setDefaults();
        }
        this._samplerConfig.set(samplerConfig);

        var imageData = {
            width: width,
            height: height,
            data: null
        };
        if(type == Xflow.TEXTURE_TYPE.FLOAT){
            imageData.data = new Float32Array(width*height*4);
        }
        else {
            // FIXME: We should allocate Uint8ClampedArray here instead
            // But Uint8ClampedArray can't be allocated in Chrome inside a Web Worker
            // See bug: http://code.google.com/p/chromium/issues/detail?id=176479
            // As a work around, we allocate Int16Array which results in correct clamping outside of web worker
            if(Uint8Array == Uint8ClampedArray)
                imageData.data = new Int16Array(width*height*4);
            else
                imageData.data = new Uint8ClampedArray(width*height*4);
        }
        this._imageData = imageData;
    }
    this._notifyChanged();
};

/** @param {Object} v */
ImageDataTextureEntry.prototype.setImageData = function(v) {
    this._updateImageData(v);
    notifyListeners(this, Xflow.DATA_ENTRY_STATE.CHANGED_VALUE);
    Xflow._callListedCallback();
};

ImageDataTextureEntry.prototype.getWidth = function() {
    return this._imageData && this._imageData.width || 0;
};

ImageDataTextureEntry.prototype.getHeight = function() {
    return this._imageData && this._imageData.height || 0;
};

/** @return {ImageData} */
ImageDataTextureEntry.prototype.getValue = function() {
    return this._imageData;
};

/** @return {SamplerConfig} */
ImageDataTextureEntry.prototype.getSamplerConfig = function(){
    return this._samplerConfig;
};

/** @return {number} */
ImageDataTextureEntry.prototype.getLength = function(){
    return 1;
};
ImageDataTextureEntry.prototype.isEmpty = function(){
    return false;
};


/** @return {number} */
ImageDataTextureEntry.prototype.getIterateCount = function() {
    return 1;
};

//----------------------------------------------------------------------------------------------------------------------
// Xflow.DataChangeNotifier
//----------------------------------------------------------------------------------------------------------------------


/**
 * Used to listen to modifications of any DataEntry connected to an Xflow graph.
 * @global
 */
Xflow.DataChangeNotifier = {
    _listeners: []
}
var DataChangeNotifier = Xflow.DataChangeNotifier;

/**
 * @param {function(Xflow.DataEntry, Xflow.DATA_ENTRY_STATE)} callback
 */
DataChangeNotifier.addListener = function(callback){
    this._listeners.push(callback);
};

/**
 * @param {function(Xflow.DataEntry, Xflow.DATA_ENTRY_STATE)} callback
 */
DataChangeNotifier.removeListener = function(callback){
    Array.erase(this._listeners, callback);
};

/**
 * @param {Xflow.DataEntry} dataEntry
 * @param {Xflow.DATA_ENTRY_STATE} notification
 */
function notifyListeners(dataEntry, notification){
    for(var i = 0; i < DataChangeNotifier._listeners.length; ++i){
        DataChangeNotifier._listeners[i](dataEntry, notification);
    }
    for(var i = 0; i < dataEntry._listeners.length; ++i){
        dataEntry._listeners[i](dataEntry, notification);
    }
}

}());
(function(){
/**
 * Content of this file:
 * Classes to construct an Xflow graph.
 */



//----------------------------------------------------------------------------------------------------------------------
// Xflow.Graph
//----------------------------------------------------------------------------------------------------------------------

/**
 * The Xflow graph includes the whole dataflow graph
 * It is recommended to use one Xflow.Graph per web document.
 * @constructor
 */
Xflow.Graph = function(){
    this.initPlatform();
};

var Graph = Xflow.Graph;

    /**
     *
     */

Graph.prototype.initPlatform = function () {
    this.platform = Xflow.PLATFORM.JAVASCRIPT; // Setting default platform for the graph

    if(initWebCLPlatform(this)) {
        this.platform = Xflow.PLATFORM.CL;
    }

};

function initWebCLPlatform(graph) {
    var clPlatforms, clDevices, clCtx, cmdQueue;
    var webcl = XML3D.webcl;

    if (webcl && webcl.isAvailable()) {

        // Fetching WebCL device platforms
        clPlatforms = webcl.getPlatforms();

        if (!clPlatforms || typeof clPlatforms === 'array' && clPlatforms.length === 0) {
            return false;
        }

        // Fetching WebCL devices
        try {
            // Trying initially to use GPU (for the best performance). Using CPU as a fallback.
            clDevices = webcl.getDevicesByType("GPU") || webcl.getDevicesByType("CPU");
        } catch (e) {
            return false;
        }

        if (!clDevices) {
            return false;
        }

        // Creating a new WebCL context
        try {
            clCtx = webcl.createContext({devices: clDevices});
        } catch (e) {
            return false;
        }

        // Creating a command queue for WebCL processing
        try {
            cmdQueue = webcl.createCommandQueue(clDevices[0], clCtx);
        } catch (e) {
            return false;
        }

        /**
         *  TODO: Maybe we should just store the cl-platform objects in XFlow.cl so they are more easily available and
         *  to avoid long prototype chains. Or we could pass the graph context to each node of the graph.
         *  However, it would be good to allow each Graph object to have at least own context, cmdQueue and kernelManager.
         */
        graph.cl = {
            API: webcl,
            kernelManager: new webcl.KernelManager(clCtx, clDevices),
            platforms: clPlatforms,
            devices: clDevices,
            ctx: clCtx,
            cmdQueue: cmdQueue
        };

        return true;
    }

    return false;
}

 /**
 * @return {Xflow.InputNode}
 */
Graph.prototype.createInputNode = function(){
    var node = new Xflow.InputNode(this);
    return node;
};

/**
 * @return {Xflow.DataNode}
 */
Graph.prototype.createDataNode = function(protoNode){
    var node = new Xflow.DataNode(this, protoNode);
    return node;
};


//----------------------------------------------------------------------------------------------------------------------
// Xflow.GraphNode
//----------------------------------------------------------------------------------------------------------------------

/**
 * @constructor
 * @param {Xflow.Graph} graph
 */
Xflow.GraphNode = function(graph){
    this._graph = graph;
    this._parents = [];
};
var GraphNode = Xflow.GraphNode;



//----------------------------------------------------------------------------------------------------------------------
// Xflow.InputNode
//----------------------------------------------------------------------------------------------------------------------

/**
 * An InputNode include an Xflow.DataEntry, a name and other information
 * This class mirrors XML3D elements such as <float3>, <int> or <texture>
 *
 * @constructor
 * @param {Xflow.Graph} graph
 * @extends {Xflow.GraphNode}
 */
Xflow.InputNode = function(graph){
    Xflow.GraphNode.call(this, graph);
    this._name = "";
    this._key = 0;
    this._data = null;
    this._paramName = null;
    this._paramGlobal = false;
    this._dataListener = this.onDataChange.bind(this);
};
Xflow.createClass(Xflow.InputNode, Xflow.GraphNode);
var InputNode = Xflow.InputNode;

InputNode.prototype.onDataChange = function(newValue, notification) {
    var downNote;
    switch(notification){
        case Xflow.DATA_ENTRY_STATE.CHANGED_VALUE: downNote = Xflow.RESULT_STATE.CHANGED_DATA_VALUE; break;
        case Xflow.DATA_ENTRY_STATE.LOAD_START: downNote = Xflow.RESULT_STATE.IMAGE_LOAD_START; break;
        case Xflow.DATA_ENTRY_STATE.LOAD_END: downNote = Xflow.RESULT_STATE.IMAGE_LOAD_START; break;
        case Xflow.DATA_ENTRY_STATE.CHANGED_SIZE_TYPE: downNote = Xflow.RESULT_STATE.CHANGED_STRUCTURE; break;
        case Xflow.DATA_ENTRY_STATE.CHANGED_SIZE: downNote = Xflow.RESULT_STATE.CHANGED_DATA_SIZE; break;
        default: downNote = Xflow.RESULT_STATE.CHANGED_DATA_SIZE; break;
    }
    notifyParentsOnChanged(this,downNote);
};

Object.defineProperty(InputNode.prototype, "name", {
    /** @param {string} v */
    set: function(v){
        this._name = v;
        notifyParentsOnChanged(this, Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {string} */
    get: function(){ return this._name; }
});
Object.defineProperty(InputNode.prototype, "key", {
    /** @param {number} v */
    set: function(v){
        this._key = v;
        notifyParentsOnChanged(this, Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {number} */
    get: function(){ return this._key; }
});
Object.defineProperty(InputNode.prototype, "paramName", {
    /** @param {string} v */
    set: function(v){
        this._paramName = v;
        notifyParentsOnChanged(this, Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {string} */
    get: function(){ return this._paramName; }
});
Object.defineProperty(InputNode.prototype, "paramGlobal", {
    /** @param {boolean} v */
    set: function(v){
        this._paramGlobal = v;
        notifyParentsOnChanged(this, Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {boolean} */
    get: function(){ return this._paramGlobal; }
});
Object.defineProperty(InputNode.prototype, "data", {
    /** @param {Object} v */
    set: function(v){
        var prevDataLoading = false;
        if(this._data) {
            prevDataLoading = this._data._loading;
            this._data.removeListener(this._dataListener);
        }
        this._data = v;
        if(this._data)
            this._data.addListener(this._dataListener);
        if(prevDataLoading != this._data._loading){
            notifyParentsOnChanged(this, this._data._loading ? Xflow.RESULT_STATE.IMAGE_LOAD_START :
                Xflow.RESULT_STATE.IMAGE_LOAD_END);
        }
        Xflow._callListedCallback();
    },
    /** @return {Object} */
    get: function(){ return this._data; }
});

InputNode.prototype._getParamNames = function(){
    return this._paramGlobal ? null : this._paramName;
}
InputNode.prototype._getGlobalParamNames = function(){
    return this._paramGlobal ? this._paramName : null;
}


/**
 * Helper class to create a InputNode with a newly created BufferDataEntry.
 * @param {string} type Type of the DataEntry A string key from Xflow.DATA_TYPE_MAP
 * @param {string} name Name of the InputNode
 * @param {number} size Size of the DataEntry in number of typed values, NOT bytes.
 * @returns {Xflow.InputNode}
 */
Xflow.createBufferInputNode = function(type, name, size){
    if (size == 0)
        return null;
    var typeId = Xflow.DATA_TYPE_MAP[type];
    var tupleSize = Xflow.DATA_TYPE_TUPLE_SIZE[typeId];
    var arrayType = Xflow.TYPED_ARRAY_MAP[typeId];

    var v = new (arrayType)(size * tupleSize);
    var buffer = new Xflow.BufferEntry(typeId, v);

    var inputNode = XML3D.data.xflowGraph.createInputNode();
    inputNode.data = buffer;
    inputNode.name = name;
    return inputNode;
};

//----------------------------------------------------------------------------------------------------------------------
// Xflow.DataNode
//----------------------------------------------------------------------------------------------------------------------

var c_xflowNodeId = 0;
function getXflowNodeId(){
    return ++c_xflowNodeId;
}

/**
 * The DataNode is the central structure of an Xflow Graph.
 * It is used to build a data composition graph as well as a data flow.
 * It mirror the <data> element of XML3D
 *
 * @constructor
 * @extends {Xflow.GraphNode}
 */
Xflow.DataNode = function(graph, protoNode){
    Xflow.GraphNode.call(this, graph);

    this._loading = false;
    this._subTreeLoading = false;
    this._imageLoading = false;

    this.id = getXflowNodeId();
    this._isProtoNode = protoNode;
    this._children = [];
    this._sourceNode = null;
    this._userData = null;

    this._filterType = 0;
    this._filterMapping = null;

    this._computeOperator = "";
    this._computeUsesDataflow = false;
    this._computeInputMapping = null;
    this._computeOutputMapping = null;
    this._dataflowNode = null;

    this._channelNode = new Xflow.ChannelNode(this);
    this._substitutionNodes = {};
    this._paramNames = null;
    this._globalParamNames = null;

    this._platform = null;

    this._listeners = [];

};
Xflow.createClass(Xflow.DataNode, Xflow.GraphNode);
var DataNode = Xflow.DataNode;


/**
 * A mapping used for a filter or a compute properties of a DataNode
 * @abstract
 * @param {Xflow.DataNode} owner
 */
Xflow.Mapping = function(){
    this._owners = [];
};


/**
 * An OrderMapping used for a filter or compute properties of a DataNode
 * It describes a mapping of names referring to the order of arguments / output values.
 * OrderMapping syntax examples in compute:
 * position = xflow.morph(position, posAdd, weight)
 * @constructor
 * @extends {Xflow.Mapping}
 * @param {Xflow.DataNode} owner
 */
Xflow.OrderMapping = function(){
    Xflow.Mapping.call(this);
    this._names = [];
};
Xflow.createClass(Xflow.OrderMapping, Xflow.Mapping);

/**
 * An NameMapping used for a filter or compute properties of a DataNode
 * It describes a mapping of names referring to the original names of the arguments / output values.
 * NameMapping syntax examples in compute:
 * {position: result} = xflow.morph({value: position, valueAdd: posAdd, weight: weight})
 * @constructor
 * @extends {Xflow.Mapping}
 * @param {Xflow.DataNode} owner
 */
Xflow.NameMapping = function(){
    Xflow.Mapping.call(this);
    this._destNames = [];
    this._srcNames = [];

};
Xflow.createClass(Xflow.NameMapping, Xflow.Mapping);


Object.defineProperty(DataNode.prototype, "sourceNode", {
    /** @param {?Xflow.DataNode} v */
    set: function(v){
        if(this._sourceNode) removeParent(this, this._sourceNode);
        this._sourceNode = v;
        if(this._sourceNode) addParent(this, this._sourceNode);
        if(!updateNodeLoading(this))
            this.notify(Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {?Xflow.DataNode} */
    get: function(){ return this._sourceNode; }
});
// TODO: Remove this property once the XML3D part is adapted
Object.defineProperty(DataNode.prototype, "protoNode", {
    /** @param {?Xflow.DataNode} v */
    set: function(v){
        this._computeUsesDataflow = !!v;
        this._computeInputMapping = null;
        this._computeOutputMapping = null;
        this.dataflowNode = v;
    },
    /** @return {?Xflow.DataNode} */
    get: function(){ return this._dataflowNode; }
});
Object.defineProperty(DataNode.prototype, "dataflowNode", {
    /** @param {?Xflow.DataNode} v */
    set: function(v){
        if(v && !this._computeUsesDataflow)
            throw new Error("Cannot set dataflowNode when compute doesn't use dataflow.");
        if(this._dataflowNode) removeParent(this, this._dataflowNode);
        this._dataflowNode = v;
        if(this._dataflowNode) addParent(this, this._dataflowNode);
        if(!updateNodeLoading(this))
            this.notify(Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {?Xflow.DataNode} */
    get: function(){ return this._dataflowNode; }
});


Object.defineProperty(DataNode.prototype, "userData", {
    /** @param {?Xflow.DataNode} v */
    set: function(v){
        this._userData = v;
    },
    /** @return {?Xflow.DataNode} */
    get: function(){ return this._userData; }
});


DataNode.prototype.setLoading = function(loading){
    if(this._loading != loading){
        this._loading = loading;
        updateSubtreeLoading(this);
        Xflow._callListedCallback();
    }
}

DataNode.prototype.isSubtreeLoading = function(){
    return this._subTreeLoading;
}

DataNode.prototype.isImageLoading = function(){
    return this._imageLoading;
}


Object.defineProperty(DataNode.prototype, "filterType", {
    /** @param {Xflow.DATA_FILTER_TYPE} v */
    set: function(v){
        this._filterType = v;
        this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {Xflow.DATA_FILTER_TYPE} */
    get: function(){ return this._filterType; }
});

Object.defineProperty(DataNode.prototype, "filterMapping", {
    /** @param {Xflow.Mapping} v */
    set: function(v){
        swapMapping(this, "_filterMapping", v);
        this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {Xflow.Mapping} */
    get: function(){ return this._filterMapping; }
});

Object.defineProperty(DataNode.prototype, "computeOperator", {
    /** @param {string} v */
    set: function(v){
        this._computeOperator = v;
        this._computeUsesDataflow = false;
        this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {string} */
    get: function(){ return this._computeUsesDataflow ? null : this._computeOperator; }
});

Object.defineProperty(DataNode.prototype, "computeDataflowUrl", {
    /** @param {string} v */
    set: function(v){
        this._computeOperator = v;
        this._computeUsesDataflow = true;
        this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {string} */
    get: function(){ return this._computeUsesDataflow ? this._computeOperator : null; }
});

Object.defineProperty(DataNode.prototype, "computeInputMapping", {
    /** @param {Xflow.Mapping} v */
    set: function(v){
        swapMapping(this, "_computeInputMapping", v);
        this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {Xflow.Mapping} */
    get: function(){ return this._computeInputMapping; }
});
Object.defineProperty(DataNode.prototype, "computeOutputMapping", {
    /** @param {Xflow.Mapping} v */
    set: function(v){
        swapMapping(this, "_computeOutputMapping", v);
        this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
        Xflow._callListedCallback();
    },
    /** @return {Xflow.Mapping} */
    get: function(){ return this._computeOutputMapping; }
});

DataNode.prototype.isProtoNode = function(){
    return this._isProtoNode;
}

/**
 * @param {Xflow.GraphNode} child
 */
DataNode.prototype.appendChild = function(child){
    this._children.push(child);
    addParent(this, child);
    if(!updateNodeLoading(this))
        this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
    Xflow._callListedCallback();
};
/**
 * @param {Xflow.GraphNode} child
 */
DataNode.prototype.removeChild = function(child){
    Array.erase(this._children, child);
    removeParent(this, child);
    if(!updateNodeLoading(this))
        this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
    Xflow._callListedCallback();
};
/**
 * @param {Xflow.GraphNode} child
 * @param {Xflow.GraphNode} beforeNode
 */
DataNode.prototype.insertBefore = function(child, beforeNode){
    var idx = this._children.indexOf(beforeNode);
    if(idx == -1)
        this._children.push(child);
    else
        this._children.splice(idx, 0, child);
    addParent(this, child);
    if(!updateNodeLoading(this))
        this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
    Xflow._callListedCallback();
};
/**
 * remove all children of the DataNode
 */
DataNode.prototype.clearChildren = function(){
    for(var i =0; i < this._children.length; ++i){
        removeParent(this, this._children[i]);
    }
    this._children = [];
    if(!updateNodeLoading(this))
        this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
    Xflow._callListedCallback();
};

/**
 * Detach this DataNode from all connections, including source- and proto-node references
 */
DataNode.prototype.detachFromParents = function(){
    for(var i =0; i < this._parents.length; ++i){
        var parent = this._parents[i];
        if(parent._sourceNode == this)
            parent.sourceNode = null;
        else if(parent._dataflowNode == this){
            parent.dataflowNode = null;
        }
        else{
            parent.removeChild(this);
        }
    }
    this._children = [];
};

    /**
     * Sets platform of a DataNode. If _platform is defined, it will override the default platform setting of
     * an Xflow graph.
     *
     * @param {String|Xflow.PLATFORM|null} platformSrc
     */

DataNode.prototype.setPlatform = function(platformSrc) {
    if (typeof platformSrc === 'string') {
        if (platformSrc === "cl") {
            this._platform = Xflow.PLATFORM.CL;
        }
        else if (platformSrc === "gl") {
            this._platform = Xflow.PLATFORM.GLSL;
        }
        else if (platformSrc === "js") {
            this._platform = Xflow.PLATFORM.JAVASCRIPT;
        }
    } else if (!isNaN(parseFloat(platformSrc)) && isFinite(platformSrc)) {
        this._platform = platformSrc;
    } else {
        this._platform = null;
    }

    this.notify(Xflow.RESULT_STATE.CHANGED_STRUCTURE);
    Xflow._callListedCallback();
};

/**
 * @const
 */
var filterParser = /^([A-Za-z\s]*)\(([^()]+)\)$/;

/**
 * Set filter by string
 * @param {string} filterString
 */
DataNode.prototype.setFilter = function(filterString){
    filterString = filterString || "";
    var newType = Xflow.DATA_FILTER_TYPE.RENAME;
    var newMapping = null;
    if(filterString){
        var result = filterString.trim().match(filterParser);
        if(result){
            var type = result[1].trim();
            switch(type){
                case "keep": newType = Xflow.DATA_FILTER_TYPE.KEEP; break;
                case "remove": newType = Xflow.DATA_FILTER_TYPE.REMOVE; break;
                case "rename": newType = Xflow.DATA_FILTER_TYPE.RENAME; break;
                default:
                    Xflow.notifyError("Unknown filter type:" + type, this);
            }
            newMapping = Xflow.Mapping.parse(result[2], this);
        }
        else{
            Xflow.notifyError("Could not parse filter '" + filterString + "'", this);
        }
    }
    if(!newMapping){
        // TODO Remove this? (Mapping can be null from now on)
        newMapping = new Xflow.OrderMapping();
    }
    swapMapping(this, "_filterMapping", newMapping);
    this._filterType = newType;
    this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
    Xflow._callListedCallback();
};

var computeParser = /^(([^=]+)\=)?([^'(]+('[^']+')?[^'(]+)(\(([^()]*)?\))?$/;
var bracketsParser = /^\(([^()]*)\)$/;
var dataflowParser = /^dataflow\['([^']+)'\]$/;

Xflow.getComputeDataflowUrl = function(computeString){
    computeString = computeString || "";
    var newOperator = "";
    var result = computeString.trim().match(computeParser);
    if(result){
        newOperator = result[3].trim();
        if(result = newOperator.match(dataflowParser)){
            return result[1];
        }
        else{
            return null;
        }
    }
}


/**
 * Set compute by string
 * @param {string} computeString
 */
DataNode.prototype.setCompute = function(computeString){
    computeString = computeString || "";
    var newOperator = "";
    var inputMapping = null, outputMapping = null;
    var result = computeString.trim().match(computeParser);
    if(result){
        var output = result[2] ? result[2].trim() : "";
        newOperator = result[3].trim();
        var input = result[6] ? result[6].trim() : "";
        if(result = output.match(bracketsParser)){
            output = result[1];
        }
        if(input)
            inputMapping = Xflow.Mapping.parse(input, this);
        if(output)
            outputMapping = Xflow.Mapping.parse(output, this);

        if(result = newOperator.match(dataflowParser)){
            this._computeUsesDataflow = true;
            newOperator = result[1];
        }
        else{
            this._computeUsesDataflow = false;
        }
        this._dataflowNode = null;
    }
    else if(computeString){
        Xflow.notifyError("Error parsing Compute value '" + computeString + "'", this);
    }
    swapMapping(this, "_computeInputMapping", inputMapping);
    swapMapping(this, "_computeOutputMapping", outputMapping);
    this._computeOperator = newOperator;
    this.notify( Xflow.RESULT_STATE.CHANGED_STRUCTURE);
    Xflow._callListedCallback();
}




/**
 * Notifies DataNode about a change. Notification will be forwarded to parents, if necessary
 * @param {Xflow.RESULT_STATE} changeType
 * @param {GraphNode} senderNode
 */
DataNode.prototype.notify = function(changeType, senderNode){
    if(changeType == Xflow.RESULT_STATE.CHANGED_STRUCTURE ||
       changeType == Xflow.RESULT_STATE.LOAD_START ||
       changeType == Xflow.RESULT_STATE.LOAD_END )
    {
        this._paramNames = null;
        this._globalParamNames = null;
        this._channelNode.setStructureOutOfSync();
        clearSubstitutionNodes(this);

        if(changeType == Xflow.RESULT_STATE.CHANGED_STRUCTURE)
            notifyParentsOnChanged(this, changeType);
        else
            updateSubtreeLoading(this);
    }
    else if(changeType == Xflow.RESULT_STATE.CHANGED_DATA_VALUE ||
        changeType == Xflow.RESULT_STATE.CHANGED_DATA_SIZE ||
        changeType == Xflow.RESULT_STATE.IMAGE_LOAD_START ||
        changeType == Xflow.RESULT_STATE.IMAGE_LOAD_END)
    {
        if(changeType == Xflow.RESULT_STATE.IMAGE_LOAD_START ||
           changeType == Xflow.RESULT_STATE.IMAGE_LOAD_END )
            updateImageLoading(this);
        if(senderNode){
            this._channelNode.notifyDataChange(senderNode, changeType);
        }
    }
    for(var i = 0; i < this._listeners.length; ++i)
        this._listeners[i](changeType);
};

DataNode.prototype.addListener = function(listener){
    this._listeners.push(listener)
}
DataNode.prototype.removeListener = function(listener){
    Array.erase(this._listeners, listener);
}

DataNode.prototype.getOutputNames = function(){
    return getForwardNode(this)._channelNode.getOutputNames();
}

DataNode.prototype.getOutputChannelInfo = function(name){
    return getForwardNode(this)._channelNode.getOutputChannelInfo(name);
}
DataNode.prototype.getParamNames = function(){
    return this._getParamNames();
}

DataNode.prototype._getResult = function(type, filter){
    return getForwardNode(this, filter)._channelNode.getResult(type, filter);
}

DataNode.prototype._getForwardNode = function(filter){
    return getForwardNode(this, filter);
}

DataNode.prototype._getParamNames = function(){
    if(!this._paramNames){
        this._paramNames = [];
        if(this._sourceNode)
            Xflow.nameset.add(this._paramNames, this._sourceNode._getParamNames());
        else{
            for(var i = 0; i < this._children.length; ++i){
                Xflow.nameset.add(this._paramNames, this._children[i]._getParamNames());
            }
        }
    }
    return this._paramNames;
};
DataNode.prototype._getGlobalParamNames = function(){
    if(!this._globalParamNames){
        this._globalParamNames = [];
        if(this._dataflowNode)
            Xflow.nameset.add(this._globalParamNames, this._dataflowNode._getGlobalParamNames());

        if(this._sourceNode)
            Xflow.nameset.add(this._globalParamNames, this._sourceNode._getGlobalParamNames());
        else{
            for(var i = 0; i < this._children.length; ++i){
                Xflow.nameset.add(this._globalParamNames, this._children[i]._getGlobalParamNames());
            }
        }
    }
    return this._globalParamNames;
};

DataNode.prototype._getChannelNode = function(substitution){
    if(!substitution)
        return this._channelNode
    else{
        var key = substitution.getKey(this);
        if(!this._substitutionNodes[key])
            this._substitutionNodes[key] = new Xflow.ChannelNode(this, substitution);
        else
            this._substitutionNodes[key].increaseRef();
        return this._substitutionNodes[key];
    }
}

DataNode.prototype._removeSubstitutionNode = function(substitutionNode){
    var key = substitutionNode.substitution.getKey(this);
    if(this._substitutionNodes[key] && this._substitutionNodes[key].decreaseRef())
        delete this._substitutionNodes[key];
}

function clearSubstitutionNodes(dataNode){
    for(var name in dataNode._substitutionNodes){
        dataNode._substitutionNodes[name].clear();
    }
    dataNode._substitutionNodes = {};
}


function getForwardNode(dataNode, filter){
    var filteredBadly = (dataNode._filterMapping && !dataNode._filterMapping.isEmpty());
    if(!filteredBadly){
        if(!dataNode._computeOperator ){
            if(dataNode._sourceNode && dataNode._children.length == 0)
                return getForwardNode(dataNode._sourceNode);
            if(dataNode._children.length == 1 && dataNode._children[0] instanceof DataNode)
                return getForwardNode(dataNode._children[0]);
        }
        var idx = dataNode._channelNode.getChildDataIndex(filter);
        if(idx != -1 && idx != undefined){
            if(dataNode._sourceNode)
                return getForwardNode(dataNode._sourceNode);
            else
                return getForwardNode(dataNode._children[idx]);
        }
    }
    return dataNode;
}

function updateNodeLoading(node){
    updateImageLoading(node);
    return updateSubtreeLoading(node);
}

function updateImageLoading(node){
    var imageLoading = false;
    for(var i = 0; !imageLoading && i < node._children.length; ++i){
        var child = node._children[i];
        imageLoading = child instanceof Xflow.DataNode ? child._imageLoading :
                child._data && child._data.isLoading && child._data.isLoading();
    }
    if(!imageLoading && node._sourceNode) imageLoading = node._sourceNode._imageLoading;
    if(!imageLoading && node._dataflowNode) imageLoading = node._dataflowNode._imageLoading;

    imageLoading = imageLoading || false;
    if(imageLoading != node._imageLoading){
        node._imageLoading = imageLoading;
        for(var i = 0; i < node._parents.length; ++i)
            node._parents[i].notify(imageLoading ? Xflow.RESULT_STATE.IMAGE_LOAD_START :
            Xflow.RESULT_STATE.IMAGE_LOAD_END);
    }
}
function updateSubtreeLoading(node){
    var subtreeLoading = node._loading;
    for(var i = 0; !subtreeLoading && i < node._children.length; ++i){
        var child = node._children[i];
        subtreeLoading = child instanceof Xflow.DataNode ? child._subTreeLoading : false;
    }
    if(!subtreeLoading && node._sourceNode) subtreeLoading = node._sourceNode._subTreeLoading;
    if(!subtreeLoading && node._dataflowNode) subtreeLoading = node._dataflowNode._subTreeLoading;

    if(subtreeLoading != node._subTreeLoading){
        node._subTreeLoading = subtreeLoading;
        for(var i = 0; i < node._parents.length; ++i)
            node._parents[i].notify(subtreeLoading ? Xflow.RESULT_STATE.LOAD_START :
                Xflow.RESULT_STATE.LOAD_END);
        return true;
    }
    return false;
}


//----------------------------------------------------------------------------------------------------------------------
// Helpers
//----------------------------------------------------------------------------------------------------------------------


/**
 * @private
 * @param {Xflow.DataNode} parent
 * @param {Xflow.GraphNode} child
 */
function addParent(parent, child){
    child._parents.push(parent);
}

/**
 * @private
 * @param {Xflow.DataNode} parent
 * @param {Xflow.GraphNode} child
 */
function removeParent(parent, child){
    Array.erase(child._parents, parent);
}

/**
 * Notify all parent nodes about a change
 * @param {Xflow.GraphNode} node
 * @param {number|Xflow.RESULT_STATE} changeType
 * @private
 */
function notifyParentsOnChanged(node, changeType){
    for(var i = 0; i < node._parents.length; ++i){
        node._parents[i].notify(changeType, node);
    }
};

function swapMapping(dataNode, key, mapping){
    dataNode[key] && dataNode[key]._removeOwner(dataNode);
    dataNode[key] = mapping;
    dataNode[key] && dataNode[key]._addOwner(dataNode);
}


})();
(function(){

//----------------------------------------------------------------------------------------------------------------------
// Xflow.Mapping
//----------------------------------------------------------------------------------------------------------------------

var Mapping = Xflow.Mapping;

/**
 * Parse a Mapping (both Xflow.OrderMapping or Xflow.ComputeMapping) from a syntax string.
 * @param {string} string The syntax string.
 * @param {Xflow.DataNode} dataNode DataNode of the Mapping
 * @returns {?Xflow.Mapping}
 */
Mapping.parse = function(string, dataNode){
    string = string.trim()
    var results = string.trim().match(orderMappingParser);
    if(results)
        return OrderMapping.parse(string, dataNode);
    results = string.trim().match(nameMappingParser);
    if(results)
        return NameMapping.parse(results[1], dataNode);
    Xflow.notifyError("Cannot parse name mapping '" + string + "'", dataNode);
    return null;
}

Xflow.Mapping.prototype._addOwner = function(owner){
    var idx = this._owners.indexOf(owner);
    if(idx == -1)
        this._owners.push(owner);
}

Xflow.Mapping.prototype._removeOwner = function(owner){
    var idx = this._owners.indexOf(owner);
    if(idx != -1)
        this._owners.splice(idx, -1);
}

//----------------------------------------------------------------------------------------------------------------------
// Xflow.OrderMapping
//----------------------------------------------------------------------------------------------------------------------


/**
 * OrderMapping implementation
 */

var OrderMapping = Xflow.OrderMapping;


OrderMapping.parse = function(string, dataNode){
    var mapping = new Xflow.OrderMapping(dataNode)
    var token = string.split(",");
    for(var i = 0; i < token.length; i++){
        mapping._names.push(token[i].trim());
    }
    return mapping;
}


Object.defineProperty(OrderMapping.prototype, "length", {
    set: function(v){ throw new Error("length is read-only");
    },
    get: function(){ return this._name.length; }
});

OrderMapping.prototype.getName = function(idx){
    return this._names[idx];
};

OrderMapping.prototype.clear = function(){
    this._names = [];
    mappingNotifyOwner(this);
};

OrderMapping.prototype.setName = function(index, name){
    this._names[index] = name;
    mappingNotifyOwner(this);
};

OrderMapping.prototype.removeName = function(index){
    this._names.splice(index);
    mappingNotifyOwner(this);
};

OrderMapping.prototype.isEmpty = function(){
    return this._names.length == 0;
}

var orderMappingParser = /^([^:,{}]+)(,[^:{},]+)*$/;

OrderMapping.prototype.applyFilterOnChannelMap = function(destMap, sourceMap, filterType, callback){
    if(filterType == Xflow.DATA_FILTER_TYPE.KEEP){
        for(var i = 0; i < this._names.length; ++i){
            var name = this._names[i];
            if(sourceMap.map[name])
                callback(destMap, name, sourceMap, name);
        }
    }
    else{
        for(var i in sourceMap.map){
            var idx = this._names.indexOf(i);
            if(filterType == Xflow.DATA_FILTER_TYPE.RENAME ||
                (filterType == Xflow.DATA_FILTER_TYPE.REMOVE && idx == -1))
                callback(destMap, i, sourceMap, i);
        }
    }

};
OrderMapping.prototype.getScriptInputName = function(index, destName){
    if(this._names[index])
        return this._names[index];
    else
        return null;
};
OrderMapping.prototype.getScriptOutputName = function(index, srcName){
    if(this._names[index])
        return this._names[index];
    else
        return null;
};
OrderMapping.prototype.getScriptOutputNameInv = function(destName, operatorOutputs){
    var index = this._names.indexOf(destName);
    if(index == -1)
        return null;
    return operatorOutputs[index].name;
};

OrderMapping.prototype.applyScriptOutputOnMap = function(destMap, sourceMap){
    var index = 0;
    for(var i in sourceMap){
        if(index < this._names.length){
            destMap[this._names[index]] = sourceMap[i];
            ++index;
        }
        else
            break;
    }
};
OrderMapping.prototype.getRenameSrcName = function(name){
    return name;
}


OrderMapping.prototype.filterNameset = function(nameset, filterType)
{
    if(filterType == Xflow.DATA_FILTER_TYPE.RENAME)
        return nameset.splice();
    else {
        var keep = (filterType == Xflow.DATA_FILTER_TYPE.KEEP);
        var result = [];
        for(var i in nameset){
            var idx = this._names.indexOf(nameset[i]);
            if( (keep && idx!= -1) || (!keep && idx == -1) )
                result.push(nameset[i]);
        }
        return result;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Xflow.NameMapping
//----------------------------------------------------------------------------------------------------------------------


/**
 * NameMapping implementation
 */

var NameMapping = Xflow.NameMapping;


NameMapping.parse = function(string, dataNode)
{
    var mapping = new Xflow.NameMapping(dataNode)
    var token = string.split(",");
    for(var i = 0; i < token.length; i++){
        var pair = token[i].split(":");
        var dest = pair[0].trim(); var src = pair[1].trim();
        mapping.setNamePair(dest, src);
    }
    return mapping;
}

Object.defineProperty(NameMapping.prototype, "length", {
    set: function(v){ throw new Error("length is read-only");
    },
    get: function(){ return this._srcNames.length; }
});

NameMapping.prototype.getDestName = function(idx){
    return this._destNames[idx];
};
NameMapping.prototype.getSrcName = function(idx){
    return this._srcNames[idx];
};

NameMapping.prototype.getSrcNameFromDestName = function(destName){
    var idx = this._destNames.indexOf(destName);
    return idx == -1 ? null : this._srcNames[idx];
};
NameMapping.prototype.getDestNameFromSrcName = function(srcName){
    var idx = this._srcNames.indexOf(srcName);
    return idx == -1 ? null : this._destNames[idx];
};

NameMapping.prototype.clear = function(){
    this._srcNames = [];
    this._destNames = [];
    mappingNotifyOwner(this);
};

NameMapping.prototype.setNamePair = function(destName, srcName){
    var idx = this._destNames.indexOf(destName);
    if(idx != -1){
        this._destNames.splice(idx,1);
        this._srcNames.splice(idx,1);
    }
    this._destNames.push(destName);
    this._srcNames.push(srcName);
    mappingNotifyOwner(this);
};

NameMapping.prototype.removeNamePair = function(destName){
    var idx = this._destNames.indexOf(destName);
    if(idx != -1){
        this._destNames.splice(idx,1);
        this._srcNames.splice(idx,1);
    }
    mappingNotifyOwner(this);
};

NameMapping.prototype.isEmpty = function(){
    return this._destNames.length == 0;
}


var nameMappingParser = /^\{(([^:,{}]+:[^:{},]+)(,[^:{},]+:[^:},]+)*)\}$/;


NameMapping.prototype.filterNameset = function(nameset, filterType)
{

}

NameMapping.prototype.applyFilterOnChannelMap = function(destMap, sourceMap, filterType, callback)
{
    if(filterType == Xflow.DATA_FILTER_TYPE.REMOVE){
        for(var i in sourceMap.map)
            if(this._srcNames.indexOf(i) == -1)
                callback(destMap, i, sourceMap, i);
    }
    else{
        if(filterType == Xflow.DATA_FILTER_TYPE.RENAME){
            for(var i in sourceMap.map)
                if(this._srcNames.indexOf(i) == -1)
                    callback(destMap, i, sourceMap, i);
        }
        for(var i in this._destNames){
            callback(destMap, this._destNames[i], sourceMap, this._srcNames[i]);
        }
    }
};

NameMapping.prototype.getRenameSrcName = function(name){
    return this.getSrcNameFromDestName(name) || name;
}

NameMapping.prototype.getScriptInputName= function(index, destName){
    return this.getSrcNameFromDestName(destName);
}
NameMapping.prototype.getScriptOutputName = function(index, srcName){
    return this.getDestNameFromSrcName(srcName);
}

NameMapping.prototype.getScriptOutputNameInv = function(destName, operatorOutputs){
    var index = this._destNames.indexOf(destName);
    if(index == -1)
        return null;
    return this._srcNames[index];
};

NameMapping.prototype.applyScriptOutputOnMap= function(destMap, sourceMap){
    for(var i in this._destNames){
        var destName = this._destNames[i], srcName = this._srcNames[i];
        destMap[destName] = sourceMap[srcName];
    }
}


//----------------------------------------------------------------------------------------------------------------------
// Helpers
//----------------------------------------------------------------------------------------------------------------------


function mappingNotifyOwner(mapping){
    for(var i = 0; i < mapping._owners.length; ++i)
        mapping._owners[i].notify(Xflow.RESULT_STATE.CHANGED_STRUCTURE);
    Xflow._callListedCallback();
};

})();
(function(){
/**
 * Content of this file:
 * Classes to request results from an Xflow graph.
 */

/**
 * Abstract Request class.
 * Any Request is created from a DataNode to receive the result of that DataNode.
 * To allow effective optimiziation, it is recommended to create only one Request per DataNode and receive all
 * results through that Request.
 * @abstract
 * @param {Xflow.DataNode} dataNode The DataNode from which to request results
 * @param {?Array.<string>} filter A list of names filtering the values to be received (only return values with names inside the filter)
 * @param {?function} callback A callback function that gets called whenever the result of the Request changes
 */
var Request = function(dataNode, filter, callback){
    this._dataNode = dataNode;
    this._filter = filter ? filter.slice().sort() : null;
    this._listener = callback;
    this._result = null;
    this._dataNodeListener = this._onDataNodeChange.bind(this);
    this._dataNode.addListener(this._dataNodeListener);
};
Xflow.Request = Request;

Object.defineProperty(Request.prototype, "dataNode", {
    set: function(v){
       throw new Error("dataNode is readonly");
    },
    get: function(){ return this._dataNode; }
});

Object.defineProperty(Request.prototype, "filter", {
    set: function(v){
        throw new Error("filter is read-only");
    },
    get: function(){ return this._filter; }
});

/**
 * Call this function, whenever the request is not required anymore.
 */
Request.prototype.clear = function(){
    this._listener = null;
    if(this._result) this._result._removeRequest(this);
    this._dataNode.removeListener(this._dataNodeListener);
};

Request.prototype._onListedCallback = function(data){
    this._listener && this._listener(this, data)
};

function swapResultRequest(request, newResult){
    if(request._result) request._result._removeRequest(request);
    request._result = newResult
    if(newResult) newResult._addRequest(request);
    return newResult;
}

/**
 * @param {Xflow.Request} request
 * @param {Xflow.RESULT_STATE} notification
 */
function notifyListeners(request, notification){
    Xflow._listCallback(request, notification);
};

/**
 * @param {Xflow.RESULT_STATE} notification
 */
Request.prototype._onDataNodeChange = function(notification){
    notifyListeners(this, notification);
}

/**
 * A ComputeRequest is a Request for a ComputeResult, which contains a named map of typed values.
 * @constructor
 * @extends {Xflow.Request}
 * @param {Xflow.DataNode} dataNode The DataNode from which to request results
 * @param {?Array.<string>} filter A list of names filtering the values to be received (only return values with names inside the filter)
 * @param {?function} callback A callback function that gets called whenever the result of the Request changes
 */
var ComputeRequest = function(dataNode, filter, callback){
    Xflow.Request.call(this, dataNode, filter, callback);
};
Xflow.createClass(ComputeRequest, Xflow.Request);
Xflow.ComputeRequest = ComputeRequest;

ComputeRequest.prototype.getResult = function(){
    return swapResultRequest(this, this._dataNode._getResult(Xflow.RESULT_TYPE.COMPUTE, this._filter));
}

ComputeRequest.prototype._onResultChanged = function(notification){
    this._onDataNodeChange(notification);
}


var c_vsConnectNodeCount = {},
    c_vsConnectNodeKey = {},
    c_vsConnectNodeCache = {};

/**
 * A VertexShaderRequest is a Request for a VSDataResult, used to generate a Xflow.VertexShader that includes
 * dataflow processing
 * @constructor
 * @extends {Xflow.Request}
 * @param {Xflow.DataNode} dataNode
 * @param {Xflow.VSConfig} vsConfig Configuraton for the output of the generated vertex shader
 * @param {?function} callback A callback function that gets called whenever the result of the Request changes
 */
var VertexShaderRequest = function(dataNode, vsConfig, callback){

    var filter = vsConfig.getFilter();
    if(filter.length == 0)
        throw new Error("vsConfig requires at least one attribute entry.");
    Xflow.Request.call(this, dataNode, filter, callback);
    this._vsConfig = vsConfig;
    this._vsConnectNode = getVsConnectNode(dataNode, vsConfig);
};
Xflow.createClass(VertexShaderRequest, Xflow.Request);
Xflow.VertexShaderRequest = VertexShaderRequest;

VertexShaderRequest.prototype.getConfig = function(){
    return this._vsConfig;
}

VertexShaderRequest.prototype.getResult = function(){
    return swapResultRequest(this, this._vsConnectNode._getResult(Xflow.RESULT_TYPE.VS, this._filter));
}

VertexShaderRequest.prototype._onDataNodeChange = function(notification){
    if(notification == Xflow.RESULT_STATE.CHANGED_STRUCTURE){
        var newVSConnectedNode = getVsConnectNode(this._dataNode, this._vsConfig, this._filter);
        if(newVSConnectedNode != this._vsConnectNode){
            clearVsConnectNode(this._vsConnectNode);
            this._vsConnectNode = newVSConnectedNode;
        }
    }
    Request.prototype._onDataNodeChange.call(this, notification);
}

VertexShaderRequest.prototype.getVertexShader = function(){
    this.getResult(); // Update the result first
    if(!this._vertexShader){
        this._vertexShader = this._result.getVertexShader(this._vsConfig);
    }
    return this._vertexShader;
}

VertexShaderRequest.prototype._onResultChanged = function(result, notification){
    this._onDataNodeChange(notification);
}

function getVsConnectNode(dataNode, vsConfig, filter){
    var forwardNode = dataNode._getForwardNode(filter);

    var key = getDataNodeShaderKey(forwardNode, vsConfig);
    var connectNode;
    if(!(connectNode = c_vsConnectNodeCache[key])){
        var graph = forwardNode._graph;
        connectNode = graph.createDataNode(false);
        connectNode.appendChild(forwardNode);

        connectNode.computeOperator = vsConfig.getOperator();
        connectNode.computeInputMapping = null;
        connectNode.computeOutputMapping = null;

        c_vsConnectNodeCache[key] = connectNode;
        c_vsConnectNodeCount[connectNode.id] = 1;
        c_vsConnectNodeKey[connectNode.id] = key;
    }
    else{
        c_vsConnectNodeCount[connectNode.id]++;
    }

    return connectNode;
}

function clearVsConnectNode(connectNode){
    c_vsConnectNodeCount[connectNode.id]--;
    if(!c_vsConnectNodeCount[connectNode.id]){
        var key = c_vsConnectNodeKey[connectNode.id];
        c_vsConnectNodeCache[key] = null;
        connectNode.clearChildren();
    }
}


function getDataNodeShaderKey(dataNode, vsConfig){
    return dataNode.id + "|" + vsConfig.getKey();
}

})();
(function(){
/**
 * Content of this file:
 * Result classes of an Xflow graph which are received through Requests.
 */

/**
 * Abstract Result structure containing a (processed) result of the Xflow graph.
 * @abstract
 * @param {Xflow.DataNode} dataNode
 * @param {Array.<string>} filter
 */
Xflow.Result = function(){
    this.loading = false;
    this.valid = false;
    this._listeners = [];
    this._requests = [];
};
var Result = Xflow.Result;

/**
 * @param {function(Xflow.Result, Xflow.RESULT_STATE)} callback
 */
Result.prototype.addListener = function(callback){
    this._listeners.push(callback);
};

/**
 * @param {function(Xflow.Result, Xflow.RESULT_STATE)} callback
 */
Result.prototype.removeListener = function(callback){
    Array.erase(this._listeners, callback);
};

/**
 * @param {function(Xflow.Result, Xflow.RESULT_STATE)} callback
 */
Result.prototype._addRequest = function(request){
    this._requests.push(request);
};

/**
 * @param {function(Xflow.Result, Xflow.RESULT_STATE)} callback
 */
Result.prototype._removeRequest = function(request){
    Array.erase(this._requests, request);
};


Result.prototype._notifyChanged = function(state){
    this.valid = false;
    for(var i = 0; i < this._requests.length; ++i){
        this._requests[i]._onResultChanged(state);
    }
    Xflow._listCallback(this, state);
}

Result.prototype._onListedCallback = function(state){
    for(var i = 0; i < this._listeners.length; ++i){
        this._listeners[i](this, state);
    }
}



/**
 * ComputeResult contains a named map of typed values.
 * @constructor
 * @extends {Xflow.Result}
 */
Xflow.ComputeResult = function(){
    Xflow.Result.call(this);
    this._outputNames = [];
    /** @type {Object.<string,DataEntry>} */
    this._dataEntries = {};
};
Xflow.createClass(Xflow.ComputeResult, Xflow.Result);
var ComputeResult = Xflow.ComputeResult;

Object.defineProperty(ComputeResult.prototype, "outputNames", {
    set: function(v){
        throw new Error("outputNames is readonly");
    },
    get: function(){ return this._outputNames; }
});

ComputeResult.prototype.getOutputData = function(name){
    return this._dataEntries[name];
};

/**
 * @returns {Object.<string,DataEntry>}
 */
ComputeResult.prototype.getOutputMap = function() {
    return this._dataEntries;
};



/**
 * VSDataResult is used to analyse the output of a VertexShader
 * Note that the VSDataResult is not used to generate the VertexShader directly.
 * For that, the Xflow.VertexShader structure must be created from Xflow.VertexShaderRequest
 * @constructor
 * @extends {Xflow.Result}
 */
Xflow.VSDataResult = function(){
    Xflow.Result.call(this);
    this._program = null;
    this._programData = null;
};
Xflow.createClass(Xflow.VSDataResult, Xflow.Result);
var VSDataResult = Xflow.VSDataResult;

Object.defineProperty(VSDataResult.prototype, "outputNames", {
    set: function(v){
        throw new Error("shaderOutputNames is readonly");
    },
    get: function(){ return this._program.getOutputNames(); }
});

VSDataResult.prototype.isOutputUniform = function(name){
    return this._program.isOutputUniform(name);
}
VSDataResult.prototype.isOutputNull = function(name){
    return this._program.isOutputNull(name);
}
VSDataResult.prototype.getOutputType = function(name){
    return this._program.getOutputType(name);
}
VSDataResult.prototype.getVertexShader = function(vsConfig){
    return this._program.createVertexShader(this._programData, vsConfig);
}


})();
(function(){


Xflow.shaderConstant = {}
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.OBJECT_ID] = "objectID";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.SCREEN_TRANSFORM] = "screenTransform";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.SCREEN_TRANSFORM_NORMAL] = "screenTransformNormal";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.VIEW_TRANSFORM] = "viewTransform";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.VIEW_TRANSFORM_NORMAL] = "viewTransformNormal";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.WORLD_TRANSFORM] = "worldTransform";
Xflow.shaderConstant[Xflow.SHADER_CONSTANT_KEY.WORLD_TRANSFORM_NORMAL] = "worldTransformNormal";

Xflow.setShaderConstant = function(type, name){
    Xflow.shaderConstant[type] = name;
}


/**
 * The output configuration of a VertexShader generated by Xflow.
 * @constructor
 */
Xflow.VSConfig = function(){
    this._attributes = {};
    this._blockedNames = [];
    this._addInput = {};
    this._addOutput = {};
    this._codeFragments = [];
    this._outputChanneling = {};
};

Xflow.VSConfig.prototype.addAttribute = function(type, name, optional){
    if(this._attributes[name]){
        if(this._attributes[name].type != type)
            throw new Error("Tries to add two attributes with different types of name '" + name + '"');
        this._attributes[name].optional = this._attributes[name].optional && optional;
        return;
    }
    this._attributes[name] = {type: type, optional: optional, channeling: []};
}

Xflow.VSConfig.prototype.channelAttribute = function(inputName, outputName, code){
    this._attributes[inputName].channeling.push( { outputName : outputName, code : code });
}

Xflow.VSConfig.prototype.addInputParameter = function(type, name, uniform){
    if(this._addInput[name])
        return;
    this._addInput[name] = { type: type, uniform: uniform };
    this._blockedNames.push(name);
}
Xflow.VSConfig.prototype.addOutputParameter = function(type, name){
    if(this._addOutput[name])
        return;
    this._addOutput[name] = { type: type };
    this._blockedNames.push(name);
}
Xflow.VSConfig.prototype.addCodeFragment = function(codeFragment){
    this._codeFragments.push(codeFragment);
}

Xflow.VSConfig.prototype.addBlockedName = function(name){
    this._blockedNames.push(name);
}

Xflow.VSConfig.prototype.getBlockedNames = function(){
    return this._blockedNames;
}

Xflow.VSConfig.prototype.getFilter = function(){
    return Object.keys(this._attributes);
}
Xflow.VSConfig.prototype.getKey = function(){
    var key = "";
    for(var name in this._attributes){
        var attr = this._attributes[name];
        key += ";" + attr.type + "," + name + "," + attr.optional;
    }
    return key;
}

var c_vs_operator_cache = {};

Xflow.VSConfig.prototype.getOperator = function(){
    var key = this.getKey();
    if(c_vs_operator_cache[key])
        return c_vs_operator_cache[key];

    var outputs = [], params = [], glslCode = "\t// VS Connector\n";
    name = "VSConnect";
    for(var name in this._attributes){
        var attr = this._attributes[name];
        var type = Xflow.getTypeName(attr.type);
        outputs.push( { type: type, name: name} );
        params.push( { type: type, source: name, optional: attr.optional} );
        name += "T" + type + "N" + name + "O" + attr.optional + ".";
    }
    var operator = Xflow.initAnonymousOperator(name,
    {
        outputs: outputs,
        params:  params,
        evaluate_glsl: glslCode
    });
    c_vs_operator_cache[key] = operator;
    return operator;
}

Xflow.VertexShader = function(programData){
    this._programData = programData;
    this._glslCode = null;
    this._inputNames = [];
    this._outputNames = [];
    this._inputInfo = {};
    this._outputInfo = {};
}

Object.defineProperty(Xflow.VertexShader.prototype, "inputNames", {
    set: function(v){
        throw new Error("inputNames is readonly");
    },
    get: function(){ return this._inputNames; }
});

Object.defineProperty(Xflow.VertexShader.prototype, "outputNames", {
    set: function(v){
        throw new Error("outputNames is readonly");
    },
    get: function(){ return this._outputNames; }
});

Xflow.VertexShader.prototype.isInputUniform = function(name){
    return this._inputInfo[name].uniform;
}
Xflow.VertexShader.prototype.getInputData = function(name){
    return this._programData.getDataEntry(this._inputInfo[name].index);
}

Xflow.VertexShader.prototype.isOutputNull = function(name){
    return this._outputInfo[name].iteration == Xflow.ITERATION_TYPE.NULL;
}
Xflow.VertexShader.prototype.isOutputFragmentUniform = function(name){
    return this._outputInfo[name].iteration == Xflow.ITERATION_TYPE.ONE;
}
Xflow.VertexShader.prototype.getUniformOutputData = function(name){
    return this._programData.getDataEntry(this._outputInfo[name].index);
}
Xflow.VertexShader.prototype.getOutputType = function(name){
    return this._outputInfo[name].type;
}
Xflow.VertexShader.prototype.getOutputSourceName = function(name){
    return this._outputInfo[name].sourceName;
}
Xflow.VertexShader.prototype.getGLSLCode = function(){
    return this._glslCode;
}


}());(function(){

//----------------------------------------------------------------------------------------------------------------------
// Xflow.DataSlot
//----------------------------------------------------------------------------------------------------------------------

    /**
     * @contructuor
     * @param {Xflow.DataEntry} value
     * @param {number=} key
     */
    Xflow.DataSlot = function(dataEntry, key){
        this.key = key || 0;
        this.dataEntry = dataEntry;
        this.asyncDataEntry = null;
        this.parentChannels = [];

    }
    Xflow.DataSlot.prototype.addChannel = function(channel){
        this.parentChannels.push(channel);
    }
    Xflow.DataSlot.prototype.removeChannel = function(channel){
        var idx = this.parentChannels.indexOf(channel);
        if(idx != -1) this.parentChannels.splice(idx, 1);
    }
    Xflow.DataSlot.prototype.swapAsync = function(){
        var tmp = this.dataEntry;
        this.dataEntry = this.asyncDataEntry;
        this.asyncDataEntry = tmp;
    }

    Xflow.DataSlot.prototype.setDataEntry = function(dataEntry, changeType){
        this.dataEntry = dataEntry;
        var state = changeType == Xflow.RESULT_STATE.CHANGED_DATA_VALUE ? Xflow.DATA_ENTRY_STATE.CHANGED_VALUE :
            Xflow.DATA_ENTRY_STATE.CHANGED_SIZE;
        this.notifyOnChange(state);
    }

    Xflow.DataSlot.prototype.notifyOnChange = function(state){
        for(var i = 0; i < this.parentChannels.length; ++i){
            this.parentChannels[i].notifyOnChange(state);
        }
    }

//----------------------------------------------------------------------------------------------------------------------
// Xflow.ChannelMap
//----------------------------------------------------------------------------------------------------------------------

    /**
     * @constructor
     */
    Xflow.ChannelMap = function(){
        this.map = {};
    }
    var ChannelMap = Xflow.ChannelMap;


    ChannelMap.prototype.getNames = function()
    {
        var result = [];
        for(var name in this.map){
            result.push(name);
        }
        return result;
    }

    ChannelMap.prototype.getChannel = function(name)
    {
        if(!this.map[name])
            return null;
        return this.map[name].channel;
    }

    ChannelMap.prototype.getChildDataIndex = function(name)
    {
        if(!this.map[name])
            return undefined;
        return this.map[name].childDataIndex;
    }
    ChannelMap.prototype.getChildDataIndexForFilter = function(filter){
        var result;
        filter = filter || this.getNames();
        for(var i = 0; i < filter.length; ++i){
            var idx = this.getChildDataIndex(filter[i]);
            if(idx == undefined) continue;
            if(result != undefined && result != idx)
                result = -1;
            else
                result = idx;
        }
        return result;
    }

    ChannelMap.prototype.merge = function(otherChannelMap, childDataIndex){
        for(var name in otherChannelMap.map){
            var index = childDataIndex == undefined ? otherChannelMap.getChildDataIndex(name) : childDataIndex;
            this.addChannel(name, otherChannelMap.getChannel(name), index);
        }
    }

    ChannelMap.prototype.addChannel = function(name, channel, childDataIndex){
        if(!channel) return;
        if(childDataIndex == undefined) childDataIndex = -1;
        mergeChannelIntoChannel(this, name, channel, childDataIndex);
    }

    ChannelMap.prototype.addDataEntry = function(name, dataSlot)
    {
        mergeDataSlotIntoChannel(this, name, dataSlot, -1);
    }

    ChannelMap.prototype.addOutputDataSlot = function(name, dataSlot, creatorNode){
        var finalChannel = mergeDataSlotIntoChannel(this, name, dataSlot, -1);
        finalChannel.creatorProcessNode = creatorNode;
    }

    ChannelMap.prototype.clear = function(){
        for(var name in this.map){
            var channel = this.map[name];
            if(channel && channel.map == this)
                channel.clear();
        }
        this.map = {};
    }

    function initChannelSlot(channelMap, name){
        if(!channelMap.map[name]){
            channelMap.map[name] = {
                channel: null,
                childDataIndex: undefined
            }
        }
    }

    function mergeChannelIntoChannel(channelMap, name, newChannel, childDataIndex){
        initChannelSlot(channelMap, name);
        var currentChannel = channelMap.map[name].channel;
        if(!currentChannel || !currentChannel.willMergeWithChannel(newChannel)) {
            channelMap.map[name].channel = newChannel;
            channelMap.map[name].childDataIndex = childDataIndex;
            return newChannel;
        }
        currentChannel = getMapOwnedChannel(channelMap, currentChannel);
        currentChannel.addChannelEntries(newChannel);
        channelMap.map[name].channel = currentChannel;
        channelMap.map[name].childDataIndex = -1;
        return currentChannel;
    }

    function mergeDataSlotIntoChannel(channelMap, name, dataSlot, childDataIndex){
        initChannelSlot(channelMap, name);
        var currentChannel = channelMap.map[name].channel;
        if(!currentChannel || !currentChannel.willMergeWithDataSlot(dataSlot)){
            var channel = new Xflow.Channel(channelMap, dataSlot);
            channelMap.map[name].channel = channel;
            channelMap.map[name].childDataIndex = childDataIndex;
            return channel;
        }
        currentChannel = getMapOwnedChannel(channelMap, currentChannel);
        currentChannel.addDataSlot(dataSlot);
        channelMap.map[name].channel = currentChannel;
        channelMap.map[name].childDataIndex = -1;
        return currentChannel;
    }


    function getMapOwnedChannel(map, channel){
        if(channel.map != map){
            var newChannel = new Xflow.Channel(map);
            newChannel.addChannelEntries(channel);
            newChannel.creatorProcessNode = channel.creatorProcessNode;
            return newChannel
        }
        return channel;
    }


//----------------------------------------------------------------------------------------------------------------------
// Xflow.Channel
//----------------------------------------------------------------------------------------------------------------------


    /**
     * @constructor
     * @param {Xflow.ChannelMap} map Owner of the channel
     * @param {Xflow.DataSlot=} dataEntry Optional DataEntry added to the channel
     */
    Xflow.Channel = function(map, dataSlot){
        this.entries = [];
        this.map = map;
        this.id = generateChannelId();
        this.listeners = [];
        this.creatorProcessNode = null;

        if(dataSlot){
            this.addDataSlot(dataSlot);
        }
    }
    var Channel = Xflow.Channel;

    Channel.prototype.addDataSlot = function(dataSlot){
        dataSlot.addChannel(this);
        for(var i = 0; i < this.entries.length; ++i){
            var entry = this.entries[i];
            if(entry.key >= dataSlot.key - Xflow.EPSILON ){
                if(Math.abs(entry.key - dataSlot.key) <= Xflow.EPSILON){
                    entry.removeChannel(this);
                    this.entries.splice(i, 1, dataSlot);
                }
                else{
                    this.entries.splice(i, 0, dataSlot);
                }
                break;
            }
        }
        this.entries.push(dataSlot);
    };

    Channel.prototype.getSequenceLength = function(){
        return this.entries.length;
    }
    Channel.prototype.getSequenceMinKey = function(){
        return this.entries[0].key;
    }
    Channel.prototype.getSequenceMaxKey = function(){
        return this.entries[this.entries.length - 1].key;
    }

    Channel.prototype.getType = function(){
        if(this.entries.length == 0)
            return Xflow.DATA_TYPE.UNKNOWN;
        else
            return this.entries[0].dataEntry._type;
    }

    Channel.prototype.addChannelEntries = function(otherChannel){
        for(var i = 0; i < otherChannel.entries.length; ++i){
            var slot = otherChannel.entries[i];
            this.addDataSlot(slot);
        }
        if(otherChannel.creatorProcessNode)
            this.creatorProcessNode = otherChannel.creatorProcessNode;
    }

    Channel.prototype.getDataEntry = function(sequenceAccessType, sequenceKey){
        if(this.entries.length == 0)
            return null;
        if(!sequenceAccessType)
            return this.entries[0].dataEntry;

        var i = 0, max = this.entries.length;
        while(i < max && this.entries[i].key < sequenceKey) ++i;
        if(sequenceAccessType == Xflow.SEQUENCE.PREV_BUFFER){
            return this.entries[i ? i -1 : 0].dataEntry;
        }
        else if(sequenceAccessType == Xflow.SEQUENCE.NEXT_BUFFER){
            return this.entries[i < max ? i : max - 1].dataEntry;
        }
        else if(sequenceAccessType == Xflow.SEQUENCE.LINEAR_WEIGHT){
            var weight1 = this.entries[i ? i - 1 : 0].key;
            var weight2 = this.entries[i < max ? i : max - 1].key;
            var value = new Float32Array(1);
            value[0] = weight2 == weight1 ? 0 : (sequenceKey - weight1) / (weight2 - weight1);
            // TODO: Check if repeated BufferEntry and Float32Array allocation is a serious bottleneck
            return new Xflow.BufferEntry(Xflow.DATA_TYPE.FLOAT, value);
        }
        return null;
    };


    Channel.prototype.willMergeWithChannel = function(otherChannel){
        if(this.entries.length != otherChannel.entries.length) return true;
        if(this.getType() != otherChannel.getType())
            return false;
        for(var i = 0; i < this.entries.length; i++){
            if(Math.abs(this.entries[i].key - otherChannel.entries[i].key) > Xflow.EPSILON)
                return true;
        }
        return false;
    }
    Channel.prototype.willMergeWithDataSlot = function(dataSlot){
        if(this.entries.length > 1) return true;
        if(this.getType() != dataSlot.dataEntry._type) return false;
        if(Math.abs(this.entries[0].key - dataSlot.key) > Xflow.EPSILON)
            return true;
        return false;
    }

    Channel.prototype.notifyOnChange = function(state){
        for(var i = 0; i < this.listeners.length; i++){
            this.listeners[i].onXflowChannelChange(this, state);
        }
    }

    Channel.prototype.addListener = function(processNode){
        this.listeners.push(processNode);
    }
    Channel.prototype.removeListener = function(processNode){
        var idx = this.listeners.indexOf(processNode);
        if(idx != -1) this.listeners.splice(idx, 1);
    }

    Channel.prototype.clear = function(){
        for(var i = 0; i < this.entries.length; ++i){
            this.entries[i].removeChannel(this);
        }
    }

    var c_channelKeyIdx = 0;
    function generateChannelId(){
        return ++c_channelKeyIdx;
    }


})();

(function(){


//----------------------------------------------------------------------------------------------------------------------
// Xflow.ChannelNode
//----------------------------------------------------------------------------------------------------------------------

    /**
     * @constructor
     * @extends {Xflow.GraphNode}
     */
    Xflow.ChannelNode = function(dataNode, substitution){
        this.owner = dataNode;
        this.platform = Xflow.PLATFORM.JAVASCRIPT;
        this.substitution = substitution;
        this.loading = false;
        this.inputSlots = {};
        this.inputChannels = new Xflow.ChannelMap();
        this.computedChannels = new Xflow.ChannelMap();
        this.outputChannels = new Xflow.ChannelMap();

        this.operator = null;
        this.dataflowChannelNode = null;
        this.processNode = null;
        this.requestNodes = {};
        this.useCount = 1;
        // State:
        this.outOfSync = true; // true if ChannelNode is not synchronized for no substitution
    };


    Xflow.ChannelNode.prototype.synchronize = function(){

        if(this.outOfSync){
            updatePlatform(this);
            synchronizeChildren(this);
            updateInputChannels(this);
            updateComputedChannels(this);
            updateOutputChannels(this);
            this.outOfSync = false;
        }
    }

    Xflow.ChannelNode.prototype.clear = function(){
        this.useCount = 0;
         this.inputChannels.clear();
         this.outputChannels.clear();
         // TODO: Make sure everything is cleaned up there!
        return true;
    }

    Xflow.ChannelNode.prototype.increaseRef = function(){
        this.useCount++;
    }

    Xflow.ChannelNode.prototype.decreaseRef = function(){
        this.useCount--;
        if(this.useCount == 0){
            this.clear();
        }
        return false;
    }

    Xflow.ChannelNode.prototype.getOutputNames = function(){
        this.synchronize();
        return this.outputChannels.getNames();
    }

    Xflow.ChannelNode.prototype.getChildDataIndex = function(filter){
        this.synchronize();
        return this.outputChannels.getChildDataIndexForFilter(filter);
    }

    Xflow.ChannelNode.prototype.setStructureOutOfSync = function()
    {
        if(!this.outOfSync){
            this.outOfSync = true;
            this.inputChannels.clear();
            this.computedChannels.clear();
            this.outputChannels.clear();
            this.processNode && this.processNode.clear();
            for(var key in this.requestNodes){
                this.requestNodes[key].setStructureOutOfSync();
            }
        }
    }

    Xflow.ChannelNode.prototype.notifyDataChange = function(inputNode, changeType){
        var key = inputNode._name + ";" + inputNode._key;
        if(this.inputSlots[key])
            this.inputSlots[key].setDataEntry(inputNode._data, changeType);
    }

    Xflow.ChannelNode.prototype.getResult = function(type, filter)
    {
        this.synchronize();

        var key = filter ? filter.join(";") : "[null]";
        if(!this.requestNodes[key]){
            this.requestNodes[key] = new Xflow.RequestNode(this, filter);
        }
        return this.requestNodes[key].getResult(type);
    }


    Xflow.ChannelNode.prototype.getOutputChannelInfo = function(name){
        this.synchronize();

        var channel = this.outputChannels.getChannel(name);
        if(!channel)
            return null;
        var result = {
            type: channel.getType(),
            seqLength: channel.getSequenceLength(),
            seqMinKey: channel.getSequenceMinKey(),
            seqMaxKey: channel.getSequenceMaxKey(),
            origin: 0,
            originalName: ""
        }
        var preFilterName = this.owner._filterMapping ? this.owner._filterMapping.getRenameSrcName(name) : name;
        var dataEntry = channel.getDataEntry();
        if(this.dataflowChannelNode){
            var protoInputChannel = this.inputChannels.getChannel(preFilterName);
            if(!protoInputChannel || dataEntry != protoInputChannel.getDataEntry()){
                result.origin = Xflow.ORIGIN.PROTO;
                result.originalName = preFilterName;
                return result;
            }
        }
        if(this.operator){
            var inputChannel = this.inputChannels.getChannel(preFilterName);
            if(!inputChannel || dataEntry != inputChannel.getDataEntry()){
                result.origin = Xflow.ORIGIN.COMPUTE;
                result.originalName = this.owner._computeOutputMapping.getScriptOutputNameInv(preFilterName, this.operator.outputs);
                return result;
            }
        }
        result.origin = Xflow.ORIGIN.CHILD;
        result.originalName = preFilterName;
        return result;
    }


    function updatePlatform(channelNode) {
        var platform;
        var owner = channelNode.owner;
        var graph = owner._graph;

        // Platforms other than JavaScript are available only for computing operators
        if(!channelNode.owner._computeOperator) {
            return;
        }

        //TODO: Add better platform selection logic: Apply forced platform attribute value from Xml3D Data/Dataflow adapter

        platform = graph.platform;

        channelNode.platform = platform;
    }


    function synchronizeChildren(channelNode){


        var dataNode = channelNode.owner;
        channelNode.loading = dataNode._subTreeLoading;

        if(channelNode.substitution)
            dataNode._channelNode.synchronize();

        if(dataNode._sourceNode){
            dataNode._sourceNode._getChannelNode(channelNode.substitution).synchronize();
        }
        else{
            for(var i = 0; i < dataNode._children.length; ++i){
                if(dataNode._children[i]._getChannelNode){
                    dataNode._children[i]._getChannelNode(channelNode.substitution).synchronize();
                }
            }
        }
    }

    function updateInputChannels(channelNode){
        var owner = channelNode.owner;
        if(owner._sourceNode){
            channelNode.inputChannels.merge(owner._sourceNode._getChannelNode(channelNode.substitution).outputChannels, 0);
        }
        else{
            var children = owner._children;
            for(var i = 0; i < children.length; ++i){
                if(children[i]._getChannelNode){
                    channelNode.inputChannels.merge(children[i]._getChannelNode(channelNode.substitution).outputChannels, i);
                }
            }
            for(var i = 0; i < children.length; ++i){
                if(!children[i]._getChannelNode){
                    var child = children[i];
                    var key = child._name + ";" + child._key;
                    if(!channelNode.substitution){
                        var slot = new Xflow.DataSlot(child._data, child._key);
                        channelNode.inputSlots[key] = slot;
                        channelNode.inputChannels.addDataEntry(child._name, slot);
                    }
                    else{
                        if(child._paramName && channelNode.substitution.hasChannel(child._paramName)){
                            channelNode.inputChannels.addChannel(child._name,
                                channelNode.substitution.getChannel(child._paramName));
                        }
                        else{
                            channelNode.inputChannels.addDataEntry(child._name, owner._channelNode.inputSlots[key]);
                        }
                    }
                }
            }
        }
    }

    function updateComputedChannels(channelNode){
        var owner = channelNode.owner;
        channelNode.computedChannels.merge(channelNode.inputChannels);

        var oldDataflowChannelNode = channelNode.dataflowChannelNode;

        if( owner._computeUsesDataflow && owner._dataflowNode){
            channelNode.operator = null;
            updateDataflowChannelNode(channelNode);
            updateComputedChannelsFromDataflow(channelNode);
        }
        else if(!owner._computeUsesDataflow && owner._computeOperator){
            channelNode.dataflowChannelNode = null;
            updateOperator(channelNode);
            updateComputedChannelsFromOperator(channelNode);
        }

        if(oldDataflowChannelNode && oldDataflowChannelNode != channelNode.dataflowChannelNode){
            oldDataflowChannelNode.owner._removeSubstitutionNode(oldDataflowChannelNode);
        }
    }

    function updateOperator(channelNode){
        var operatorName, operator;
        var owner = channelNode.owner;

        if(channelNode.loading){
            channelNode.operator = null;
            return;
        }
        if(typeof owner._computeOperator == "string"){
            operatorName = owner._computeOperator;
            operator = null;

            // Getting a correct operator for the selected platform. If operator is not available, we'll try to get
            // the default JavaScript platform operator
            if(operatorName){
                operator = findOperatorByName(channelNode, owner);
                if(operator){
                    channelNode.platform = operator.platform;
                }
            }
            channelNode.operator = operator;
        }else{
            channelNode.operator = owner._computeOperator;
        }
    }

    var c_typeComparisons = [];

    function findOperatorByName(channelNode, dataNode){
        var operatorName = dataNode._computeOperator,
            inputMapping = dataNode._computeInputMapping,
            inputChannels = channelNode.inputChannels;

        var operators = Xflow.getOperators(operatorName, channelNode.platform) ||
                    Xflow.getOperators(operatorName, Xflow.PLATFORM.JAVASCRIPT);
        if(!operators){
            Xflow.notifyError("No operator with name '" + operatorName+"' found", channelNode.owner);
        }

        var i = operators.length;
        while(i--){
            if(checkOperator(operators[i], inputMapping, inputChannels)){
                return operators[i];
            }
        }
        c_typeComparisons.length = 0;
        var i = operators.length;
        while(i--){
            checkOperator(operators[i], inputMapping, inputChannels, c_typeComparisons);
        }
        var errorMessage = "No operator '" + operatorName+"' with matching type signature found:\n\n"
                            + c_typeComparisons.join("\n");
        Xflow.notifyError(errorMessage, channelNode.owner);
        return null;
    }
    function checkOperator(operator, inputMapping, inputChannels, typeComparisons){
        var inputs, errors;
        if(typeComparisons){
            inputs = [], errors = [];
        }
        for(var i = 0; i < operator.params.length; ++i){
            var inputEntry = operator.params[i], sourceName = inputEntry.source;
            var dataName = inputMapping ? inputMapping.getScriptInputName(i, sourceName) : sourceName;
            var errorHeader;
            if(typeComparisons){
                errorHeader = "For " + (i+1) + ". argument '" + sourceName + "': ";
                inputs.push( Xflow.getTypeName(inputEntry.type) + " " + sourceName + (inputEntry.optional ? " [optional]" : ""));
            }
            if(dataName){
                var channel = inputChannels.getChannel(dataName);
                if(!channel && !inputEntry.optional){
                    if(!typeComparisons)
                        return false;
                    else{
                        errors.push(errorHeader + "DataEntry '" + dataName + "' does not exist");
                    }
                }
                if(channel && channel.getType() != inputEntry.type){
                    if(!typeComparisons)
                        return false;
                    else{
                        errors.push(errorHeader + "DataEntry '" + dataName + "' has wrong type '" + Xflow.getTypeName(channel.getType()) + "'");
                    }
                }
            }
        }
        if(typeComparisons){
            typeComparisons.push(operator.name + "(" + inputs.join(", ") + ")\n\t * " + errors.join("\n\t * "));
        }
        return true;
    }


    function updateComputedChannelsFromOperator(channelNode){
        var owner = channelNode.owner;
        if(channelNode.operator){
            var procNode = channelNode.processNode = new Xflow.ProcessNode(channelNode);
            var index = 0;
            for(var name in procNode.outputDataSlots){
                var destName = name;
                if(owner._computeOutputMapping) destName = owner._computeOutputMapping.getScriptOutputName(index, name);
                if(destName){
                    channelNode.computedChannels.addOutputDataSlot(destName, procNode.outputDataSlots[name], procNode);
                }
                index++;
            }
        }
    }

    function updateDataflowChannelNode(channelNode){
        var owner = channelNode.owner;
        var subSubstitution = new Xflow.Substitution(owner._dataflowNode, channelNode);
        channelNode.dataflowChannelNode = owner._dataflowNode._getChannelNode(subSubstitution);
    }

    function updateComputedChannelsFromDataflow(channelNode){
        var owner = channelNode.owner;
        if(channelNode.dataflowChannelNode){
            var dataflowCNode = channelNode.dataflowChannelNode;
            dataflowCNode.synchronize();
            // TODO: We have to make sure to get outputNames in the right order to apply output mapping correctly
            var outputNames = dataflowCNode.outputChannels.getNames();
            for(var i = 0; i < outputNames.length; ++i){
                var srcName = outputNames[i], destName = srcName;
                if(owner._computeOutputMapping)
                    destName = owner._computeOutputMapping.getScriptOutputName(i, srcName);
                if(destName)
                    channelNode.computedChannels.addChannel(destName, dataflowCNode.outputChannels.getChannel(srcName));
            }
        }
    }

    function updateOutputChannels(channelNode){
        var dataNode = channelNode.owner;
        if(dataNode._filterMapping)
            dataNode._filterMapping.applyFilterOnChannelMap(channelNode.outputChannels, channelNode.computedChannels,
                dataNode._filterType, setChannelFilterCallback);
        else
            channelNode.outputChannels.merge(channelNode.computedChannels);
    }

    function setChannelFilterCallback(destMap, destName, srcMap, srcName){
        var channel = srcMap.getChannel(srcName);
        destMap.addChannel(destName, channel, srcMap.getChildDataIndex(srcName));
    }

//----------------------------------------------------------------------------------------------------------------------
// Xflow.Substitution
//----------------------------------------------------------------------------------------------------------------------

    Xflow.Substitution = function(dataflowNode, userChannelNode){
        this.map = {};

        createSubstitution(this, dataflowNode, userChannelNode);
    }

    Xflow.Substitution.prototype.hasChannel = function(name){
        return !!this.map[name];
    }
    Xflow.Substitution.prototype.getChannel = function(name){
        return this.map[name];
    }
    Xflow.Substitution.prototype.getKey = function(subDataflowNode){
        var key = "";
        var globalParamNames = subDataflowNode._getGlobalParamNames();
        for(var i = 0; i < globalParamNames.length; ++i){
            var channel = this.map[globalParamNames[i]];
            key+= (channel && channel.id || "-") + "!";
        }
        var paramNames = subDataflowNode._getParamNames();
        for(var i = 0; i < paramNames.length; ++i){
            var channel = this.map[paramNames[i]];
            key+= (channel && channel.id || "-") + ".";
        }
        return key;
    }

    function createSubstitution(substitution, dataflowNode, userChannelNode){
        var userOwner = userChannelNode.owner;
        var globalParamNames = dataflowNode._getGlobalParamNames();
        for(var i = 0; i < globalParamNames.length; ++i){
            substitution.map[globalParamNames[i]] = userChannelNode.inputChannels.getChannel(globalParamNames[i]);
        }
        var paramNames = dataflowNode._getParamNames();
        for(var i = 0; i < paramNames.length; ++i){
            var destName = paramNames[i], srcName = destName;
            if(userOwner._computeInputMapping){
                srcName = userOwner._computeInputMapping.getScriptInputName(i, destName);
            }
            substitution.map[destName] = userChannelNode.inputChannels.getChannel(srcName);
        }
    }

})();

(function(){


//----------------------------------------------------------------------------------------------------------------------
// Xflow.ProcessNode
//----------------------------------------------------------------------------------------------------------------------

var ASYNC_PROCESS_STATE = {
    IDLE : 0,
    RUNNING : 1,
    RESCHEDULED : 2,
    INIT: 3
}


/**
 * @constructor
 * @extends {Xflow.GraphNode}
 */
Xflow.ProcessNode = function(channelNode){
    this.owner = channelNode;
    this.operator = channelNode.operator;
    this.inputChannels = {};
    this.outputDataSlots = {};
    this.status = Xflow.PROCESS_STATE.MODIFIED;

    this.children = [];
    this.descendants = [];
    this.executers = [];
    this.asyncProcessState = ASYNC_PROCESS_STATE.INIT;
    constructProcessNode(this, channelNode);
    if(Xflow.isOperatorAsync(this.operator)){
        this._bindedAsyncCallback = this.receiveAsyncProcessing.bind(this);
    }
};
var ProcessNode = Xflow.ProcessNode;

ProcessNode.prototype.onXflowChannelChange = function(channel, state){
    if(Xflow.isOperatorAsync(this.operator)){
        if(this.asyncProcessState != ASYNC_PROCESS_STATE.INIT){
            this.status = Xflow.PROCESS_STATE.MODIFIED;
            this.updateState();
        }
    }
    else{
        if(state == Xflow.DATA_ENTRY_STATE.CHANGED_VALUE &&
            this.status > Xflow.PROCESS_STATE.UNPROCESSED)
            this.status = Xflow.PROCESS_STATE.UNPROCESSED;
        else
            this.status = Xflow.PROCESS_STATE.MODIFIED;
        this.notifyOutputChanged(state);
    }
}

ProcessNode.prototype.startAsyncProcessing = function(){
    if(this.asyncProcessState == ASYNC_PROCESS_STATE.IDLE || this.asyncProcessState == ASYNC_PROCESS_STATE.INIT){
        this.asyncProcessState = ASYNC_PROCESS_STATE.RUNNING;
        var executer = getOrCreateExecuter(this, Xflow.PLATFORM.ASYNC);
        executer.run(this._bindedAsyncCallback);
    }
    else{
        this.asyncProcessState = ASYNC_PROCESS_STATE.RESCHEDULED;
    }
}
ProcessNode.prototype.receiveAsyncProcessing = function(){
    this.status = Xflow.PROCESS_STATE.PROCESSED;
    this.notifyOutputChanged(Xflow.DATA_ENTRY_STATE.CHANGED_SIZE_TYPE);
    if(this.asyncProcessState == ASYNC_PROCESS_STATE.RESCHEDULED){
        this.asyncProcessState = ASYNC_PROCESS_STATE.IDLE;
        this.status = Xflow.PROCESS_STATE.MODIFIED;
        this.updateState();
    }
    else{
        this.asyncProcessState = ASYNC_PROCESS_STATE.IDLE;
    }
    Xflow._callListedCallback();
}



ProcessNode.prototype.notifyOutputChanged = function(state){
    for(var name in this.outputDataSlots){
        this.outputDataSlots[name].notifyOnChange(state);
    }
}


ProcessNode.prototype.clear = function(){
    for(var name in this.inputChannels){
        this.inputChannels[name] && this.inputChannels[name].removeListener(this);
    }
}

ProcessNode.prototype.updateState = function(){
    if(this.status == Xflow.PROCESS_STATE.MODIFIED){
        this.status = Xflow.PROCESS_STATE.UNPROCESSED;

        if(this.owner.loading)
            this.status = Xflow.PROCESS_STATE.LOADING;
        else{
            for(var i = 0; i < this.children.length; ++i){
                this.status = Math.min(this.status, this.children[i].updateState());
            }
            if(this.status > Xflow.PROCESS_STATE.LOADING && isInputLoading(this.operator, this.inputChannels))
                this.status = Xflow.PROCESS_STATE.LOADING;

            if(this.status > Xflow.PROCESS_STATE.INVALID &&
                !checkInput(this, this.operator, this.owner.owner._computeInputMapping, this.inputChannels))
                this.status = Xflow.PROCESS_STATE.INVALID;

            if(this.status == Xflow.PROCESS_STATE.UNPROCESSED && Xflow.isOperatorAsync(this.operator)){
                this.status = this.asyncProcessState == ASYNC_PROCESS_STATE.INIT ? Xflow.PROCESS_STATE.LOADING
                    : Xflow.PROCESS_STATE.PROCESSED;
                this.startAsyncProcessing();
            }

        }
    }
    return this.status;
}

ProcessNode.prototype.process = function(){
    var executer;

    if(this.status == Xflow.PROCESS_STATE.UNPROCESSED){
        executer = getOrCreateExecuter(this, this.owner.platform);
        executer.run();

        this.status = Xflow.PROCESS_STATE.PROCESSED;
    }
}

function constructProcessNode(processNode, channelNode){
    var dataNode = channelNode.owner;
    synchronizeInputChannels(processNode, channelNode, dataNode);
    synchronizeChildren(processNode.children, processNode.descendants, processNode.inputChannels);
    synchronizeOutput(processNode.operator, processNode.outputDataSlots);
}

function synchronizeInputChannels(processNode, channelNode, dataNode){
    var operator = processNode.operator, inputMapping = dataNode._computeInputMapping;
    for(var i = 0; i < operator.params.length; ++i){
        var sourceName = operator.params[i].source;
        var dataName = inputMapping ? inputMapping.getScriptInputName(i, sourceName) : sourceName;
        if(dataName){
            var channel = channelNode.inputChannels.getChannel(dataName);
            if(channel) channel.addListener(processNode);
            processNode.inputChannels[sourceName] = channel;
        }
    }
}

function isInputLoading(operator, inputChannels){
    for(var i in operator.params){
        var entry = operator.params[i];
        var channel = inputChannels[entry.source];
        if(!channel) continue;
        var dataEntry = channel.getDataEntry();
        if(!dataEntry) continue;
        if(dataEntry.isLoading && dataEntry.isLoading()) return true;
    }
    return false;
}

function checkInput(processNode, operator, inputMapping, inputChannels){
    var dataNode = processNode.owner.owner;
    for(var i in operator.params){
        var entry = operator.params[i];
        var dataName = inputMapping ? inputMapping.getScriptInputName(i, entry.source) : entry.source;
        if(!entry.optional && !dataName){
            Xflow.notifyError("Xflow: operator " + operator.name + ": Missing input argument for "
                + entry.source, dataNode);
            return false;
        }
        if(dataName){
            var channel = inputChannels[entry.source];
            if(!channel){
                Xflow.notifyError("Xflow: operator " + operator.name + ": Input of name '" + dataName +
                    "' not found. Used for parameter " + entry.source, dataNode);
                return false;
            }
            var dataEntry = channel.getDataEntry();

            if(!channel.creatorProcessNode){
                if(!entry.optional && (!dataEntry || dataEntry.isEmpty())){
                    Xflow.notifyError("Xflow: operator " + operator.name + ": Input for " + entry.source +
                        ' contains no data.', dataNode);
                    return false;
                }
            }
            if(dataEntry && dataEntry.type != entry.type){
                Xflow.notifyError("Xflow: operator " + operator.name + ": Input for " + entry.source +
                    " has wrong type. Expected: " + Xflow.getTypeName(entry.type)
                    + ", but got: " +  Xflow.getTypeName(dataEntry.type), dataNode);
                return false;
            }
        }
    }
    return true;
}

function synchronizeChildren(children, descendants, inputChannels){
    var channel, idx;
    for(var name in inputChannels){
        channel = inputChannels[name];
        if(channel && channel.creatorProcessNode){
            Xflow.utils.setAdd(children, channel.creatorProcessNode);
            Xflow.utils.setAdd(descendants, channel.creatorProcessNode.descendants);
        }
    }
    Xflow.utils.setRemove(children, descendants);
    Xflow.utils.setAdd(descendants, children);
}

function synchronizeOutput(operator, outputs){
    var async = Xflow.isOperatorAsync(operator);
    for(var i in operator.outputs){
        var d = operator.outputs[i];

        var entry, asyncEntry;
        var type = d.type;
        if(type != Xflow.DATA_TYPE.TEXTURE){
            entry = new Xflow.BufferEntry(type, null);
            if(async) asyncEntry = new Xflow.BufferEntry(type, null);
        }
        else{
            entry = window.document ? new Xflow.TextureEntry(null) : new Xflow.ImageDataTextureEntry(null);
            if(async) asyncEntry = window.document ? new Xflow.TextureEntry(null) : new Xflow.ImageDataTextureEntry(null);
        }
        outputs[d.name] = new Xflow.DataSlot(entry, 0);
        if(async) outputs[d.name].asyncDataEntry = asyncEntry;
    }
}

function getOrCreateExecuter(node, platform){
    if(!node.executers[platform]){
        node.executers[platform] = new Xflow.Executer(node, platform);
    }
    return node.executers[platform];
}


//----------------------------------------------------------------------------------------------------------------------
// Xflow.RequestNode
//----------------------------------------------------------------------------------------------------------------------
/**
 * @constructor
 * @param channelNode
 * @param filter
 */
Xflow.RequestNode = function(channelNode, filter){
    this.owner = channelNode;
    this.filter = filter;
    this.results = {};

    this.status = Xflow.PROCESS_STATE.MODIFIED;

    this.channels = {};
    this.children = [];

    this.executers = [];

    this.outOfSync = true;
}
var RequestNode = Xflow.RequestNode;

RequestNode.prototype.synchronize = function(){
    if(this.outOfSync){
        this.outOfSync = false;
        synchronizeRequestChannels(this, this.owner);
        synchronizeChildren(this.children, [], this.channels);
    }
}

RequestNode.prototype.updateState = function(){
    this.synchronize();
    if(this.status == Xflow.PROCESS_STATE.MODIFIED){
        this.status = Xflow.PROCESS_STATE.UNPROCESSED

        if(this.owner.loading)
            this.status = Xflow.PROCESS_STATE.LOADING;
        else{
            for(var i = 0; i < this.children.length; ++i){
                this.status = Math.min(this.status, this.children[i].updateState());
            }
        }
    }
    return this.status;
}

RequestNode.prototype.isReady = function(){
    this.updateState();
    return this.status >= Xflow.PROCESS_STATE.UNPROCESSED;
}

RequestNode.prototype.getResult = function(resultType){
    this.updateState();

    if(this.status == Xflow.PROCESS_STATE.UNPROCESSED){
        if(resultType == Xflow.RESULT_TYPE.COMPUTE){
            var executer = getOrCreateExecuter(this, this.owner.platform);
            if(!executer.isProcessed())
                executer.run();
        }
        this.status = Xflow.PROCESS_STATE.PROCESSED;
    }
    var result = null;
    if(resultType == Xflow.RESULT_TYPE.COMPUTE){
        result = getRequestComputeResult(this);
    }else if(resultType == Xflow.RESULT_TYPE.VS){
        result = getRequestVSResult(this);
    }
    result.loading = (this.status == Xflow.PROCESS_STATE.LOADING);
    return result;
}

RequestNode.prototype.setStructureOutOfSync = function(){
    this.outOfSync = true;
    this.status = Xflow.PROCESS_STATE.MODIFIED;
    for(var type in this.results){
        this.results[type]._notifyChanged(Xflow.RESULT_STATE.CHANGED_STRUCTURE);
    }
    for(var name in this.channels){
        this.channels[name].removeListener(this);
    }
    this.channels = [];
    this.children = [];
    this.executers = [];
}

RequestNode.prototype.onXflowChannelChange = function(channel, state){
    if(channel.creatorProcessNode)
        this.status = Xflow.PROCESS_STATE.MODIFIED;
    var notifyState = (state == Xflow.DATA_ENTRY_STATE.CHANGED_VALUE ? Xflow.RESULT_STATE.CHANGED_DATA_VALUE
            : Xflow.RESULT_STATE.CHANGED_DATA_SIZE);

    for(var type in this.results){
        this.results[type]._notifyChanged(notifyState);
    }
}

function synchronizeRequestChannels(requestNode, channelNode){
    var names = requestNode.filter;
    if(!names){
        names = channelNode.outputChannels.getNames();
    }

    for(var i = 0; i < names.length; ++i){
        var name = names[i];
        var channel = channelNode.outputChannels.getChannel(name);
        if(channel){
            requestNode.channels[name] = channel;
            channel.addListener(requestNode);
        }
    }
}

function getRequestComputeResult(requestNode)
{
    if(!requestNode.results[Xflow.RESULT_TYPE.COMPUTE])
        requestNode.results[Xflow.RESULT_TYPE.COMPUTE] = new Xflow.ComputeResult();
    var result = requestNode.results[Xflow.RESULT_TYPE.COMPUTE];
    result._dataEntries = {}; result._outputNames = [];
    for(var name in requestNode.channels){
        var entry = requestNode.channels[name].getDataEntry();
        result._dataEntries[name] = entry && !entry.isEmpty() ? entry : null;
        result._outputNames.push(name);
    }
    return result;
}

function getRequestVSResult(requestNode)
{
    var executer = getOrCreateExecuter(requestNode, Xflow.PLATFORM.GLSL);
    if(!requestNode.results[Xflow.RESULT_TYPE.VS])
        requestNode.results[Xflow.RESULT_TYPE.VS] = new Xflow.VSDataResult();
    var result = requestNode.results[Xflow.RESULT_TYPE.VS];

    var program = executer.getVertexShader();
    result._program = program;
    result._programData = executer.programData;
    return result;
}



})();

(function(){

//----------------------------------------------------------------------------------------------------------------------
// Xflow.Executer
//----------------------------------------------------------------------------------------------------------------------

    Xflow.Executer = function(ownerNode, platform){

        this.platform = platform;
        this.mergedNodes = [];
        this.mergedOutputNodes = [];
        this.subNodes = [];
        this.unprocessedDataNames = [];

        /**
         *  TODO: Maybe we should just store the cl-platform objects in XFlow.cl so they are more easily available and
         *  to avoid long prototype chains. Or we could pass the graph context to each node of the graph.
         *  However, it would be good to allow each Graph object to have at least own context, cmdQueue and kernelManager.
         *  e.g. passing graph information here requires a long prototype chain
         */
        this.operatorList =  new Xflow.OperatorList(platform, ownerNode.owner.owner._graph);
        this.programData =  new Xflow.ProgramData();

        this.program = null;

        constructExecuter(this, ownerNode);
    }

    Xflow.Executer.prototype.isProcessed = function(){
        var i = this.mergedOutputNodes.length;
        while(i--){
            if(this.mergedOutputNodes[i].status != Xflow.PROCESS_STATE.PROCESSED)
                return false;
        }
        return true;
    }


    Xflow.Executer.prototype.run = function(asyncCallback){
        runSubNodes(this);
        updateIterateState(this);

        this.program = Xflow.createProgram(this.operatorList);

        if(this.program){
            this.operatorList.allocateOutput(this.programData, !!asyncCallback);
            this.program.run(this.programData, asyncCallback);
        }
        if(this.platform != Xflow.PLATFORM.ASYNC){
            var i = this.mergedOutputNodes.length;
            while(i--){
                this.mergedOutputNodes[i].status = Xflow.PROCESS_STATE.PROCESSED;
            }
        }


    }

    Xflow.Executer.prototype.getVertexShader = function(){
        runSubNodes(this);
        updateIterateState(this);

        this.program = Xflow.createProgram(this.operatorList);

        return this.program;
    }


    function constructExecuter(executer, ownerNode){
        var cData = {
            blockedNodes: [],
            doneNodes: [],
            constructionOrder: [],
            inputSlots: {},
            finalOutput: null,
            firstOperator: null
        }
        var requestNode = initRequestNode(cData, executer, ownerNode);

        var noOperators = false;
        constructPreScan(cData, ownerNode, executer.platform, noOperators);

        setConstructionOrderAndSubNodes(cData, executer, ownerNode);

        constructFromData(executer, cData);
    }

    function initRequestNode(cData, executer, ownerNode){
        if(ownerNode instanceof Xflow.RequestNode){
            cData.finalOutput = {};
            var filter = ownerNode.filter || ownerNode.owner.outputChannels.getNames();
            for(var i = 0; i < filter.length; ++i){
                var name = filter[i];
                var channel = ownerNode.owner.outputChannels.getChannel(name);
                if(channel && channel.creatorProcessNode)
                    cData.finalOutput[name] = channel.getDataEntry();
            }
            Xflow.nameset.add(executer.unprocessedDataNames, filter);
            return true;
        }
        return false;
    }

    function constructPreScan(cData, node, platform, noOperators){
        if(cData.blockedNodes.indexOf(node) != -1)
            return;

        if(node.operator){
            if(noOperators || !canOperatorMerge(cData, node.operator, platform)){
                blockSubtree(cData, node);
                return;
            }
            else{
                if(!cData.firstOperator) cData.firstOperator = node.operator;
                var mapping = node.operator.mapping;
                for(var i = 0; i < mapping.length; ++i){
                    if(mapping[i].sequence){
                        blockInput(cData, node, mapping[i].source);
                        blockInput(cData, node, mapping[i].keySource);
                    }
                    else if(mapping[i].array){
                        // TODO: Check for other things that cancel merging
                        blockInput(cData, node, mapping[i].source);
                    }
                }
            }
        }
        for(var i = 0; i < node.children.length; ++i){
            constructPreScan(cData, node.children[i], platform, noOperators);
        }
    }

    function canOperatorMerge(cData, operator, platform){
        // TODO: Detect merge support
        return (platform == Xflow.PLATFORM.ASYNC || !Xflow.isOperatorAsync(operator)) &&
            (!cData.firstOperator ||
            (platform == Xflow.PLATFORM.GLSL && cData.firstOperator.evaluate_glsl && operator.evaluate_glsl));
    }

    function blockSubtree(cData, node){
        if(cData.blockedNodes.indexOf(node) != -1)
            return;

        cData.blockedNodes.push(node);
        for(var i = 0; i < node.children.length; ++i){
            blockSubtree(cData, node.children[i]);
        }
    }

    function blockInput(cData, node, inputName){
        var channel = node.inputChannels[inputName];
        if(channel && channel.creatorProcessNode){
            blockSubtree(cData, channel.creatorProcessNode);
        }
    }

    function setConstructionOrderAndSubNodes(cData, executer, node){
        if(cData.doneNodes.indexOf(node) != -1)
            return;

        cData.doneNodes.push(node);

        if(cData.blockedNodes.indexOf(node) != -1){
            executer.subNodes.push(node);
        }
        else{
            for(var i = 0; i < node.children.length; ++i){
                setConstructionOrderAndSubNodes(cData, executer, node.children[i]);
            }

            if(node.operator){
                cData.constructionOrder.push(node);
            }
        }
    }

    function constructFromData(executer, cData){

        for(var i = 0; i < cData.constructionOrder.length; ++i){
            var node = cData.constructionOrder[i];

            var entry = new Xflow.OperatorEntry(node.operator);

            constructInputConnection(executer, entry, cData, node);

            var isOutputNode = constructOutputConnection(executer, entry, cData, node);

            executer.programData.operatorData.push({});
            executer.operatorList.addEntry(entry);
            executer.mergedNodes.push(node);
            if(isOutputNode || (i == cData.constructionOrder.length-1))
                executer.mergedOutputNodes.push(node)

        }

        constructLostOutput(executer, cData);
    }

    function constructInputConnection(executer, entry, cData, node){
        var mapping = node.operator.mapping;
        for(var j = 0; j < mapping.length; ++j){
            var channel = node.inputChannels[mapping[j].source];
            var operatorIndex;
            if(channel && channel.creatorProcessNode && (operatorIndex =
                executer.mergedNodes.indexOf(channel.creatorProcessNode) ) != -1 )
            {
                // it's transfer input
                var outputIndex = getOperatorOutputIndex(channel.creatorProcessNode, channel);
                entry.setTransferInput(j, operatorIndex, outputIndex);
                if(!executer.operatorList.entries[operatorIndex].isFinalOutput(outputIndex))
                    executer.operatorList.entries[operatorIndex].setTransferOutput(outputIndex);
                continue;
            }

            var mappedInputName = mapping[j].source;
            if(node.owner.owner._computeInputMapping)
                mappedInputName = node.owner.owner._computeInputMapping.getScriptInputName(mapping[j].paramIdx, mapping[j].source);

            var connection = new Xflow.ProgramInputConnection();
            connection.channel = channel;
            connection.arrayAccess = mapping[j].array || false;
            connection.sequenceAccessType = mapping[j].sequence || 0;
            if(connection.sequenceAccessType)
                connection.sequenceKeySourceChannel = node.inputChannels[mapping[j].keySource];

            var connectionKey = connection.getKey();
            var inputSlotIdx = cData.inputSlots[connectionKey];
            if(channel && inputSlotIdx != undefined){
                // Direct input already exists
                entry.setDirectInput(j, inputSlotIdx, mappedInputName);
            }
            else{
                // new direct input
                inputSlotIdx = executer.programData.inputs.length;
                cData.inputSlots[connectionKey] = inputSlotIdx;
                executer.programData.inputs.push(connection);
                entry.setDirectInput(j, inputSlotIdx, mappedInputName);
            }
        }
    }

    function constructOutputConnection(executer, entry, cData, node){
        var outputs = node.operator.outputs;
        var isOutputNode = true;
        for(var i = 0; i < outputs.length; ++i){
            var slot = node.outputDataSlots[outputs[i].name];
            var finalOutputName = getFinalOutputName(slot, cData);
            if(finalOutputName){
                var index =  executer.programData.outputs.length;
                executer.programData.outputs.push(slot);
                entry.setFinalOutput(i, index);
                if(finalOutputName !== true){
                    Xflow.nameset.remove(executer.unprocessedDataNames, finalOutputName);
                }
            }
            else{
                isOutputNode = false;
            }
        }
        return isOutputNode;
    }


    function getOperatorOutputIndex(processNode, channel){
        var outputs = processNode.operator.outputs;
        for(var i = 0; i < outputs.length; ++i){
            if(channel.getDataEntry() == processNode.outputDataSlots[outputs[i].name].dataEntry){
                return i;
            }
        }
        return null;
    }

    function getFinalOutputName(dataSlot, cData){
        if(!cData.finalOutput)
            return true;
        for(var name in cData.finalOutput){
            if(cData.finalOutput[name] == dataSlot.dataEntry){
                return name;
            }
        }
        return false;
    }

    function constructLostOutput(executor, cData){
        for(var i = 0; i < cData.constructionOrder.length; ++i){
            var node = cData.constructionOrder[i];
            var entry = executor.operatorList.entries[i];

            var outputs = node.operator.outputs;
            for(var j = 0; j < outputs.length; ++j){
                if(!entry.isFinalOutput(j) && ! entry.isTransferOutput(j)){
                    var index = executor.programData.outputs.length;
                    executor.programData.outputs.push(node.outputDataSlots[outputs[j].name]);
                    entry.setLostOutput(j, index);
                }
            }
        }
    }


    function updateIterateState(executer){
        var inputs = executer.programData.inputs;
        for(var i = 0; i < executer.programData.inputs.length; ++i){
            var entry = executer.programData.getDataEntry(i);
            var iterateCount = entry ? entry.getIterateCount ? entry.getIterateCount() : 1 : 0;
            if(!iterateCount)
                executer.operatorList.setInputIterateType(i, Xflow.ITERATION_TYPE.NULL);
            else if(!inputs[i].arrayAccess && iterateCount > 1)
                executer.operatorList.setInputIterateType(i, Xflow.ITERATION_TYPE.MANY);
            else
                executer.operatorList.setInputIterateType(i, Xflow.ITERATION_TYPE.ONE);

            if(inputs[i].arrayAccess && platformRequiresArraySize(executer. platform)){
                executer.operatorList.setInputSize(i, iterateCount);
            }
        }
    }

    function platformRequiresArraySize(platform){
        return platform == Xflow.PLATFORM.GLSL;
    }


    function runSubNodes(executer){
        for(var i = 0; i < executer.subNodes.length; ++i){
            executer.subNodes[i].process();
        }
    }

})();(function(){



Xflow.utils = {};


Xflow.utils.setAdd = function(setArray, setToAdd){
    if(setToAdd.length !== undefined){
        for(var i = 0; i < setToAdd.length; ++i){
            if(setArray.indexOf(setToAdd[i]) == -1)
                setArray.push(setToAdd[i]);
        }
    }
    else{
        if(setArray.indexOf(setToAdd) == -1)
            setArray.push(setToAdd);
    }
}
Xflow.utils.setRemove = function(setArray, setToRemove){
    var idx;
    if(setToRemove.length !== undefined){
        for(var i = 0; i < setToRemove.length; ++i){
            if( (idx = setArray.indexOf(setToRemove[i])) != -1)
                setArray.splice(idx,1);
        }
    }
    else{
        if( (idx = setArray.indexOf(setToRemove)) != -1)
            setArray.splice(idx,1);
    }
}

/**
 * Nameset Utilities for Xflow
 */
Xflow.nameset = {};

Xflow.nameset.add = function(nameSet, toAdd){
    if(!toAdd) return;
    if(typeof toAdd == "string"){
        if(nameSet.indexOf(toAdd) == -1)
            nameSet.push(toAdd);
    }
    else{
        for(var i = 0; i < toAdd.length; ++i){
            if(nameSet.indexOf(toAdd[i]) == -1)
                nameSet.push(toAdd[i]);
        }
    }
}

Xflow.nameset.remove = function(nameSet, toRemove){
    if(!toRemove) return;
    if(typeof toRemove == "string"){
        var removeIdx = nameSet.indexOf(toRemove);
        if(removeIdx != -1)
            nameSet.splice(removeIdx, 1);
    }
    else{
        for(var i = 0; i < toRemove.length; ++i){
            var removeIdx = nameSet.indexOf(toRemove[i]);
            if(removeIdx != -1)
                nameSet.splice(removeIdx, 1);
        }
    }
}

Xflow.nameset.intersection = function(nameSetA, nameSetB){
    var result = [];
    var i = nameSetA.length;
    while(i--){
        if(nameSetB.indexOf(nameSetA[i]) == -1){
            nameSetA.splice(i,1);
        }
    }
}


Xflow.utils.binarySearch = function(keys, key, maxIndex){
    var min = 0, max = maxIndex - 1;
    while(min <= max){
        var i = Math.floor((min + max) / 2);
        if(keys[i] == key){
            return i;
        }
        else if(keys[i] < key)
            min = i + 1;
        else
            max = i - 1;
    }
    return max;
}


})();
(function(){

//----------------------------------------------------------------------------------------------------------------------
// Xflow.registerOperator && Xflow.getOperator
//----------------------------------------------------------------------------------------------------------------------

var operators = {};

    /**
     * Registers Xflow operator.
     * The operators are stored in collections using their platform as a key. If no platform is defined, the operator
     * will be registered as a JavaScript-based operator.
     *
     * @param name
     * @param data
     */

Xflow.registerOperator = function(name, data){
    var opCollection, platform;

    initOperator(data);
    if(!operators[name]) {
        operators[name] = {};
    }

    platform = data['platform'] || Xflow.PLATFORM.JAVASCRIPT;

    opCollection = operators[name];

    if (!name) {
        XML3D.logWarning("Xflow.registerOperator: Operator name undefined.");
        return;
    }

    if (!data) {
        XML3D.logWarning("Xflow.registerOperator: Operator data undefined.");
        return;
    }

    data.name = name;
    if(!opCollection[platform])
        opCollection[platform] = [];

    opCollection[platform].push(data);
};

Xflow.initAnonymousOperator = function(name, data){
    initOperator(data);
    data.name = name;
    return data;
}

Xflow.isOperatorAsync = function(operator){
    return !!operator.evaluate_async;
}

Xflow.getOperators = function(name, platform){
    platform = platform || Xflow.PLATFORM.JAVASCRIPT;

    if (name && !operators[name]) {
        return null;
    }

    if(!operators[name][platform] || operators[name][platform].length == 0) {
        return null;
    }

    return operators[name][platform];
};

function initOperator(operator){
    var indexMap = {};
    // Init types of outputs and params
    for(var i= 0; i < operator.outputs.length; ++i){
        operator.outputs[i].type = Xflow.DATA_TYPE_MAP[operator.outputs[i].type];
    }
    for(var i= 0; i < operator.params.length; ++i){
        operator.params[i].type = Xflow.DATA_TYPE_MAP[operator.params[i].type];
        indexMap[operator.params[i].source] = i;
    }
    if(!operator.mapping)
        operator.mapping = operator.params;

    // Init interTypes of mapping
    for(var i = 0; i < operator.mapping.length; ++i){
        var mapping = operator.mapping[i];
        var paramIdx = indexMap[mapping.source];
        mapping.paramIdx = paramIdx;
        var type = operator.params[paramIdx].type;
        if(mapping.sequence)
            mapping.keyParamIdx = indexMap[mapping.keySource];
        if(mapping.sequence == Xflow.SEQUENCE.LINEAR_WEIGHT)
            type = Xflow.DATA_TYPE.FLOAT;
        mapping.internalType = type;
        mapping.name = mapping.name || mapping.source;
    }

    //Check/init platform
    operator.platform = operator.platform || Xflow.PLATFORM.JAVASCRIPT;
}

})();
(function(){

//----------------------------------------------------------------------------------------------------------------------
// Xflow.OperatorList
//----------------------------------------------------------------------------------------------------------------------

    Xflow.OperatorEntry = function(operator){
        this.index = 0;
        this.operator = operator;
        this.inputInfo = [];
        this.outputInfo = [];
    }
    Xflow.OperatorEntry.prototype.isTransferInput = function(mappingIndex){
        return this.inputInfo[mappingIndex].operatorIndex !== undefined;
    }
    Xflow.OperatorEntry.prototype.getTransferInputOperatorIndex = function(mappingIndex){
        return this.inputInfo[mappingIndex].operatorIndex;
    }
    Xflow.OperatorEntry.prototype.getTransferInputOutputIndex = function(mappingIndex){
        return this.inputInfo[mappingIndex].outputIndex;
    }

    Xflow.OperatorEntry.prototype.getTransferInputId = function(mappingIdx){
        var info = this.inputInfo[mappingIdx];
        return info.operatorIndex + "_" + info.outputIndex;
    }
    Xflow.OperatorEntry.prototype.getTransferOutputId = function(outputIndex){
        return this.index + "_" + outputIndex;
    }

    Xflow.OperatorEntry.prototype.getInputMappingName = function(mappingIdx){
        return this.inputInfo[mappingIdx].mappedName;
    }
    Xflow.OperatorEntry.prototype.getDirectInputIndex = function(mappingIdx){
        return this.inputInfo[mappingIdx].inputIndex;
    }

    Xflow.OperatorEntry.prototype.getOutputIndex = function(operatorOutputIdx){
        return this.outputInfo[operatorOutputIdx].finalOut || this.outputInfo[operatorOutputIdx].lost || 0;
    }


    Xflow.OperatorEntry.prototype.isFinalOutput = function(outputIndex){
        return this.outputInfo[outputIndex] && this.outputInfo[outputIndex].finalOut !== undefined;
    }
    Xflow.OperatorEntry.prototype.isTransferOutput = function(outputIndex){
        return this.outputInfo[outputIndex] && this.outputInfo[outputIndex].transfer;
    }
    Xflow.OperatorEntry.prototype.isLostOutput = function(outputIndex){
        return this.outputInfo[outputIndex] && this.outputInfo[outputIndex].lost !== undefined;
    }


    Xflow.OperatorEntry.prototype.setTransferInput = function(mappingIndex, operatorIndex, outputIndex){
        this.inputInfo[mappingIndex] = { operatorIndex: operatorIndex, outputIndex: outputIndex};
    }

    Xflow.OperatorEntry.prototype.setDirectInput = function(mappingIndex, inputIndex, mappedName){
        this.inputInfo[mappingIndex] = { inputIndex: inputIndex, mappedName: mappedName };
    }

    Xflow.OperatorEntry.prototype.setFinalOutput = function(operatorOutputIndex, globalOutputIndex){
        this.outputInfo[operatorOutputIndex] = { finalOut : globalOutputIndex };
    }
    Xflow.OperatorEntry.prototype.setTransferOutput = function(operatorOutputIndex){
        this.outputInfo[operatorOutputIndex] = { transfer: true };
    }
    Xflow.OperatorEntry.prototype.setLostOutput = function(operatorOutputIndex, globalOutputIndex){
        this.outputInfo[operatorOutputIndex] = { lost: globalOutputIndex};
    }

    Xflow.OperatorEntry.prototype.getKey = function(){
        var key = this.operator.name + "*O";
        for(var i = 0; i <this.outputInfo.length; ++i){
            var info = this.outputInfo[i];
            key += "*" + ( info.transfer ? "_" : info.finalOut || (info.lost + "?"));
        }
        key += + "*I";
        for(var i = 0; i <this.inputInfo.length; ++i){
            var info = this.inputInfo[i];
            key += "*" + (info.inputIndex ? info.inputInfo : info.operatorIndex + ">" + info.outputIndex);
        }
        return key;
    }

    Xflow.OperatorList = function(platform, graph){
        this.graph = graph;
        this.platform = platform;
        this.entries = [];
        this.inputInfo = {};
    }

    Xflow.OperatorList.prototype.addEntry = function(entry){
        entry.index = this.entries.length;
        this.entries.push(entry);
    }

    Xflow.OperatorList.prototype.getKey = function(){
        var keys = [];
        for(var i = 0; i < this.entries.length; ++i){
            keys.push(this.entries[i].getKey());
        }
        var result = this.platform + ">" + keys.join("!") + "|";
        for(var i in this.inputInfo){
            result += i + ">" + (this.inputInfo[i].iterate || 0) + "x" + (this.inputInfo[i].size || 0);
        }
        return result;
    }

    Xflow.OperatorList.prototype.setInputIterateType = function(inputIndex, type){
        if(!this.inputInfo[inputIndex]) this.inputInfo[inputIndex] = {};
        this.inputInfo[inputIndex].iterate = type;
    }
    Xflow.OperatorList.prototype.setInputSize = function(inputIndex, size){
        if(!this.inputInfo[inputIndex]) this.inputInfo[inputIndex] = {};
        this.inputInfo[inputIndex].size = size;
    }


    Xflow.OperatorList.prototype.isInputIterate = function(inputIndex){
        return this.inputInfo[inputIndex] && this.inputInfo[inputIndex].iterate == Xflow.ITERATION_TYPE.MANY;
    }
    Xflow.OperatorList.prototype.isInputUniform = function(inputIndex){
        return this.inputInfo[inputIndex] && this.inputInfo[inputIndex].iterate == Xflow.ITERATION_TYPE.ONE;
    }
    Xflow.OperatorList.prototype.isInputNull = function(inputIndex){
        return this.inputInfo[inputIndex] && this.inputInfo[inputIndex].iterate == Xflow.ITERATION_TYPE.NULL;
    }
    Xflow.OperatorList.prototype.getInputIterateType = function(inputIndex){
        return this.inputInfo[inputIndex] && this.inputInfo[inputIndex].iterate;
    }

    Xflow.OperatorList.prototype.getInputSize = function(inputIndex){
        return this.inputInfo[inputIndex] && this.inputInfo[inputIndex].size || 0;
    }

    Xflow.OperatorList.prototype.getIterateCount = function(programData){
        var count = -1;
        for(var i = 0; i < programData.inputs.length; ++i){
            if(this.isInputIterate(i)){
                var dataEntry = programData.getDataEntry(i);
                if(dataEntry && dataEntry.getIterateCount){
                    var size = dataEntry.getIterateCount();
                    count = count < 0 ? size : Math.min(size, count);
                }
            }
        }
        return count < 0 ? 1 : count;
    }

    var c_sizes = {};

    Xflow.OperatorList.prototype.allocateOutput = function(programData, async){
        for(var i = 0; i < this.entries.length; ++i){
            var entry = this.entries[i];
            var operator = entry.operator;
            var operatorData = programData.operatorData[i];
            var iterateCount = this.getIterateCount(programData);
            if(operator.alloc){
                var args = [c_sizes];
                addInputToArgs(args, entry, programData);
                args.push(iterateCount);
                operator.alloc.apply(operatorData, args);
            }
            for(var j = 0; j < operator.outputs.length; ++j){
                var d = operator.outputs[j];
                var dataSlot = programData.outputs[entry.getOutputIndex(j)], dataEntry;
                dataEntry = async ? dataSlot.asyncDataEntry : dataSlot.dataEntry;

                if(d.noAlloc)
                    continue;

                if (dataEntry.type == Xflow.DATA_TYPE.TEXTURE) {
                    // texture entry
                    if (d.customAlloc)
                    {
                        var texParams = c_sizes[d.name];
                        var newWidth = texParams.imageFormat.width;
                        var newHeight = texParams.imageFormat.height;
                        var newType = texParams.imageFormat.texelType;
                        var newFormat = texParams.imageFormat.texelFormat;
                        var newSamplerConfig = texParams.samplerConfig;
                        dataEntry._createImage(newWidth, newHeight, newFormat, newType, newSamplerConfig);
                    } else if (d.sizeof) {
                        var srcEntry = null;
                        for(var k = 0; k < operator.mapping.length; ++k){
                            if (operator.mapping[k].source == d.sizeof) {
                                srcEntry = programData.getDataEntry(entry.getDirectInputIndex(k));
                                break;
                            }
                        }
                        if (srcEntry) {
                            var newWidth = Math.max(srcEntry.width, 1);
                            var newHeight = Math.max(srcEntry.height, 1);
                            var newFormat = d.texelFormat || srcEntry.texelFormat;
                            var newType = d.texelType || srcEntry.texelType;
                            var newSamplerConfig = d.samplerConfig || srcEntry.getSamplerConfig();
                            dataEntry._createImage(newWidth, newHeight, newFormat, newType, newSamplerConfig);
                        }
                        else
                            throw new Error("Unknown texture input parameter '" + d.sizeof + "' in operator '"+operator.name+"'");
                    } else
                        throw new Error("Cannot create texture. Use customAlloc or sizeof parameter attribute");
                } else {

                    var size = (d.customAlloc ? c_sizes[d.name] : iterateCount) * dataEntry.getTupleSize();

                    if( !dataEntry._value || dataEntry._value.length != size){
                        switch(dataEntry.type){
                            case Xflow.DATA_TYPE.FLOAT:
                            case Xflow.DATA_TYPE.FLOAT2:
                            case Xflow.DATA_TYPE.FLOAT3:
                            case Xflow.DATA_TYPE.FLOAT4:
                            case Xflow.DATA_TYPE.FLOAT4X4: dataEntry._setValue(new Float32Array(size)); break;
                            case Xflow.DATA_TYPE.INT:
                            case Xflow.DATA_TYPE.INT4:
                            case Xflow.DATA_TYPE.BOOL: dataEntry._setValue(new Int32Array(size)); break;
                            default: XML3D.debug.logWarning("Could not allocate output buffer of TYPE: " + dataEntry.type);
                        }
                    }
                    else{
                        dataEntry._notifyChanged();
                    }
                }
            }
        }
    }

    /*
    Xflow.OperatorList.prototype.checkInput = function(programData){
        for(var i = 0; i < this.entries.length; ++i){
            var entry = this.entries[i];
            var mapping = entry.operator.mapping;
            for(var j = 0; j < mapping.length; ++j){
                if(entry.isTransferInput(j)){
                    var outputType = this.entries[entry.getTransferInputOperatorIndex(j)].operator.outputs[
                        entry.getTransferInputOutputIndex(j)].type;

                    if(outputType != entry.type){
                        XML3D.debug.logError("Xflow: operator " + entry.operator.name + ": Input for " + entry.source +
                            " has wrong type. Expected: " + Xflow.getTypeName(entry.type)
                            + ", but got: " +  Xflow.getTypeName(outputType) );
                        return false;
                    }

                }
                else{
                    var mappingName = entry.getInputMappingName(j);
                    if(!entry.optional && !mappingName){
                        XML3D.debug.logError("Xflow: operator " + entry.operator.name + ": Missing input argument for "
                            + entry.source);
                        return false;
                    }
                    if(mappingName){
                        var channel = programData.getChannel(entry.getDirectInputIndex(j));
                        if(!channel){
                            XML3D.debug.logError("Xflow: operator " + entry.operator.name + ": Input of name '" + mappingName +
                                "' not found. Used for parameter " + entry.source);
                            return false;
                        }
                        var dataEntry = channel.getDataEntry();
                        if(!entry.optional && (!dataEntry || dataEntry.getLength() == 0)){
                            XML3D.debug.logError("Xflow: operator " + entry.operator.name + ": Input for " + entry.source +
                                ' contains no data.');
                            return false;
                        }
                        if(dataEntry && dataEntry.type != entry.type){
                            XML3D.debug.logError("Xflow: operator " + entry.operator.name + ": Input for " + entry.source +
                                " has wrong type. Expected: " + Xflow.getTypeName(entry.type)
                                + ", but got: " +  Xflow.getTypeName(dataEntry.type) );
                            return false;
                        }
                    }
                }
            }
        }
    }
    */




    Xflow.ProgramData = function(){
        this.inputs = [];
        this.outputs = [];
        this.operatorData = [];
    }

    Xflow.ProgramData.prototype.getChannel = function(index){
        return this.inputs[index].channel;
    }

    Xflow.ProgramData.prototype.getDataEntry = function(index){
        var entry = this.inputs[index];
        var channel = entry.channel;
        if(!channel) return null;
        var key = 0;
        if(entry.sequenceKeySourceChannel){
            var keyDataEntry = entry.sequenceKeySourceChannel.getDataEntry();
            key = keyDataEntry && keyDataEntry._value ? keyDataEntry._value[0] : 0;
        }

        return channel.getDataEntry(entry.sequenceAccessType, key);
    }

    Xflow.ProgramInputConnection = function(){
        this.channel = null;
        this.arrayAccess = false;
        this.sequenceAccessType = Xflow.SEQUENCE.NO_ACCESS;
        this.sequenceKeySourceChannel = null;
    }

    Xflow.ProgramInputConnection.prototype.getKey = function(){
        return (this.channel ? this.channel.id : "NULL") + ";" + this.arrayAccess + ";" + this.sequenceAccessType + ";" +
        ( this.sequenceKeySourceChannel ? this.sequenceKeySourceChannel.id : "");
    }


    var c_program_cache = {};

    Xflow.createProgram = function(operatorList){
        var firstOperator;

        if(operatorList.entries.length === 0) {
            return null;
        }

        firstOperator = operatorList.entries[0].operator;

        var key = operatorList.getKey();
        if(!c_program_cache[key]){
            // GLSL operators are implemented in a different way, so platform information is fetched from the operatorList
            // as a fallback mode to not break the old implementations
            if(operatorList.platform === Xflow.PLATFORM.GLSL){
                c_program_cache[key] = new Xflow.VSProgram(operatorList);

            } else if (firstOperator.platform === Xflow.PLATFORM.CL) {
                c_program_cache[key] = new Xflow.CLProgram(operatorList);

            }else if(firstOperator.platform === Xflow.PLATFORM.JAVASCRIPT && operatorList.entries.length === 1 ) {
                c_program_cache[key] = new Xflow.SingleProgram(operatorList);

            }else {
                Xflow.notifyError("Could not create program from operatorList");
            }
        }
        return c_program_cache[key];
    }



    Xflow.SingleProgram = function(operatorList){
        this.list = operatorList;
        this.entry = operatorList.entries[0];
        this.operator = this.entry.operator;
        this._inlineLoop = null;
    }

    Xflow.SingleProgram.prototype.run = function(programData, asyncCallback){
        var operatorData = prepareOperatorData(this.list, 0, programData);

        if(asyncCallback)
            applyAsyncOperator(this.entry, programData, operatorData, asyncCallback);
        else if(this.operator.evaluate_core){
            applyCoreOperation(this, programData, operatorData);
        }
        else{
            applyDefaultOperation(this.entry, programData, operatorData);
        }
    }

    function applyDefaultOperation(entry, programData, operatorData){
        var args = assembleFunctionArgs(entry, programData);
        args.push(operatorData);
        entry.operator.evaluate.apply(operatorData, args);
        handlePostProcessOutput(entry, programData, args, false);
    }

    function applyAsyncOperator(entry, programData, operatorData, asyncCallback){
        var args = assembleFunctionArgs(entry, programData, true);
        args.push(operatorData);
        args.push(function(){
            handlePostProcessOutput(entry, programData, args, true);
            asyncCallback();
        });
        entry.operator.evaluate_async.apply(operatorData, args);
    }

    function applyCoreOperation(program, programData, operatorData){
        var args = assembleFunctionArgs(program.entry, programData);
        args.push(operatorData.iterateCount);

        if(!program._inlineLoop){
            program._inlineLoop = createOperatorInlineLoop(program.operator, operatorData);
        }
        program._inlineLoop.apply(operatorData, args);
    }

    var c_VarPattern = /var\s+(.)+[;\n]/;
    var c_InnerVarPattern = /[^=,\s]+\s*(=[^,]+)?(,)?/;
    function createOperatorInlineLoop(operator, operatorData){

        var code = "function (";
        var funcData = parseFunction(operator.evaluate_core);
        code += funcData.args.join(",") + ",__xflowMax) {\n";
        code += "    var __xflowI = __xflowMax\n" +
            "    while(__xflowI--){\n";

        var body = funcData.body;
        body = replaceArrayAccess(body, funcData.args, operator, operatorData);
        code += body + "\n  }\n}";

        var inlineFunc = eval("(" + code + ")");
        return inlineFunc;
    }

    var c_FunctionPattern = /function\s+([^(]*)\(([^)]*)\)\s*\{([\s\S]*)\}/;

    function parseFunction(func){
        var result = {};
        var matches = func.toString().match(c_FunctionPattern);
        if(!matches){
            Xflow.notifyError("Xflow Internal: Could not parse function: " + func);
            return null;
        }
        result.args = matches[2].split(",");
        for(var i in result.args) result.args[i] = result.args[i].trim();
        result.body = matches[3];
        return result;
    }

    var c_bracketPattern = /([a-zA-Z_$][\w$]*)(\[)/;

    function replaceArrayAccess(code, args, operator, operatorData){
        var result = "";
        var index = 0, bracketIndex = code.indexOf("[", index);
        while(bracketIndex != -1){
            var key = code.substr(index).match(c_bracketPattern)[1];

            var argIdx = args.indexOf(key);
            var addIndex = false, tupleCnt = 0;
            if(argIdx != -1){
                if(argIdx < operator.outputs.length){
                    addIndex = true;
                    tupleCnt = Xflow.DATA_TYPE_TUPLE_SIZE[[operator.outputs[argIdx].type]];
                }
                else{
                    var i = argIdx - operator.outputs.length;
                    addIndex = operatorData.iterFlag[i];
                    tupleCnt = Xflow.DATA_TYPE_TUPLE_SIZE[operator.mapping[i].internalType];
                }
            }

            result += code.substring(index, bracketIndex) + "["
            if(addIndex){
                result += tupleCnt + "*__xflowI + ";
            }
            index = bracketIndex + 1;
            bracketIndex = code.indexOf("[", index);
        }
        result +=  code.substring(index);
        return result;
    }


    function prepareOperatorData(list, idx, programData){
        var data = programData.operatorData[0];
        var entry = list.entries[idx];
        var mapping = entry.operator.mapping;
        data.iterFlag = {};
        for(var i = 0; i < mapping.length; ++i){
            var doIterate = (entry.isTransferInput(i) || list.isInputIterate(entry.getDirectInputIndex(i)));
            data.iterFlag[i] = doIterate;
        }
        data.iterateCount = list.getIterateCount(programData);
        if(!data.customData)
            data.customData = {};
        return data;
    }

    function assembleFunctionArgs(entry, programData, async){
        var args = [];
        var outputs = entry.operator.outputs;
        for(var i = 0; i < outputs.length; ++i){
            if(outputs[i].noAlloc){
                args.push({assign: null});
            }
            else{
                var dataSlot = programData.outputs[entry.getOutputIndex(i)];
                var dataEntry = async ? dataSlot.asyncDataEntry : dataSlot.dataEntry;
                args.push(dataEntry ? dataEntry.getValue() : null);
            }
        }
        addInputToArgs(args, entry, programData);
        return args;
    }
    function handlePostProcessOutput(entry, programData, parameters, async){
        var outputs = entry.operator.outputs;
        for(var i = 0; i < outputs.length; ++i){
            var dataSlot = programData.outputs[entry.getOutputIndex(i)];
            if(outputs[i].noAlloc){
                var dataEntry = async ? dataSlot.asyncDataEntry : dataSlot.dataEntry;
                if(dataEntry.type == Xflow.DATA_TYPE.TEXTURE ){
                    dataEntry._setImage(parameters[i].assign);
                }
                else{
                    dataEntry._setValue(parameters[i].assign);
                }
            }
            if(async){
                dataSlot.swapAsync();
            }
        }
    }


    function addInputToArgs(args, entry, programData){
        var mapping = entry.operator.mapping;
        for(var i = 0; i < mapping.length; ++i){
            var mapEntry = mapping[i];
            var dataEntry = programData.getDataEntry(entry.getDirectInputIndex(i));
            args.push(dataEntry ? dataEntry.getValue() : null);
        }
    }


}());
(function(){

//----------------------------------------------------------------------------------------------------------------------
// Xflow.OperatorList
//----------------------------------------------------------------------------------------------------------------------

    var c_SHADER_CONSTANT_TYPES = {}
    c_SHADER_CONSTANT_TYPES[Xflow.SHADER_CONSTANT_KEY.OBJECT_ID] = 'int';
    c_SHADER_CONSTANT_TYPES[Xflow.SHADER_CONSTANT_KEY.SCREEN_TRANSFORM] = 'mat4';
    c_SHADER_CONSTANT_TYPES[Xflow.SHADER_CONSTANT_KEY.SCREEN_TRANSFORM_NORMAL] = 'mat3';
    c_SHADER_CONSTANT_TYPES[Xflow.SHADER_CONSTANT_KEY.VIEW_TRANSFORM] = 'mat4';
    c_SHADER_CONSTANT_TYPES[Xflow.SHADER_CONSTANT_KEY.VIEW_TRANSFORM_NORMAL] = 'mat3';
    c_SHADER_CONSTANT_TYPES[Xflow.SHADER_CONSTANT_KEY.WORLD_TRANSFORM] = 'mat4';
    c_SHADER_CONSTANT_TYPES[Xflow.SHADER_CONSTANT_KEY.WORLD_TRANSFORM_NORMAL] = 'mat3';

    Xflow.VSProgram = function(operatorList){
        this.list = operatorList;
        this._outputInfo = {};
        setOutputIterate(this);
    }

    Xflow.VSProgram.prototype.getOutputNames = function(){
        return Object.keys(this._outputInfo);
    }

    Xflow.VSProgram.prototype.getOutputType = function(name){
        return this._outputInfo[name].type;
    }

    Xflow.VSProgram.prototype.isOutputUniform = function(name){
        return this._outputInfo[name].iteration == Xflow.ITERATION_TYPE.ONE;
    }

    Xflow.VSProgram.prototype.isOutputNull = function(name){
        return this._outputInfo[name].iteration == Xflow.ITERATION_TYPE.NULL;
    }

    Xflow.VSProgram.prototype.createVertexShader = function(programData, vsConfig){
        var result = new Xflow.VertexShader(programData);
        constructVS(result, this, vsConfig)
        return result;
    }

    function setOutputIterate(program){
        var operatorList = program.list, entries = operatorList.entries;

        var baseEntry = entries[entries.length - 1], baseOperator = baseEntry.operator;

        for( var i = 0; i < baseOperator.params.length; ++i){
            var entry = baseOperator.params[i],
                name = entry.source,
                inputIndex = i,
                directInputIndex = baseEntry.getDirectInputIndex(inputIndex);
            program._outputInfo[name] = {type: entry.type};
            if( baseEntry.isTransferInput(inputIndex) ||
                operatorList.isInputIterate(directInputIndex))
            {
                program._outputInfo[name].iteration = Xflow.ITERATION_TYPE.MANY;
            }
            else if(operatorList.isInputUniform(directInputIndex)){
                program._outputInfo[name].iteration = Xflow.ITERATION_TYPE.ONE;
            }
            else{
                program._outputInfo[name].iteration = Xflow.ITERATION_TYPE.NULL;
            }
        }
    }

    function constructVS(vs, program, vsConfig){
        var operatorList = program.list, entries = operatorList.entries;

        var usedNames = [],
            directInputNames = {},
            transferNames = {};

        var baseEntry = entries[entries.length - 1], acceptedBaseShaderInput = [], baseOperator = baseEntry.operator;

        if(!vsConfig)
            throw new Error("Could not find vsConfig! Attempt to create vertex shader programm without VS operator?");

        Xflow.nameset.add(usedNames, vsConfig.getBlockedNames());

        var code = "";
        code += "// OUTPUT\n"
        // First: collect output names
        for(var name in vsConfig._addOutput){
            var entry = vsConfig._addOutput[name];
            code += "varying " + getGLSLType(entry.type) + " " + name + ";\n";
            Xflow.nameset.add(usedNames, name);
        }
        var inputIndex = 0;
        for( var name in vsConfig._attributes){
            var configAttr = vsConfig._attributes[name],
                directInputIndex = baseEntry.getDirectInputIndex(inputIndex);
            for(var i = 0; i < configAttr.channeling.length; ++i){
                var channeling = configAttr.channeling[i];
                var outputInfo = {type: configAttr.type, iteration: 0, index: 0, sourceName: name},
                    outputName = channeling.outputName;
                if( channeling.code ||
                    baseEntry.isTransferInput(inputIndex) ||
                    operatorList.isInputIterate(directInputIndex))
                {
                    acceptedBaseShaderInput[inputIndex] = true;
                    outputInfo.iteration = Xflow.ITERATION_TYPE.MANY;
                    var type = baseOperator.outputs[inputIndex].type;
                    code += "varying " + getGLSLType(type) + " " + outputName + ";\n";
                    Xflow.nameset.add(usedNames, outputName);
                    transferNames[baseEntry.getTransferOutputId(i)] = outputName;
                }
                else if(operatorList.isInputUniform(directInputIndex)){
                    outputInfo.iteration = Xflow.ITERATION_TYPE.ONE;
                    outputInfo.index = directInputIndex;
                }
                else{
                    outputInfo.iteration = Xflow.ITERATION_TYPE.NULL;
                }
                Xflow.nameset.add(vs._outputNames, outputName);
                vs._outputInfo[outputName] = outputInfo;
            }
            inputIndex++;
        }
        code += "\n";
        code += "// INPUT\n"
        // Add additional input
        for(var name in vsConfig._addInput){
            var entry = vsConfig._addInput[name];
            code += (entry.uniform ? "uniform " : "attribute " ) + getGLSLType(entry.type) + " " + name + ";\n";
            Xflow.nameset.add(usedNames, name);
        }
        // Second: collect input names
        for(var i = 0; i < entries.length; ++i){
            var entry = entries[i], operator = entry.operator;
            for(var j = 0; j < operator.mapping.length; ++j){
                if( (i < entries.length - 1 || acceptedBaseShaderInput[j]) &&
                        !entry.isTransferInput(j) && !directInputNames[entry.getDirectInputIndex(j)])
                {
                    var mapEntry = operator.mapping[j];
                    var name = getFreeName(mapEntry.name, usedNames), inputIndex = entry.getDirectInputIndex(j),
                        uniform = !operatorList.isInputIterate(inputIndex);
                    vs._inputInfo[name] = { index: inputIndex, uniform: uniform };
                    Xflow.nameset.add(vs._inputNames, name);
                    directInputNames[inputIndex] = name;
                    code += (uniform ? "uniform " : "attribute ") + getGLSLType(mapEntry.internalType) + " " + name;
                    if(mapEntry.array)
                        code += "[" + operatorList.getInputSize(inputIndex) + "]";
                    code += ";\n";
                }
            }
        }

        // Start main
        code += "\n// CODE\n"
        code += "void main(void){\n";

        // Create Code
        for(var i = 0; i < entries.length; ++i){
            var entry = entries[i], operator = entry.operator;
            // Declare transfer output names
            for(var j = 0; j < operator.outputs.length; ++j){
                if(!entry.isFinalOutput(j)){
                    var name = getFreeName(operator.outputs[j].name, usedNames);
                    transferNames[entry.getTransferOutputId(j)] = name;
                    code += "\t" + getGLSLType(operator.outputs[j].type) + " " + name + ";\n";
                }
            }
            // Take Code Fragment
            var codeFragment = convertCodeFragment(operator.evaluate_glsl, entry,
                                    transferNames, directInputNames, usedNames);
            code += codeFragment + "\n";
        }

        // Add attribute channeling code
        var mappingIndex = 0, conversionCode = "";
        for( var name in vsConfig._attributes){
            var entry = vsConfig._attributes[name];
            for(var i = 0; i < entry.channeling.length; ++i){
                var channeling = entry.channeling[i], outputName = channeling.outputName;
                if(vs._outputInfo[outputName].iteration == Xflow.ITERATION_TYPE.MANY){
                    if(channeling.code)
                        conversionCode += "\t" + channeling.code + "\n";
                    else
                        conversionCode += "\t" + outputName + " = #I{" + name + "};\n";
                }
            }
            mappingIndex++;
        }
        for( var i = 0; i < vsConfig._codeFragments.length; ++i){
            conversionCode += "\t" + vsConfig._codeFragments[i] + "\n";
        }
        code += convertCodeFragment(conversionCode, baseEntry, transferNames, directInputNames, usedNames) + "\n";

        code += "}\n";
        vs._glslCode = code;
    }

    function convertCodeFragment(codeFragment, entry, transferNames, directInputNames, usedNames){
        var index, operator = entry.operator;
        while((index = codeFragment.indexOf("#I{")) != -1){
            var end = codeFragment.indexOf("}",index);
            var mappingIndex = getMappingIndex(operator, codeFragment.substring(index+3,end));
            var replaceName = entry.isTransferInput(mappingIndex) ?
                transferNames[entry.getTransferInputId(mappingIndex)] :
                directInputNames[entry.getDirectInputIndex(mappingIndex)];
            codeFragment = codeFragment.substring(0, index) + replaceName + codeFragment.substring(end+1);
        }
        while((index = codeFragment.indexOf("#O{")) != -1){
            var end = codeFragment.indexOf("}",index);
            var outputIndex = getOutputIndex(operator, codeFragment.substring(index+3,end));
            var replaceName = transferNames[entry.getTransferOutputId(outputIndex)];
            codeFragment = codeFragment.substring(0, index) + replaceName + codeFragment.substring(end+1);
        }
        var localNames = [];
        while((index = codeFragment.indexOf("#L{")) != -1){
            var end = codeFragment.indexOf("}",index);
            var key = codeFragment.substring(index+3,end);
            if(!localNames[key]){
                localNames[key] = getFreeName(key, usedNames);
            }
            var replaceName = localNames[key];
            codeFragment = codeFragment.substring(0, index) + replaceName + codeFragment.substring(end+1);
        }
        while((index = codeFragment.indexOf("#G{")) != -1){
            var end = codeFragment.indexOf("}",index);
            var replaceName = codeFragment.substring(index+3,end);
            codeFragment = codeFragment.substring(0, index) + replaceName + codeFragment.substring(end+1);
        }
        return codeFragment;
    }

    function getFreeName(name, usedNames){
        var result = name, i = 1;
        while(usedNames.indexOf(result) != -1){
            result = name + "_" + (++i);
        }
        Xflow.nameset.add(usedNames, result);
        return result;
    }

    function getMappingIndex(operator, name){
        for(var i = 0; i < operator.mapping.length; ++i){
            if(operator.mapping[i].name == name)
                return i;
        }
        throw new Error("Invalid input name '" + name  + "' inside of code fragment" );
    }

    function getOutputIndex(operator, name){
        for(var i = 0; i < operator.outputs.length; ++i){
            if(operator.outputs[i].name == name)
                return i;
        }
    }

    function getGLSLType(xflowType){
        switch(xflowType){
            case Xflow.DATA_TYPE.BOOL : return 'bool';
            case Xflow.DATA_TYPE.BYTE : return 'uint';
            case Xflow.DATA_TYPE.FLOAT : return 'float';
            case Xflow.DATA_TYPE.FLOAT2 : return 'vec2';
            case Xflow.DATA_TYPE.FLOAT3 : return 'vec3';
            case Xflow.DATA_TYPE.FLOAT4 : return 'vec4';
            case Xflow.DATA_TYPE.FLOAT3X3 : return 'mat3';
            case Xflow.DATA_TYPE.FLOAT4X4 : return 'mat4';
            case Xflow.DATA_TYPE.INT : return 'int';
            case Xflow.DATA_TYPE.INT4 : return 'ivec4';
        }
        throw new Error("Type not supported for GLSL " + Xflow.getTypeName(xflowType) );
    }


}());(function () {
    "use strict";

    /**
     * CLProgram implements automatic Xflow input/output adaptive WebCL kernel and application code generation.
     *
     * @param operatorList
     * @constructor
     */

    Xflow.CLProgram = function (operatorList) {
        this.cl = operatorList.graph.cl; // CL wrapper

        if (!this.cl) {
            return;
        }

        this.list = operatorList;
        this.entry = operatorList.entries[0];
        this.operator = this.entry.operator;

        this.kernelParamMap = {inputs: [], outputs: []}; // Stores initialised KernelParam objects
        this.kernelFunctionParams = []; // Stores generated function parameters for kernel function header.
        this.kernelCode = null; // Generated kernel code
        this.kernelProgram = null; // Compiled kernel program
        this.mainProgram = null; // Main WebCL application code

    };

    /**
     * Map of helper kernel parameters required for certain input data types.
     *
     * @type Object
     */
    var helperParamMap = {
        'texture': {type: "uint", params: ["width", "height"]},
        'buffer': {type: "uint", params: ["length"]}
    };

    /**
     * Utility prototype object for mapping Xflow inputs to kernel parameters and for generating kernel code.
     *
     * @param {Object} program
     * @param {String} name
     * @param {Xflow.DATA_TYPE} xflowType
     * @param {String} clType
     * @param entryValue
     * @param {Boolean} isInput
     * @name KernelParam
     * @constructor KernelParam
     */

    function KernelParam(program, name, xflowType, clType, entryValue, isInput) {
        this.program = program;
        this.cl = program.cl;
        this.name = name;
        this.type = clType || null;
        this.isInput = !!isInput;
        this.needsMemObject = false;
        this.hasMemObject = false;
        this.byteSize = null;
        this.memObjectSize = null;
        this.arg = null;
        this.clFunctionParam = null;
        this.xflowType = xflowType;
        this.helperMap = null;
        this.helpers = [];
        this.entryValue = entryValue || null;
        this.val = null;

        this.prepareParam();
        this.initHelperParams();
        this.initKernelArg();
        this.updateValue(this.entryValue);

    }

    KernelParam.prototype = {
        /**
         * Prepares the kernel parameter data.
         * Maps the input xflow data type to webcl data type and creates a kernel function header parameter with proper
         * declarations.
         */
        prepareParam: function () {
            var helperMap;
            var xflowDataTypes = Xflow.DATA_TYPE;
            var kernelFuncParam = [];
            var addressSpace = '';
            var declarations = '';

            if (!this.type) {
                switch (this.xflowType) {
                    case xflowDataTypes.TEXTURE:
                    {
                        helperMap = helperParamMap.texture;
                        this.type = "uchar4*";
                        addressSpace = "__global";
                        this.needsMemObject = true;
                    }
                        break;
                    case xflowDataTypes.INT:
                    {
                        this.type = "int";
                    }
                        break;
                    case xflowDataTypes.FLOAT:
                    {
                        this.type = "float";
                    }
                        break;
                    default:
                        return;
                }

                this.helperMap = helperMap;
            }

            // Arranging parameter parts
            if (addressSpace) {
                kernelFuncParam.push(addressSpace);
            }

            if (this.isInput) {
                declarations = 'const';
            }

            if (declarations) {
                kernelFuncParam.push(declarations);
            }

            kernelFuncParam.push(this.type);
            kernelFuncParam.push(this.name);
            this.clFunctionParam = kernelFuncParam.join(' ');
        },

        /**
         * Initialises helper parameters for an input parameter if needed.
         *
         */

        initHelperParams: function () {
            var helperVal;
            var self = this;
            var helperMap = this.helperMap;

            if (helperMap && this.isInput) {
                helperMap.params.forEach(function (p) {
                    var pName = self.name + '_' + p;
                    if (p === "width") {
                        helperVal = self.entryValue.width;
                    } else if (p === "height") {
                        helperVal = self.entryValue.height;
                    } else if (p === "length") {
                        helperVal = self.entryValue.length;
                    }
                    self.helpers.push(new KernelParam(self.program, pName, null, helperMap.type, new Uint32Array([helperVal])));
                });
            }
        },

        /**
         * Initialises kernel argument that will be passed directly into the compiled kernel.
         * Creates a WebCL memory object if needed (e.g. for texture).
         */

        initKernelArg: function () {
            if (this.needsMemObject) {
                this.allocateMemObject();
            } else {
                this.arg = this.entryValue;
            }
        },

        allocateMemObject: function () {
            var clAPI = this.cl.API;
            var clCtx = this.cl.ctx;
            var paramType = this.type;
            var byteSize = parseInt(paramType.substring(paramType.length - 2, paramType.length - 1), 10);
            var memObjectMode = this.isInput ? 'r' : 'w';
            var entryValue = this.entryValue;
            var memObjectSize, memObject;

            if (this.hasMemObject) {
                this.arg.release();
            }

            this.byteSize = byteSize;

            if (this.xflowType === Xflow.DATA_TYPE.TEXTURE) { // Texture is a special case
                memObjectSize = entryValue.width * entryValue.height * byteSize;
            } else {
                memObjectSize = entryValue.length * byteSize;
            }

            memObject = clAPI.createBuffer(memObjectSize, memObjectMode, clCtx);

            this.memObjectSize = memObjectSize;
            this.arg = memObject;

            this.hasMemObject = true;
            this.needsMemObject = false;

        },

        updateValue: function (entry) {
            if (this.hasMemObject) {
                this.val = entry.data;
                this.entryValue = entry;
                this.checkEntrySize();
            } else {
                this.arg = this.entryValue = entry;
            }
        },
        updateHelpers: function() {
            var helpers = this.helpers;
            var self = this;

            helpers.forEach(function (p) {
                var name = p.name;
                    if (name.indexOf("width") !== -1) {
                        p.updateValue(new Uint32Array([self.entryValue.width]));
                    } else if (name.indexOf("height") !== -1) {
                        p.updateValue(new Uint32Array([self.entryValue.height]));
                    } else if (name.indexOf("length") !== -1) {
                        p.updateValue(new Uint32Array([self.entryValue.length]));
                    }
                });
        },
        checkEntrySize: function() {
            var newSize;
            var entryVal = this.entryValue;

            if(this.xflowType === Xflow.DATA_TYPE.TEXTURE) {
                newSize = entryVal.width * entryVal.height * this.byteSize;
            } else {
                newSize = entryVal.length * this.byteSize;
            }
            if(this.memObjectSize !== newSize) {
                this.allocateMemObject();
                this.updateHelpers();
                this.program.mainProgram = null; // Forcing CL application program update
            }
        }
    };


    /**
     * Runs CLProgram. WebCL related code initialised in the first run.
     *
     * @param programData
     */

    Xflow.CLProgram.prototype.run = function (programData) {
        var operatorData = prepareOperatorData(this.list, 0, programData);

        applyDefaultOperation(this.entry, programData, operatorData, this);

    };

    function prepareOperatorData(list, idx, programData) {
        var doIterate, i;
        var data = programData.operatorData[0];
        var entry = list.entries[idx];
        var mapping = entry.operator.mapping;

        data.iterFlag = {};

        for (i = 0; i < mapping.length; ++i) {
            doIterate = (entry.isTransferInput(i) || list.isInputIterate(entry.getDirectInputIndex(i)));
            data.iterFlag[i] = doIterate;
        }

        data.iterateCount = list.getIterateCount(programData);

        return data;
    }

    function applyDefaultOperation(entry, programData, operatorData, program) {
        if (program.operator.evaluate && program.operator.evaluate instanceof Array) {
            assembleFunctionArgs(entry, programData, program);

            if (program.kernelCode === null) {
                prepareWebCLKernel(programData, program);
            }
            //console.time('CLProgram (' + program.operator.name + ')');
            if(program.mainProgram === null) {
                program.mainProgram = createMainWebCLProgram(program);
            }
            program.mainProgram();
            //console.timeEnd('CLProgram (' + program.operator.name + ')');
        }
    }

    /**
     * Maps Xflow inputs and outputs into WebCL kernel inputs and outputs.
     *
     * @function assembleFunctionArgs
     * @param entry
     * @param programData
     * @param program
     */

    function assembleFunctionArgs(entry, programData, program) {
        var d, dataEntry, i;
        var kernelFunctionParams = program.kernelFunctionParams;
        var outputs = program.operator.outputs;

        kernelFunctionParams.length = 0;

        for (i = 0; i < outputs.length; ++i) {
            d = outputs[i];
            dataEntry = programData.outputs[entry.getOutputIndex(i)].dataEntry;

            prepareKernelParameter(d, !!(d.source), program, kernelFunctionParams, dataEntry, i);
        }

        addInputToArgs(entry, programData, program, kernelFunctionParams);
    }


    function addInputToArgs(entry, programData, program, kernelFunctionParams) {
        var mapEntry, dataEntry, i;
        var mapping = entry.operator.mapping;

        for (i = 0; i < mapping.length; ++i) {
            mapEntry = mapping[i];
            dataEntry = programData.getDataEntry(entry.getDirectInputIndex(i));

            prepareKernelParameter(mapEntry, !!(mapEntry.source), program, kernelFunctionParams, dataEntry, i);
        }
    }

    /**
     * Creates a new KernelParam utility object or updates the existing object if input value has been changed.
     * Additionally, this is used for generating the WebCL kernel function header.
     *
     * @function prepareKernelParameter
     * @param param
     * @param input
     * @param program
     * @param functionParams
     * @param arg
     * @param i
     */

    function prepareKernelParameter(param, input, program, functionParams, arg, i) {
        var kernelParams;
        var entryVal = arg ? arg.getValue() : null;

        if (input) {
            kernelParams = program.kernelParamMap.inputs;
        } else {
            kernelParams = program.kernelParamMap.outputs;
        }

        if (kernelParams[i]) {
            kernelParams[i].updateValue(entryVal);
            return;
        }

        kernelParams[i] = new KernelParam(program, param.name, param.type, null, entryVal, input);

        // Pushing generated kernel function params into array.
        // This array is later used in generating the WebCL kernel function header.
        functionParams.push(kernelParams[i].clFunctionParam);

        kernelParams[i].helpers.forEach(function (p) {
            functionParams.push(p.clFunctionParam);
        });
    }


    /** KERNEL CODE PREPARATION **/


    /**
     * Compiles and registers the prepared WebCL kernel code.
     *
     * @function prepareWebCLKernel
     * @param programData
     * @param program
     * @returns {boolean}
     */

    function prepareWebCLKernel(programData, program) {
        var kernelCode;
        var kernelManager = program.cl.kernelManager;
        var inputKernel = program.operator.evaluate;
        var kernelName = program.kernelName = program.operator.name.split('xflow.')[1];

        if (!inputKernel) {
            return false;
        }

        kernelCode = program.kernelCode = prepareKernelCode(kernelName, inputKernel, program);

        try {
            kernelManager.register(kernelName, kernelCode);
        } catch (e) {
            return false;
        }

        program.kernelProgram = kernelManager.getKernel(program.kernelName);

        return true;
    }

    /**
     *
     * Generates kernel function header and helper kernel code and combines it with user's input kernel code.
     *
     * @function prepareKernelCode
     * @param {String} kernelName
     * @param {Array} inputKernel
     * @param program
     * @returns {String}
     */

    function prepareKernelCode(kernelName, inputKernel, program) {
        var result, innerKernelCode;

        result = createKernelHeader(kernelName, program);

        if (!result) {
            return false;
        }

        result += '{\n';

        innerKernelCode = createInnerKernelCode(program);

        if (!innerKernelCode) {
            return false;
        }

        result += innerKernelCode;
        result += inputKernel.join('\n');
        result += '\n}';

        return result;
    }

    /**
     * Generates a kernel function header from assembled kernel parameters.
     *
     * @function createKernelHeader
     * @param kernelName
     * @param program
     * @returns {string}
     */

    function createKernelHeader(kernelName, program) {
        var functionHeader = [];

        functionHeader.push("__kernel void");
        functionHeader.push(kernelName + '(');
        functionHeader.push(program.kernelFunctionParams.join(', '));
        functionHeader.push(')');

        return functionHeader.join(' ');
    }

    /**
     * Generates helper kernel code.
     *
     * @function createInnerKernelCode
     * @param program
     * @returns {string}
     */

    function createInnerKernelCode(program) {
        var codeLines = [];

        var firstInput = program.kernelParamMap.inputs[0];

        if (firstInput.type === "uchar4*") {
            // Add "iterators"
            codeLines.push("int x = get_global_id(0);");
            codeLines.push("int y = get_global_id(1);");

            // Add bounds checkers
            codeLines.push("if (x >= " + firstInput.name + "_width || y >= " + firstInput.name + "_height) return;");

            // Add input iterator
            codeLines.push("int " + firstInput.name + "_i = y * " + firstInput.name + "_width + x;");

        } else { // Else, assuming that the first input is an 1-dimensional buffer

            codeLines.push("int " + firstInput.name + "_i = get_global_id(0);");

            codeLines.push("if (int " + firstInput.name + "_i >= " + firstInput.name + "_length) return;");
        }

        return codeLines.join('\n');

    }


    /** MAIN WEBCL PROGRAM INITIALISATION **/

    /**
     * Initialises the main WebCL application code that executes the WebCL kernel
     *
     * @function createMainWebCLProgram
     * @param program
     * @returns {Function}
     */

    function createMainWebCLProgram(program) {
        var cl = program.cl;
        var kernelManager = cl.kernelManager;
        var cmdQueue = cl.cmdQueue;
        var memObjects = {inputs: [], outputs: []};
        var assembledArgs = assembleKernelArguments(program.kernelParamMap, memObjects);
        var WSSizes = computeWorkGroupSize(program.kernelParamMap.inputs[0]);
        var kernel = program.kernelProgram;

        return function () {
            var i, len, memObj, args;
            var inputMemObjs = memObjects.inputs;
            var outputMemObjs = memObjects.outputs;

            if (!kernel) {
                return false;
            }

            args = assembledArgs.map(function (a) {
                return a.arg;
            });

            kernelManager.setArgs.apply(null, [kernel].concat(args));

            try {
                // Write the buffer to OpenCL device memory
                len = inputMemObjs.length;
                for (i = 0; i < len; i++) {
                    memObj = inputMemObjs[i];
                    cmdQueue.enqueueWriteBuffer(memObj.arg, false, 0, memObj.arg.getInfo(WebCL.MEM_SIZE), memObj.val, []);
                }

                // Execute (enqueue) kernel
                cmdQueue.enqueueNDRangeKernel(kernel, WSSizes[1].length, [], WSSizes[1], WSSizes[0], []);

                // Read the result buffer from OpenCL device
                len = outputMemObjs.length;
                for (i = 0; i < len; i++) {
                    memObj = outputMemObjs[i];
                    cmdQueue.enqueueReadBuffer(memObj.arg, false, 0, memObj.arg.getInfo(WebCL.MEM_SIZE), memObj.val, []);
                }

                cmdQueue.finish(); //Finish all the operations

            } catch (e) {
                return false;
            }

            return true;
        };
    }


    /**
     * Arranges initialised kernel arguments into helper arrays so they are more easily available in
     * the main WebCL application.
     *
     * @function assembleKernelArguments
     * @param paramMap
     * @param memObjects
     * @returns {Array}
     */

    function assembleKernelArguments(paramMap, memObjects) {
        var outputs = paramMap.outputs;
        var inputs = paramMap.inputs;
        var kernelArgs = [];

        outputs.forEach(function (p) {
            mapKernelArgument(p, kernelArgs, memObjects.outputs);
        });

        inputs.forEach(function (p) {
            mapKernelArgument(p, kernelArgs, memObjects.inputs);
        });

        return kernelArgs;
    }

    function mapKernelArgument(param, kernelArgs, memObjects) {
        kernelArgs.push(param);

        if (param.hasMemObject) {
            memObjects.push(param);
            param.helpers.forEach(function (p) {
                kernelArgs.push(p);
            });
        }
    }

    /**
     * Computes a proper WebCL kernel workgroup size for target input buffer
     *
     * @function computeWorkGroupSize
     * @param targetInput
     * @returns {Array}
     */

    function computeWorkGroupSize(targetInput) {
        var localWS, globalWS;
        var entryVal = targetInput.entryValue;

        if (targetInput.xflowType === Xflow.DATA_TYPE.TEXTURE) {
            localWS = [16, 4];
            globalWS = [Math.ceil(entryVal.width / localWS[0]) * localWS[0],
                Math.ceil(entryVal.height / localWS[1]) * localWS[1]];
        } else {
            localWS = [16];
            globalWS = [Math.ceil(entryVal.length / localWS[0]) * localWS[0]];
        }

        return [localWS, globalWS];
    }


}());Xflow.registerOperator("xflow.morph", {
    outputs: [{type: 'float3', name: 'result'}],
    params:  [
        { type: 'float3', source: 'value' },
        { type: 'float3', source: 'valueAdd'},
        { type: 'float', source: 'weight'}
    ],
    evaluate: function(result, value, valueAdd, weight, info) {
        for(var i = 0; i < info.iterateCount; i++){
            var w = weight[info.iterFlag[2] ? i : 0];
            result[3*i] = value[ info.iterFlag[0] ? 3*i : 0] + w * valueAdd[info.iterFlag[1] ? 3*i : 0];
            result[3*i+1] = value[ info.iterFlag[0] ? 3*i+1 : 1] + w * valueAdd[info.iterFlag[1] ? 3*i+1 : 1];
            result[3*i+2] = value[ info.iterFlag[0] ? 3*i+2 : 2] + w * valueAdd[info.iterFlag[1] ? 3*i+2 : 2];
        }
        return true;
    },
    evaluate_core: function(result, value, valueAdd, weight){
        result[0] = value[0] + weight[0] * valueAdd[0];
        result[1] = value[1] + weight[0] * valueAdd[1];
        result[2] = value[2] + weight[0] * valueAdd[2];
    },
    evaluate_glsl:
        "\t// xflow.morph \n" +
        "\t#O{result} = #I{value} + vec3(#I{weight}) * #I{valueAdd};\n"
});Xflow.registerOperator("xflow.sub", {
    outputs: [  {type: 'float3', name: 'result'}],
    params:  [  {type: 'float3', source: 'value1'},
                {type: 'float3', source: 'value2'}],
    evaluate: function(result, value1, value2, info) {
        throw "Not used!";

        for(var i = 0; i< info.iterateCount*3; i++)
            result[i] = value1[i] - value2[i];

        return true;
    },

    evaluate_core: function(result, value1, value2){
        result[0] = value1[0] - value2[0];
        result[1] = value1[1] - value2[1];
        result[2] = value1[2] - value2[2];
    }
});Xflow.registerOperator("xflow.bufferSelect", {
    outputs: [  {type: 'float3', name: 'result', noAlloc: true}],
    params:  [  {type: 'float3', source: 'trueOption', array: true},
                {type: 'float3', source: 'falseOption', array: true},
                {type: 'bool', source: 'value', array: true}],
    evaluate: function(result, falseOption, trueOption, value) {
        result.assign = value[0] ? trueOption : falseOption;

        return true;
    }
});Xflow.registerOperator("xflow.normalize", {
    outputs: [  {type: 'float3', name: 'result'}],
    params:  [  {type: 'float3', source: 'value'}],
    evaluate: function(result, value, info) {
        for(var i = 0; i < info.iterateCount; i++) {
            var offset = 3*i;
            var x = value[offset];
            var y = value[offset+1];
            var z = value[offset+2];
            var l = 1.0/Math.sqrt(x*x+y*y+z*z);
            result[offset] = x*l;
            result[offset+1] = y*l;
            result[offset+2] = z*l;
        }
    }
});
Xflow.registerOperator("xflow.lerpSeq", {
    outputs: [  {type: 'float3', name: 'result'}],
    params:  [  {type: 'float3', source: 'sequence'},
        {type: 'float', source: 'key'}],
    mapping: [  { name: 'value1', source: 'sequence', sequence: Xflow.SEQUENCE.PREV_BUFFER, keySource: 'key'},
        { name: 'value2', source: 'sequence', sequence: Xflow.SEQUENCE.NEXT_BUFFER, keySource: 'key'},
        { name: 'weight', source: 'sequence', sequence: Xflow.SEQUENCE.LINEAR_WEIGHT, keySource: 'key'}],
    evaluate_core: function(result, value1, value2, weight){
        var invWeight = 1 - weight[0];
        result[0] = invWeight*value1[0] + weight[0]*value2[0];
        result[1] = invWeight*value1[1] + weight[0]*value2[1];
        result[2] = invWeight*value1[2] + weight[0]*value2[2];
    },
    evaluate_parallel: function(sequence, weight, info) {
        /*
         var me = this;
         this.result.result = sequence.interpolate(weight[0], function(v1,v2,t) {
         if (!me.tmp || me.tmp.length != v1.length)
         me.tmp = new Float32Array(v1.length);
         var result = me.tmp;
         var it = 1.0 - t;

         for(var i = 0; i < v1.length; i++) {
         result[i] = v1[i] * it + v2[i] * t;
         };
         return result;
         });
         */
        return true;
    }
});


Xflow.registerOperator("xflow.lerpSeqAsync", {
    outputs: [  {type: 'float3', name: 'result'}],
    params:  [  {type: 'float3', source: 'sequence'},
        {type: 'float', source: 'key'}],
    mapping: [  { name: 'value1', source: 'sequence', sequence: Xflow.SEQUENCE.PREV_BUFFER, keySource: 'key'},
        { name: 'value2', source: 'sequence', sequence: Xflow.SEQUENCE.NEXT_BUFFER, keySource: 'key'},
        { name: 'weight', source: 'sequence', sequence: Xflow.SEQUENCE.LINEAR_WEIGHT, keySource: 'key'}],
    evaluate_async: function(result, value1, value2, weight, info, callback){
        var i = info.iterateCount, off0, off1, off2;
        while(i--){
            off0 = (info.iterFlag[0] ? i : 0)*3;
            off1 = (info.iterFlag[1] ? i : 0)*3;
            off2 = info.iterFlag[2] ? i : 0;
            var invWeight = 1 - weight[off2];
            result[i*3] = invWeight*value1[off0] + weight[off2]*value2[off1];
            result[i*3+1] = invWeight*value1[off0+1] + weight[off2]*value2[off1+1];
            result[i*3+2] = invWeight*value1[off0+2] + weight[off2]*value2[off1+2];
        }
        window.setTimeout(callback, 200);
    }
});


Xflow.registerOperator("xflow.lerpKeys", {
    outputs: [  {type: 'float3', name: 'result'}],
    params:  [  {type: 'float', source: 'keys', array: true},
        {type: 'float3', source: 'values', array: true},
        {type: 'float', source: 'key'}],
    alloc: function(sizes, keys, values, key)
    {
        sizes['result'] = 3;
    },
    evaluate: function(result, keys, values, key) {
        var maxIdx = Math.min(keys.length, Math.floor(values.length / 3));
        var idx = Xflow.utils.binarySearch(keys, key[0], maxIdx);

        if(idx < 0 || idx == maxIdx - 1){
            idx = Math.max(0,idx);
            result[0] = values[3*idx];
            result[1] = values[3*idx+1];
            result[2] = values[3*idx+2];
        }
        else{
            var weight = (key[0] - keys[idx]) / (keys[idx+1] - keys[idx]);
            var invWeight = 1 - weight;
            result[0] = invWeight*values[3*idx] + weight*values[3*idx + 3];
            result[1] = invWeight*values[3*idx+1] + weight*values[3*idx + 4];
            result[2] = invWeight*values[3*idx+2] + weight*values[3*idx + 5];
        }
    }
});





Xflow.registerOperator("xflow.slerpSeq", {
    outputs: [  {type: 'float4', name: 'result'}],
    params:  [  {type: 'float4', source: 'sequence'},
                {type: 'float', source: 'key'}],
    mapping: [  {name: 'value1', source: 'sequence', sequence: Xflow.SEQUENCE.PREV_BUFFER, keySource: 'key'},
                {name: 'value2',  source: 'sequence', sequence: Xflow.SEQUENCE.NEXT_BUFFER, keySource: 'key'},
                {name: 'weight',  source: 'sequence', sequence: Xflow.SEQUENCE.LINEAR_WEIGHT, keySource: 'key'}],
    evaluate: function(result, value1, value2, weight, info) {
        for(var i = 0; i < info.iterateCount; ++i){
            XML3D.math.quat.slerpOffset(  value1,info.iterFlag[0] ? i*4 : 0,
                                          value2,info.iterFlag[1] ? i*4 : 0,
                                          weight[0],
                                          result, i*4, true);
        }
    },

    evaluate_parallel: function(sequence, weight) {
        /*
        var me = this;
        this.result.result = sequence.interpolate(weight[0], function(v1,v2,t) {
            var count = v1.length;
            if (!me.tmp || me.tmp.length != count)
                me.tmp = new Float32Array(count);
            var result = me.tmp;
            for(var i = 0; i < count / 4; i++) {
                var offset = i*4;
                XML3D.math.quat.slerpOffset(v1,v2,offset,t,result, true);
            };
            return result;
        });
        */
        return true;
    }
});


Xflow.registerOperator("xflow.slerpKeys", {
    outputs: [  {type: 'float4', name: 'result'}],
    params:  [  {type: 'float', source: 'keys', array: true},
        {type: 'float4', source: 'values', array: true},
        {type: 'float', source: 'key'}],
    alloc: function(sizes, keys, values, key)
    {
        sizes['result'] = 4;
    },
    evaluate: function(result, keys, values, key) {
        var maxIdx = Math.min(keys.length, Math.floor(values.length / 4));
        var idx = Xflow.utils.binarySearch(keys, key[0], maxIdx);

        if(idx < 0 || idx == maxIdx - 1){
            idx = Math.max(0,idx);
            result[0] = values[4*idx];
            result[1] = values[4*idx+1];
            result[2] = values[4*idx+2];
            result[3] = values[4*idx+3];
        }
        else{
            var weight = (key[0] - keys[idx]) / (keys[idx+1] - keys[idx]);
            XML3D.math.quat.slerpOffset(  values, idx*4,
                values,(idx+1)*4, weight,
                result, 0, true);
        }
    }
});Xflow.registerOperator("xflow.createTransform", {
    outputs: [  {type: 'float4x4', name: 'result'}],
    params:  [  {type: 'float3', source: 'translation', optional: true},
                {type: 'float4', source: 'rotation', optional: true},
                {type: 'float3', source: 'scale', optional: true},
                {type: 'float3', source: 'center', optional: true},
                {type: 'float4', source: 'scaleOrientation', optional: true}],
    evaluate: function(result, translation,rotation,scale,center,scaleOrientation, info) {
        for(var i = 0; i < info.iterateCount; i++) {
            XML3D.math.mat4.makeTransformXflow(
                translation ? translation.subarray(info.iterFlag[0] ? i*3 : 0) : null,
                rotation ? rotation.subarray(info.iterFlag[1] ? i*4 : 0) : null,
                scale ? scale.subarray(info.iterFlag[2] ? i*3 : 0) : null,
                center ? center.subarray(info.iterFlag[3] ? i*3 : 0) : null,
                scaleOrientation ? scaleOrientation.subarray(info.iterFlag[4] ? i*4 : 0) : null,
                result.subarray(i*16)
            )
        }
        return true;
    }
    /*
    evaluate_parallel: function( translation,rotation,scale,center,scaleOrientation) {
    	 var count = translation ? translation.length / 3 :
            rotation ? rotation.length / 4 :
            scale ? scale.length / 3 :
            center ? center.length / 3 :
            scaleOrientation ? scaleOrientation / 4: 0;
    	if(!count)
            throw ("createTransform: No input found");

        if (!this.elementalFunc) {
	        this.elementalFunc = function(index, translation,rotation) {
	            var off4 = index * 4;
	            var off3 = index * 3;
	            var dest = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

	            //Translation
	            dest[12] = translation[off3+0];
	            dest[13] = translation[off3+1];
	            dest[14] = translation[off3+2];

	            //Rotation to matrix
	            var x = rotation[off4+1], y = rotation[off4+2], z = rotation[off4+3], w = -rotation[off4];

	            var x2 = x + x;
	            var y2 = y + y;
	            var z2 = z + z;

	            var xx = x*x2;
	            var xy = x*y2;
	            var xz = x*z2;

	            var yy = y*y2;
	            var yz = y*z2;
	            var zz = z*z2;

	            var wx = w*x2;
	            var wy = w*y2;
	            var wz = w*z2;

	            var rotMat = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1];
	            rotMat[0] = 1 - (yy + zz);
	            rotMat[1] = xy - wz;
	            rotMat[2] = xz + wy;
	            rotMat[3] = 0;

	            rotMat[4] = xy + wz;
	            rotMat[5] = 1 - (xx + zz);
	            rotMat[6] = yz - wx;
	            rotMat[7] = 0;

	            rotMat[8] = xz - wy;
	            rotMat[9] = yz + wx;
	            rotMat[10] = 1 - (xx + yy);
	            rotMat[11] = 0;

	            //Combine translation and rotation (is the kernel faster if we cache the matrix values?)
	            var a00 = dest[0], a01 = dest[1], a02 = dest[2], a03 = dest[3];
	            var a10 = dest[4], a11 = dest[5], a12 = dest[6], a13 = dest[7];
	            var a20 = dest[8], a21 = dest[9], a22 = dest[10], a23 = dest[11];
	            var a30 = dest[12], a31 = dest[13], a32 = dest[14], a33 = dest[15];

	            var b00 = rotMat[0], b01 = rotMat[1], b02 = rotMat[2], b03 = rotMat[3];
	            var b10 = rotMat[4], b11 = rotMat[5], b12 = rotMat[6], b13 = rotMat[7];
	            var b20 = rotMat[8], b21 = rotMat[9], b22 = rotMat[10], b23 = rotMat[11];
	            var b30 = rotMat[12], b31 = rotMat[13], b32 = rotMat[14], b33 = rotMat[15];

	            dest[0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
	            dest[1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
	            dest[2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
	            dest[3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
	            dest[4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
	            dest[5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
	            dest[6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
	            dest[7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
	            dest[8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
	            dest[9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
	            dest[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
	            dest[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
	            dest[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
	            dest[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
	            dest[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
	            dest[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;

	            return dest;
	        };
        }

        var tmp = new ParallelArray(
                count,
                this.elementalFunc,
                translation,
                rotation
        );
        this.result.result = tmp.flatten();

        return true;
    }
     */
});Xflow.registerOperator("xflow.createTransformInv", {
    outputs: [  {type: 'float4x4', name: 'result'}],
    params:  [  {type: 'float3', source: 'translation', optional: true},
                {type: 'float4', source: 'rotation', optional: true},
                {type: 'float3', source: 'scale', optional: true},
                {type: 'float3', source: 'center', optional: true},
                {type: 'float4', source: 'scaleOrientation', optional: true}],
    evaluate: function(result, translation,rotation,scale,center,scaleOrientation, info) {
        for(var i = 0; i < info.iterateCount; i++) {
            XML3D.math.mat4.makeTransformInvXflow(
                translation ? translation.subarray(info.iterFlag[0] ? i*3 : 0) : null,
                rotation ? rotation.subarray(info.iterFlag[1] ? i*4 : 0) : null,
                scale ? scale.subarray(info.iterFlag[2] ? i*3 : 0) : null,
                center ? center.subarray(info.iterFlag[3] ? i*3 : 0) : null,
                scaleOrientation ? scaleOrientation.subarray(info.iterFlag[4] ? i*4 : 0) : null,
                result.subarray(i*16)
            )
        }
    },
    evaluate_parallel: function( translation,rotation,scale,center,scaleOrientation) {

        //this.parallel_data = new ParallelArray(result).partition(16);
        /*
    	var count = translation ? translation.length / 3 :
            rotation ? rotation.length / 4 :
            scale ? scale.length / 3 :
            center ? center.length / 3 :
            scaleOrientation ? scaleOrientation / 4: 0;
    	if(!count)
            throw ("createTransform: No input found");

        if (!this.elementalFunc) {
	        this.elementalFunc = function(index, translation,rotation) {
	            var off4 = index * 4;
	            var off3 = index * 3;
	            var dest = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

	            //Translation
	            dest[12] = translation[off3+0];
	            dest[13] = translation[off3+1];
	            dest[14] = translation[off3+2];

	            //Rotation to matrix
	            var x = rotation[off4+1], y = rotation[off4+2], z = rotation[off4+3], w = -rotation[off4];

	            var x2 = x + x;
	            var y2 = y + y;
	            var z2 = z + z;

	            var xx = x*x2;
	            var xy = x*y2;
	            var xz = x*z2;

	            var yy = y*y2;
	            var yz = y*z2;
	            var zz = z*z2;

	            var wx = w*x2;
	            var wy = w*y2;
	            var wz = w*z2;

	            var rotMat = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1];
	            rotMat[0] = 1 - (yy + zz);
	            rotMat[1] = xy - wz;
	            rotMat[2] = xz + wy;
	            rotMat[3] = 0;

	            rotMat[4] = xy + wz;
	            rotMat[5] = 1 - (xx + zz);
	            rotMat[6] = yz - wx;
	            rotMat[7] = 0;

	            rotMat[8] = xz - wy;
	            rotMat[9] = yz + wx;
	            rotMat[10] = 1 - (xx + yy);
	            rotMat[11] = 0;

	            //Combine translation and rotation (is the kernel faster if we cache the matrix values?)
	            var a00 = dest[0], a01 = dest[1], a02 = dest[2], a03 = dest[3];
	            var a10 = dest[4], a11 = dest[5], a12 = dest[6], a13 = dest[7];
	            var a20 = dest[8], a21 = dest[9], a22 = dest[10], a23 = dest[11];
	            var a30 = dest[12], a31 = dest[13], a32 = dest[14], a33 = dest[15];

	            var b00 = rotMat[0], b01 = rotMat[1], b02 = rotMat[2], b03 = rotMat[3];
	            var b10 = rotMat[4], b11 = rotMat[5], b12 = rotMat[6], b13 = rotMat[7];
	            var b20 = rotMat[8], b21 = rotMat[9], b22 = rotMat[10], b23 = rotMat[11];
	            var b30 = rotMat[12], b31 = rotMat[13], b32 = rotMat[14], b33 = rotMat[15];

	            dest[0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
	            dest[1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
	            dest[2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
	            dest[3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
	            dest[4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
	            dest[5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
	            dest[6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
	            dest[7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
	            dest[8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
	            dest[9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
	            dest[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
	            dest[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
	            dest[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
	            dest[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
	            dest[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
	            dest[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;

	            return dest;
	        };
        }

        var tmp = new ParallelArray(
                count,
                this.elementalFunc,
                translation,
                rotation
        );
        this.result.result = tmp.flatten();
	*/
        return true;
    }
});Xflow.registerOperator("xflow.mul", {
    outputs: [  {type: 'float4x4', name: 'result'}],
    params:  [  {type: 'float4x4', source: 'value1'},
                {type: 'float4x4', source: 'value2'}],
    evaluate: function(result, value1, value2, info) {
        for(var i = 0; i < info.iterateCount; i++)
        {
            XML3D.math.mat4.multiplyOffset(result, i*16,
                value1,  info.iterFlag[0] ? i*16 : 0,
                value2, info.iterFlag[0] ? i*16 : 0);
        }
    },



    evaluate_parallel: function(value1, value2) {
        /*if (!this.tmp) {
             this.tmp = new Float32Array(value1.length);
        }
        var result = this.tmp;
        var count = value1.length;
        for(var i = 0; i < count; i++)
        {
            var offset = i*16;
            XML3D.math.mat4.multiplyOffset(result, offset, value1, offset, value2, offset);
        }
        //this.parallel_data = new ParallelArray(result).partition(16);
        this.result.result = result;


        if (!this.elementalFunc) {
            this.elementalFunc = function(index, value1, value2) {
                var mo = index*16;

                var a00 = value2[mo+0], a01 = value2[mo+1], a02 = value2[mo+2], a03 = value2[mo+3];
                var a10 = value2[mo+4], a11 = value2[mo+5], a12 = value2[mo+6], a13 = value2[mo+7];
                var a20 = value2[mo+8], a21 = value2[mo+9], a22 = value2[mo+10], a23 = value2[mo+11];
                var a30 = value2[mo+12], a31 = value2[mo+13], a32 = value2[mo+14], a33 = value2[mo+15];

                var b00 = value1[mo+0], b01 = value1[mo+1], b02 = value1[mo+2], b03 = value1[mo+3];
                var b10 = value1[mo+4], b11 = value1[mo+5], b12 = value1[mo+6], b13 = value1[mo+7];
                var b20 = value1[mo+8], b21 = value1[mo+9], b22 = value1[mo+10], b23 = value1[mo+11];
                var b30 = value1[mo+12], b31 = value1[mo+13], b32 = value1[mo+14], b33 = value1[mo+15];

                var dest = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
                dest[0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
                dest[1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
                dest[2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
                dest[3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
                dest[4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
                dest[5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
                dest[6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
                dest[7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
                dest[8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
                dest[9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
                dest[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
                dest[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
                dest[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
                dest[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
                dest[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
                dest[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;
                return dest;
            };
        }

        var numMatrices = value1.length/16;

        var tmp = new ParallelArray(
                numMatrices,
                this.elementalFunc,
                value1,
                value2
        );

        this.result.result = tmp.flatten();
         */
        return true;
    }
});Xflow.registerOperator("xflow.skinDirection", {
    outputs: [  {type: 'float3', name: 'result' }],
    params:  [  {type: 'float3', source: 'dir' },
                {type: 'int4', source: 'boneIdx' },
                {type: 'float4', source: 'boneWeight' },
                {type: 'float4x4', source: 'boneXform', array: true } ],
    evaluate: function(result, dir,boneIdx,boneWeight,boneXform, info) {
        var vec3 = XML3D.math.vec3,
            mat4 = XML3D.math.mat4;
        var r = vec3.create();
        var tmp =  vec3.create();

        for(var i = 0; i< info.iterateCount;++i) {
            var offset = i*3;
            r[0] = r[1] = r[2] = +0;
            for(var j = 0; j < 4; j++) {
                var weight = boneWeight[info.iterFlag[2] ? i*4+j : j];
                if (weight) {
                    var mo = boneIdx[info.iterFlag[1] ? i*4+j : j]*16;

                    mat4.multiplyOffsetDirection(boneXform, mo, dir, offset, tmp);
                    vec3.scale(tmp, tmp, weight);
                    vec3.add(r, r, tmp);
                }
            }
            vec3.normalize(r, r);
            result[offset] = r[0];
            result[offset+1] = r[1];
            result[offset+2] = r[2];
        }
    },

    evaluate_parallel: function(dir, boneIndex, boneWeight, boneXform) {
        /*
        if (!this.elementalFunc) {
            this.elementalFunc = function(index, direction, boneIndex, boneWeight, boneXform) {
                var r = [0,0,0];
                var off4 = index*4;
                var off3 = index*3;

                var x = direction[off3], y = direction[off3+1], z = direction[off3+2];

                for (var j=0; j < 4; j++) {
                    var weight = boneWeight[off4+j];
                    if (weight > 0) {
                        var mo = boneIndex[off4+j] * 16;

                        //Multiply dir with boneXform
                        r[0] += (boneXform[mo+0]*x + boneXform[mo+4]*y + boneXform[mo+8]*z) * weight;
                        r[1] += (boneXform[mo+1]*x + boneXform[mo+5]*y + boneXform[mo+9]*z) * weight;
                        r[2] += (boneXform[mo+2]*x + boneXform[mo+6]*y + boneXform[mo+10]*z) * weight;
                    }
                }
                return r;
            };
        }
        var numVertices = dir.length / 3;
        var result = new ParallelArray(
                numVertices,
                this.elementalFunc,
                dir,
                boneIndex,
                boneWeight,
                boneXform
        );

        this.result.result = result;
        */
        return true;
    }
});Xflow.registerOperator("xflow.skinPosition", {
    outputs: [  {type: 'float3', name: 'result' }],
    params:  [  {type: 'float3', source: 'pos' },
                {type: 'int4', source: 'boneIdx' },
                {type: 'float4', source: 'boneWeight' },
                {type: 'float4x4', source: 'boneXform', array: true } ],
    evaluate: function(result, pos,boneIdx,boneWeight,boneXform, info) {
        var vec3 = XML3D.math.vec3,
            mat4 = XML3D.math.mat4;
        var r = vec3.create();
        var tmp =  vec3.create();

        for(var i = 0; i< info.iterateCount;++i) {
            var offset = i*3;
            r[0] = r[1] = r[2] = +0;
            for(var j = 0; j < 4; j++) {
                var weight = boneWeight[info.iterFlag[2] ? i*4+j : j];
                if (weight) {
                    var mo = boneIdx[info.iterFlag[1] ? i*4+j : j]*16;

                    mat4.multiplyOffsetVec3(boneXform, mo, pos, offset, tmp);
                    vec3.scale(tmp, tmp, weight);
                    vec3.add(r, r, tmp);
                }
            }
            result[offset] = r[0];
            result[offset+1] = r[1];
            result[offset+2] = r[2];
        }
    },

    evaluate_parallel: function(pos, boneIndex, boneWeight, boneXform, info) {
        /*
        if (!this.elementalFunc) {
            this.elementalFunc = function(index, position, boneIndex, boneWeight, boneXform) {
                var r = [0,0,0];
                var off4 = index*4;
                var off3 = index*3;

                var x = position[off3], y = position[off3+1], z = position[off3+2];

                for (var j=0; j < 4; j++) {
                    var weight = boneWeight[off4+j];
                    if (weight > 0) {
                        var mo = boneIndex[off4+j] * 16;

                        //Multiply pos with boneXform
                        r[0] += (boneXform[mo+0]*x + boneXform[mo+4]*y + boneXform[mo+8]*z + boneXform[mo+12]) * weight;
                        r[1] += (boneXform[mo+1]*x + boneXform[mo+5]*y + boneXform[mo+9]*z + boneXform[mo+13]) * weight;
                        r[2] += (boneXform[mo+2]*x + boneXform[mo+6]*y + boneXform[mo+10]*z + boneXform[mo+14]) * weight;
                    }
                }
                return r;
            };
        }
        var numVertices = pos.length / 3;
        var result = new ParallelArray(
                numVertices,
                this.elementalFunc,
                pos,
                boneIndex,
                boneWeight,
                boneXform
        );

        this.result.result = result;
        */
        return true;
    }
});Xflow.registerOperator("xflow.forwardKinematics", {
    outputs: [  {type: 'float4x4',  name: 'result', customAlloc: true}],
    params:  [  {type: 'int',       source: 'parent', array: true },
                {type: 'float4x4',  source: 'xform', array: true }],
    alloc: function(sizes, parent, xform)
    {
        var length = Math.min(parent.length, xform.length / 16);
        sizes['result'] = length;
    },
    evaluate: function(result, parent,xform, info) {

        var boneCount = result.length / 16;

        var computed = [];
        //For each bone do:
        for(var i = 0; i < boneCount;){
            if(!computed[i]) {
                var p = parent[i];
                if(p >= 0){
                    //This bone has a parent bone
                    if(!computed[p]){
                        //The parent bone's transformation matrix hasn't been computed yet
                        while(parent[p] >= 0 && !computed[parent[p]]) p = parent[p];

                        if(parent[p] >= 0)
                            XML3D.math.mat4.multiplyOffset(result, p*16, xform, p*16, result, parent[p]*16);
                        else
                            for(var j = 0; j < 16; j++) {
                                result[p*16+j] = xform[p*16+j];
                            }
                        computed[p] = true;
                        continue;
                    }
                    else {
                        XML3D.math.mat4.multiplyOffset(result, i*16, xform, i*16, result,  p*16);
                    }
                }
                else{
                    for(var j = 0; j < 16; j++) {
                        result[i*16+j] = xform[i*16+j];
                    }
                }
                computed[i] = true;
            }
            i++;
        }
    },

    evaluate_parallel: function(parent, xform) {

          /*
           if (!this.parallel_data) {
              this.parallel_data = new ParallelArray(xform.data).partition(16);
          }
        var elementalFunc = function(index, parent,xform) {
            var result = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
            var xf = xform.get(index);

            for(var j = 0; j < 16; j++) {
                result[j] = xf.get(j);
            }

            var p = parent.get(index);

            while (p[0] >= 0) {
                //Multiply the current bone matrix with its parent
                xf = xform.get(p[0]);
                var a00 = xf.get(0), a01 = xf.get(1), a02 = xf.get(2), a03 = xf.get(3);
                var a10 = xf.get(4), a11 = xf.get(5), a12 = xf.get(6), a13 = xf.get(7);
                var a20 = xf.get(8), a21 = xf.get(9), a22 = xf.get(10), a23 = xf.get(11);
                var a30 = xf.get(12), a31 = xf.get(13), a32 = xf.get(14), a33 = xf.get(15);

                var b00 = result[0], b01 = result[1], b02 = result[2], b03 = result[3];
                var b10 = result[4], b11 = result[5], b12 = result[6], b13 = result[7];
                var b20 = result[8], b21 = result[9], b22 = result[10], b23 = result[11];
                var b30 = result[12], b31 = result[13], b32 = result[14], b33 = result[15];

                result[0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
                result[1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
                result[2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
                result[3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
                result[4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
                result[5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
                result[6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
                result[7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
                result[8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
                result[9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
                result[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
                result[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
                result[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
                result[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
                result[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
                result[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;
                p = parent.get(p[0]);
            }

            return result;
        };

        this.parallel_data = this.parallel_data.combine(
                1,
                low_precision(elementalFunc),
                parent,
                xform
        );
        this.result.result = this.parallel_data;
        */

        return true;
    }
});Xflow.registerOperator("xflow.forwardKinematicsInv", {
    outputs: [  {type: 'float4x4',  name: 'result', customAlloc: true}],
    params:  [  {type: 'int',       source: 'parent', array: true },
                {type: 'float4x4',  source: 'xform', array: true }],
    alloc: function(sizes, parent, xform)
    {
        var length = Math.min(parent.length, xform.length / 16);
        sizes['result'] = length;
    },
    evaluate: function(result, parent,xform, info) {
        var boneCount = xform.length / 16;

        var computed = [];
        //For each bone do:
        for(var i = 0; i < boneCount;){
            if(!computed[i]) {
                var p = parent[i];
                if(p >= 0){
                    //This bone has a parent bone
                    if(!computed[p]){
                        //The parent bone's transformation matrix hasn't been computed yet
                        while(parent[p] >= 0 && !computed[parent[p]]) p = parent[p];
                        //The current bone has a parent and its transform hasn't been computed yet

                        if(parent[p] >= 0)
                            XML3D.math.mat4.multiplyOffset(result, p*16, result, parent[p]*16, xform, p*16);
                        else
                            for(var j = 0; j < 16; j++) {
                                result[p*16+j] = xform[p*16+j];
                            }
                        computed[p] = true;
                        continue;

                    }
                    else {
                        XML3D.math.mat4.multiplyOffset(result, i*16,  result,  p*16, xform, i*16);
                    }
                }
                else{
                    for(var j = 0; j < 16; j++) {
                        result[i*16+j] = xform[i*16+j];
                    }
                }
                computed[i] = true;
            }
            i++;
        }
    }
});Xflow.registerOperator("xflow.flipNormal", {
    outputs: [  {type: 'float3', name: 'result'}],
    params:  [  {type: 'float3', source: 'value'}],
    evaluate: function(result, value, info) {
        for(var i = 0; i<info.iterateCount*3; i++)
            result[i] = -value[i];
    }
});Xflow.registerOperator("xflow.createIGIndex", {
    outputs:[
        //{type:'int', name:'index', customAlloc:true },
        {type:'float2', name:'texcoord', customAlloc:true }
    ],
    params:[
        {type:'int', source:'vertexCount', optional:false},
        {type:'texture', source:'positionTex', optional: false}
    ],
    alloc:function (sizes, vertexCount, image) {
        sizes['texcoord'] = image.width * image.height;
        //sizes['index'] = vertexCount[0];
    },
    evaluate:function (texcoord, vertexCount, image, info) {
        // tex coords
        var halfPixel = {
            x: 0.5 / image.width,
            y: 0.5 / image.height
        };
        var i = 0;
        for (var y = 0, ylength = image.height; y < ylength; y++)
        {
            for (var x = 0, xlength = image.width; x < xlength; x++)
            {
                texcoord[i++] = (x / xlength) + halfPixel.x;
                texcoord[i++] = 1 - ((y / ylength) + halfPixel.y);
            }
        }

        // index creation
        /*for(var i = 0; i < vertexCount[0]; i++) {
            index[i] = i;
        }*/
        return true;
    }
});// Additional methods in glMatrix style


XML3D.math.vec3.reciprocal = function(vec, dest) {
    if(!dest) { dest = vec; }

    dest[0] = 1 / vec[0];
    dest[1] = 1 / vec[1];
    dest[2] = 1 / vec[2];
    return dest;
};

XML3D.math.mat4.multiplyOffsetVec3 = function(mat, matOffset, vec, vecOffset, dest) {
    if(!dest) { dest = vec; }
    if(!vecOffset) { vecOffset = 0; }

    var x = vec[vecOffset+0], y = vec[vecOffset+1], z = vec[vecOffset+2];

    dest[0] = mat[matOffset+0]*x + mat[matOffset+4]*y + mat[matOffset+8]*z + mat[matOffset+12];
    dest[1] = mat[matOffset+1]*x + mat[matOffset+5]*y + mat[matOffset+9]*z + mat[matOffset+13];
    dest[2] = mat[matOffset+2]*x + mat[matOffset+6]*y + mat[matOffset+10]*z + mat[matOffset+14];

    return dest;
};



XML3D.math.mat4.multiplyOffsetDirection = function(mat, matOffset, vec, vecOffset, dest) {
    if(!dest) { dest = vec; }
    if(!vecOffset) { vecOffset = 0; }

    var x = vec[vecOffset+0], y = vec[vecOffset+1], z = vec[vecOffset+2], w;

    dest[0] = mat[matOffset+0]*x + mat[matOffset+4]*y + mat[matOffset+8]*z;
    dest[1] = mat[matOffset+1]*x + mat[matOffset+5]*y + mat[matOffset+9]*z;
    dest[2] = mat[matOffset+2]*x + mat[matOffset+6]*y + mat[matOffset+10]*z;

    return dest;
};

var IDENT_MAT = XML3D.math.mat4.identity(XML3D.math.mat4.create());
var TMP_MATRIX = XML3D.math.mat4.create();
var TMP_VEC = XML3D.math.vec3.create();

XML3D.math.mat4.makeTransformXflow = function(translation,rotation,scale,center,scaleOrientation,dest){
    XML3D.math.mat4.identity(dest);
    if(translation) XML3D.math.mat4.translate(dest, dest, translation);
    if(center) XML3D.math.mat4.translate(dest, dest, center);
    if(rotation){
        XML3D.math.mat4.fromRotationTranslation(TMP_MATRIX, [rotation[0],rotation[1],rotation[2],rotation[3]], [0,0,0]);
        XML3D.math.mat4.multiply(dest, dest, TMP_MATRIX);
    }
    if(scaleOrientation){
        XML3D.math.mat4.fromRotationTranslation(TMP_MATRIX, [scaleOrientation[0], scaleOrientation[1],scaleOrientation[2],scaleOrientation[3]], [0,0,0]);
        XML3D.math.mat4.multiply(dest, dest, TMP_MATRIX);
    }
    if(scale) XML3D.math.mat4.scale(dest, dest, scale);
    if(scaleOrientation){
        XML3D.math.mat4.fromRotationTranslation(TMP_MATRIX, [scaleOrientation[0], scaleOrientation[1],scaleOrientation[2],-scaleOrientation[3]], [0,0,0]);
        XML3D.math.mat4.multiply(dest, dest, TMP_MATRIX);
    }
    if(center){
        XML3D.math.mat4.translate(dest, dest, XML3D.math.vec3.negate(TMP_VEC, center));
    }
};

XML3D.math.mat4.makeTransformInvXflow = function(translation,rotation,scale,center,scaleOrientation,dest){
    XML3D.math.mat4.identity(dest);
    if(center){
        XML3D.math.mat4.translate(dest, dest, center);
    }
    if(scaleOrientation){
        XML3D.math.mat4.fromRotationTranslation(TMP_MATRIX, [scaleOrientation[0],scaleOrientation[1],scaleOrientation[2],scaleOrientation[3]], [0,0,0])
        XML3D.math.mat4.multiply(dest, dest, TMP_MATRIX);
    }
    if(scale) XML3D.math.mat4.scale(dest, dest, XML3D.math.vec3.reciprocal(scale, TMP_VEC) );
    if(scaleOrientation){
        XML3D.math.mat4.fromRotationTranslation(TMP_MATRIX, [scaleOrientation[0], scaleOrientation[1],scaleOrientation[2],-scaleOrientation[3]], [0,0,0])
        XML3D.math.mat4.multiply(dest, dest, TMP_MATRIX);
    }
    if(rotation){
        XML3D.math.mat4.fromRotationTranslation(TMP_MATRIX, [rotation[0],rotation[1],rotation[2],-rotation[3]], [0,0,0])
        XML3D.math.mat4.multiply(dest, dest, TMP_MATRIX);
    }
    if(center) XML3D.math.mat4.translate(dest, dest, XML3D.math.vec3.negate(TMP_VEC, center) );
    if(translation) XML3D.math.mat4.translate(dest, dest, XML3D.math.vec3.negate(TMP_VEC, translation) );
};

/*
mat4.makeTransformInvOffset = function(translation,rotation,scale,center,scaleOrientation,offset,dest) {
    var mo = offset*16;
    var vo = offset*3;
    var qo = offset*4;

    dest[mo+0] = 1;
    dest[mo+1] = 0;
    dest[mo+2] = 0;
    dest[mo+3] = 0;
    dest[mo+4] = 0;
    dest[mo+5] = 1;
    dest[mo+6] = 0;
    dest[mo+7] = 0;
    dest[mo+8] = 0;
    dest[mo+9] = 0;
    dest[mo+10] = 1;
    dest[mo+11] = 0;
    dest[mo+12] = -translation[vo];
    dest[mo+13] = -translation[vo+1];
    dest[mo+14] = -translation[vo+2];
    dest[mo+15] = 1;

    if (rotation) {
        var rotM = XML3D.math.quat.toMat4([rotation[qo+1],rotation[qo+2],rotation[qo+3],rotation[qo]]);
        XML3D.math.mat4.multiplyOffset(dest, mo,  rotM, 0,  dest, mo);
    }
};

XML3D.math.mat4.makeTransformOffset = function(translation,rotation,scale,center,scaleOrientation,offset,dest) {
    var mo = offset*16;
    var vo = offset*3;
    var qo = offset*4;

    dest[mo+0] = 1;
    dest[mo+1] = 0;
    dest[mo+2] = 0;
    dest[mo+3] = 0;
    dest[mo+4] = 0;
    dest[mo+5] = 1;
    dest[mo+6] = 0;
    dest[mo+7] = 0;
    dest[mo+8] = 0;
    dest[mo+9] = 0;
    dest[mo+10] = 1;
    dest[mo+11] = 0;
    dest[mo+12] = translation[vo];
    dest[mo+13] = translation[vo+1];
    dest[mo+14] = translation[vo+2];
    dest[mo+15] = 1;

    if (rotation) {
        var rotM = XML3D.math.quat.toMat4([rotation[qo+1],rotation[qo+2],rotation[qo+3],-rotation[qo]]);
        XML3D.math.mat4.multiplyOffset(dest, mo,  rotM, 0,  dest, mo);
    }
};
*/
XML3D.math.mat4.multiplyOffset = function(dest, destOffset, mat, offset1, mat2, offset2) {
    var a00 = mat2[offset2+0], a01 = mat2[offset2+1], a02 = mat2[offset2+2], a03 = mat2[offset2+3];
    var a10 = mat2[offset2+4], a11 = mat2[offset2+5], a12 = mat2[offset2+6], a13 = mat2[offset2+7];
    var a20 = mat2[offset2+8], a21 = mat2[offset2+9], a22 = mat2[offset2+10], a23 = mat2[offset2+11];
    var a30 = mat2[offset2+12], a31 = mat2[offset2+13], a32 = mat2[offset2+14], a33 = mat2[offset2+15];

    var b00 = mat[offset1+0], b01 = mat[offset1+1], b02 = mat[offset1+2], b03 = mat[offset1+3];
    var b10 = mat[offset1+4], b11 = mat[offset1+5], b12 = mat[offset1+6], b13 = mat[offset1+7];
    var b20 = mat[offset1+8], b21 = mat[offset1+9], b22 = mat[offset1+10], b23 = mat[offset1+11];
    var b30 = mat[offset1+12], b31 = mat[offset1+13], b32 = mat[offset1+14], b33 = mat[offset1+15];

    dest[destOffset+0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
    dest[destOffset+1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
    dest[destOffset+2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
    dest[destOffset+3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
    dest[destOffset+4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
    dest[destOffset+5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
    dest[destOffset+6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
    dest[destOffset+7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
    dest[destOffset+8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
    dest[destOffset+9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
    dest[destOffset+10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
    dest[destOffset+11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
    dest[destOffset+12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
    dest[destOffset+13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
    dest[destOffset+14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
    dest[destOffset+15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;
};

XML3D.math.quat.slerpOffset = function(quat, offset1, quat2, offset2, t, dest, destOffset, shortest) {
    if(!dest) { dest = quat; }

    var ix1 = offset1, iy1 = offset1+1, iz1 = offset1+2, iw1 = offset1+3;
    var ix2 = offset2, iy2 = offset2+1, iz2 = offset2+2, iw2 = offset2+3;
    var ixd = destOffset, iyd = destOffset+1, izd = destOffset+2, iwd = destOffset+3;

    var cosAngle =  quat[ix1]*quat2[ix2] + quat[iy1]*quat2[iy2] + quat[iz1]*quat2[iz2] + quat[iw1]*quat2[iw2];

    var c1, c2;

    // Linear interpolation for close orientations
    if ((1.0 - Math.abs(cosAngle)) < 0.01)
      {
        c1 = 1.0 - t;
        c2 = t;
      }
    else
      {
        // Spherical interpolation
        var angle    = Math.acos(Math.abs(cosAngle));
        var sinAngle = Math.sin(angle);
        c1 = Math.sin(angle * (1.0 - t)) / sinAngle;
        c2 = Math.sin(angle * t) / sinAngle;
      }

    // Use the shortest path
    if (shortest && (cosAngle < 0.0))
      c1 = -c1;

    dest[ixd] = c1*quat[ix1] + c2*quat2[ix2];
    dest[iyd] = c1*quat[iy1] + c2*quat2[iy2];
    dest[izd] = c1*quat[iz1] + c2*quat2[iz2];
    dest[iwd] = c1*quat[iw1] + c2*quat2[iw2];
};Xflow.registerOperator("xflow.noiseImage", {
    outputs: [ {type: 'texture', name : 'image', customAlloc: true} ],
    params:  [ {type: 'int', source: 'width'},
               {type: 'int', source:'height'},
               {type: 'float2', source: 'scale'},
               {type: 'float', source: 'minFreq'},
               {type: 'float', source: 'maxFreq'} ],
    alloc: function(sizes, width, height, scale, minFreq, maxFreq) {
        var samplerConfig = new Xflow.SamplerConfig;
        samplerConfig.setDefaults();
        sizes['image'] = {
            imageFormat : {width: width[0], height :height[0]},
            samplerConfig : samplerConfig
        };
    },
    evaluate: function(image, width, height, scale, minFreq, maxFreq) {
        width = width[0];
        height = height[0];
        minFreq = minFreq[0];
        maxFreq = maxFreq[0];

        var id = image;
        var pix = id.data;
        this.noise = this.noise || new SimplexNoise();
        var noise = this.noise;

        var useTurbulence = minFreq != 0.0 && maxFreq != 0.0 && minFreq < maxFreq;

        var snoise = function(x,y) {
            return noise.noise(x, y); // noise.noise returns values in range [-1,1]
            //return 2.0 * noise.noise(x, y) - 1.0; // this code is for noise value in range [0,1]
        };

        var turbulence = function(minFreq, maxFreq, s, t) {
            var value = 0;
            for (var f = minFreq; f < maxFreq; f *= 2)
            {
                value += Math.abs(snoise(s * f, t * f))/f;
            }
            return value;
        };

        for (var y = 0; y < height; ++y)
        {
            var t = y / height * scale[1];
            var invWidth = 1.0 / width;

            for (var x = 0; x < width; ++x)
            {
                var s = x * invWidth * scale[0];
                var v = useTurbulence ? turbulence(minFreq, maxFreq, s, t) : snoise(s, t);
                var offset = (x * width + y) * 4;
                pix[offset] =  Math.floor(v * 255);
                pix[offset+1] = Math.floor(v * 255);
                pix[offset+2] = Math.floor(v * 255);
                pix[offset+3] = 255;
            }
        }

        /* Fill with green color
        for (var y = 0; y < height; ++y)
        {
            for (var x = 0; x < width; ++x)
            {
                var offset = (x * width + y) * 4;
                pix[offset] =  0
                pix[offset+1] = 255;
                pix[offset+2] = 0;
                pix[offset+3] = 255;
            }
        }
        */

        return true;
    }
});
// Code portions from http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
(function() {
    Xflow.Filters = {};

    var tmpCanvas = null;
    var tmpCtx = null;

    Xflow.Filters.createImageData = function(w,h) {
        if (!tmpCanvas)
            tmpCanvas = document.createElement('canvas');
        if (!tmpCtx)
            tmpCtx = tmpCanvas.getContext('2d');
        return tmpCtx.createImageData(w, h);
    };

    Xflow.Filters.createImageDataFloat32 = function(w, h) {
        return {width: w, height: h, data: new Float32Array(w * h * 4)};
    };

    Xflow.Filters.grayscale = function(inpixels, outpixels, args) {
            var s = inpixels.data;
            var d = outpixels.data;
            for (var i=0; i<s.length; i+=4) {
                var r = s[i];
                var g = s[i+1];
                var b = s[i+2];
                var a = s[i+3];
                // CIE luminance for the RGB
                // The human eye is bad at seeing red and blue, so we de-emphasize them.
                var v = 0.2126*r + 0.7152*g + 0.0722*b;
                d[i] = d[i+1] = d[i+2] = v
                d[i+3] = a;
            }
            return inpixels;
    };

    Xflow.Filters.convolute = function(inpixels, outpixels, weights, opaque) {
            var side = Math.round(Math.sqrt(weights.length));
            var halfSide = Math.floor(side/2);
            var src = inpixels.data;
            var sw = inpixels.width;
            var sh = inpixels.height;
            // pad output by the convolution matrix
            var w = sw;
            var h = sh;
            var dst = outpixels.data;
            // go through the destination image pixels
            var alphaFac = opaque ? 1 : 0;
            for (var y=0; y<h; y++) {
                for (var x=0; x<w; x++) {
                    var sy = y;
                    var sx = x;
                    var dstOff = (y*w+x)*4;
                    // calculate the weighed sum of the source image pixels that
                    // fall under the convolution matrix
                    var r=0, g=0, b=0, a=0;
                    for (var cy=0; cy<side; cy++) {
                        for (var cx=0; cx<side; cx++) {
                            var scy = sy + cy - halfSide;
                            var scx = sx + cx - halfSide;
                            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                                var srcOff = (scy*sw+scx)*4;
                                var wt = weights[cy*side+cx];
                                r += src[srcOff] * wt;
                                g += src[srcOff+1] * wt;
                                b += src[srcOff+2] * wt;
                                a += src[srcOff+3] * wt;
                            }
                        }
                    }
                    dst[dstOff] = r;
                    dst[dstOff+1] = g;
                    dst[dstOff+2] = b;
                    dst[dstOff+3] = a + alphaFac*(255-a);
                }
            }
            return outpixels;
        };
/*
    Xflow.Filters.convoluteFloat32 = function(pixels, weights, opaque) {
        var side = Math.round(Math.sqrt(weights.length));
        var halfSide = Math.floor(side / 2);

        var src = pixels.data;
        var sw = pixels.width;
        var sh = pixels.height;

        var w = sw;
        var h = sh;
        var output = {
            width: w, height: h, data: new Float32Array(w * h * 4)
        };
        var dst = output.data;

        var alphaFac = opaque ? 1 : 0;

        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                var sy = y;
                var sx = x;
                var dstOff = (y * w + x) * 4;
                var r = 0, g = 0, b = 0, a = 0;
                for (var cy = 0; cy < side; cy++) {
                    for (var cx = 0; cx < side; cx++) {
                        var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
                        var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
                        var srcOff = (scy * sw + scx) * 4;
                        var wt = weights[cy * side + cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                        a += src[srcOff + 3] * wt;
                    }
                }
                dst[dstOff] = r;
                dst[dstOff + 1] = g;
                dst[dstOff + 2] = b;
                dst[dstOff + 3] = a + alphaFac * (255 - a);
            }
        }
        return output;
    }
*/
}());

function float4(x,y,z,w) {
    var v = new Float32Array(4);
    switch (arguments.length) {
        case 0:
            v[0] = 0;
            v[1] = 0;
            v[2] = 0;
            v[3] = 0;
            break;
        case 1:
            v[0] = x;
            v[1] = x;
            v[2] = x;
            v[3] = x;
            break;
        case 2:
            v[0] = x;
            v[1] = y;
            v[2] = 0;
            v[3] = 0;
            break;
        case 3:
            v[0] = x;
            v[1] = y;
            v[2] = z;
            v[3] = 0;
            break;
        default:
            v[0] = x;
            v[1] = y;
            v[2] = z;
            v[3] = w;
    }
    return v;
}

function hypot(a, b)
{
    return Math.sqrt(a*a + b*b);
}

function hypot4(a, b)
{
    return float4(hypot(a[0], b[0]),
                  hypot(a[1], b[1]),
                  hypot(a[2], b[2]),
                  hypot(a[3], b[3]));
}

function hypot4To(r, a, b)
{
    r[0] = hypot(a[0], b[0]);
    r[1] = hypot(a[1], b[1]);
    r[2] = hypot(a[2], b[2]);
    r[3] = hypot(a[3], b[3]);
}

function getTexel2D(imagedata, x, y) {
    var offset = (y * imagedata.width + x) * 4;
    var data = imagedata.data;
    var color = new Float32Array(4);
    color[0] = data[offset] / 255.0;
    color[1] = data[offset+1] / 255.0;
    color[2] = data[offset+2] / 255.0;
    color[3] = data[offset+3] / 255.0;
    return color;
}

function getTexel2DTo(color, imagedata, x, y) {
    var offset = (y * imagedata.width + x) * 4;
    var data = imagedata.data;
    color[0] = data[offset] / 255.0;
    color[1] = data[offset+1] / 255.0;
    color[2] = data[offset+2] / 255.0;
    color[3] = data[offset+3] / 255.0;
    return color;
}

function setTexel2D(imagedata, x, y, color) {
    var offset = (y * imagedata.width + x) * 4;
    var data = imagedata.data;
    data[offset] = color[0] * 255.0 ;
    data[offset+1] = color[1] * 255.0;
    data[offset+2] = color[2] * 255.0;
    data[offset+3] = color[3] * 255.0;
}

Xflow.registerOperator("xflow.sobelImage", {
    outputs: [ {type: 'texture', name : 'result', sizeof : 'image'} ],
    params:  [ {type: 'texture', source : 'image'} ],
    evaluate: function(result, image) {
        var width = image.width;
        var height = image.height;

        // Sobel filter, AnySL method
        var gx = float4(0.0);
        var gy = float4(0.0);
        var i00 = float4();
        var i00 = float4();
        var i10 = float4();
        var i20 = float4();
        var i01 = float4();
        var i11 = float4();
        var i21 = float4();
        var i02 = float4();
        var i12 = float4();
        var i22 = float4();
        var color = float4();

        for (var y = 0; y < height; ++y)
        {
            for (var x = 0; x < width; ++x)
            {
                /* Read each texel component and calculate the filtered value using neighbouring texel components */
                if ( x >= 1 && x < (width-1) && y >= 1 && y < height - 1)
                {
                    getTexel2DTo(i00, image, x-1, y-1);
                    getTexel2DTo(i10, image, x, y-1);
                    getTexel2DTo(i20, image, x+1, y-1);
                    getTexel2DTo(i01, image, x-1, y);
                    getTexel2DTo(i11, image, x, y);
                    getTexel2DTo(i21, image, x+1, y);
                    getTexel2DTo(i02, image, x-1, y+1);
                    getTexel2DTo(i12, image, x, y+1);
                    getTexel2DTo(i22, image, x+1, y+1);

                    gx[0] = i00[0] + 2 * i10[0] + i20[0] - i02[0]  - 2 * i12[0] - i22[0];
                    gx[1] = i00[1] + 2 * i10[1] + i20[1] - i02[1]  - 2 * i12[1] - i22[1];
                    gx[2] = i00[2] + 2 * i10[2] + i20[2] - i02[2]  - 2 * i12[2] - i22[2];

                    gy[0] = i00[0] - i20[0]  + 2*i01[0] - 2*i21[0] + i02[0]  -  i22[0];
                    gy[1] = i00[1] - i20[1]  + 2*i01[1] - 2*i21[1] + i02[1]  -  i22[1];
                    gy[2] = i00[2] - i20[2]  + 2*i01[2] - 2*i21[2] + i02[2]  -  i22[2];

                    /* taking root of sums of squares of Gx and Gy */
                    hypot4To(color, gx, gy);
                    color[0]/=2;
                    color[1]/=2;
                    color[2]/=2;
                    color[3]=1.0;
                    setTexel2D(result, x, y, color);
                }
            }
        }



// Sobel filter with separate steps
//
//        var vertical = Xflow.Filters.createImageDataFloat32(width, height);
//        Xflow.Filters.convolute(result, vertical,
//            [ -1, 0, 1,
//              -2, 0, 2,
//              -1, 0, 1 ]);
//        var horizontal = Xflow.Filters.createImageDataFloat32(width, height);
//        Xflow.Filters.convolute(result, horizontal,
//            [ -1, -2, -1,
//               0,  0,  0,
//               1,  2,  1 ]);
//
//        for (var i=0; i<result.data.length; i+=4) {
//            // make the vertical gradient red
//            var v = Math.abs(vertical.data[i]);
//            result.data[i] = v;
//            // make the horizontal gradient green
//            var h = Math.abs(horizontal.data[i]);
//            result.data[i+1] = h;
//            // and mix in some blue for aesthetics
//            result.data[i+2] = (v+h)/4;
//            result.data[i+3] = 255; // opaque alpha
//        }

        /* Copy image
        var destpix = result.data;
        var srcpix = image.data;

        for (var y = 0; y < height; ++y)
        {
            for (var x = 0; x < width; ++x)
            {
                var offset = (y * width + x) * 4;
                destpix[offset] =  srcpix[offset];
                destpix[offset+1] = srcpix[offset+1];
                destpix[offset+2] = srcpix[offset+2];
                destpix[offset+3] = srcpix[offset+3];
            }
        }
        */
        return true;
    }
});
Xflow.registerOperator("xflow.grayscaleImage", {
    outputs: [ {type: 'texture', name : 'result', sizeof : 'image'} ],
    params:  [ {type: 'texture', source : 'image'} ],
    evaluate: function(result, image) {
        var width = image.width;
        var height = image.height;

        var s = image.data;
        var d = result.data;
        for (var i = 0; i < s.length; i += 4) {
            var r = s[i];
            var g = s[i + 1];
            var b = s[i + 2];
            var a = s[i + 3];
            // CIE luminance for the RGB
            // The human eye is bad at seeing red and blue, so we de-emphasize them.
            var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            d[i] = d[i + 1] = d[i + 2] = v
            d[i + 3] = a;
        }
        return true;
    }
});
Xflow.registerOperator("xflow.sepiaImage", {
    outputs: [ {type: 'texture', name : 'result', sizeof : 'image'} ],
    params:  [ {type: 'texture', source : 'image'} ],
    evaluate: function(result, image) {
        var s = image.data;
        var d = result.data;
        var r = 0, g = 0, b = 0;
        for(var i = 0 ; i < s.length; i += 4) {
            r = (s[i] * 0.393 + s[i+1] * 0.769 + s[i+2] * 0.189);
            g = (s[i] * 0.349 + s[i+1] * 0.686 + s[i+2] * 0.168);
            b = (s[i] * 0.272 + s[i+1] * 0.534 + s[i+2] * 0.131);
            if (r>255) r = 255;
            if (g>255) g = 255;
            if (b>255) b = 255;
            if (r<0) r = 0;
            if (g<0) g = 0;
            if (b<0) b = 0;
            d[i] = r;
            d[i+1] = g;
            d[i+2] = b;
            d[i+3] = 255;
        }
        return true;
    },
    evaluate_parallel: function(index, image){
        var x = index[0], y = index[1];
        var r = (image[x][y][0] * 0.393 + image[x][y][1] * 0.769 + image[x][y][2] * 0.189);
        var g = (image[x][y][0] * 0.349 + image[x][y][1] * 0.686 + image[x][y][2] * 0.168);
        var b = (image[x][y][0] * 0.272 + image[x][y][1] * 0.534 + image[x][y][2] * 0.131);
        if (r>255) r = 255;
        if (g>255) g = 255;
        if (b>255) b = 255;
        if (r<0) r = 0;
        if (g<0) g = 0;
        if (b<0) b = 0;
        return [r,g,b,255];
    }
});
Xflow.registerOperator("xflow.clampImage", {
    outputs: [ {type: 'texture', name : 'result', sizeof : 'image', formatType: 'ImageData'} ],
    params:  [ {type: 'texture', source : 'image'},
               {type: 'float', source : 'min'},
               {type: 'float', source : 'max'}
             ],
    evaluate: function(result, image, min, max) {
        var inpix = image.data;
        var outpix = result.data;
        var minv = min[0];
        var maxv = max[0];
        var len = image.data.length;
        for (var i = 0 ; i < len; i++) {
            var val = inpix[i];
            if (val < minv) val = minv;
            if (val > maxv) val = maxv;
            outpix[i] = val;
        }
        return true;
    }
});
// Code portions from http://www.html5rocks.com/en/tutorials/canvas/imagefilters/

(function() {

    function convolute(inpixels, outpixels, weights, opaque) {
        var side = Math.round(Math.sqrt(weights.length));
        var halfSide = Math.floor(side/2);
        var src = inpixels.data;
        var sw = inpixels.width;
        var sh = inpixels.height;
        // pad output by the convolution matrix
        var w = sw;
        var h = sh;
        var dst = outpixels.data;
        // go through the destination image pixels
        var alphaFac = opaque ? 1 : 0;
        for (var y=0; y<h; y++) {
            for (var x=0; x<w; x++) {
                var sy = y;
                var sx = x;
                var dstOff = (y*w+x)*4;
                // calculate the weighed sum of the source image pixels that
                // fall under the convolution matrix
                var r=0, g=0, b=0, a=0;
                for (var cy=0; cy<side; cy++) {
                    for (var cx=0; cx<side; cx++) {
                        var scy = sy + cy - halfSide;
                        var scx = sx + cx - halfSide;
                        if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                            var srcOff = (scy*sw+scx)*4;
                            var wt = weights[cy*side+cx];
                            r += src[srcOff] * wt;
                            g += src[srcOff+1] * wt;
                            b += src[srcOff+2] * wt;
                            a += src[srcOff+3] * wt;
                        }
                    }
                }
                dst[dstOff] = r;
                dst[dstOff+1] = g;
                dst[dstOff+2] = b;
                dst[dstOff+3] = a + alphaFac*(255-a);
            }
        }
        return outpixels;
    };

    Xflow.registerOperator("xflow.convoluteImage", {
        outputs: [ {type: 'texture', name : 'result', sizeof : 'image'} ],
        params:  [
            {type: 'texture', source : 'image'},
            {type: 'float', source : 'kernel'}
        ],
        evaluate: function(result, image, kernel) {
            convolute(image, result, kernel, true);
            return true;
        }
    });

    Xflow.registerOperator("xflow.convoluteImageToFloat", {
        outputs: [ {type: 'texture', name : 'result', sizeof: 'image', formatType : 'float32'} ],
        params:  [
            {type: 'texture', source : 'image'},
            {type: 'float', source : 'kernel'}
        ],
        evaluate: function(result, image, kernel) {
            convolute(image, result, kernel, true);
            return true;
        }
    });

})();
// Based on: http://web.archive.org/web/20100310063925/http://dem.ocracy.org/libero/photobooth/

Xflow.registerOperator("xflow.funMirrorImage", {
    outputs: [ {type: 'texture', name : 'result', sizeof : 'image'} ],
    params:  [ {type: 'texture', source : 'image'},
               {type: 'float', source : 'time'} ],
    evaluate: function(result, image, time) {
        var width = result.width;
        var height = result.height;
        var time = time[0];

        var s = image.data;
        var d = result.data;

        for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {

                /*original coordinates*/
                // [0.0 ,1.0] x [0.0, 1.0]
                var coordX = x / width;
                var coordY = y / height;

                // [-1.0 ,1.0] x [-1.0, 1.0]
                var normCoordX = 2.0 * coordX - 1.0;
                var normCoordY = 2.0 * coordY - 1.0;

                /*go to polar coordinates*/
                var r = Math.sqrt(normCoordX*normCoordX + normCoordY*normCoordY); // length(normCoord)
                var phi = Math.atan2(normCoordY, normCoordX);

                /*squeeze and vary it over time*/
                r = Math.pow(r, 1.0/1.8) * time;

                /*back to cartesian coordinates*/
                normCoordX = r * Math.cos(phi);
                normCoordY = r * Math.sin(phi);
                // [0.0 ,1.0] x [0.0, 1.0]
                coordX = normCoordX / 2.0 + 0.5;
                coordY = normCoordY / 2.0 + 0.5;

                var sX = Math.round(coordX * width);
                var sY = Math.round(coordY * height);

                var i = (sY * width + sX)*4;
                var r = s[i];
                var g = s[i + 1];
                var b = s[i + 2];
                var a = s[i + 3];

                /*color the fragment with calculated texture*/
                var i = (y * width + x)*4;
                d[i] = r;
                d[i + 1] = g;
                d[i + 2] = b;
                d[i + 3] = a;
            }
        }
        return true;
    }
});
// Based on http://kodemongki.blogspot.de/2011/06/kameraku-custom-shader-effects-example.html
Xflow.registerOperator("xflow.popartImage", {
    outputs: [ {type: 'texture', name : 'result', sizeof : 'image'} ],
    params:  [ {type: 'texture', source : 'image'},
        {type: 'float', source : 'time'} ],
    evaluate: function(result, image, time) {
        var width = image.width;
        var height = image.height;

        var s = image.data;
        var d = result.data;
        for (var i = 0; i < s.length; i += 4) {
            var r = s[i] / 255;
            var g = s[i + 1] / 255;
            var b = s[i + 2] / 255;
            var a = s[i + 3] / 255;

            var y = 0.3 * r + 0.59 * g + 0.11 * b;
            y = y < 0.3 ? 0.0 : (y < 0.6 ? 0.5 : 1.0);
            if (y == 0.5) {
                d[i]   = 0.8 * 255;
                d[i+1] = 0;
                d[i+2] = 0;
            } else if (y == 1.0) {
                d[i]   = 0.9 * 255;
                d[i+1] = 0.9 * 255;
                d[i+2] = 0;
            } else {
                d[i] = 0;
                d[i+1] = 0;
                d[i+2] = 0;
            }
            d[i+3] = s[i+3];
        }
        return true;
    }
});
Xflow.registerOperator("xflow.magnitudeImage", {
    outputs: [ {type: 'texture', name : 'result', sizeof : 'image1'} ],
    params:  [
        {type: 'texture', source : 'image1'},
        {type: 'texture', source : 'image2'}
    ],
    evaluate: function(result, image1, image2) {
        var inpix1 = image1.data;
        var inpix2 = image2.data;
        var outpix = result.data;

        var len = inpix1.length;
        for (var i = 0 ; i < len; i+=1) {
            var val1 = inpix1[i];
            var val2 = inpix2[i];
            outpix[i] = Math.sqrt(val1*val1 + val2*val2);
        }
        return true;
    }
});
Xflow.registerOperator("xflow.flipVerticalImage", {
    outputs: [ {type: 'texture', name : 'result', sizeof : 'image'} ],
    params:  [ {type: 'texture', source : 'image'} ],
    evaluate: function(result, image) {
        var width = image.width;
        var height = image.height;

        var destpix = result.data;
        var srcpix = image.data;

        for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {
                var rowOffset = y * width;
                var srcOffset = (rowOffset + x) * 4;
                var dstOffset = (rowOffset + ((width-1) - x)) * 4;
                destpix[dstOffset] =  srcpix[srcOffset];
                destpix[dstOffset+1] = srcpix[srcOffset+1];
                destpix[dstOffset+2] = srcpix[srcOffset+2];
                destpix[dstOffset+3] = srcpix[srcOffset+3];
            }
        }
        return true;
    }
});
Xflow.registerOperator("xflow.selectTransform", {
    outputs: [ {type: 'float4x4', name : 'result', customAlloc: true} ],
    params:  [ {type: 'int', source : 'index'},
               {type: 'float4x4', source: 'transform'} ],
    alloc: function(sizes, index, transform) {
        sizes['result'] = 1;
    },
    evaluate: function(result, index, transform) {
        var i = 16 * index[0];
        if (i < transform.length && i+15 < transform.length) {
            result[0] = transform[i+0];
            result[1] = transform[i+1];
            result[2] = transform[i+2];
            result[3] = transform[i+3];
            result[4] = transform[i+4];
            result[5] = transform[i+5];
            result[6] = transform[i+6];
            result[7] = transform[i+7];
            result[8] = transform[i+8];
            result[9] = transform[i+9];
            result[10] = transform[i+10];
            result[11] = transform[i+11];
            result[12] = transform[i+12];
            result[13] = transform[i+13];
            result[14] = transform[i+14];
            result[15] = transform[i+15];
        } else {
            result[0] = 1;
            result[1] = 0;
            result[2] = 0;
            result[3] = 0;
            result[4] = 0;
            result[5] = 1;
            result[6] = 0;
            result[7] = 0;
            result[8] = 0;
            result[9] = 0;
            result[10] = 1;
            result[11] = 0;
            result[12] = 0;
            result[13] = 0;
            result[14] = 0;
            result[15] = 1;
        }
    }
});
Xflow.registerOperator("xflow.selectBool", {
    outputs: [ {type: 'bool', name : 'result', customAlloc: true} ],
    params:  [ {type: 'int', source : 'index'},
               {type: 'bool', source: 'value'} ],
    alloc: function(sizes, index, value) {
        sizes['result'] = 1;
    },
    evaluate: function(result, index, value) {
        var i = index[0];
        if (i < value.length) {
            result[0] = value[i];
        } else {
            result[0] = false;
        }
    }
});
(function(){

var c_CubePositions =  [
    [-1,-1,-1], [1,-1,-1], [-1,1,-1], [1,1,-1], // front
    [-1,-1,-1], [-1,-1,1], [-1,1,-1], [-1,1,1], // left
    [-1,-1,-1], [1,-1,-1], [-1,-1,1], [1,-1,1], // top
    [1,-1,-1], [1,1,-1], [1,-1,1], [1,1,1],     // right
    [-1,1,-1], [1,1,-1], [-1,1,1], [1,1,1],     // bottom
    [-1,-1,1], [1,-1,1], [-1,1,1], [1,1,1]      // back
];
var c_CubeNormals =  [
    [0,0,-1], [0,0,-1], [0,0,-1], [0,0,-1], // front
    [-1,0,0], [-1,0,0], [-1,0,0], [-1,0,0], // left
    [0,-1,0], [0,-1,0], [0,-1,0], [0,-1,0], // top
    [1,0,0], [1,0,0], [1,0,0], [1,0,0],     // right
    [0,1,0], [0,1,0], [0,1,0], [0,1,0],     // bottom
    [0,0,1], [0,0,1], [0,0,1], [0,0,1]      // back
];
var c_CubeIndex = [
    [0,1,2,1,2,3],
    [4,5,6,5,6,7],
    [8,9,10,9,10,11],
    [12,13,14,13,14,15],
    [16,17,18,17,18,19],
    [20,21,22,21,22,23]
]

/**
 * Grid Generation
 */
Xflow.registerOperator("xflow.debug.createSkinCubes", {
    outputs: [	{type: 'int', name: 'index', customAlloc: true},
                {type: 'float3', name: 'position', customAlloc: true},
				{type: 'float3', name: 'normal', customAlloc: true},
				{type: 'int4', name: 'boneIndices', customAlloc: true},
				{type: 'float4', name: 'boneWeights', customAlloc: true}],
    params:  [{type: 'float4x4', source: 'bindTransforms', array: true},
              {type: 'float', source: 'size', array: true, optional: true}],
    alloc: function(sizes, bindTransforms)
    {
        var s = bindTransforms.length / 16;
        sizes['position'] = s * 4 * 6;
        sizes['normal'] = s * 4 * 6;
        sizes['boneIndices'] = s * 4 * 6;
        sizes['boneWeights'] = s * 4 * 6;
        sizes['index'] = s * 6 * 6;
    },
    evaluate: function(index, position, normal, boneIdx, boneWeight, bindTransforms, size) {
		var cubeCount = bindTransforms.length / 16;
		var size = (size && size[0] || 1) / 2;

        var tmpPosition = XML3D.math.vec3.create(),
            tmpNormal = XML3D.math.vec3.create();

		for(var i = 0; i < cubeCount; ++i){
            for(var j = 0; j < 6; ++j){
                for(var k = 0; k < 4; k++){
                    var localIdx = j*4+ k, globalIdx = i*6*4 + localIdx;

                    XML3D.math.vec3.copy(tmpPosition, c_CubePositions[localIdx]);
                    XML3D.math.vec3.scale(tmpPosition, tmpPosition, size);
                    XML3D.math.mat4.multiplyOffsetVec3(bindTransforms, i*16, tmpPosition, 0);
                    XML3D.math.vec3.copy(tmpNormal, c_CubeNormals[localIdx]);
                    XML3D.math.mat4.multiplyOffsetDirection(bindTransforms, i*16, tmpNormal, 0);

                    position[globalIdx*3+0] = tmpPosition[0];
                    position[globalIdx*3+1] = tmpPosition[1];
                    position[globalIdx*3+2] = tmpPosition[2];
                    normal[globalIdx*3+0] = tmpNormal[0];
                    normal[globalIdx*3+1] = tmpNormal[1];
                    normal[globalIdx*3+2] = tmpNormal[2];
                    boneIdx[globalIdx*4+0] = i;
                    boneIdx[globalIdx*4+1] = boneIdx[globalIdx*4+2] = boneIdx[globalIdx*4+3]= 0;
                    boneWeight[globalIdx*4+0] = 1;
                    boneWeight[globalIdx*4+1] = boneWeight[globalIdx*4+2] = boneWeight[globalIdx*4+3]= 0;
                }
                var globalIndexIdx = i*6*6 + j*6;
                for(var k = 0; k < 6; ++k){
                    index[globalIndexIdx+k] = i*6*4 + c_CubeIndex[j][k];
                }
            }
		}
		// We are done!
		position = position;
	}
});

}());Xflow.registerOperator("xflow.rgbePNGtoFloat", {
    outputs: [ {type: 'texture', name : 'result', customAlloc: true } ],
    params:  [
        {type: 'texture', source : 'image'}
    ],
    alloc: function (sizes, image) {
        var samplerConfig = new Xflow.SamplerConfig;
        samplerConfig.setDefaults();
        samplerConfig.minFilter = Xflow.TEX_FILTER_TYPE.NEAREST;
        samplerConfig.magFilter = Xflow.TEX_FILTER_TYPE.NEAREST;
        sizes["result"] = {
            imageFormat : {
                width: image.width,
                height: image.height,
                texelType: Xflow.TEXTURE_TYPE.FLOAT,
                texelFormat: Xflow.TEXTURE_FORMAT.RGB
            },
            samplerConfig: samplerConfig
        }
    },

    evaluate: function(result, image) {
        for (var idx = 0; idx < image.data.length; idx += 4) {
            var rgbe = image.data.subarray(idx, idx + 4);
            var f = 0.0;
            var e = rgbe[3];

            if (e > 0.0)
                f = Math.pow(2.0, e - (128.0 + 8.0));

            var rgb = new Float32Array(3);
            rgb[0] = rgbe[0] * f;
            rgb[1] = rgbe[1] * f;
            rgb[2] = rgbe[2] * f;
            result.data.set(rgb, idx / 4 * 3);
        }
        return true;
    }
});

var c_nodes = [];
var c_sinknodes = [];
var c_domid_nodes = {};
var c_graph = new Xflow.Graph();
var c_unresolved = [];
var c_videoModification = false;

function error(msg){
    throw new Error(msg);
}
function log(msg){
    self.postMessage({type: "log", msg: msg});
}


self.onmessage = function(event) {
    var data = event.data;
    var type = data['type'];
    //log("MESSAGE RECEIVED: " + type);
    switch(type){
        case "initialize":
            initialize(data['root'], data['addons'])
            break;
        case "createNode":
            createNode(data.nodeData);
            break
        case "connectNodes":
            connectNodes(data.parent, data.child);
            break;
        case "imageLoaded":
            imageLoaded(data.id, data.imageData);
            break;
        case "videoUpdate":
            videoUpdate(data.id, data.imageData);
            break;
        case "updateValue":
            updateValue(data.id, data.value);
            break;
        case "updateAttribute":
            updateAttribute(data.id, data.attrName, data.attrValue);
    }
    //log("MESSAGE DONE: " + type);
}

window.setInterval(function(){
    for(var i = 0; i < c_sinknodes.length; ++i){
        var sinknode = c_sinknodes[i];
        if(sinknode.invalid){
            var result = sinknode.getResult();
            self.postMessage({ type: "updateSinkImage",
                id: sinknode.id,
                imageData: result && result.getValue()})
        }
    }
}, 10);



var c_data_attr = {
    'src' : { dest: 'sourceNode', type: "uri" },
    'proto' : { dest: 'protoNode', type: "uri" },
    'filter' : { dest: 'setFilter', type: "function" },
    'compute' : { dest: 'setCompute', type: "function" }
};
var c_input_attr = {
    'name' : {dest: 'name', type: "string" },
    'key' : {dest: 'key' , type: "float"},
    'param' : {dest: 'param' , type: "boolean"}
};

var c_parseConfig = {
    'xflowip' : { attr: c_data_attr, type : 'DataNode' },
    'xflowimg' : { attr: c_data_attr, type : 'SinkNode' },
    'data' : { attr: c_data_attr, type : 'DataNode' },
    'proto' : { attr: c_data_attr, type : 'ProtoNode' },
    'float' : { attr: c_input_attr, type: "InputNode", value: 'float' },
    'float2' : { attr: c_input_attr, type: "InputNode", value: 'float2' },
    'float3' : { attr: c_input_attr, type: "InputNode", value: 'float3' },
    'float4' : { attr: c_input_attr, type: "InputNode", value: 'float4' },
    'float4x4' : { attr: c_input_attr, type: "InputNode", value: 'float4' },
    'int' : { attr: c_input_attr, type: "InputNode", value: 'int' },
    'int4' : { attr: c_input_attr, type: "InputNode", value: 'int4' },
    'bool' : { attr: c_input_attr, type: "InputNode", value: 'bool'},
    'texture' : { attr: c_input_attr, type: "InputNode", value: 'texture'},
    'img' : { type: "Image"},
    'video' : { type: "Video"}
}

function initialize(root, addons){
    var relativeAddons = [];
    root = root.replace(/[^/]*$/,"");
    for(var i =0; i < addons.length; ++i){
        var url = addons[i];
        if(url.indexOf("http://") == -1){
            if(url.charAt[0] == "/"){
                url = root.replace(/\/.*$/, "") + url;
            }
            else{
                url = root + url;
            }
        }
        relativeAddons[i] = url;
    }
    importScripts.apply(null, relativeAddons);
    self.postMessage({"type": "initialized"});
}

function createNode(data){
    var id = data.id;
    var entry = c_parseConfig[data.tagName];
    if(!entry){
        error("Unsupported tagName '" + data.tagName + "'");
        return;
    }

    var node;

    var type = entry.type;
    switch(type){
        case "DataNode":
        case "ProtoNode": node = initDataNode(id, entry, data); break;
        case "SinkNode":  node = initSinkNode(id, entry, data); break;
        case "InputNode": node = initInputNode(id, entry, data); break;
        case "Image":     node = initImageNode(id, entry, data); break;
        case "Video":     node = initVideoNode(id, entry, data); break;
        default: error("Unknown Node Type: " + type);
    }

    c_nodes[id] = node;

    if(data.attribs['id']){
        c_domid_nodes[data.attribs['id']] = node;
    }

    setNodeAttributes(node, entry, data);
}


function connectNodes(parentId, childId){
    var parent = c_nodes[parentId], child = c_nodes[childId];
    if(!parent) return error("addChild: Parent not found");
    if(!child) return error("addChild: Child not found");

    if(parent.xflow instanceof Xflow.DataNode && child.xflow instanceof Xflow.GraphNode){
        parent.xflow.appendChild(child.xflow);
    }
    else if(parent instanceof InputNode && ( child instanceof ImageNode || child instanceof VideoNode)){
        child.parent = parent.xflow;
        if(child.imageData)
            parent.xflow.data.setImageData(child.imageData);
    }
}

function updateValue(id, value){
    var node = c_nodes[id];
    if(!node) return;
    var entry = node.entry;
    if(entry.value){
        var dataEntry = createDataEntry(entry.value, value);
        node.xflow.data = dataEntry;
    }
}

function updateAttribute(id, attrName, attrValue){
    var node = c_nodes[id];
    if(!node) return;
    var entry = node.entry;
    if(entry.attr[attrName]){
        setNodeAttribute(node, entry, attrName, attrValue);
    }
}

function imageLoaded(nodeId, imageData){
    var node = c_nodes[nodeId];
    if(!node) return error("imageLoaded: Node not found");
    node.imageData = imageData;
    if(node.parent){
        node.parent.data.setImageData(imageData);
    }
}

function videoUpdate(nodeId, imageData){
    var node = c_nodes[nodeId];
    if(!node) return error("videoUpdate: Node not found");

    c_videoModification = true;
    node.imageData = imageData;
    if(node.parent){
        node.parent.data.setImageData(imageData);
    }
    c_videoModification = false;
}


function initDataNode(id, entry, data){
    var xflowNode = c_graph.createDataNode(entry.type == "ProtoNode");
    var node = new DataNode(id, entry, xflowNode);
    return node;
}

function initInputNode(id, entry, data){
    var xflowNode = c_graph.createInputNode();
    var dataEntry = createDataEntry(entry.value, data.value )
    xflowNode.data = dataEntry;

    var node = new InputNode(id, entry, xflowNode);
    return node;
}

function initSinkNode(id, entry, data){
    var xflowNode = c_graph.createDataNode(false);
    var sourceName = data.attribs["srcname"];
    if(!sourceName)
        error("No 'srcname' attribute provided for xflowimg node");

    var node = new SinkNode(id, entry, sourceName, xflowNode);
    return node;
}

function createDataEntry(type, data){
    var entry;
    if(type == "texture"){
        entry = new Xflow.ImageDataTextureEntry();
    }
    else{
        var buffer = createBuffer(type,data);
        entry = new Xflow.BufferEntry(Xflow.DATA_TYPE_MAP[type], buffer);
    }
    return entry;
}

function createBuffer(type, data){
    switch(type){
        case "float":
        case "float2":
        case "float3":
        case "float4":
        case "float4x4":
            var m = data.match(c_FloatParseReg);
            return m ? new Float32Array(m) : new Float32Array();
        case "int":
        case "int4":
            var m = data.match(c_IntParseReg);
            return m ? new Int32Array(m) : new Int32Array();
        case "bool":
            var m = data.match(c_BoolParseReg);
            return m ? new Uint8Array(Array.map(m, string2Bool)) : new Uint8Array();
        default: error("Unsupported BufferType: " + type);
            return null;
    }
}

var c_FloatParseReg =/([+\-0-9eE\.]+)/g;
var c_IntParseReg = /([+\-0-9]+)/g;
var c_BoolParseReg = /(true|false|0|1)/ig;
function string2Bool(string) {
    switch (string.toLowerCase()) {
        case "true":
        case "1":
            return true;
        case "false":
        case "0":
            return false;
        default:
            return Boolean(string);
    }
}


function initImageNode(id, entry, data){
    var node = new ImageNode(id, entry);
    var src = data.attribs["src"];
    self.postMessage({type: 'loadImage', url: src, id: node.id });
    return node;
}

function initVideoNode(id, entry, data){
    var node = new VideoNode(id, entry);
    var src = data.attribs["src"];
    self.postMessage({type: 'streamVideo', url: src, id: node.id });
    return node;
}


function setNodeAttributes(node, entry, data){
    if(entry.attr){
        for(var name in entry.attr){
            if(data.attribs[name] !== undefined){
                setNodeAttribute(node, entry, name, data.attribs[name]);
            }
        }
    }
}
function setNodeAttribute(node, entry, name, value){
    var attrInfo = entry.attr[name];
    switch(attrInfo.type){
        case "string":
            node.xflow[attrInfo.dest] = value; break;
        case "float":
            node.xflow[attrInfo.dest] = value*1; break;
        case "boolean":
            node.xflow[attrInfo.dest] = (value == "true"); break;
        case "function":
            node.xflow[attrInfo.dest](value); break;
        case "uri":
            var uri = value;
            if(!resolveURI(node, attrInfo.dest, uri))
                c_unresolved.push({node: node, dest: attrInfo.dest, uri: uri })
            break;
    }
}

function resolveURI(node, dest, uri){
    if(uri.charAt(0) != "#"){
        node.xflow[dest] = null;
        error("Currently only local references are supported. URI '" + uri + "' can't be resolved");
        return true;
    }

    var id = uri.substr(1);
    if(c_domid_nodes[id] && c_domid_nodes[id].xflow instanceof Xflow.DataNode){
        node.xflow[dest] = c_domid_nodes[id].xflow;
        return true;
    }
    return false;
}

function InputNode(id, entry, xflowInputNode){
    this.id = id;
    this.entry = entry;
    this.xflow = xflowInputNode;
};

function DataNode(id, entry, xflowDataNode){
    this.id = id;
    this.entry = entry;
    this.xflow = xflowDataNode;
};

function SinkNode(id, entry, source, xflowDataNode){
    this.id = id;
    this.entry = entry;
    this.xflow = xflowDataNode;
    this.source = source;
    this.invalid = true;
    this.request = new Xflow.ComputeRequest(this.xflow, [source], this.invalidate.bind(this));

    c_sinknodes.push(this);
};

SinkNode.prototype.invalidate = function(){
    if(!c_videoModification)
        self.postMessage({type: "modified", id: this.id});
    this.invalid = true;
}

SinkNode.prototype.getResult = function(){
    this.invalid = false;
    var result = this.request.getResult();
    return result.getOutputData(this.source);
}

function ImageNode(id, entry){
    this.id = id;
    this.entry = entry;
};

function VideoNode(id, entry){
    this.id = id;
    this.entry = entry;
};

