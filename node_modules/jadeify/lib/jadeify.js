"use strict";

var path = require("path");
var through = require("through");
var jade = require("jade");

module.exports = function (fileName, options) {
    if (!/\.jade$/i.test(fileName)) {
        return through();
    }

    var inputString = "";
    return through(
        function (chunk) {
            inputString += chunk;
        },
        function () {
            var self = this;

            options.filename = fileName;

            var templateFunction;
            try {
                templateFunction = jade.compileClient(inputString, options);
            } catch (e) {
                self.emit("error", e);
                return;
            }

            getJadeDependencies(inputString, options).forEach(function (dep) {
                self.emit("file", dep);
            });

            var moduleBody = "var jade = require(\"jade/runtime\");\n\n" +
                             "module.exports = " + templateFunction.toString() + ";";

            self.queue(moduleBody);
            self.queue(null);
        }
    );
};

function getJadeDependencies(inputString, options) {
  var parser = new jade.Parser(inputString, options.filename, options);
  parser.parse();
  return parser.dependencies;
}
