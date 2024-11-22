/**
 * @generated SignedSource<<91e1df816000437f30d56b3ecdf328c0>>
 * @relayHash 57b8a6a1300857be760a3d5691d145a8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 57b8a6a1300857be760a3d5691d145a8

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
    "id": "57b8a6a1300857be760a3d5691d145a8",
    "metadata": {},
    "name": "showsRoutes_ShowsAllCitiesQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "51f6281080a3ff3fb15d4539b8528305";

export default node;
