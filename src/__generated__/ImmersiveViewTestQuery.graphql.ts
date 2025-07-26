/**
 * @generated SignedSource<<b1c50231396502ff8a11ea943fcf2a1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ImmersiveViewTestQuery$variables = Record<PropertyKey, never>;
export type ImmersiveViewTestQuery$data = {
  readonly filtered_artworks: {
    readonly " $fragmentSpreads": FragmentRefs<"ImmersiveView_filtered_artworks">;
  } | null | undefined;
};
export type ImmersiveViewTestQuery = {
  response: ImmersiveViewTestQuery$data;
  variables: ImmersiveViewTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
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
    "name": "ImmersiveViewTestQuery",
    "selections": [
      {
        "alias": "filtered_artworks",
        "args": null,
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ImmersiveView_filtered_artworks"
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
    "name": "ImmersiveViewTestQuery",
    "selections": [
      {
        "alias": "filtered_artworks",
        "args": null,
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FilterArtworksEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": "immersiveArtworkNode",
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f6558e1a7ea490fcc501c5997d6408c4",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "filtered_artworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "filtered_artworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "filtered_artworks.edges.immersiveArtworkNode": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "filtered_artworks.edges.immersiveArtworkNode.id": (v1/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.slug": (v1/*: any*/),
        "filtered_artworks.id": (v1/*: any*/)
      }
    },
    "name": "ImmersiveViewTestQuery",
    "operationKind": "query",
    "text": "query ImmersiveViewTestQuery {\n  filtered_artworks: artworksConnection {\n    ...ImmersiveView_filtered_artworks\n    id\n  }\n}\n\nfragment ImmersiveView_filtered_artworks on FilterArtworksConnection {\n  edges {\n    immersiveArtworkNode: node {\n      slug\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "df355cbced3dfb134883f2e725832c41";

export default node;
