"use strict";
let __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOfferOrderMutation = void 0;
let react_relay_1 = require("react-relay");
let createOfferOrderMutation = function (relayEnvironment, id, secondaryId) {
    return new Promise(function (resolve, reject) {
        (0, react_relay_1.commitMutation)(relayEnvironment, {
            onCompleted: function (res, errors) {
                let _a, _b;
                if (errors !== null) {
                    reject(errors);
                    return;
                }
                let orderID = (_b = (_a = res.commerceCreateOfferOrderWithArtwork) === null || _a === void 0 ? void 0 : _a.orderOrError.order) === null || _b === void 0 ? void 0 : _b.internalID;
                resolve(res);
                window.location.assign("/orders/".concat(orderID, "/offer"));
            },
            mutation: (0, react_relay_1.graphql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        mutation AuthIntentCreateOfferOrderMutation(\n          $input: CommerceCreateOfferOrderWithArtworkInput!\n        ) @raw_response_type {\n          commerceCreateOfferOrderWithArtwork(input: $input) {\n            orderOrError {\n              ... on CommerceOrderWithMutationSuccess {\n                __typename\n                order {\n                  internalID\n                  mode\n                }\n              }\n              ... on CommerceOrderWithMutationFailure {\n                error {\n                  type\n                  code\n                  data\n                }\n              }\n            }\n          }\n        }\n      "], ["\n        mutation AuthIntentCreateOfferOrderMutation(\n          $input: CommerceCreateOfferOrderWithArtworkInput!\n        ) @raw_response_type {\n          commerceCreateOfferOrderWithArtwork(input: $input) {\n            orderOrError {\n              ... on CommerceOrderWithMutationSuccess {\n                __typename\n                order {\n                  internalID\n                  mode\n                }\n              }\n              ... on CommerceOrderWithMutationFailure {\n                error {\n                  type\n                  code\n                  data\n                }\n              }\n            }\n          }\n        }\n      "]))),
            variables: {
                input: {
                    artworkId: id,
                    editionSetId: secondaryId,
                },
            },
        });
    });
};
exports.createOfferOrderMutation = createOfferOrderMutation;
let templateObject_1;
