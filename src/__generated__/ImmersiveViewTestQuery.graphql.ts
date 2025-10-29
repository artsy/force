/**
 * @generated SignedSource<<6c8b33f93e8adc6ad16f6115c424fe50>>
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
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "larger",
    "large"
  ]
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
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
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
                    "name": "internalID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "formattedMetadata",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "aspectRatio",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "blurhash",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          (v0/*: any*/)
                        ],
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": "url(version:[\"main\",\"larger\",\"large\"])"
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 2000
                          },
                          {
                            "kind": "Literal",
                            "name": "quality",
                            "value": 85
                          },
                          (v0/*: any*/),
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 2000
                          }
                        ],
                        "concreteType": "ResizedImageUrl",
                        "kind": "LinkedField",
                        "name": "resized",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "height",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "src",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "srcSet",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "width",
                            "storageKey": null
                          }
                        ],
                        "storageKey": "resized(height:2000,quality:85,version:[\"main\",\"larger\",\"large\"],width:2000)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "db436f4bfbfc492fe8cb2132b2e415f5",
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
        "filtered_artworks.edges.immersiveArtworkNode.formattedMetadata": (v2/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.id": (v3/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "filtered_artworks.edges.immersiveArtworkNode.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "filtered_artworks.edges.immersiveArtworkNode.image.blurhash": (v2/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "filtered_artworks.edges.immersiveArtworkNode.image.resized.height": (v4/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.image.resized.src": (v5/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.image.resized.srcSet": (v5/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.image.resized.url": (v5/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.image.resized.width": (v4/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.image.url": (v2/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.internalID": (v3/*: any*/),
        "filtered_artworks.edges.immersiveArtworkNode.slug": (v3/*: any*/),
        "filtered_artworks.id": (v3/*: any*/),
        "filtered_artworks.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "filtered_artworks.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        }
      }
    },
    "name": "ImmersiveViewTestQuery",
    "operationKind": "query",
    "text": "query ImmersiveViewTestQuery {\n  filtered_artworks: artworksConnection {\n    ...ImmersiveView_filtered_artworks\n    id\n  }\n}\n\nfragment ImmersiveView_filtered_artworks on FilterArtworksConnection {\n  pageInfo {\n    hasNextPage\n  }\n  edges {\n    immersiveArtworkNode: node {\n      internalID\n      slug\n      formattedMetadata\n      image {\n        aspectRatio\n        blurhash\n        url(version: [\"main\", \"larger\", \"large\"])\n        resized(width: 2000, height: 2000, version: [\"main\", \"larger\", \"large\"], quality: 85) {\n          height\n          src\n          srcSet\n          url\n          width\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "df355cbced3dfb134883f2e725832c41";

export default node;
