"use strict";
let __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followProfileMutation = void 0;
let react_relay_1 = require("react-relay");
let followProfileMutation = function (relayEnvironment, id) {
    return new Promise(function (resolve, reject) {
        (0, react_relay_1.commitMutation)(relayEnvironment, {
            onCompleted: function (res, errors) {
                if (errors !== null) {
                    reject(errors);
                    return;
                }
                resolve(res);
            },
            mutation: (0, react_relay_1.graphql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        mutation AuthIntentFollowProfileMutation($input: FollowProfileInput!)\n          @raw_response_type {\n          followProfile(input: $input) {\n            profile {\n              id\n              isFollowed\n            }\n          }\n        }\n      "], ["\n        mutation AuthIntentFollowProfileMutation($input: FollowProfileInput!)\n          @raw_response_type {\n          followProfile(input: $input) {\n            profile {\n              id\n              isFollowed\n            }\n          }\n        }\n      "]))),
            optimisticResponse: {
                followProfile: {
                    profile: {
                        id: id,
                        isFollowed: true,
                    },
                },
            },
            variables: {
                input: {
                    profileID: id,
                },
            },
        });
    });
};
exports.followProfileMutation = followProfileMutation;
let templateObject_1;
