var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs');


fs.readFile('my.peg', 'utf-8', function(err, data) {
  var parse = PEG.buildParser(data).parse;

  var ensure = function(expr, data) {
    // console.log(expr);
    return assert.deepEqual(parse(expr), data);
  };

  ensure("atom", "atom");
  ensure("+", "+");
  ensure("(+ 2 1)", ["+", 2, 1]);
  ensure("( +     2  1)", ["+", 2, 1]);
  ensure("(+ 2 (- 5 2))", ["+", 2, ["-", 5, 2]]);
  ensure("(+ 2 5 4 (+ 1 2 (+ 3 4 5 6 (+ 9 8))))", [
    "+", 2, 5, 4, [
      "+", 1, 2, [
        "+", 3, 4, 5, 6, [
          "+", 9, 8
        ]
      ]
    ]
  ]);

  ensure("(+ 2\n (+ 1 2)\n)", ["+", 2, ["+", 1, 2]]);
  ensure("(    + 2\n ( +       1 2)\n)", ["+", 2, ["+", 1, 2]]);
  ensure("(+ 2\n\n\n (+ 1 2)\n)", ["+", 2, ["+", 1, 2]]);
  ensure("(+ 2\t (+ 1 2)\n)", ["+", 2, ["+", 1, 2]]);

  ensure(";;", "");
  ensure(";;a", "");

  ensure(";; hello", "");
  ensure(";; hello\n", "");
  ensure(";; hello there\n(+ 1 1)", ["+", 1, 1]);
});
