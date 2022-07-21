/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_DeleteAccountRouteQueryVariables = {};
export type settingsRoutes_DeleteAccountRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"DeleteAccountRoute_me">;
    } | null;
};
export type settingsRoutes_DeleteAccountRouteQuery = {
    readonly response: settingsRoutes_DeleteAccountRouteQueryResponse;
    readonly variables: settingsRoutes_DeleteAccountRouteQueryVariables;
};



/*
query settingsRoutes_DeleteAccountRouteQuery {
  me {
    ...DeleteAccountRoute_me
    id
  }
}

fragment DeleteAccountRoute_me on Me {
  hasPassword
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_DeleteAccountRouteQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "DeleteAccountRoute_me"
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
    "name": "settingsRoutes_DeleteAccountRouteQuery",
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
            "kind": "ScalarField",
            "name": "hasPassword",
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
    ]
  },
  "params": {
    "cacheID": "1838aefbc22504b484439724d1b52b4e",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_DeleteAccountRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_DeleteAccountRouteQuery {\n  me {\n    ...DeleteAccountRoute_me\n    id\n  }\n}\n\nfragment DeleteAccountRoute_me on Me {\n  hasPassword\n}\n"
  }
};
(node as any).hash = 'c54bb2421e59e40f01d0a70e9f8bca56';
export default node;
