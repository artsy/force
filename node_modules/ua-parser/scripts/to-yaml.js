var PROPERTIES = require('./const').PROPERTIES;

function quote(str) {
  return "'" + str + "'";
}

module.exports = function(obj) {
  var output = '';
  output += "\n  - user_agent_string: " + quote(obj.user_agent_string);
  PROPERTIES.forEach(function(k) {
    var v = obj[k] || '';
    output += "\n    " + k + ":";
    if (typeof v == 'string') {
      v = filter(k, v);
      output += " " + quote(v);
    }
  });
  return output;
}

function filter(k, v) {
  if (k === "family") {
    if (v === "Internet Explorer") {
      return "IE";
    }
  } 
  return v;
}