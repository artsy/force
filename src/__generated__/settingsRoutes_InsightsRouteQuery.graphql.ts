/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type settingsRoutes_InsightsRouteQueryVariables = {};
export type settingsRoutes_InsightsRouteQueryResponse = {
    readonly me: {
        readonly internalID: string;
    } | null;
};
export type settingsRoutes_InsightsRouteQuery = {
    readonly response: settingsRoutes_InsightsRouteQueryResponse;
    readonly variables: settingsRoutes_InsightsRouteQueryVariables;
};



/*
query settingsRoutes_InsightsRouteQuery {
  me {
    internalID
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
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
    "name": "settingsRoutes_InsightsRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
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
    "name": "settingsRoutes_InsightsRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "3a927ffd4abb4c5ac82295b21c571912",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_InsightsRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_InsightsRouteQuery {\n  me {\n    internalID\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '527e52752540492ccd8cb9b91666dc2d';
export default node;
