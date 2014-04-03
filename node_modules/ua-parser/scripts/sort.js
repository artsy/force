var path = require('path'), 
    fs = require('fs'),
    yaml = require('yamlparser');


var PROPERTIES = ['family', 'major', 'minor', 'path', 'patch_minor'],
    PROPERTIES_LENGTH = PROPERTIES.length;

function sortByFamily(a, b) { 
  var aV, bV, k;
  
  for (var i = 0; i < PROPERTIES_LENGTH; i++) {
    k = PROPERTIES[i];
    aV = a[k];
    bV = b[k];
    if (aV < bV) { return -1; }
    if (aV > bV) { return 1; }
  }

  return 0;
}

function quote(str) {
  return "'" + str + "'";
}

function sort(input, output, depth) {
  output.write("\ntest_cases:")
  input.test_cases.sort(sortByFamily).forEach(function(obj) {
    output.write("\n    - user_agent_string: " + quote(obj.user_agent_string));
    PROPERTIES.forEach(function(k, i) {
      if (i < depth) {
        output.write("\n      " + k + ":");
        if (typeof obj[k] == 'string') {
          output.write(" " + quote(obj[k]));
        }
      }
    });
    output.write("\n");
  });
}

if (require.main === module) {
  var input = process.argv[2],
      output = process.argv[3];
  //if (!(input && output)) { process.exit(1); }
  
  var file = path.join(__dirname, '..', 'test_resources', 'test_user_agent_parser.yaml'),
      regexes = fs.readFileSync(file, 'utf8');
  regexes = yaml.eval(regexes);
  sort(regexes, process.stdout, 4)
  //process.stdout.write(parseUA(input).toString());
}
