"use strict";

var through = require("through");
var jade = require("jade");

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
            var opts = { filename: fileName, compileDebug: false };

            var templateFunction;
            if (jade.compileClient) {
                templateFunction = jade.compileClient(inputString, opts);
            } else {
                opts.client = true;
                templateFunction = jade.compile(inputString, opts);
            }

            var moduleBody = "var jade = require(\"jade/runtime\");\n\n" +
                             "module.exports = " + templateFunction.toString() + ";";

            this.queue(moduleBody);
            this.queue(null);
        }
    );
};
