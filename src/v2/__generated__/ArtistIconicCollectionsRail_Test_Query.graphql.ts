/**
 * @generated SignedSource<<dcfa0960766623562650c5b6e6979465>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistIconicCollectionsRail_Test_Query$variables = {
  isFeaturedArtistContent?: boolean | null;
  size?: number | null;
  artistID?: string | null;
};
export type ArtistIconicCollectionsRail_Test_Query$data = {
  readonly marketingCollections: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ArtistIconicCollectionsRail_marketingCollections">;
  }>;
};
export type ArtistIconicCollectionsRail_Test_Query = {
  variables: ArtistIconicCollectionsRail_Test_Query$variables;
  response: ArtistIconicCollectionsRail_Test_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artistID"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "isFeaturedArtistContent"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "size"
},
v3 = [
  {
    "kind": "Variable",
    "name": "artistID",
    "variableName": "artistID"
  },
  {
    "kind": "Variable",
    "name": "isFeaturedArtistContent",
    "variableName": "isFeaturedArtistContent"
  },
  {
    "kind": "Variable",
    "name": "size",
    "variableName": "size"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistIconicCollectionsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollections",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistIconicCollectionsRail_marketingCollections"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ArtistIconicCollectionsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollections",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "headerImage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "thumbnail",
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceGuidance",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "TOTAL"
                ]
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "-decayed_merch"
              }
            ],
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
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
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
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 230
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 325
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
                                "name": "width",
                                "storageKey": null
                              },
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
                              }
                            ],
                            "storageKey": "resized(height:230,width:325)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:1,sort:\"-decayed_merch\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5ab281aa4ab75b0f63c2af5dfbfbb253",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "marketingCollections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "MarketingCollection"
        },
        "marketingCollections.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "marketingCollections.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "marketingCollections.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "marketingCollections.artworksConnection.edges.node.id": (v5/*: any*/),
        "marketingCollections.artworksConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "marketingCollections.artworksConnection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "marketingCollections.artworksConnection.edges.node.image.resized.height": (v6/*: any*/),
        "marketingCollections.artworksConnection.edges.node.image.resized.src": (v7/*: any*/),
        "marketingCollections.artworksConnection.edges.node.image.resized.srcSet": (v7/*: any*/),
        "marketingCollections.artworksConnection.edges.node.image.resized.width": (v6/*: any*/),
        "marketingCollections.artworksConnection.id": (v5/*: any*/),
        "marketingCollections.headerImage": (v8/*: any*/),
        "marketingCollections.id": (v5/*: any*/),
        "marketingCollections.priceGuidance": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "marketingCollections.slug": (v7/*: any*/),
        "marketingCollections.thumbnail": (v8/*: any*/),
        "marketingCollections.title": (v7/*: any*/)
      }
    },
    "name": "ArtistIconicCollectionsRail_Test_Query",
    "operationKind": "query",
    "text": "query ArtistIconicCollectionsRail_Test_Query(\n  $isFeaturedArtistContent: Boolean\n  $size: Int\n  $artistID: String\n) {\n  marketingCollections(isFeaturedArtistContent: $isFeaturedArtistContent, size: $size, artistID: $artistID) {\n    ...ArtistIconicCollectionsRail_marketingCollections\n    id\n  }\n}\n\nfragment ArtistIconicCollectionsRail_marketingCollections on MarketingCollection {\n  headerImage\n  thumbnail\n  slug\n  title\n  priceGuidance\n  artworksConnection(first: 1, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        image {\n          resized(width: 325, height: 230) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fc533b8a0e95a07203e96b8351ebf251";

export default node;
