/**
 * @generated SignedSource<<5ac429813dacc6f096e5c683cd3fc596>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type showsRoutes_ShowsAllCitiesQuery$variables = {};
export type showsRoutes_ShowsAllCitiesQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowsAllCities_viewer">;
  } | null;
};
export type showsRoutes_ShowsAllCitiesQuery = {
  variables: showsRoutes_ShowsAllCitiesQuery$variables;
  response: showsRoutes_ShowsAllCitiesQuery$data;
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
    "cacheID": "ad359a22befc4c14ff67b0cca6e2c3df",
    "id": null,
    "metadata": {},
    "name": "showsRoutes_ShowsAllCitiesQuery",
    "operationKind": "query",
    "text": "query showsRoutes_ShowsAllCitiesQuery {\n  viewer {\n    ...ShowsAllCities_viewer\n  }\n}\n\nfragment ShowsAllCities_viewer on Viewer {\n  cities {\n    name\n    slug\n  }\n}\n"
  }
};

(node as any).hash = "7afb036b1da4a784deabe0bd23acc9a4";

export default node;
