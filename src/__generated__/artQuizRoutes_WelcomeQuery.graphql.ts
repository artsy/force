/**
 * @generated SignedSource<<b6daf8a5011a3cdffe24b6255a7142b3>>
 * @relayHash 97fb62052856067e08f7e0bfb93ead58
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 97fb62052856067e08f7e0bfb93ead58

import { ConcreteRequest, Query } from 'relay-runtime';
export type artQuizRoutes_WelcomeQuery$variables = Record<PropertyKey, never>;
export type artQuizRoutes_WelcomeQuery$data = {
  readonly me: {
    readonly quiz: {
      readonly completedAt: string | null | undefined;
    };
  } | null | undefined;
};
export type artQuizRoutes_WelcomeQuery = {
  response: artQuizRoutes_WelcomeQuery$data;
  variables: artQuizRoutes_WelcomeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completedAt",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "artQuizRoutes_WelcomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Quiz",
            "kind": "LinkedField",
            "name": "quiz",
            "plural": false,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
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
    "name": "artQuizRoutes_WelcomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Quiz",
            "kind": "LinkedField",
            "name": "quiz",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "97fb62052856067e08f7e0bfb93ead58",
    "metadata": {},
    "name": "artQuizRoutes_WelcomeQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "008cb450a28fdaeb1dba80a3d5427102";

export default node;
