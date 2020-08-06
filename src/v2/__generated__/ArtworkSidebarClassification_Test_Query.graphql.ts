/* tslint:disable */

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
        readonly attribution_class: ({
            readonly short_description: string | null;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
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
  attribution_class: attributionClass {
    short_description: shortDescription
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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarClassification_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarClassification_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarClassification_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "attribution_class",
            "name": "attributionClass",
            "storageKey": null,
            "args": null,
            "concreteType": "AttributionClass",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": "short_description",
                "name": "shortDescription",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkSidebarClassification_Test_Query",
    "id": null,
    "text": "query ArtworkSidebarClassification_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarClassification_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attribution_class: attributionClass {\n    short_description: shortDescription\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '13d0ba093452b5e89ba37473076138c8';
export default node;
