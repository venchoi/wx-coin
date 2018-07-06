// private property
const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {};
const TYPED_ARRAY = {
  '[object Int8Array]': 1,
  '[object Uint8Array]': 1,
  '[object Uint8ClampedArray]': 1,
  '[object Int16Array]': 1,
  '[object Uint16Array]': 1,
  '[object Int32Array]': 1,
  '[object Uint32Array]': 1,
  '[object Float32Array]': 1,
  '[object Float64Array]': 1,
};
const BUILTIN_OBJECT = {
  '[object Function]': 1,
  '[object RegExp]': 1,
  '[object Date]': 1,
  '[object Error]': 1,
  '[object Image]': 1,
};
const isBuildInObject = value => !!BUILTIN_OBJECT[objToString.call(value)];
// private method for UTF-8 encoding
Base64.utf8Encode = (inputStr) => {
  const string = String(inputStr).replace(/\r\n/g, '\n');
  let utftext = '';
  for (let n = 0; n < string.length; n += 1) {
    const c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }
  return utftext;
};

// private method for UTF-8 decoding
Base64.utf8Decode = (utftext) => {
  let string = '';
  let i = 0;
  let c;
  let c2;
  let c3;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i += 1;
    } else if ((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return string;
};
// public method for encoding
Base64.encode = (inputStr) => {
  let output = '';
  let chr1;
  let chr2;
  let chr3;
  let enc1;
  let enc2;
  let enc3;
  let enc4;
  let i = 0;
  const input = Base64.utf8Encode(inputStr);
  while (i < input.length) {
    chr1 = input.charCodeAt(i);
    i += 1;
    chr2 = input.charCodeAt(i);
    i += 1;
    chr3 = input.charCodeAt(i);
    i += 1;
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = 64;
      enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output +
      keyStr.charAt(enc1) + keyStr.charAt(enc2) +
      keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return output;
};

// public method for decoding
Base64.decode = (inputStr) => {
  let output = '';
  let chr1;
  let chr2;
  let chr3;
  let enc1;
  let enc2;
  let enc3;
  let enc4;
  let i = 0;
  const input = inputStr.replace(/[^A-Za-z0-9+/=]/g, '');
  while (i < input.length) {
    enc1 = keyStr.indexOf(input.charAt(i));
    i += 1;
    enc2 = keyStr.indexOf(input.charAt(i));
    i += 1;
    enc3 = keyStr.indexOf(input.charAt(i));
    i += 1;
    enc4 = keyStr.indexOf(input.charAt(i));
    i += 1;
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output += String.fromCharCode(chr1);
    if (enc3 !== 64) {
      output += String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output += String.fromCharCode(chr3);
    }
  }
  output = Base64.utf8Decode(output);
  return output;
};

const each = (obj, cb) => {
  let keys;
  if (obj instanceof Array) {
    return obj.forEach(cb);
  } else if (typeof obj === 'object') {
    keys = Object.keys(obj);
    return keys.forEach((k) => {
      cb(obj[k], k);
    });
  }
  return null;
};
const formatTime = (timestamp, dateFormat) => {
  if (!(timestamp instanceof Date)) {
    return null;
  }
  const o = {
    'M+': timestamp.getMonth() + 1, // 月份
    'd+': timestamp.getDate(), // 日
    'h+': timestamp.getHours(), // 小时
    'm+': timestamp.getMinutes(), // 分
    's+': timestamp.getSeconds(), // 秒
    'q+': Math.floor((timestamp.getMonth() + 3) / 3), // 季度
    S: timestamp.getMilliseconds(), // 毫秒
  };
  let fmt = dateFormat;

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${timestamp.getFullYear()}`.substr(4 - RegExp.$1.length));
  each(o, (v, k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (RegExp.$1.length === 1) ? (o[k]) : ((`00${v}`).substr(v.toString().length)));
    }
  });
  return fmt;
};
const objToString = Object.prototype.toString;
const isObject = (value) => {
  const type = typeof value;
  return type === 'function' || (!!value && type === 'object');
};
const isArray = value => objToString.call(value) === '[object Array]';
/**
* 深度拷贝 创建副本
* @param {*} source - 原数据
*/
const copy = (source) => {
  if (source === null || typeof source !== 'object') {
    return source;
  }

  let result;
  const typeStr = objToString.call(source);
  if (typeStr === '[object Array]') {
    result = [];
  } else if (typeStr === '[object Object]') {
    result = {};
  } else {
    result = source;
  }
  each(source, (value, key) => {
    result[key] = copy(value);
  });

  return result;
};

/**
* 浅拷贝 存储空间引用原数据
* @param {*} source - 原数据
*/
const clone = (source) => {
  if (source === null || typeof source !== 'object') {
    return source;
  }

  let result = source;
  const typeStr = objToString.call(source);
  if (typeStr === '[object Array]') {
    result = [];
    for (let i = 0, len = source.length; i < len; i += 1) {
      result[i] = clone(source[i]);
    }
  } else if (TYPED_ARRAY[typeStr]) {
    result = source.constructor.from(source);
  }

  return result;
};
const merge = (target, source, overwrite) => {
  // We should escapse that source is string
  // and enter for ... in ...
  const $target = target;
  if (!isObject(source) || !isObject(target)) {
    return overwrite ? clone(source) : target;
  }

  each(source, (value, key) => {
    if (Object.hasOwnProperty.call(source, key)) {
      const targetProp = target[key];
      const sourceProp = source[key];

      if (isObject(sourceProp)
        && isObject(targetProp)
        && !isArray(sourceProp)
        && !isArray(targetProp)
        && !isDom(sourceProp)
        && !isDom(targetProp)
        && !isBuildInObject(sourceProp)
        && !isBuildInObject(targetProp)
      ) {
        // 如果需要递归覆盖，就递归调用merge
        merge(targetProp, sourceProp, overwrite);
      } else if (overwrite || !(key in target)) {
        // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
        // NOTE，在 target[key] 不存在的时候也是直接覆盖
        $target[key] = clone(source[key], true);
      }
    }
  });
  return target;
};

module.exports = {
  each: each,
  formatTime: formatTime,
  merge: merge,
  isObject: isObject,
  isArray: isArray,
  clone: clone,
  copy: copy,
  Base64: Base64,
}
