/**
 * @generated SignedSource<<eeb726263ff36136ecd9f74018419290>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateBidderInput = {
  clientMutationId?: string | null;
  saleID: string;
};
export type RegisterCreateBidderMutation$variables = {
  input: CreateBidderInput;
};
export type RegisterCreateBidderMutation$data = {
  readonly createBidder: {
    readonly bidder: {
      readonly internalID: string;
    } | null;
  } | null;
};
export type RegisterCreateBidderMutation = {
  variables: RegisterCreateBidderMutation$variables;
  response: RegisterCreateBidderMutation$data;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterCreateBidderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBidderPayload",
        "kind": "LinkedField",
        "name": "createBidder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "bidder",
            "plural": false,
            "selections": [
              (v2/*: any*/)
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
    "name": "RegisterCreateBidderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBidderPayload",
        "kind": "LinkedField",
        "name": "createBidder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "bidder",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "615916e30565c0e98db2ec93b9e46a94",
    "id": null,
    "metadata": {},
    "name": "RegisterCreateBidderMutation",
    "operationKind": "mutation",
    "text": "mutation RegisterCreateBidderMutation(\n  $input: CreateBidderInput!\n) {\n  createBidder(input: $input) {\n    bidder {\n      internalID\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5a40789346f5d1cb6e5bbf634e36eae6";

export default node;
