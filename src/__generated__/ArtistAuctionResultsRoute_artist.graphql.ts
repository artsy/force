/**
 * @generated SignedSource<<c8fe38c23c2f757725a0be0f1a8294d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AuctionResultsAggregation = "CURRENCIES_COUNT" | "LOTS_BY_SALE_YEAR" | "SIMPLE_PRICE_HISTOGRAM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResultsRoute_artist$data = {
  readonly sidebarAggregations: {
    readonly aggregations: ReadonlyArray<{
      readonly counts: ReadonlyArray<{
        readonly count: number;
        readonly name: string;
        readonly value: string;
      } | null> | null;
      readonly slice: AuctionResultsAggregation | null;
    } | null> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResults_artist">;
  readonly " $fragmentType": "ArtistAuctionResultsRoute_artist";
};
export type ArtistAuctionResultsRoute_artist$key = {
  readonly " $data"?: ArtistAuctionResultsRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultsRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "allowEmptyCreatedDates"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "categories"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "createdAfterYear"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "createdBeforeYear"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "currency"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "includeEstimateRange"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "includeUnknownPrices"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "organizations"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "page"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "priceRange"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sizes"
    },
    {
      "defaultValue": "ALL",
      "kind": "LocalArgument",
      "name": "state"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAuctionResultsRoute_artist",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "allowEmptyCreatedDates",
          "variableName": "allowEmptyCreatedDates"
        },
        {
          "kind": "Variable",
          "name": "categories",
          "variableName": "categories"
        },
        {
          "kind": "Variable",
          "name": "createdAfterYear",
          "variableName": "createdAfterYear"
        },
        {
          "kind": "Variable",
          "name": "createdBeforeYear",
          "variableName": "createdBeforeYear"
        },
        {
          "kind": "Variable",
          "name": "currency",
          "variableName": "currency"
        },
        {
          "kind": "Variable",
          "name": "includeEstimateRange",
          "variableName": "includeEstimateRange"
        },
        {
          "kind": "Variable",
          "name": "includeUnknownPrices",
          "variableName": "includeUnknownPrices"
        },
        {
          "kind": "Variable",
          "name": "organizations",
          "variableName": "organizations"
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
          "name": "sizes",
          "variableName": "sizes"
        },
        {
          "kind": "Variable",
          "name": "state",
          "variableName": "state"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtistAuctionResults_artist"
    },
    {
      "alias": "sidebarAggregations",
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "SIMPLE_PRICE_HISTOGRAM",
            "CURRENCIES_COUNT"
          ]
        }
      ],
      "concreteType": "AuctionResultConnection",
      "kind": "LinkedField",
      "name": "auctionResultsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AuctionResultsAggregationType",
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
                  "name": "name",
                  "storageKey": null
                },
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
                  "name": "count",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "auctionResultsConnection(aggregations:[\"SIMPLE_PRICE_HISTOGRAM\",\"CURRENCIES_COUNT\"])"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "8a4aec5718ff9101680e9fa540c50c9c";

export default node;
