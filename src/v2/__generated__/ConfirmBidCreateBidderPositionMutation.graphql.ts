/**
 * @generated SignedSource<<588d00ae2222f02269679bd99d831797>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type BidderPositionInput = {
  artworkID: string;
  clientMutationId?: string | null;
  maxBidAmountCents: number;
  saleID: string;
};
export type ConfirmBidCreateBidderPositionMutation$variables = {
  input: BidderPositionInput;
};
export type ConfirmBidCreateBidderPositionMutation$data = {
  readonly createBidderPosition: {
    readonly result: {
      readonly position: {
        readonly internalID: string;
        readonly saleArtwork: {
          readonly sale: {
            readonly registrationStatus: {
              readonly internalID: string;
              readonly qualifiedForBidding: boolean | null;
            } | null;
          } | null;
        } | null;
      } | null;
      readonly status: string;
      readonly messageHeader: string | null;
    } | null;
  } | null;
};
export type ConfirmBidCreateBidderPositionMutation = {
  variables: ConfirmBidCreateBidderPositionMutation$variables;
  response: ConfirmBidCreateBidderPositionMutation$data;
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "qualifiedForBidding",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "messageHeader",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConfirmBidCreateBidderPositionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BidderPositionPayload",
        "kind": "LinkedField",
        "name": "createBidderPosition",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "BidderPositionResult",
            "kind": "LinkedField",
            "name": "result",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BidderPosition",
                "kind": "LinkedField",
                "name": "position",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
                    "kind": "LinkedField",
                    "name": "saleArtwork",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Bidder",
                            "kind": "LinkedField",
                            "name": "registrationStatus",
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
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/),
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
    "name": "ConfirmBidCreateBidderPositionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "BidderPositionPayload",
        "kind": "LinkedField",
        "name": "createBidderPosition",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "BidderPositionResult",
            "kind": "LinkedField",
            "name": "result",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BidderPosition",
                "kind": "LinkedField",
                "name": "position",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
                    "kind": "LinkedField",
                    "name": "saleArtwork",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Bidder",
                            "kind": "LinkedField",
                            "name": "registrationStatus",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
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
    "cacheID": "71be49e34b5bd81c5cc003d2f9e7c82e",
    "id": null,
    "metadata": {},
    "name": "ConfirmBidCreateBidderPositionMutation",
    "operationKind": "mutation",
    "text": "mutation ConfirmBidCreateBidderPositionMutation(\n  $input: BidderPositionInput!\n) {\n  createBidderPosition(input: $input) {\n    result {\n      position {\n        internalID\n        saleArtwork {\n          sale {\n            registrationStatus {\n              internalID\n              qualifiedForBidding\n              id\n            }\n            id\n          }\n          id\n        }\n        id\n      }\n      status\n      messageHeader\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b68f3811be758bcc79f4bba38bd57d91";

export default node;
