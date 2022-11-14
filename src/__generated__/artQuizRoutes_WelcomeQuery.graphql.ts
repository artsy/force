/**
 * @generated SignedSource<<66b92ddbba5df6e11f6810be2864fa9c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type artQuizRoutes_WelcomeQuery$variables = {};
export type artQuizRoutes_WelcomeQuery$data = {
  readonly viewer: {
    readonly quizConnection: {
      readonly completedAt: string | null;
    };
  } | null;
};
export type artQuizRoutes_WelcomeQuery = {
  response: artQuizRoutes_WelcomeQuery$data;
  variables: artQuizRoutes_WelcomeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
        "args": null,
        "concreteType": "Quiz",
        "kind": "LinkedField",
        "name": "quizConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "completedAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "artQuizRoutes_WelcomeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "artQuizRoutes_WelcomeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f25d579f0867b065c8fcd595fac7e3b2",
    "id": null,
    "metadata": {},
    "name": "artQuizRoutes_WelcomeQuery",
    "operationKind": "query",
    "text": "query artQuizRoutes_WelcomeQuery {\n  viewer {\n    quizConnection {\n      completedAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7ef6e2bbcfc1c71c3c215de1a4060e26";

export default node;
