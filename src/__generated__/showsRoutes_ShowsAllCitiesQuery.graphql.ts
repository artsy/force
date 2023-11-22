/**
 * @generated SignedSource<<64f4e5f09d5f2ca94fefad25c2b34835>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type showsRoutes_ShowsAllCitiesQuery$variables = Record<PropertyKey, never>;
export type showsRoutes_ShowsAllCitiesQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowsAllCities_viewer">;
  } | null | undefined;
};
export type showsRoutes_ShowsAllCitiesQuery = {
  response: showsRoutes_ShowsAllCitiesQuery$data;
  variables: showsRoutes_ShowsAllCitiesQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "showsRoutes_ShowsAllCitiesQuery",
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
            "name": "ShowsAllCities_viewer"
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
    "name": "showsRoutes_ShowsAllCitiesQuery",
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
            "args": null,
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "cities",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fullName",
                "storageKey": null
              },
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
                "name": "slug",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4e5a24ea83d5ba74a1cc669331557472",
    "id": null,
    "metadata": {},
    "name": "showsRoutes_ShowsAllCitiesQuery",
    "operationKind": "query",
    "text": "query showsRoutes_ShowsAllCitiesQuery {\n  viewer {\n    ...ShowsAllCities_viewer\n  }\n}\n\nfragment ShowsAllCities_viewer on Viewer {\n  cities {\n    fullName\n    name\n    slug\n  }\n}\n"
  }
};

(node as any).hash = "7afb036b1da4a784deabe0bd23acc9a4";

export default node;
