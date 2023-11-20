/**
 * @generated SignedSource<<5f30238da574a744b4bcd4ff191576ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ARTIST_SERIES" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "SIMPLE_PRICE_HISTOGRAM" | "TOTAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Price_artworksConnection$data = {
  readonly aggregations: ReadonlyArray<{
    readonly counts: ReadonlyArray<{
      readonly count: number;
      readonly name: string;
      readonly value: string;
    } | null> | null;
    readonly slice: ArtworkAggregation | null;
  } | null> | null;
  readonly " $fragmentType": "Price_artworksConnection";
};
export type Price_artworksConnection$key = {
  readonly " $data"?: Price_artworksConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"Price_artworksConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Price_artworksConnection",
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
  "type": "FilterArtworksConnection",
  "abstractKey": null
};

(node as any).hash = "0af65d4d9404f73410d348f01049c2a9";

export default node;
