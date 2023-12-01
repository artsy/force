/**
 * @generated SignedSource<<3bfce272e2df696c733312038d17b179>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type conversationsRoutes_ConversationQuery$variables = Record<PropertyKey, never>;
export type conversationsRoutes_ConversationQuery$data = {
  readonly conversationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type conversationsRoutes_ConversationQuery = {
  response: conversationsRoutes_ConversationQuery$data;
  variables: conversationsRoutes_ConversationQuery$variables;
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
    "name": "conversationsRoutes_ConversationQuery",
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
    "name": "conversationsRoutes_ConversationQuery",
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
    "cacheID": "77c781873a65e4b9987fb7384637d507",
    "id": null,
    "metadata": {},
    "name": "conversationsRoutes_ConversationQuery",
    "operationKind": "query",
    "text": "query conversationsRoutes_ConversationQuery {\n  conversationsConnection(first: 1) {\n    edges {\n      node {\n        internalID\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1431310ecf66c18dbce1b94256d17021";

export default node;
