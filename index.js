var needle = require('needle');

module.exports = Checker;

function Checker(url, expectedValue, getActual) {
  this.url = url
  this.expectedValue = expectedValue
  this.getActual = getActual
}

Checker.prototype.check = function(done) {
  var options = { open_timeout: 5000 }
  var getActual = this.getActual
  var expected = this.expectedValue
  needle.get(this.url, options, function(err, resp) {
    if (err) return done(err);
    var match = null;
    var actual = getActual(resp.body);
    try {
      match = actual === expected;
    } catch (e) {
      return done(new Error('Did not get JSON from '+url));
    }
    if (match) return done(null);
    return done(new Error('Version mismatch, expected '+expected+', got '+actual));
  })
}

Checker.prototype.checkContinuously = function(maxTimeout, done) {
  var self = this;

  var timeout = setTimeout(function() {
    clearInterval(interval);
    done(new Error('Timeout occurred prior to a match!'))
  }, maxTimeout);

  var interval = setInterval(check, 5000);
  check();
  function check() {
    self.check(function(err) {
      if (err) console.log(err.message);
      else {
        clearTimeout(timeout)
        clearInterval(interval);
        done(null);
      }
    });
  }
}
