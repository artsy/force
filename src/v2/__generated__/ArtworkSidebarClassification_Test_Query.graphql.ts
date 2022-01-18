/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarClassification_Test_QueryVariables = {};
export type ArtworkSidebarClassification_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarClassification_artwork">;
    } | null;
};
export type ArtworkSidebarClassification_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly attributionClass: ({
            readonly shortDescription: string | null;
            readonly id: string;
        }) | null;
        readonly id: string;
    }) | null;
};
export type ArtworkSidebarClassification_Test_Query = {
    readonly response: ArtworkSidebarClassification_Test_QueryResponse;
    readonly variables: ArtworkSidebarClassification_Test_QueryVariables;
    readonly rawResponse: ArtworkSidebarClassification_Test_QueryRawResponse;
};



/*
query ArtworkSidebarClassification_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebarClassification_artwork
    id
  }
}

fragment ArtworkSidebarClassification_artwork on Artwork {
  attributionClass {
    shortDescription
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarClassification_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarClassification_artwork"
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarClassification_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shortDescription",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ]
  },
  "params": {
    "cacheID": "3e2fee4ac8a516f21734a5b2a8093745",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v2/*: any*/),
        "artwork.attributionClass.shortDescription": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "artwork.id": (v2/*: any*/)
      }
    },
    "name": "ArtworkSidebarClassification_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarClassification_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarClassification_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attributionClass {\n    shortDescription\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3c49cd2d50ccc877d666d64c164a95f1';
export default node;
