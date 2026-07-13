/**
 * @generated SignedSource<<2945d66e155b41b8c1d4004c918454d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type submitBuyerOfferInput = {
  clientMutationId?: string | null | undefined;
  offerID: string;
  orderID: string;
};
export type useOrder2SubmitCounterOfferMutation$variables = {
  input: submitBuyerOfferInput;
};
export type useOrder2SubmitCounterOfferMutation$data = {
  readonly submitBuyerOffer: {
    readonly offerOrError: {
      readonly __typename: "OfferMutationSuccess";
      readonly mutationError?: {
        readonly code: string;
        readonly message: string;
      };
      readonly offer?: {
        readonly internalID: string;
      };
    } | null | undefined;
  } | null | undefined;
};
export type useOrder2SubmitCounterOfferMutation = {
  response: useOrder2SubmitCounterOfferMutation$data;
  variables: useOrder2SubmitCounterOfferMutation$variables;
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
      "concreteType": "OfferExchangeError",
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
  "type": "OfferMutationError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useOrder2SubmitCounterOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "submitBuyerOfferPayload",
        "kind": "LinkedField",
        "name": "submitBuyerOffer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "offerOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Offer",
                    "kind": "LinkedField",
                    "name": "offer",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OfferMutationSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
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
    "name": "useOrder2SubmitCounterOfferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "submitBuyerOfferPayload",
        "kind": "LinkedField",
        "name": "submitBuyerOffer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "offerOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Offer",
                    "kind": "LinkedField",
                    "name": "offer",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
                "type": "OfferMutationSuccess",
                "abstractKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7a20ac994eafe522b2f1d7acf973d7ac",
    "id": null,
    "metadata": {},
    "name": "useOrder2SubmitCounterOfferMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2SubmitCounterOfferMutation(\n  $input: submitBuyerOfferInput!\n) {\n  submitBuyerOffer(input: $input) {\n    offerOrError {\n      __typename\n      ... on OfferMutationSuccess {\n        __typename\n        offer {\n          internalID\n          id\n        }\n      }\n      ... on OfferMutationError {\n        mutationError {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0292f128f5218195f25a7f65355c0093";

export default node;
