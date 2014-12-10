"use strict";

var path = require("path");
var through = require("through");
var jade = require("jade");
var Bluebird = require("bluebird");
var findParent = Bluebird.promisify(require("find-parent-dir"));

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
            getOptions(options).then(function (options) {
                options.filename = fileName;

                var templateFunction = jade.compileClient(inputString, options);

                getJadeDependencies(inputString, options).forEach(function (dep) {
                    self.emit("file", dep);
                });

                var moduleBody = "var jade = require(\"jade/runtime\");\n\n" +
                                 "module.exports = " + templateFunction.toString() + ";";

                self.queue(moduleBody);
                self.queue(null);
            })
            .catch(function (err) {
                self.emit("error", err);
            });
        }
    );
};

function getJadeDependencies(inputString, options) {
  var parser = new jade.Parser(inputString, options.filename, options);
  parser.parse();
  return parser.dependencies;
}

function getOptions(passedOptions) {
    if (passedOptions && Object.keys(passedOptions).some(function (k) { return k[0] !== "_"; })) {
        return Bluebird.resolve(passedOptions);
    }

    return readJadeifyConfigFromPackage(process.cwd());
}

function readJadeifyConfigFromPackage(pathName) {
    return findParent(pathName, "package.json").then(function (dir) {
        if (!dir) {
            return {};
        }

        var pkg = require(path.resolve(dir, "package.json"));

        if (pkg && pkg.jadeify) {
            if (typeof pkg.jadeify !== "object") {
                throw new TypeError("The jadeify config must be an object.");
            }
            return pkg.jadeify;
        }

        return {};
    });
}
