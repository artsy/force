/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type Collection_collection = {
    readonly description: string | null;
    readonly headerImage: string | null;
    readonly slug: string;
    readonly id: string;
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
                        readonly url: string;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly artworksConnection: {
        readonly counts?: {
            readonly followedArtists: number | null;
        } | null;
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
    readonly " $fragmentRefs": FragmentRefs<"Header_collection" | "CollectionArtworksFilter_collection">;
    readonly " $refType": "Collection_collection";
};
export type Collection_collection$data = Collection_collection;
export type Collection_collection$key = {
    readonly " $data"?: Collection_collection$data;
    readonly " $fragmentRefs": FragmentRefs<"Collection_collection">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v1 = {
  "kind": "Literal",
  "name": "includeMediumFilterInAggregation",
  "value": true
},
v2 = {
  "kind": "Literal",
  "name": "sort",
  "value": "-decayed_merch"
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input",
      "type": "FilterArtworksInput"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "shouldFetchCounts",
      "type": "Boolean!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Collection_collection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
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
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
      "concreteType": "MarketingCollectionQuery",
      "kind": "LinkedField",
      "name": "query",
      "plural": false,
      "selections": [
        {
          "alias": "artist_id",
          "args": null,
          "kind": "ScalarField",
          "name": "artistID",
          "storageKey": null
        },
        {
          "alias": "gene_id",
          "args": null,
          "kind": "ScalarField",
          "name": "geneID",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 16
        }
      ],
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "relatedCollections",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "RelatedCollectionsRail_collections"
        }
      ],
      "storageKey": "relatedCollections(size:16)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MarketingCollectionGroup",
      "kind": "LinkedField",
      "name": "linkedCollections",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CollectionsHubRails_linkedCollections"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "fallbackHeaderImage",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/)
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
                          "name": "width",
                          "value": 600
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
                          "name": "url",
                          "storageKey": null
                        }
                      ],
                      "storageKey": "resized(width:600)"
                    }
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
      "storageKey": "artworksConnection(first:1,includeMediumFilterInAggregation:true,sort:\"-decayed_merch\")"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "aggregations",
          "variableName": "aggregations"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworksAggregationResults",
          "kind": "LinkedField",
          "name": "aggregations",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slice",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "AggregationCount",
              "kind": "LinkedField",
              "name": "counts",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "value",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "count",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Header_artworks"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SeoProductsForArtworks_artworks"
        },
        {
          "condition": "shouldFetchCounts",
          "kind": "Condition",
          "passingValue": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "FilterArtworksCounts",
              "kind": "LinkedField",
              "name": "counts",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "followedArtists",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    },
    {
      "alias": "descending_artworks",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "sold,-has_price,-prices"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SeoProductsForCollections_descending_artworks"
        }
      ],
      "storageKey": "artworksConnection(first:1,includeMediumFilterInAggregation:true,sort:\"sold,-has_price,-prices\")"
    },
    {
      "alias": "ascending_artworks",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "Literal",
          "name": "sort",
          "value": "sold,-has_price,prices"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SeoProductsForCollections_ascending_artworks"
        }
      ],
      "storageKey": "artworksConnection(first:1,includeMediumFilterInAggregation:true,sort:\"sold,-has_price,prices\")"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Header_collection"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "kind": "FragmentSpread",
      "name": "CollectionArtworksFilter_collection"
    }
  ],
  "type": "MarketingCollection"
};
})();
(node as any).hash = '1f48511974abdd4c6a64a42ee9f22b94';
export default node;
