var JSONResponseChecker = require('./index');

function test(done) {
  var maxTimeout = 10 * 1000;
  var url = "http://localhost:3000/version"
  var expected = "sesame!"
  function getActual(obj) { return obj.secretWord }
  var checker = new JSONResponseChecker(url, expected, getActual)

  checker.checkContinuously(maxTimeout, done);
}

test(function(err) {
  if (err) throw new Error(err);
  console.log('done!');
});
