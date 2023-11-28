/**
 * @generated SignedSource<<3d5d9d73113379105a05174a7b419cdd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AnalyticsPricingContextCategoryEnum = "ARCHITECTURE" | "BOOKS_AND_PORTFOLIOS" | "DESIGN_DECORATIVE_ART" | "DRAWING_COLLAGE_OTHER_WORK_ON_PAPER" | "FASHION" | "INSTALLATION" | "JEWELRY" | "MIXED_MEDIA" | "OTHER" | "PAINTING" | "PERFORMANCE" | "PHOTOGRAPHY" | "POSTERS" | "PRINT" | "SCULPTURE" | "SOUND" | "TEXTILE" | "VIDEO_FILM_ANIMATION" | "WORK_ON_PAPER" | "%future added value";
export type AnalyticsPricingContextDimensionEnum = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type PricingContextTestQuery$variables = Record<PropertyKey, never>;
export type PricingContextTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"PricingContext_artwork">;
  } | null | undefined;
};
export type PricingContextTestQuery$rawResponse = {
  readonly artwork: {
    readonly artists: ReadonlyArray<{
      readonly id: string;
      readonly slug: string;
    } | null | undefined> | null | undefined;
    readonly category: string | null | undefined;
    readonly id: string;
    readonly listPrice: {
      readonly __typename: "Money";
      readonly minor: any;
    } | {
      readonly __typename: "PriceRange";
      readonly maxPrice: {
        readonly minor: any;
      } | null | undefined;
      readonly minPrice: {
        readonly minor: any;
      } | null | undefined;
    } | {
      readonly __typename: string;
    } | null | undefined;
    readonly pricingContext: {
      readonly appliedFilters: {
        readonly category: AnalyticsPricingContextCategoryEnum | null | undefined;
        readonly dimension: AnalyticsPricingContextDimensionEnum | null | undefined;
      };
      readonly appliedFiltersDisplay: string | null | undefined;
      readonly bins: ReadonlyArray<{
        readonly maxPrice: string | null | undefined;
        readonly maxPriceCents: number;
        readonly minPrice: string | null | undefined;
        readonly minPriceCents: number;
        readonly numArtworks: number;
      }>;
    } | null | undefined;
  } | null | undefined;
};
export type PricingContextTestQuery = {
  rawResponse: PricingContextTestQuery$rawResponse;
  response: PricingContextTestQuery$data;
  variables: PricingContextTestQuery$variables;
};

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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Long"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
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
    "type": "Query",
    "abstractKey": null
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
                "type": "PriceRange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v1/*: any*/),
                "type": "Money",
                "abstractKey": null
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
    "cacheID": "b1e971a4dff21b591743d4062e780480",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v4/*: any*/),
        "artwork.artists.slug": (v4/*: any*/),
        "artwork.category": (v5/*: any*/),
        "artwork.id": (v4/*: any*/),
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "artwork.listPrice.maxPrice": (v6/*: any*/),
        "artwork.listPrice.maxPrice.minor": (v7/*: any*/),
        "artwork.listPrice.minPrice": (v6/*: any*/),
        "artwork.listPrice.minPrice.minor": (v7/*: any*/),
        "artwork.listPrice.minor": (v7/*: any*/),
        "artwork.pricingContext": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AnalyticsPricingContext"
        },
        "artwork.pricingContext.appliedFilters": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "AnalyticsPriceContextFilterType"
        },
        "artwork.pricingContext.appliedFilters.category": {
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
          "nullable": true,
          "plural": false,
          "type": "AnalyticsPricingContextCategoryEnum"
        },
        "artwork.pricingContext.appliedFilters.dimension": {
          "enumValues": [
            "LARGE",
            "MEDIUM",
            "SMALL"
          ],
          "nullable": true,
          "plural": false,
          "type": "AnalyticsPricingContextDimensionEnum"
        },
        "artwork.pricingContext.appliedFiltersDisplay": (v5/*: any*/),
        "artwork.pricingContext.bins": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "AnalyticsHistogramBin"
        },
        "artwork.pricingContext.bins.maxPrice": (v5/*: any*/),
        "artwork.pricingContext.bins.maxPriceCents": (v8/*: any*/),
        "artwork.pricingContext.bins.minPrice": (v5/*: any*/),
        "artwork.pricingContext.bins.minPriceCents": (v8/*: any*/),
        "artwork.pricingContext.bins.numArtworks": (v8/*: any*/)
      }
    },
    "name": "PricingContextTestQuery",
    "operationKind": "query",
    "text": "query PricingContextTestQuery {\n  artwork(id: \"unused\") {\n    ...PricingContext_artwork\n    id\n  }\n}\n\nfragment PricingContext_artwork on Artwork {\n  listPrice {\n    __typename\n    ... on PriceRange {\n      maxPrice {\n        minor\n      }\n      minPrice {\n        minor\n      }\n    }\n    ... on Money {\n      minor\n    }\n  }\n  artists {\n    slug\n    id\n  }\n  category\n  pricingContext {\n    appliedFiltersDisplay\n    appliedFilters {\n      dimension\n      category\n    }\n    bins {\n      maxPrice\n      maxPriceCents\n      minPrice\n      minPriceCents\n      numArtworks\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "70a25739091ccd910746f9d8f5511785";

export default node;
