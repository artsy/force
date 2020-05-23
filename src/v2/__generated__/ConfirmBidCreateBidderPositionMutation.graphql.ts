/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type BidderPositionInput = {
    readonly artworkID: string;
    readonly clientMutationId?: string | null;
    readonly maxBidAmountCents: number;
    readonly saleID: string;
};
export type ConfirmBidCreateBidderPositionMutationVariables = {
    input: BidderPositionInput;
};
export type ConfirmBidCreateBidderPositionMutationResponse = {
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
    readonly response: ConfirmBidCreateBidderPositionMutationResponse;
    readonly variables: ConfirmBidCreateBidderPositionMutationVariables;
};



/*
mutation ConfirmBidCreateBidderPositionMutation(
  $input: BidderPositionInput!
) {
  createBidderPosition(input: $input) {
    result {
      position {
        internalID
        saleArtwork {
          sale {
            registrationStatus {
              internalID
              qualifiedForBidding
              id
            }
            id
          }
          id
        }
        id
      }
      status
      messageHeader
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "BidderPositionInput!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "qualifiedForBidding",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "messageHeader",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ConfirmBidCreateBidderPositionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBidderPosition",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "BidderPositionPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "result",
            "storageKey": null,
            "args": null,
            "concreteType": "BidderPositionResult",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "position",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPosition",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "saleArtwork",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "sale",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Sale",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "registrationStatus",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Bidder",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/)
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              (v4/*: any*/),
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ConfirmBidCreateBidderPositionMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBidderPosition",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "BidderPositionPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "result",
            "storageKey": null,
            "args": null,
            "concreteType": "BidderPositionResult",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "position",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPosition",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "saleArtwork",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "sale",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Sale",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "registrationStatus",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Bidder",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              (v6/*: any*/)
                            ]
                          },
                          (v6/*: any*/)
                        ]
                      },
                      (v6/*: any*/)
                    ]
                  },
                  (v6/*: any*/)
                ]
              },
              (v4/*: any*/),
              (v5/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "ConfirmBidCreateBidderPositionMutation",
    "id": null,
    "text": "mutation ConfirmBidCreateBidderPositionMutation(\n  $input: BidderPositionInput!\n) {\n  createBidderPosition(input: $input) {\n    result {\n      position {\n        internalID\n        saleArtwork {\n          sale {\n            registrationStatus {\n              internalID\n              qualifiedForBidding\n              id\n            }\n            id\n          }\n          id\n        }\n        id\n      }\n      status\n      messageHeader\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'b68f3811be758bcc79f4bba38bd57d91';
export default node;
