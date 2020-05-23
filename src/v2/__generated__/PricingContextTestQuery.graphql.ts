/* tslint:disable */

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
    "kind": "ScalarField",
    "alias": null,
    "name": "minor",
    "args": null,
    "storageKey": null
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "category",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PricingContextTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"unused\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "PricingContext_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PricingContextTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"unused\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "listPrice",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "type": "PriceRange",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "maxPrice",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Money",
                    "plural": false,
                    "selections": (v1/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "minPrice",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Money",
                    "plural": false,
                    "selections": (v1/*: any*/)
                  }
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Money",
                "selections": (v1/*: any*/)
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "slug",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
          },
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pricingContext",
            "storageKey": null,
            "args": null,
            "concreteType": "AnalyticsPricingContext",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "appliedFiltersDisplay",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "appliedFilters",
                "storageKey": null,
                "args": null,
                "concreteType": "AnalyticsPriceContextFilterType",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "dimension",
                    "args": null,
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "bins",
                "storageKey": null,
                "args": null,
                "concreteType": "AnalyticsHistogramBin",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "maxPrice",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "maxPriceCents",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "minPrice",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "minPriceCents",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "numArtworks",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PricingContextTestQuery",
    "id": null,
    "text": "query PricingContextTestQuery {\n  artwork(id: \"unused\") {\n    ...PricingContext_artwork\n    id\n  }\n}\n\nfragment PricingContext_artwork on Artwork {\n  listPrice {\n    __typename\n    ... on PriceRange {\n      maxPrice {\n        minor\n      }\n      minPrice {\n        minor\n      }\n    }\n    ... on Money {\n      minor\n    }\n  }\n  artists {\n    slug\n    id\n  }\n  category\n  pricingContext {\n    appliedFiltersDisplay\n    appliedFilters {\n      dimension\n      category\n    }\n    bins {\n      maxPrice\n      maxPriceCents\n      minPrice\n      minPriceCents\n      numArtworks\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '37bdf393ca38349295578c08ff133e1e';
export default node;
