var compile = (function() {
  var time, compile;

  time = 0;
  compile = function(expr) {

    if (expr.tag === 'seq') {
      return [].concat(compile(expr.left), compile(expr.right));
    }

    if (expr.tag === 'note' || expr.tag === 'rest') {
      expr.start = time;
      time = time + expr.dur;
      return expr;
    }

  };

  return compile;

})();


var data = {
  tag: 'seq',
  left: {
    tag: 'seq',
    left: {
      tag: 'note',
      pitch: 'a4',
      dur: 250
    },
    right: {
      tag: 'note',
      pitch: 'b4',
      dur: 250 
    }
  },
  right: {
    tag: 'seq',
    left: { tag: 'note', pitch: 'c4', dur: 500 },
    right: { 
      tag: 'seq',
      left: {
        tag: 'rest', dur: 500
      },
      right: {
        tag: 'note', pitch: 'd4', dur: 500 }
    }
  }
};

console.log(compile(data));
