/**
 * @generated SignedSource<<7c489169b2002e4fd2a9b866bb42bce0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CommerceCancelReasonTypeEnum = "ADMIN_CANCELED" | "ADMIN_FAILED_REVIEW" | "BUYER_LAPSED" | "BUYER_REJECTED" | "FUNDS_NOT_RECEIVED" | "SELLER_LAPSED" | "SELLER_REJECTED" | "SELLER_REJECTED_ARTWORK_UNAVAILABLE" | "SELLER_REJECTED_OFFER_TOO_LOW" | "SELLER_REJECTED_OTHER" | "SELLER_REJECTED_SHIPPING_UNAVAILABLE" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceBuyerRejectOfferInput = {
  clientMutationId?: string | null | undefined;
  offerId: string;
  rejectReason?: CommerceCancelReasonTypeEnum | null | undefined;
};
export type RejectOfferMutation$variables = {
  input: CommerceBuyerRejectOfferInput;
};
export type RejectOfferMutation$data = {
  readonly commerceBuyerRejectOffer: {
    readonly orderOrError: {
      readonly __typename: "CommerceOrderWithMutationSuccess";
      readonly error?: {
        readonly code: string;
        readonly data: string | null | undefined;
        readonly type: string;
      };
      readonly order?: {
        readonly awaitingResponseFrom?: CommerceOrderParticipantEnum | null | undefined;
        readonly internalID: string;
      };
    };
  } | null | undefined;
};
export type RejectOfferMutation = {
  response: RejectOfferMutation$data;
  variables: RejectOfferMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "awaitingResponseFrom",
      "storageKey": null
    }
  ],
  "type": "CommerceOfferOrder",
  "abstractKey": null
},
v5 = {
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
          "name": "type",
          "storageKey": null
        },
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrderWithMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RejectOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RejectOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "96754b731151eab290a32787dd0ae728",
    "id": null,
    "metadata": {},
    "name": "RejectOfferMutation",
    "operationKind": "mutation",
    "text": "mutation RejectOfferMutation(\n  $input: CommerceBuyerRejectOfferInput!\n) {\n  commerceBuyerRejectOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          internalID\n          ... on CommerceOfferOrder {\n            awaitingResponseFrom\n          }\n          id\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2529ac43dd011539cd690d7b103cb565";

export default node;
