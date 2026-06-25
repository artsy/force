/**
 * @generated SignedSource<<62f96a9058d77ac14ab6a47d2d072290>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CommerceCancelReasonTypeEnum = "ADMIN_CANCELED" | "ADMIN_FAILED_REVIEW" | "BUYER_LAPSED" | "BUYER_REJECTED" | "FUNDS_NOT_RECEIVED" | "SELLER_LAPSED" | "SELLER_REJECTED" | "SELLER_REJECTED_ARTWORK_UNAVAILABLE" | "SELLER_REJECTED_OFFER_TOO_LOW" | "SELLER_REJECTED_OTHER" | "SELLER_REJECTED_SHIPPING_UNAVAILABLE" | "%future added value";
export type CommerceBuyerRejectOfferInput = {
  clientMutationId?: string | null | undefined;
  offerId: string;
  rejectReason?: CommerceCancelReasonTypeEnum | null | undefined;
};
export type useRespondToOfferDeclineMutation$variables = {
  input: CommerceBuyerRejectOfferInput;
};
export type useRespondToOfferDeclineMutation$data = {
  readonly commerceBuyerRejectOffer: {
    readonly orderOrError: {
      readonly __typename: "CommerceOrderWithMutationFailure";
      readonly error: {
        readonly code: string;
        readonly data: string | null | undefined;
        readonly type: string;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  } | null | undefined;
};
export type useRespondToOfferDeclineMutation = {
  response: useRespondToOfferDeclineMutation$data;
  variables: useRespondToOfferDeclineMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CommerceBuyerRejectOfferPayload",
    "kind": "LinkedField",
    "name": "commerceBuyerRejectOffer",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "orderOrError",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceApplicationError",
                "kind": "LinkedField",
                "name": "error",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "code",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "data",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOrderWithMutationFailure",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useRespondToOfferDeclineMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useRespondToOfferDeclineMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ea2eca2b98c93216979c2f32cba1def0",
    "id": null,
    "metadata": {},
    "name": "useRespondToOfferDeclineMutation",
    "operationKind": "mutation",
    "text": "mutation useRespondToOfferDeclineMutation(\n  $input: CommerceBuyerRejectOfferInput!\n) {\n  commerceBuyerRejectOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          code\n          data\n          type\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b0d94de2812ad239fb429d487d619f35";

export default node;
