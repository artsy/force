/**
 * @generated SignedSource<<c12662beb00d71975620f669df667c24>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassificationsModalQuery$variables = Record<PropertyKey, never>;
export type ArtworkSidebarClassificationsModalQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarClassificationsModal_viewer">;
  } | null | undefined;
};
export type ArtworkSidebarClassificationsModalQuery = {
  response: ArtworkSidebarClassificationsModalQuery$data;
  variables: ArtworkSidebarClassificationsModalQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarClassificationsModalQuery",
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
            "name": "ArtworkSidebarClassificationsModal_viewer"
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
    "name": "ArtworkSidebarClassificationsModalQuery",
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
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "artworkAttributionClasses",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
                "name": "longDescription",
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
    "cacheID": "2a1d12cd5a9d8f35d6a39b8f94cb234f",
    "id": null,
    "metadata": {},
    "name": "ArtworkSidebarClassificationsModalQuery",
    "operationKind": "query",
    "text": "query ArtworkSidebarClassificationsModalQuery {\n  viewer {\n    ...ArtworkSidebarClassificationsModal_viewer\n  }\n}\n\nfragment ArtworkSidebarClassificationsModal_viewer on Viewer {\n  artworkAttributionClasses {\n    id\n    name\n    longDescription\n  }\n}\n"
  }
};

(node as any).hash = "a40434b7da7b4a9f4b3e7c4679014df1";

export default node;
