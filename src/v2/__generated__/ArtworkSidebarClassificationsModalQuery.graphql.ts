/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassificationsModalQueryVariables = {};
export type ArtworkSidebarClassificationsModalQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarClassificationsModal_viewer">;
    } | null;
};
export type ArtworkSidebarClassificationsModalQuery = {
    readonly response: ArtworkSidebarClassificationsModalQueryResponse;
    readonly variables: ArtworkSidebarClassificationsModalQueryVariables;
};



/*
query ArtworkSidebarClassificationsModalQuery {
  viewer {
    ...ArtworkSidebarClassificationsModal_viewer
  }
}

fragment ArtworkSidebarClassificationsModal_viewer on Viewer {
  artworkAttributionClasses {
    id
    name
    longDescription
  }
}
*/

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
(node as any).hash = 'a40434b7da7b4a9f4b3e7c4679014df1';
export default node;
