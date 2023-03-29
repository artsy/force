/**
 * @generated SignedSource<<da95e94f45af60ec20f5fb20f67ae0ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type conversations2Routes_ConversationQuery$variables = {};
export type conversations2Routes_ConversationQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"Conversations2App_viewer">;
  } | null;
};
export type conversations2Routes_ConversationQuery = {
  response: conversations2Routes_ConversationQuery$data;
  variables: conversations2Routes_ConversationQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "conversations2Routes_ConversationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Conversations2App_viewer"
          }
        ],
        "storageKey": null
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
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              {
                "kind": "Literal",
                "name": "partnerId",
                "value": "commerce-test-partner"
              },
              {
                "kind": "Literal",
                "name": "type",
                "value": "PARTNER"
              }
            ],
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
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
            "storageKey": "conversationsConnection(first:1,partnerId:\"commerce-test-partner\",type:\"PARTNER\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c03b7acb651ce302c2e99c429b156c3c",
    "id": null,
    "metadata": {},
    "name": "conversations2Routes_ConversationQuery",
    "operationKind": "query",
    "text": "query conversations2Routes_ConversationQuery {\n  viewer {\n    ...Conversations2App_viewer\n  }\n}\n\nfragment Conversations2App_viewer on Viewer {\n  conversationsConnection(first: 1, type: PARTNER, partnerId: \"commerce-test-partner\") {\n    edges {\n      node {\n        internalID\n        id\n      }\n    }\n  }\n}\n"
  }
};

(node as any).hash = "a799d748e3d05c097bf68d046df541f6";

export default node;
