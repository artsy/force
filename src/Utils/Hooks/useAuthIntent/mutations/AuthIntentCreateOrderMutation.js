"use strict";
let __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderMutation = void 0;
let react_relay_1 = require("react-relay");
let createOrderMutation = function (relayEnvironment, id, secondaryId) {
    return new Promise(function (resolve, reject) {
        (0, react_relay_1.commitMutation)(relayEnvironment, {
            onCompleted: function (res, errors) {
                let _a, _b;
                if (errors !== null) {
                    reject(errors);
                    return;
                }
                let orderID = (_b = (_a = res.commerceCreateOrderWithArtwork) === null || _a === void 0 ? void 0 : _a.orderOrError.order) === null || _b === void 0 ? void 0 : _b.internalID;
                resolve(res);
                window.location.assign("/orders/".concat(orderID, "/shipping"));
            },
            mutation: (0, react_relay_1.graphql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        mutation AuthIntentCreateOrderMutation(\n          $input: CommerceCreateOrderWithArtworkInput!\n        ) @raw_response_type {\n          commerceCreateOrderWithArtwork(input: $input) {\n            orderOrError {\n              ... on CommerceOrderWithMutationSuccess {\n                __typename\n                order {\n                  internalID\n                  mode\n                }\n              }\n              ... on CommerceOrderWithMutationFailure {\n                error {\n                  type\n                  code\n                  data\n                }\n              }\n            }\n          }\n        }\n      "], ["\n        mutation AuthIntentCreateOrderMutation(\n          $input: CommerceCreateOrderWithArtworkInput!\n        ) @raw_response_type {\n          commerceCreateOrderWithArtwork(input: $input) {\n            orderOrError {\n              ... on CommerceOrderWithMutationSuccess {\n                __typename\n                order {\n                  internalID\n                  mode\n                }\n              }\n              ... on CommerceOrderWithMutationFailure {\n                error {\n                  type\n                  code\n                  data\n                }\n              }\n            }\n          }\n        }\n      "]))),
            variables: {
                input: {
                    artworkId: id,
                    editionSetId: secondaryId,
                },
            },
        });
    });
};
exports.createOrderMutation = createOrderMutation;
let templateObject_1;
