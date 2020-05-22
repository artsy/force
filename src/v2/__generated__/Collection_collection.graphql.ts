/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Collection_collection = {
    readonly description: string | null;
    readonly headerImage: string | null;
    readonly slug: string;
    readonly title: string;
    readonly query: {
        readonly artist_id: string | null;
        readonly gene_id: string | null;
    };
    readonly relatedCollections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"RelatedCollectionsRail_collections">;
    }>;
    readonly linkedCollections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"CollectionsHubRails_linkedCollections">;
    }>;
    readonly fallbackHeaderImage: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly image: {
                    readonly resized: {
                        readonly url: string | null;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly artworksConnection: {
        readonly aggregations: ReadonlyArray<{
            readonly slice: ArtworkAggregation | null;
            readonly counts: ReadonlyArray<{
                readonly value: string;
                readonly name: string;
                readonly count: number;
            } | null> | null;
        } | null> | null;
        readonly " $fragmentRefs": FragmentRefs<"Header_artworks" | "SeoProductsForArtworks_artworks">;
    } | null;
    readonly descending_artworks: {
        readonly " $fragmentRefs": FragmentRefs<"SeoProductsForCollections_descending_artworks">;
    } | null;
    readonly ascending_artworks: {
        readonly " $fragmentRefs": FragmentRefs<"SeoProductsForCollections_ascending_artworks">;
    } | null;
    readonly filtered_artworks: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"ArtworkFilterArtworkGrid2_filtered_artworks">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"Header_collection">;
    readonly " $refType": "Collection_collection";
};
export type Collection_collection$data = Collection_collection;
export type Collection_collection$key = {
    readonly " $data"?: Collection_collection$data;
    readonly " $fragmentRefs": FragmentRefs<"Collection_collection">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "aggregations",
  "variableName": "aggregations"
},
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v2 = {
  "kind": "Literal",
  "name": "includeMediumFilterInAggregation",
  "value": true
},
v3 = {
  "kind": "Literal",
  "name": "size",
  "value": 1
},
v4 = {
  "kind": "Literal",
  "name": "sort",
  "value": "-decayed_merch"
};
return {
  "kind": "Fragment",
  "name": "Collection_collection",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "acquireable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "atAuction",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "color",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "forSale",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "height",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "inquireableOnly",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "majorPeriods",
      "type": "[String]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "medium",
      "type": "String",
      "defaultValue": "*"
    },
    {
      "kind": "LocalArgument",
      "name": "offerable",
      "type": "Boolean",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "page",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "priceRange",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "String",
      "defaultValue": "-partner_updated_at"
    },
    {
      "kind": "LocalArgument",
      "name": "width",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "headerImage",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "query",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollectionQuery",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "artist_id",
          "name": "artistID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "gene_id",
          "name": "geneID",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "relatedCollections",
      "storageKey": "relatedCollections(size:16)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 16
        }
      ],
      "concreteType": "MarketingCollection",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "RelatedCollectionsRail_collections",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "linkedCollections",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollectionGroup",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CollectionsHubRails_linkedCollections",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "fallbackHeaderImage",
      "name": "artworksConnection",
      "storageKey": null,
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/)
      ],
      "concreteType": "FilterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Artwork",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "image",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Image",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "resized",
                      "storageKey": "resized(width:600)",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 600
                        }
                      ],
                      "concreteType": "ResizedImageUrl",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "url",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworksConnection",
      "storageKey": null,
      "args": [
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        (v2/*: any*/),
        {
          "kind": "Literal",
          "name": "size",
          "value": 20
        },
        (v4/*: any*/)
      ],
      "concreteType": "FilterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "aggregations",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtworksAggregationResults",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "slice",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "counts",
              "storageKey": null,
              "args": null,
              "concreteType": "AggregationCount",
              "plural": true,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "value",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "name",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "count",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "Header_artworks",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "SeoProductsForArtworks_artworks",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "descending_artworks",
      "name": "artworksConnection",
      "storageKey": null,
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "sold,-has_price,-prices"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "SeoProductsForCollections_descending_artworks",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "ascending_artworks",
      "name": "artworksConnection",
      "storageKey": null,
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "sold,-has_price,prices"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "SeoProductsForCollections_ascending_artworks",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "filtered_artworks",
      "name": "artworksConnection",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "acquireable",
          "variableName": "acquireable"
        },
        (v0/*: any*/),
        {
          "kind": "Variable",
          "name": "atAuction",
          "variableName": "atAuction"
        },
        {
          "kind": "Variable",
          "name": "color",
          "variableName": "color"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "forSale",
          "variableName": "forSale"
        },
        {
          "kind": "Variable",
          "name": "height",
          "variableName": "height"
        },
        {
          "kind": "Variable",
          "name": "inquireableOnly",
          "variableName": "inquireableOnly"
        },
        {
          "kind": "Variable",
          "name": "majorPeriods",
          "variableName": "majorPeriods"
        },
        {
          "kind": "Variable",
          "name": "medium",
          "variableName": "medium"
        },
        {
          "kind": "Variable",
          "name": "offerable",
          "variableName": "offerable"
        },
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
        {
          "kind": "Variable",
          "name": "priceRange",
          "variableName": "priceRange"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        },
        {
          "kind": "Variable",
          "name": "width",
          "variableName": "width"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid2_filtered_artworks",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "Header_collection",
      "args": null
    }
  ]
};
})();
(node as any).hash = '3c621efaa9767196511102dded3f9f2d';
export default node;
