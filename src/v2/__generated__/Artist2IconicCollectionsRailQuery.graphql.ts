/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2IconicCollectionsRailQueryVariables = {
    isFeaturedArtistContent?: boolean | null;
    size?: number | null;
    artistID?: string | null;
};
export type Artist2IconicCollectionsRailQueryResponse = {
    readonly marketingCollections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Artist2IconicCollectionsRail_marketingCollections">;
    }>;
};
export type Artist2IconicCollectionsRailQuery = {
    readonly response: Artist2IconicCollectionsRailQueryResponse;
    readonly variables: Artist2IconicCollectionsRailQueryVariables;
};



/*
query Artist2IconicCollectionsRailQuery(
  $isFeaturedArtistContent: Boolean
  $size: Int
  $artistID: String
) {
  marketingCollections(isFeaturedArtistContent: $isFeaturedArtistContent, size: $size, artistID: $artistID) {
    ...Artist2IconicCollectionsRail_marketingCollections
    id
  }
}

fragment Artist2IconicCollectionsRail_marketingCollections on MarketingCollection {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Artist2IconicCollectionsRailQuery",
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
            "name": "Artist2IconicCollectionsRail_marketingCollections"
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
    "name": "Artist2IconicCollectionsRailQuery",
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
    "name": "Artist2IconicCollectionsRailQuery",
    "operationKind": "query",
    "text": "query Artist2IconicCollectionsRailQuery(\n  $isFeaturedArtistContent: Boolean\n  $size: Int\n  $artistID: String\n) {\n  marketingCollections(isFeaturedArtistContent: $isFeaturedArtistContent, size: $size, artistID: $artistID) {\n    ...Artist2IconicCollectionsRail_marketingCollections\n    id\n  }\n}\n\nfragment Artist2IconicCollectionsRail_marketingCollections on MarketingCollection {\n  headerImage\n  thumbnail\n  slug\n  title\n  priceGuidance\n  artworksConnection(first: 1, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        image {\n          resized(width: 325, height: 230) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e621707d28d50057cd8b3a00913fb446';
export default node;
