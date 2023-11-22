/**
 * @generated SignedSource<<28f615fa5892514fd120bdabfc057b2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AnalyticsPricingContextCategoryEnum = "ARCHITECTURE" | "BOOKS_AND_PORTFOLIOS" | "DESIGN_DECORATIVE_ART" | "DRAWING_COLLAGE_OTHER_WORK_ON_PAPER" | "FASHION" | "INSTALLATION" | "JEWELRY" | "MIXED_MEDIA" | "OTHER" | "PAINTING" | "PERFORMANCE" | "PHOTOGRAPHY" | "POSTERS" | "PRINT" | "SCULPTURE" | "SOUND" | "TEXTILE" | "VIDEO_FILM_ANIMATION" | "WORK_ON_PAPER" | "%future added value";
export type AnalyticsPricingContextDimensionEnum = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PricingContext_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly slug: string;
  } | null | undefined> | null | undefined;
  readonly category: string | null | undefined;
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
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
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
  readonly " $fragmentType": "PricingContext_artwork";
};
export type PricingContext_artwork$key = {
  readonly " $data"?: PricingContext_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"PricingContext_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "minor",
    "storageKey": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PricingContext_artwork",
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
              "selections": (v0/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Money",
              "kind": "LinkedField",
              "name": "minPrice",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            }
          ],
          "type": "PriceRange",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
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
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/),
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
            (v1/*: any*/)
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "5bed9e56daed01d03014005a648b39f3";

export default node;
