# node-json-response-checker
Check the JSON response of a URL once or continuously with a timeout (e.g. to verify a deployment)

See test.js and index.js for more information

## Gulp Example

```js
var gulp = require('gulp');
var JSONResponseChecker = require('json-response-checker');

gulp.task('verify:version', function(done) {
  var maxTimeout = 60 * 1000;
  var url = process.env.VERSION_URL
  var expected = process.env.COMMIT_HASH
  function getActual(obj) { return obj.commit.hash }
  var checker = new JSONResponseChecker(url, expected, getActual)
  checker.checkContinuously(maxTimeout, done);
})
```

You can run use this to verify deployment by having your CI server run a command like this:

`COMMIT_HASH=407b2ca49870a35e1aa487821735906935de7a9c VERSION_URL="https://example.com/version" gulp verify:version`
