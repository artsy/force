/**
 * @generated SignedSource<<a5004eed39aaaaa9bc647ca71b89515f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistRelatedGeneCategories_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistRelatedGeneCategories_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistRelatedGeneCategories_artist">;
  } | null | undefined;
};
export type ArtistRelatedGeneCategories_Test_Query = {
  response: ArtistRelatedGeneCategories_Test_Query$data;
  variables: ArtistRelatedGeneCategories_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
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
},
v3 = {
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
    "name": "ArtistRelatedGeneCategories_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistRelatedGeneCategories_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistRelatedGeneCategories_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GeneConnection",
                "kind": "LinkedField",
                "name": "genes",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Gene",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "internalID",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "href",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "29bb933113695f53e75561b1d9bd2c02",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.id": (v2/*: any*/),
        "artist.related": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistRelatedData"
        },
        "artist.related.genes": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GeneConnection"
        },
        "artist.related.genes.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "GeneEdge"
        },
        "artist.related.genes.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artist.related.genes.edges.node.href": (v3/*: any*/),
        "artist.related.genes.edges.node.id": (v2/*: any*/),
        "artist.related.genes.edges.node.internalID": (v2/*: any*/),
        "artist.related.genes.edges.node.name": (v3/*: any*/)
      }
    },
    "name": "ArtistRelatedGeneCategories_Test_Query",
    "operationKind": "query",
    "text": "query ArtistRelatedGeneCategories_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistRelatedGeneCategories_artist\n    id\n  }\n}\n\nfragment ArtistRelatedGeneCategories_artist on Artist {\n  related {\n    genes {\n      edges {\n        node {\n          internalID\n          href\n          name\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3552ed2ae3d5d546b93914a6dac23665";

export default node;
