/**
 * @generated SignedSource<<c18bf6c0e6a643801ffea0817b4c11ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ARTIST_SERIES" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "SIMPLE_PRICE_HISTOGRAM" | "TOTAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesApp_artistSeries$data = {
  readonly internalID: string;
  readonly railArtist: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesRail_artist">;
  } | null | undefined> | null | undefined;
  readonly sidebarAggregations: {
    readonly aggregations: ReadonlyArray<{
      readonly counts: ReadonlyArray<{
        readonly count: number;
        readonly name: string;
        readonly value: string;
      } | null | undefined> | null | undefined;
      readonly slice: ArtworkAggregation | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesArtworksFilter_artistSeries" | "ArtistSeriesHeader_artistSeries" | "ArtistSeriesMeta_artistSeries">;
  readonly " $fragmentType": "ArtistSeriesApp_artistSeries";
};
export type ArtistSeriesApp_artistSeries$key = {
  readonly " $data"?: ArtistSeriesApp_artistSeries$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesApp_artistSeries">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "aggregations"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesApp_artistSeries",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistSeriesMeta_artistSeries"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistSeriesHeader_artistSeries"
    },
    {
      "alias": "railArtist",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 1
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistSeriesRail_artist"
        }
      ],
      "storageKey": "artists(size:1)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
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
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtistSeriesArtworksFilter_artistSeries"
    },
    {
      "alias": "sidebarAggregations",
      "args": [
        {
          "kind": "Variable",
          "name": "aggregations",
          "variableName": "aggregations"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
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
  "type": "ArtistSeries",
  "abstractKey": null
};

(node as any).hash = "c6215cab1d3c95d2a542476325745470";

export default node;
