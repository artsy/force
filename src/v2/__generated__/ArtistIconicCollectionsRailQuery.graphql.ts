/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistIconicCollectionsRailQueryVariables = {
    isFeaturedArtistContent?: boolean | null;
    size?: number | null;
    internalID?: string | null;
};
export type ArtistIconicCollectionsRailQueryResponse = {
    readonly marketingCollections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ArtistIconicCollectionsRail_marketingCollections">;
    }>;
};
export type ArtistIconicCollectionsRailQuery = {
    readonly response: ArtistIconicCollectionsRailQueryResponse;
    readonly variables: ArtistIconicCollectionsRailQueryVariables;
};



/*
query ArtistIconicCollectionsRailQuery(
  $isFeaturedArtistContent: Boolean
  $size: Int
  $internalID: String
) {
  marketingCollections(isFeaturedArtistContent: $isFeaturedArtistContent, size: $size, artistID: $internalID) {
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
    "name": "internalID",
    "type": "String"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "artistID",
    "variableName": "internalID"
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistIconicCollectionsRailQuery",
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
    "name": "ArtistIconicCollectionsRailQuery",
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
    "metadata": {},
    "name": "ArtistIconicCollectionsRailQuery",
    "operationKind": "query",
    "text": "query ArtistIconicCollectionsRailQuery(\n  $isFeaturedArtistContent: Boolean\n  $size: Int\n  $internalID: String\n) {\n  marketingCollections(isFeaturedArtistContent: $isFeaturedArtistContent, size: $size, artistID: $internalID) {\n    ...ArtistIconicCollectionsRail_marketingCollections\n    id\n  }\n}\n\nfragment ArtistIconicCollectionsRail_marketingCollections on MarketingCollection {\n  headerImage\n  thumbnail\n  slug\n  title\n  priceGuidance\n  artworksConnection(first: 1, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        image {\n          resized(width: 325, height: 230) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '16b2ee794c09a8f1354209f080fbe116';
export default node;
