"use strict";
let __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followGeneMutation = void 0;
let react_relay_1 = require("react-relay");
let followGeneMutation = function (relayEnvironment, id) {
    return new Promise(function (resolve, reject) {
        (0, react_relay_1.commitMutation)(relayEnvironment, {
            onCompleted: function (res, errors) {
                if (errors !== null) {
                    reject(errors);
                    return;
                }
                resolve(res);
            },
            mutation: (0, react_relay_1.graphql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        mutation AuthIntentFollowGeneMutation($input: FollowGeneInput!)\n          @raw_response_type {\n          followGene(input: $input) {\n            gene {\n              id\n              isFollowed\n            }\n          }\n        }\n      "], ["\n        mutation AuthIntentFollowGeneMutation($input: FollowGeneInput!)\n          @raw_response_type {\n          followGene(input: $input) {\n            gene {\n              id\n              isFollowed\n            }\n          }\n        }\n      "]))),
            optimisticResponse: {
                followGene: {
                    gene: {
                        id: id,
                        isFollowed: true,
                    },
                },
            },
            variables: {
                input: {
                    geneID: id,
                },
            },
        });
    });
};
exports.followGeneMutation = followGeneMutation;
let templateObject_1;
