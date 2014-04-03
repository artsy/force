var PROPERTIES = require('./const').PROPERTIES;

module.exports = function(a, b) { 
  var aV, bV, k;
  
  for (var i = 0, length = PROPERTIES.length; i < length; i++) {
    k = PROPERTIES[i];
    aV = (a[k] || '').toLowerCase();
    bV = (b[k] || '').toLowerCase();
    if (aV < bV) { return -1; }
    if (aV > bV) { return 1; }
  }

  return 0;
}