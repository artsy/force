/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_MyCollectionRouteQueryVariables = {};
export type settingsRoutes_MyCollectionRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsMyCollectionRoute_me">;
    } | null;
};
export type settingsRoutes_MyCollectionRouteQuery = {
    readonly response: settingsRoutes_MyCollectionRouteQueryResponse;
    readonly variables: settingsRoutes_MyCollectionRouteQueryVariables;
};



/*
query settingsRoutes_MyCollectionRouteQuery {
  me {
    ...SettingsMyCollectionRoute_me
    id
  }
}

fragment SettingsMyCollectionRoute_me on Me {
  name
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_MyCollectionRouteQuery",
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
            "name": "SettingsMyCollectionRoute_me"
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
    "name": "settingsRoutes_MyCollectionRouteQuery",
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
            "name": "name",
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
    "cacheID": "7996ac5e74adc12f59b3ba654baa4903",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_MyCollectionRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_MyCollectionRouteQuery {\n  me {\n    ...SettingsMyCollectionRoute_me\n    id\n  }\n}\n\nfragment SettingsMyCollectionRoute_me on Me {\n  name\n}\n"
  }
};
(node as any).hash = '39382bffcb9e3c3c39e6b8575d3d1114';
export default node;
