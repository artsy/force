/**
 * @generated SignedSource<<806996aa24c8f919bbff85296c950d3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type rejectSellerOfferInput = {
  clientMutationId?: string | null | undefined;
  offerID: string;
  orderID: string;
  rejectReason?: string | null | undefined;
};
export type useOrder2DeclineOfferMutation$variables = {
  input: rejectSellerOfferInput;
};
export type useOrder2DeclineOfferMutation$data = {
  readonly rejectSellerOffer: {
    readonly orderOrError: {
      readonly __typename: "OrderMutationSuccess";
      readonly mutationError?: {
        readonly code: string;
        readonly message: string;
      };
    } | null | undefined;
  } | null | undefined;
};
export type useOrder2DeclineOfferMutation = {
  response: useOrder2DeclineOfferMutation$data;
  variables: useOrder2DeclineOfferMutation$variables;
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ExchangeError",
      "kind": "LinkedField",
      "name": "mutationError",
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
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderMutationError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useOrder2DeclineOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "rejectSellerOfferPayload",
        "kind": "LinkedField",
        "name": "rejectSellerOffer",
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
                  (v2/*: any*/)
                ],
                "type": "OrderMutationSuccess",
                "abstractKey": null
              },
              (v3/*: any*/)
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
    "name": "useOrder2DeclineOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "rejectSellerOfferPayload",
        "kind": "LinkedField",
        "name": "rejectSellerOffer",
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
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "381328d0a4f99062dd1d20fb2d40d41f",
    "id": null,
    "metadata": {},
    "name": "useOrder2DeclineOfferMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2DeclineOfferMutation(\n  $input: rejectSellerOfferInput!\n) {\n  rejectSellerOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderMutationSuccess {\n        __typename\n      }\n      ... on OrderMutationError {\n        mutationError {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5d7b125443d8d24b0683e2740f02de33";

export default node;
