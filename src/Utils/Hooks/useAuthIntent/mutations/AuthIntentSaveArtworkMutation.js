"use strict";
let __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveArtworkMutation = void 0;
let react_relay_1 = require("react-relay");
let saveArtworkMutation = function (relayEnvironment, id) {
    return new Promise(function (resolve, reject) {
        (0, react_relay_1.commitMutation)(relayEnvironment, {
            onCompleted: function (res, errors) {
                if (errors !== null) {
                    reject(errors);
                    return;
                }
                resolve(res);
            },
            mutation: (0, react_relay_1.graphql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        mutation AuthIntentSaveArtworkMutation($input: SaveArtworkInput!)\n          @raw_response_type {\n          saveArtwork(input: $input) {\n            artwork {\n              id\n              isSaved\n            }\n          }\n        }\n      "], ["\n        mutation AuthIntentSaveArtworkMutation($input: SaveArtworkInput!)\n          @raw_response_type {\n          saveArtwork(input: $input) {\n            artwork {\n              id\n              isSaved\n            }\n          }\n        }\n      "]))),
            optimisticResponse: {
                saveArtwork: {
                    artwork: {
                        id: id,
                        isSaved: true,
                    },
                },
            },
            variables: {
                input: {
                    artworkID: id,
                },
            },
        });
    });
};
exports.saveArtworkMutation = saveArtworkMutation;
let templateObject_1;
