/**
 * @generated SignedSource<<57e473bf6c9828af24593e6760ce1a69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassificationsModal_test_Query$variables = {};
export type ArtworkSidebarClassificationsModal_test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarClassificationsModal_viewer">;
  } | null;
};
export type ArtworkSidebarClassificationsModal_test_Query = {
  variables: ArtworkSidebarClassificationsModal_test_Query$variables;
  response: ArtworkSidebarClassificationsModal_test_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarClassificationsModal_test_Query",
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
    "name": "ArtworkSidebarClassificationsModal_test_Query",
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
    "cacheID": "3e9c86fbad13153ce3cacb447a13c23d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.artworkAttributionClasses": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AttributionClass"
        },
        "viewer.artworkAttributionClasses.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "viewer.artworkAttributionClasses.longDescription": (v0/*: any*/),
        "viewer.artworkAttributionClasses.name": (v0/*: any*/)
      }
    },
    "name": "ArtworkSidebarClassificationsModal_test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarClassificationsModal_test_Query {\n  viewer {\n    ...ArtworkSidebarClassificationsModal_viewer\n  }\n}\n\nfragment ArtworkSidebarClassificationsModal_viewer on Viewer {\n  artworkAttributionClasses {\n    id\n    name\n    longDescription\n  }\n}\n"
  }
};
})();

(node as any).hash = "760313e00b160715db7dd6991af00dc9";

export default node;
