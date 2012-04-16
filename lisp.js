// A simple Lisp-like interpreter
// ------------------------------
// It can do +, -, *
//
// E.g. (+ 2 (* 4 5))
// => 22
//
// See bottom of the file for usage and examples
// This isn't necessarily part of the curriculum but just a fan thing to do for
// practice.

var compile = (function(expr) {

  var list = /\([0-9\s\+\-\*]+\)/g;
  var opr = /([\+\-\*])/;
  var num = /([0-9]+)/g;

  function map(array, fn) {
    var total = 0;
    var x;
    for (var i=0; i < array.length; i++) {
      x = parseInt(array[i], 10);
      total = fn(x, total);
    }
    return total;
  }

  function eval(expr) {
    var o = expr.match(opr)[0];
    var values = expr.match(num);
    if (o === '+') {
      return map(values, function(item, total) {
        return total + item;
      });
    }

    if (o === '-') {
      return map(values, function(item, total) {
        return Math.abs(total - item);
      });
    }

    if (o === '*') {
      return map(values, function(item, total) {
        if (total === 0) {
          total = 1;
        }
        return total * item;
      });
    }
  }

  function compile(text) {
    var expressions = text.match(list);

    if (!expressions) {
      return text;
    }

    for (var i=0; i < expressions.length; i++) {
      text = text.replace(expressions[i], eval(expressions[i]));
    }

    return compile(text);
  }

  return compile;

})();

function assert(expr) {
  if (expr === false) {
    return 'failed';
  } else {
    return '.';
  }
}

var data, js;

// Tests

data = "(+ (+ 2 5 1) (- (* 2 3) 1))";
js = compile(data);
console.log(assert(js === '13'));

data = "(+ 1 2 3 4 5)";
js = compile(data);
console.log(assert(js === '15'));

data = "(+ (+ (+ (+ (+ (+ 1 1) 1 ) 1) 1) 1) 1)";
js = compile(data);
console.log(assert(js === '7'));

data = "(* 5 4 3 2 1)";
js = compile(data);
console.log(assert(js === '120'));
