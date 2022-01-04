/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AnalyticsPricingContextCategoryEnum = "ARCHITECTURE" | "BOOKS_AND_PORTFOLIOS" | "DESIGN_DECORATIVE_ART" | "DRAWING_COLLAGE_OTHER_WORK_ON_PAPER" | "FASHION" | "INSTALLATION" | "JEWELRY" | "MIXED_MEDIA" | "OTHER" | "PAINTING" | "PERFORMANCE" | "PHOTOGRAPHY" | "POSTERS" | "PRINT" | "SCULPTURE" | "SOUND" | "TEXTILE" | "VIDEO_FILM_ANIMATION" | "WORK_ON_PAPER" | "%future added value";
export type AnalyticsPricingContextDimensionEnum = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type PricingContextTestQueryVariables = {};
export type PricingContextTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"PricingContext_artwork">;
    } | null;
};
export type PricingContextTestQueryRawResponse = {
    readonly artwork: ({
        readonly listPrice: ({
            readonly __typename: "PriceRange";
            readonly maxPrice: ({
                readonly minor: number;
            }) | null;
            readonly minPrice: ({
                readonly minor: number;
            }) | null;
        } | {
            readonly __typename: "Money";
            readonly minor: number;
        } | {
            readonly __typename: string;
        }) | null;
        readonly artists: ReadonlyArray<({
            readonly slug: string;
            readonly id: string | null;
        }) | null> | null;
        readonly category: string | null;
        readonly pricingContext: ({
            readonly appliedFiltersDisplay: string | null;
            readonly appliedFilters: {
                readonly dimension: AnalyticsPricingContextDimensionEnum | null;
                readonly category: AnalyticsPricingContextCategoryEnum | null;
            };
            readonly bins: ReadonlyArray<{
                readonly maxPrice: string | null;
                readonly maxPriceCents: number;
                readonly minPrice: string | null;
                readonly minPriceCents: number;
                readonly numArtworks: number;
            }>;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type PricingContextTestQuery = {
    readonly response: PricingContextTestQueryResponse;
    readonly variables: PricingContextTestQueryVariables;
    readonly rawResponse: PricingContextTestQueryRawResponse;
};



/*
query PricingContextTestQuery {
  artwork(id: "unused") {
    ...PricingContext_artwork
    id
  }
}

fragment PricingContext_artwork on Artwork {
  listPrice {
    __typename
    ... on PriceRange {
      maxPrice {
        minor
      }
      minPrice {
        minor
      }
    }
    ... on Money {
      minor
    }
  }
  artists {
    slug
    id
  }
  category
  pricingContext {
    appliedFiltersDisplay
    appliedFilters {
      dimension
      category
    }
    bins {
      maxPrice
      maxPriceCents
      minPrice
      minPriceCents
      numArtworks
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "minor",
    "storageKey": null
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "Money",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v7 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PricingContextTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PricingContext_artwork"
          }
        ],
        "storageKey": "artwork(id:\"unused\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PricingContextTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "listPrice",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "maxPrice",
                    "plural": false,
                    "selections": (v1/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "minPrice",
                    "plural": false,
                    "selections": (v1/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "PriceRange"
              },
              {
                "kind": "InlineFragment",
                "selections": (v1/*: any*/),
                "type": "Money"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AnalyticsPricingContext",
            "kind": "LinkedField",
            "name": "pricingContext",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "appliedFiltersDisplay",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AnalyticsPriceContextFilterType",
                "kind": "LinkedField",
                "name": "appliedFilters",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "dimension",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AnalyticsHistogramBin",
                "kind": "LinkedField",
                "name": "bins",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "maxPrice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "maxPriceCents",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "minPrice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "minPriceCents",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "numArtworks",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"unused\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.id": (v4/*: any*/),
        "artwork.listPrice": {
          "type": "ListPrice",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artwork.category": (v5/*: any*/),
        "artwork.pricingContext": {
          "type": "AnalyticsPricingContext",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.listPrice.__typename": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "artwork.artists.slug": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "artwork.artists.id": (v4/*: any*/),
        "artwork.pricingContext.appliedFiltersDisplay": (v5/*: any*/),
        "artwork.pricingContext.appliedFilters": {
          "type": "AnalyticsPriceContextFilterType",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "artwork.pricingContext.bins": {
          "type": "AnalyticsHistogramBin",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "artwork.listPrice.maxPrice": (v6/*: any*/),
        "artwork.listPrice.minPrice": (v6/*: any*/),
        "artwork.listPrice.minor": (v7/*: any*/),
        "artwork.pricingContext.appliedFilters.dimension": {
          "type": "AnalyticsPricingContextDimensionEnum",
          "enumValues": [
            "LARGE",
            "MEDIUM",
            "SMALL"
          ],
          "plural": false,
          "nullable": true
        },
        "artwork.pricingContext.appliedFilters.category": {
          "type": "AnalyticsPricingContextCategoryEnum",
          "enumValues": [
            "ARCHITECTURE",
            "BOOKS_AND_PORTFOLIOS",
            "DESIGN_DECORATIVE_ART",
            "DRAWING_COLLAGE_OTHER_WORK_ON_PAPER",
            "FASHION",
            "INSTALLATION",
            "JEWELRY",
            "MIXED_MEDIA",
            "OTHER",
            "PAINTING",
            "PERFORMANCE",
            "PHOTOGRAPHY",
            "POSTERS",
            "PRINT",
            "SCULPTURE",
            "SOUND",
            "TEXTILE",
            "VIDEO_FILM_ANIMATION",
            "WORK_ON_PAPER"
          ],
          "plural": false,
          "nullable": true
        },
        "artwork.pricingContext.bins.maxPrice": (v5/*: any*/),
        "artwork.pricingContext.bins.maxPriceCents": (v7/*: any*/),
        "artwork.pricingContext.bins.minPrice": (v5/*: any*/),
        "artwork.pricingContext.bins.minPriceCents": (v7/*: any*/),
        "artwork.pricingContext.bins.numArtworks": (v7/*: any*/),
        "artwork.listPrice.maxPrice.minor": (v7/*: any*/),
        "artwork.listPrice.minPrice.minor": (v7/*: any*/)
      }
    },
    "name": "PricingContextTestQuery",
    "operationKind": "query",
    "text": "query PricingContextTestQuery {\n  artwork(id: \"unused\") {\n    ...PricingContext_artwork\n    id\n  }\n}\n\nfragment PricingContext_artwork on Artwork {\n  listPrice {\n    __typename\n    ... on PriceRange {\n      maxPrice {\n        minor\n      }\n      minPrice {\n        minor\n      }\n    }\n    ... on Money {\n      minor\n    }\n  }\n  artists {\n    slug\n    id\n  }\n  category\n  pricingContext {\n    appliedFiltersDisplay\n    appliedFilters {\n      dimension\n      category\n    }\n    bins {\n      maxPrice\n      maxPriceCents\n      minPrice\n      minPriceCents\n      numArtworks\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '70a25739091ccd910746f9d8f5511785';
export default node;
