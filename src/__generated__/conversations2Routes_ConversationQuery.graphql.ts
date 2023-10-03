/**
 * @generated SignedSource<<f1a5706afbea55f6f6a74eeac8f02b49>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type conversations2Routes_ConversationQuery$variables = {};
export type conversations2Routes_ConversationQuery$data = {
  readonly conversationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string | null;
      } | null;
    } | null> | null;
  } | null;
};
export type conversations2Routes_ConversationQuery = {
  response: conversations2Routes_ConversationQuery$data;
  variables: conversations2Routes_ConversationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "conversations2Routes_ConversationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConversationConnection",
        "kind": "LinkedField",
        "name": "conversationsConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ConversationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Conversation",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "conversationsConnection(first:1)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "conversations2Routes_ConversationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ConversationConnection",
        "kind": "LinkedField",
        "name": "conversationsConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ConversationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Conversation",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
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
        ],
        "storageKey": "conversationsConnection(first:1)"
      }
    ]
  },
  "params": {
    "cacheID": "994f749afb5a5334103a31d3b3ff8e5f",
    "id": null,
    "metadata": {},
    "name": "conversations2Routes_ConversationQuery",
    "operationKind": "query",
    "text": "query conversations2Routes_ConversationQuery {\n  conversationsConnection(first: 1) {\n    edges {\n      node {\n        internalID\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "657d7021b4b60d786c4954456bed2bf3";

export default node;
