var csv = require('csv'),
    fs = require('fs'),
    uap = require('../js/index'),
    toYaml = require('./to-yaml'),
    PROPERTIES = require('./const').PROPERTIES;

var results = [];
var parts = PROPERTIES.slice(1);

var c = csv();
c.from.options({delimiter: ";"});
c.from.path(__dirname + '/../test_resources/uas_useragent.csv')
.transform(function(data) {
  var obj = {};
  obj.user_agent_string = data[3];
  obj.family = data[0];
  data[1].split('.').forEach(function(part, i) {
    if (i >= parts.length - 1) {
      obj.patch_minor += part;
    } else {
      obj[parts[i]] = part;
    }
  });
  if (!isCorrectlyParsed(obj)) return toYaml(obj);
})
.to.path(__dirname + '/../test_resources/uas_useragent.yaml')
.on('error', function(error){
    console.log(error);
  })
.on('record', function(data){
  results.push(data);
})
.on('end', function(count){
  results.sort(require('./sorter'));
  console.log(results)
});


function isCorrectlyParsed(data) {
  var r = uap.parseUA(data.user_agent_string);
  var k, rK;
  for (var i = 0; i < PROPERTIES.length; i++) {
    k = PROPERTIES[i];
    rK = k == 'patch_minor' ? 'patchMinor' : k;
    if (k in data) {
      if (r[rK] !== data[k]) return false;
    }
  }
  return true;
}