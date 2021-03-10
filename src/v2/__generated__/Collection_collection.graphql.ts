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
        readonly " $fragmentRefs": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "kind": "Variable",
  "name": "aggregations",
  "variableName": "aggregations"
},
v2 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v3 = {
  "kind": "Literal",
  "name": "includeMediumFilterInAggregation",
  "value": true
},
v4 = {
  "kind": "Literal",
  "name": "size",
  "value": 1
},
v5 = {
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
    (v0/*: any*/),
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
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/)
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
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        (v1/*: any*/),
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        (v3/*: any*/),
        {
          "kind": "Literal",
          "name": "size",
          "value": 20
        },
        (v5/*: any*/)
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
        }
      ],
      "storageKey": null
    },
    {
      "alias": "descending_artworks",
      "args": [
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
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
      "storageKey": null
    },
    {
      "alias": "ascending_artworks",
      "args": [
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
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
      "storageKey": null
    },
    {
      "alias": "filtered_artworks",
      "args": [
        (v1/*: any*/),
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid_filtered_artworks"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Header_collection"
    }
  ],
  "type": "MarketingCollection"
};
})();
(node as any).hash = 'a996a7c392c99e9b03c946bf699aaaeb';
export default node;
