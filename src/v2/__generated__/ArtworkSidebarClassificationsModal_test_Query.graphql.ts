/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassificationsModal_test_QueryVariables = {};
export type ArtworkSidebarClassificationsModal_test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarClassificationsModal_viewer">;
    } | null;
};
export type ArtworkSidebarClassificationsModal_test_Query = {
    readonly response: ArtworkSidebarClassificationsModal_test_QueryResponse;
    readonly variables: ArtworkSidebarClassificationsModal_test_QueryVariables;
};



/*
query ArtworkSidebarClassificationsModal_test_Query {
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

const node: ConcreteRequest = (function(){
var v0 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "type": "Viewer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artworkAttributionClasses": {
          "type": "AttributionClass",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.artworkAttributionClasses.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.artworkAttributionClasses.name": (v0/*: any*/),
        "viewer.artworkAttributionClasses.longDescription": (v0/*: any*/)
      }
    },
    "name": "ArtworkSidebarClassificationsModal_test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarClassificationsModal_test_Query {\n  viewer {\n    ...ArtworkSidebarClassificationsModal_viewer\n  }\n}\n\nfragment ArtworkSidebarClassificationsModal_viewer on Viewer {\n  artworkAttributionClasses {\n    id\n    name\n    longDescription\n  }\n}\n"
  }
};
})();
(node as any).hash = '760313e00b160715db7dd6991af00dc9';
export default node;
