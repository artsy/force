"use strict";
let __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followArtistMutation = void 0;
let react_relay_1 = require("react-relay");
let followArtistMutation = function (relayEnvironment, id) {
    return new Promise(function (resolve, reject) {
        (0, react_relay_1.commitMutation)(relayEnvironment, {
            onCompleted: function (res, errors) {
                if (errors !== null) {
                    reject(errors);
                    return;
                }
                resolve(res);
            },
            mutation: (0, react_relay_1.graphql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        mutation AuthIntentFollowArtistMutation($input: FollowArtistInput!)\n          @raw_response_type {\n          followArtist(input: $input) {\n            artist {\n              id\n              isFollowed\n            }\n          }\n        }\n      "], ["\n        mutation AuthIntentFollowArtistMutation($input: FollowArtistInput!)\n          @raw_response_type {\n          followArtist(input: $input) {\n            artist {\n              id\n              isFollowed\n            }\n          }\n        }\n      "]))),
            optimisticResponse: {
                followArtist: {
                    artist: {
                        id: id,
                        isFollowed: true,
                    },
                },
            },
            variables: {
                input: {
                    artistID: id,
                },
            },
        });
    });
};
exports.followArtistMutation = followArtistMutation;
let templateObject_1;
