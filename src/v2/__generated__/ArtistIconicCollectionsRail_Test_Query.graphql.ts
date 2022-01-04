/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistIconicCollectionsRail_Test_QueryVariables = {
    isFeaturedArtistContent?: boolean | null;
    size?: number | null;
    artistID?: string | null;
};
export type ArtistIconicCollectionsRail_Test_QueryResponse = {
    readonly marketingCollections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ArtistIconicCollectionsRail_marketingCollections">;
    }>;
};
export type ArtistIconicCollectionsRail_Test_Query = {
    readonly response: ArtistIconicCollectionsRail_Test_QueryResponse;
    readonly variables: ArtistIconicCollectionsRail_Test_QueryVariables;
};



/*
query ArtistIconicCollectionsRail_Test_Query(
  $isFeaturedArtistContent: Boolean
  $size: Int
  $artistID: String
) {
  marketingCollections(isFeaturedArtistContent: $isFeaturedArtistContent, size: $size, artistID: $artistID) {
    ...ArtistIconicCollectionsRail_marketingCollections
    id
  }
}

fragment ArtistIconicCollectionsRail_marketingCollections on MarketingCollection {
  headerImage
  thumbnail
  slug
  title
  priceGuidance
  artworksConnection(first: 1, aggregations: [TOTAL], sort: "-decayed_merch") {
    edges {
      node {
        image {
          resized(width: 325, height: 230) {
            width
            height
            src
            srcSet
          }
        }
        id
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "isFeaturedArtistContent",
    "type": "Boolean"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "size",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String"
  }
],
v1 = [
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v6 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistIconicCollectionsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtistIconicCollectionsRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:1,sort:\"-decayed_merch\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "marketingCollections": {
          "type": "MarketingCollection",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "marketingCollections.id": (v3/*: any*/),
        "marketingCollections.headerImage": (v4/*: any*/),
        "marketingCollections.thumbnail": (v4/*: any*/),
        "marketingCollections.slug": (v5/*: any*/),
        "marketingCollections.title": (v5/*: any*/),
        "marketingCollections.priceGuidance": {
          "type": "Float",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollections.artworksConnection": {
          "type": "FilterArtworksConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollections.artworksConnection.edges": {
          "type": "FilterArtworksEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "marketingCollections.artworksConnection.id": (v3/*: any*/),
        "marketingCollections.artworksConnection.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollections.artworksConnection.edges.node.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollections.artworksConnection.edges.node.id": (v3/*: any*/),
        "marketingCollections.artworksConnection.edges.node.image.resized": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "marketingCollections.artworksConnection.edges.node.image.resized.width": (v6/*: any*/),
        "marketingCollections.artworksConnection.edges.node.image.resized.height": (v6/*: any*/),
        "marketingCollections.artworksConnection.edges.node.image.resized.src": (v5/*: any*/),
        "marketingCollections.artworksConnection.edges.node.image.resized.srcSet": (v5/*: any*/)
      }
    },
    "name": "ArtistIconicCollectionsRail_Test_Query",
    "operationKind": "query",
    "text": "query ArtistIconicCollectionsRail_Test_Query(\n  $isFeaturedArtistContent: Boolean\n  $size: Int\n  $artistID: String\n) {\n  marketingCollections(isFeaturedArtistContent: $isFeaturedArtistContent, size: $size, artistID: $artistID) {\n    ...ArtistIconicCollectionsRail_marketingCollections\n    id\n  }\n}\n\nfragment ArtistIconicCollectionsRail_marketingCollections on MarketingCollection {\n  headerImage\n  thumbnail\n  slug\n  title\n  priceGuidance\n  artworksConnection(first: 1, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        image {\n          resized(width: 325, height: 230) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fc533b8a0e95a07203e96b8351ebf251';
export default node;
