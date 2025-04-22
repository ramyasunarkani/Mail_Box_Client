if (typeof setImmediate === 'undefined') {
  global.setImmediate = function(fn) {
    return setTimeout(fn, 0);
  };
}
