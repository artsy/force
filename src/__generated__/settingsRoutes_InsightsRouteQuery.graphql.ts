/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_InsightsRouteQueryVariables = {};
export type settingsRoutes_InsightsRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"InsightsRoute_me">;
    } | null;
};
export type settingsRoutes_InsightsRouteQuery = {
    readonly response: settingsRoutes_InsightsRouteQueryResponse;
    readonly variables: settingsRoutes_InsightsRouteQueryVariables;
};



/*
query settingsRoutes_InsightsRouteQuery {
  me {
    ...InsightsRoute_me
    id
  }
}

fragment InsightsRoute_me on Me {
  internalID
}
*/

const node: ConcreteRequest = {
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InsightsRoute_me"
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
    ]
  },
  "params": {
    "cacheID": "db36ab712dcb9814f6a9eaa7b6a56ea7",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_InsightsRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_InsightsRouteQuery {\n  me {\n    ...InsightsRoute_me\n    id\n  }\n}\n\nfragment InsightsRoute_me on Me {\n  internalID\n}\n"
  }
};
(node as any).hash = '05488390d019c37ca002a2608bb08e1b';
export default node;
