"use strict";

var path = require("path");
var through = require("through");
var jade = require("jade");
var findParent = require("find-parent-dir");

module.exports = function (fileName) {
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
            readJadeifyConfigFromPackage(process.cwd(), function (err, opts) {
                if (err) {
                    self.emit("error", err);
                    return;
                }

                opts.filename = fileName;
                if (opts.compileDebug === undefined) {
                    opts.compileDebug = false;
                }

                var templateFunction;

                try {
                    if (jade.compileClient) {
                        templateFunction = jade.compileClient(inputString, opts);
                    } else {
                        opts.client = true;
                        templateFunction = jade.compile(inputString, opts);
                    }
                } catch (e) {
                    self.emit("error", e);
                    return;
                }

                var moduleBody = "var jade = require(\"jade/runtime\");\n\n" +
                                 "module.exports = " + templateFunction.toString() + ";";

                self.queue(moduleBody);
                self.queue(null);
            });
        }
    );
};

function readJadeifyConfigFromPackage(pathName, cb) {
    findParent(pathName, "package.json", function (err, dir) {
        if (err) {
            return cb(err);
        }
        if (!dir) {
            return cb(null, null);
        }
        var fileName = path.resolve(dir, "package.json");
        var pkg = null;
        try {
            pkg = require(fileName);
        } catch (e) {
            return cb(e);
        }

        if (pkg && pkg.jadeify) {
            if (typeof pkg.jadeify !== "object") {
                cb(new TypeError("The jadeify config must be an object."), null);
                return;
            }
            cb(null, pkg.jadeify);
        } else {
            cb(null, {});
        }
    });
}
