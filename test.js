var JSONResponseChecker = require('./index');

function test(done) {
  var maxTimeout = 10 * 1000;

  var url = "https://crumpleup-production.herokuapp.com/version"
  var expected = " 407b2ce49870a35e1aa487821735906935de7a9c"
  function getActual(obj) { return obj.commit.hash }
  var checker = new JSONResponseChecker(url, expected, getActual)

  checker.checkContinuously(maxTimeout, done);
}

test(function(err) {
  if (err) throw new Error(err);
  console.log('done!');
});
