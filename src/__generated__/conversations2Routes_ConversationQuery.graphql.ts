/**
 * @generated SignedSource<<7570a05882856f2572d4df177bb9af54>>
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
                "name": "type",
                "value": "USER"
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
            "storageKey": "conversationsConnection(first:1,type:\"USER\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "85ffadbba4a105277f93303e5a8d94e4",
    "id": null,
    "metadata": {},
    "name": "conversations2Routes_ConversationQuery",
    "operationKind": "query",
    "text": "query conversations2Routes_ConversationQuery {\n  viewer {\n    ...Conversations2App_viewer\n  }\n}\n\nfragment Conversations2App_viewer on Viewer {\n  conversationsConnection(first: 1, type: USER) {\n    edges {\n      node {\n        internalID\n        id\n      }\n    }\n  }\n}\n"
  }
};

(node as any).hash = "a799d748e3d05c097bf68d046df541f6";

export default node;
