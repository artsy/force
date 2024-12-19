/**
 * @generated SignedSource<<b79cea7e1055cac728c8e70a41ef4b4c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
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
    "cacheID": "97fb62052856067e08f7e0bfb93ead58",
    "id": null,
    "metadata": {},
    "name": "artQuizRoutes_WelcomeQuery",
    "operationKind": "query",
    "text": "query artQuizRoutes_WelcomeQuery {\n  me {\n    quiz {\n      completedAt\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "008cb450a28fdaeb1dba80a3d5427102";

export default node;
