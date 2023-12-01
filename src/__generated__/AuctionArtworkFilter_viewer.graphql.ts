/**
 * @generated SignedSource<<c5f20cdf8ad99820b64dcd3bc84ee414>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ARTIST_SERIES" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "SIMPLE_PRICE_HISTOGRAM" | "TOTAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AuctionArtworkFilter_viewer$data = {
  readonly sidebarAggregations: {
    readonly aggregations: ReadonlyArray<{
      readonly counts: ReadonlyArray<{
        readonly count: number;
        readonly name: string;
        readonly value: string;
      } | null | undefined> | null | undefined;
      readonly slice: ArtworkAggregation | null | undefined;
    } | null | undefined> | null | undefined;
    readonly counts: {
      readonly followedArtists: any | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilter_viewer">;
  readonly " $fragmentType": "AuctionArtworkFilter_viewer";
};
export type AuctionArtworkFilter_viewer$key = {
  readonly " $data"?: AuctionArtworkFilter_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionArtworkFilter_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "input",
  "variableName": "input"
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionArtworkFilter_viewer",
  "selections": [
    {
      "args": [
        (v0/*: any*/)
      ],
      "kind": "FragmentSpread",
      "name": "ArtworkFilter_viewer"
    },
    {
      "alias": "sidebarAggregations",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        (v0/*: any*/)
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
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
        },
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
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "5fba4c2b4f9d24038de90ae2bae9c11b";

export default node;
