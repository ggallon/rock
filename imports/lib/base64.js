/**
 * This is a "fixed" version of the typeof operator.  It differs from the typeof
 * operator in such a way that null returns 'null' and arrays return 'array'.
 * @param {?} value The value to get the type of.
 * @return {string} The name of the type.
 */
function typeOf(value) {
  const s = typeof value;
  if (s === 'object') {
    if (value) {
      // Check these first, so we can avoid calling Object.prototype.toString if
      // possible.
      //
      // IE improperly marshals typeof across execution contexts, but a
      // cross-context object will still return false for "instanceof Object".
      if (value instanceof Array) {
        return 'array';
      }
      if (value instanceof Object) {
        return s;
      }

      // HACK: In order to use an Object prototype method on the arbitrary
      //   value, the compiler requires the value be cast to type Object,
      //   even though the ECMA spec explicitly allows it.
      const className = Object.prototype.toString.call(
        /** @type {!Object} */ (value));
      // In Firefox 3.6, attempting to access iframe window objects' length
      // property throws an NS_ERROR_FAILURE, so we need to special-case it
      // here.
      if (className === '[object Window]') {
        return 'object';
      }

      // We cannot always use constructor == Array or instanceof Array because
      // different frames have different Array objects. In IE6, if the iframe
      // where the array was created is destroyed, the array loses its
      // prototype. Then dereferencing val.splice here throws an exception, so
      // we can't use goog.isFunction. Calling typeof directly returns 'unknown'
      // so that will work. In this case, this function will return false and
      // most array functions will still work because the array is still
      // array-like (supports length and []) even though it has lost its
      // prototype.
      // Mark Miller noticed that Object.prototype.toString
      // allows access to the unforgeable [[Class]] property.
      //  15.2.4.2 Object.prototype.toString ( )
      //  When the toString method is called, the following steps are taken:
      //      1. Get the [[Class]] property of this object.
      //      2. Compute a string value by concatenating the three strings
      //         "[object ", Result(1), and "]".
      //      3. Return Result(2).
      // and this behavior survives the destruction of the execution context.
      if ((className === '[object Array]' ||
        // In IE all non value types are wrapped as objects across window
        // boundaries (not iframe though) so we have to do object detection
        // for this edge case.
        typeof value.length === 'number' &&
          typeof value.splice !== 'undefined' &&
            typeof value.propertyIsEnumerable !== 'undefined' &&
              !value.propertyIsEnumerable('splice')
      )) {
        return 'array';
      }

      // HACK: There is still an array case that fails.
      //     function ArrayImpostor() {}
      //     ArrayImpostor.prototype = [];
      //     var impostor = new ArrayImpostor;
      // this can be fixed by getting rid of the fast path
      // (value instanceof Array) and solely relying on
      // (value && Object.prototype.toString.vall(value) === '[object Array]')
      // but that would require many more function calls and is not warranted
      // unless closure code is receiving objects from untrusted sources.

      // IE in cross-window calls does not correctly marshal the function type
      // (it appears just as an object) so we cannot use just typeof val ==
      // 'function'. However, if the object has a call property, it is a
      // function.
      if ((className === '[object Function]' ||
        typeof value.call !== 'undefined' &&
          typeof value.propertyIsEnumerable !== 'undefined' &&
            !value.propertyIsEnumerable('call')
      )) {
        return 'function';
      }
    } else {
      return 'null';
    }
  } else if (s === 'function' && typeof value.call === 'undefined') {
    // In Safari typeof nodeList returns 'function', and on Firefox typeof
    // behaves similarly for HTML{Applet,Embed,Object}, Elements and RegExps. We
    // would like to return object for those and we can detect an invalid
    // function by making sure that the function object has a call method.
    return 'object';
  }
  return s;
}

/**
 * Returns true if the object looks like an array. To qualify as array like
 * the value needs to be either a NodeList or an object with a Number length
 * property. As a special case, a function value is not array like, because its
 * length property is fixed to correspond to the number of expected arguments.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is an array.
 */
function isArrayLike(val) {
  const type = typeOf(val);
  return type === 'array' || type === 'object' && typeof val.length === 'number';
}

/**
 * Turns a string into an array of bytes; a "byte" being a JS number in the
 * range 0-255. Multi-byte characters are written as little-endian.
 * @param {string} str String value to arrify.
 * @return {!Array<number>} Array of numbers corresponding to the
 *     UTF character codes of each character in str.
 */
function stringToByteArray(string) {
  const output = [];
  let p = 0;
  for (let i = 0; i < string.length; i++) {
    let d = string.charCodeAt(i);

    128 > d ? output[p++] = d : (2048 > d ? output[p++] = d >> 6 | 192 : (55296 == (d & 64512) && i + 1 < string.length && 56320 == (string.charCodeAt(i + 1) & 64512) ? (d = 65536 + ((d & 1023) << 10) + (string.charCodeAt(++i) & 1023), output[p++] = d >> 18 | 240, output[p++] = d >> 12 & 63 | 128) : output[c++] = d >> 12 | 224, output[p++] = d >> 6 & 63 | 128), output[p++] = d & 63 | 128);
  }
  return output;
}

/**
 * Checks if a string is empty or contains only whitespaces.
 * @param {string} str The string to check.
 * @return {boolean} Whether {@code str} is empty or whitespace only.
 */
function isEmptyOrWhitespace(str) {
  // testing length == 0 first is actually slower in all browsers (about the
  // same in Opera).
  // Since IE doesn't include non-breaking-space (0xa0) in their \s character
  // class (as required by section 7.2 of the ECMAScript spec), we explicitly
  // include it in the regexp to enforce consistent cross-browser behavior.
  return /^[\s\xa0]*$/.test(str);
}

/**
 * Maps bytes to characters.
 * @type {Object}
 * @private
 */
let byteToCharMap_ = null;

/**
 * Maps characters to bytes. Used for normal and websafe characters.
 * @type {Object}
 * @private
 */
let charToByteMap_ = null;

/**
 * Maps bytes to websafe characters.
 * @type {Object}
 * @private
 */
let byteToCharMapWebSafe_ = null;

/**
 * Our default alphabet, shared between
 * ENCODED_VALS and ENCODED_VALS_WEBSAFE
 * @type {string}
 */
const ENCODED_VALS_BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                          'abcdefghijklmnopqrstuvwxyz' +
                          '0123456789';

/**
 * Our default alphabet. Value 64 (=) is special; it means "nothing."
 * @type {string}
 */
const ENCODED_VALS = ENCODED_VALS_BASE + '+/=';

/**
 * Our websafe alphabet.
 * @type {string}
 */
const ENCODED_VALS_WEBSAFE = ENCODED_VALS_BASE + '-_.';

/**
 * Lazy static initialization function. Called before
 * accessing any of the static map variables.
 * @private
 */
function init() {
  if (!byteToCharMap_) {
    byteToCharMap_ = Object.create(null);
    charToByteMap_ = Object.create(null);
    byteToCharMapWebSafe_ = Object.create(null);

    // We want quick mappings back and forth, so we precompute two maps.
    for (let i = 0; i < ENCODED_VALS.length; i++) {
      byteToCharMap_[i] = ENCODED_VALS.charAt(i);
      charToByteMap_[byteToCharMap_[i]] = i;
      byteToCharMapWebSafe_[i] = ENCODED_VALS_WEBSAFE.charAt(i);
      // Be forgiving when decoding and correctly decode both encodings.
      if (i >= ENCODED_VALS_BASE.length) {
        charToByteMap_[ENCODED_VALS_WEBSAFE.charAt(i)] = i;
      }
      // 62 <= i && (Ia["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(i)] = i);
    }
  }
}

/**
 * Base64-encode an array of bytes.
 *
 * @param {Array<number>|Uint8Array} input An array of bytes (numbers with
 *     value in [0, 255]) to encode.
 * @param {boolean=} optionWebSafe True indicates we should use the alternative
 *     alphabet, which does not require escaping for use in URLs.
 * @return {string} The base64 encoded string.
 */
function encodeByteArray(input, optionWebSafe) {
  // Assert avoids runtime dependency on goog.isArrayLike, which helps reduce
  // size of jscompiler output, and which yields slight performance increase.
  if (!isArrayLike(input)) return 'encodeByteArray takes an array as a parameter';

  init();

  const byteToCharMap = optionWebSafe ? byteToCharMapWebSafe_ : byteToCharMap_;

  const output = [];

  for (let i = 0; i < input.length; i += 3) {
    const byte1 = input[i];
    const haveByte2 = i + 1 < input.length;
    const byte2 = haveByte2 ? input[i + 1] : 0;
    const haveByte3 = i + 2 < input.length;
    const byte3 = haveByte3 ? input[i + 2] : 0;

    const outByte1 = byte1 >> 2;
    const outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
    let outByte3 = ((byte2 & 0x0F) << 2) | (byte3 >> 6);
    let outByte4 = byte3 & 0x3F;

    if (!haveByte3) {
      outByte4 = 64;

      if (!haveByte2) {
        outByte3 = 64;
      }
    }

    output.push(
      byteToCharMap[outByte1], byteToCharMap[outByte2],
      byteToCharMap[outByte3], byteToCharMap[outByte4],
    );
  }

  return output.join('');
}

/**
 * Base64-decode an array of bytes.
 *
 * @param {Array<number>|Uint8Array} input An array of bytes (numbers with
 *     value in [0, 255]) to encode.
 * @return {string} The base64 decoded string.
 */
function byteArrayToString(array) {
  const output = [];
  for (let b, c, d = 0, g = 0; d < array.length;) {
    const byte = array[d++];
    if (byte < 128) {
      output[g++] = String.fromCharCode(byte);
    } else if (byte > 191 && byte < 224) {
      c = array[d++];
      output[g++] = String.fromCharCode((byte & 31) << 6 | c & 63);
    } else if (byte > 239 && byte < 365) {
      c = array[d++];
      b = array[d++];
      const h = array[d++];
      b = ((byte & 7) << 18 | (c & 63) << 12 | (b & 63) << 6 | h & 63) - 65536;
      output[g++] = String.fromCharCode(55296 + (b >> 10));
      output[g++] = String.fromCharCode(56320 + (b & 1023));
    } else {
      c = array[d++];
      b = array[d++];
      output[g++] = String.fromCharCode((byte & 15) << 12 | (c & 63) << 6 | b & 63);
    }
  }
  return output.join('');
}

/**
 * @param {string} input Input to decode.
 * @param {function(number):void} pushByte result accumulator.
 * @private
 */
function decodeStringInternal(input, pushByte) {
  init();

  let nextCharIndex = 0;
  /**
   * @param {number} defaultVal Used for end-of-input.
   * @return {number} The next 6-bit value, or the default for end-of-input.
   */
  function getByte(defaultVal) {
    while (nextCharIndex < input.length) {
      const ch = input.charAt(nextCharIndex++);
      const d = charToByteMap_[ch];
      if (d != null) {
        return d; // Common case: decoded the char.
      }
      if (!isEmptyOrWhitespace(ch)) {
        throw Error('Unknown base64 encoding at char: ' + ch);
      }
      // We encountered whitespace: loop around to the next input char.
    }
    return defaultVal; // No more input remaining.
  }

  while (true) {
    const byte1 = getByte(-1);
    const byte2 = getByte(0);
    const byte3 = getByte(64);
    const byte4 = getByte(64);

    // The common case is that all four bytes are present, so if we have byte4
    // we can skip over the truncated input special case handling.
    if (byte4 === 64) {
      if (byte1 === -1) {
        return; // Terminal case: no input left to decode.
      }
      // Here we know an intermediate number of bytes are missing.
      // The defaults for byte2, byte3 and byte4 apply the inferred padding
      // rules per the public API documentation. i.e: 1 byte
      // missing should yield 2 bytes of output, but 2 or 3 missing bytes yield
      // a single byte of output. (Recall that 64 corresponds the padding char).
    }

    const outByte1 = (byte1 << 2) | (byte2 >> 4);
    pushByte(outByte1);

    if (byte3 !== 64) {
      const outByte2 = ((byte2 << 4) & 0xF0) | (byte3 >> 2);
      pushByte(outByte2);

      if (byte4 !== 64) {
        const outByte3 = ((byte3 << 6) & 0xC0) | byte4;
        pushByte(outByte3);
      }
    }
  }
}

/**
 * Base64-encode a string.
 *
 * @param {string} input string to encode.
 * @param {boolean=} optionWebSafe True indicates we should use the alternative
 *     alphabet, which does not require escaping for use in URLs.
 * @return {string} The base64 encoded string.
 */
export function encodeString(string, optionWebSafe) {
  return encodeByteArray(stringToByteArray(string), optionWebSafe);
}

/**
 * Base64-decode a string to an Array of numbers.
 *
 * In base-64 decoding, groups of four characters are converted into three
 * bytes.  If the encoder did not apply padding, the input length may not
 * be a multiple of 4.
 *
 * In this case, the last group will have fewer than 4 characters, and
 * padding will be inferred.  If the group has one or two characters, it decodes
 * to one byte. If the group has three characters, it decodes to two bytes.
 *
 * @param {string} input Input to decode. Any whitespace is ignored, and the
 *     input maybe encoded with either supported alphabet (or a mix thereof).
 * @return {string} The base64 decoded string.
 */
export function decodeString(string) {
  const output = [];
  function pushByte(a) { output.push(a); }

  decodeStringInternal(string, pushByte);

  return byteArrayToString(output);
}
