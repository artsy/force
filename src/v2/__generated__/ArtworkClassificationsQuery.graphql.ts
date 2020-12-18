/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkClassificationsQueryVariables = {};
export type ArtworkClassificationsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkClassifications_viewer">;
    } | null;
};
export type ArtworkClassificationsQuery = {
    readonly response: ArtworkClassificationsQueryResponse;
    readonly variables: ArtworkClassificationsQueryVariables;
};



/*
query ArtworkClassificationsQuery {
  viewer {
    ...ArtworkClassifications_viewer
  }
}

fragment ArtworkClassifications_viewer on Viewer {
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
    "name": "ArtworkClassificationsQuery",
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
            "name": "ArtworkClassifications_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkClassificationsQuery",
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
    "id": null,
    "metadata": {},
    "name": "ArtworkClassificationsQuery",
    "operationKind": "query",
    "text": "query ArtworkClassificationsQuery {\n  viewer {\n    ...ArtworkClassifications_viewer\n  }\n}\n\nfragment ArtworkClassifications_viewer on Viewer {\n  artworkAttributionClasses {\n    id\n    name\n    longDescription\n  }\n}\n"
  }
};
(node as any).hash = '4b45dd5b527c03d6601e701b41bac3d9';
export default node;
