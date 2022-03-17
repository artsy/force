/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "SIMPLE_PRICE_HISTOGRAM" | "TOTAL" | "%future added value";
export type ArtistSeriesApp_artistSeries = {
    readonly railArtist: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesRail_artist">;
    } | null> | null;
    readonly internalID: string;
    readonly slug: string;
    readonly sidebarAggregations: {
        readonly aggregations: ReadonlyArray<{
            readonly slice: ArtworkAggregation | null;
            readonly counts: ReadonlyArray<{
                readonly name: string;
                readonly value: string;
                readonly count: number;
            } | null> | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesMeta_artistSeries" | "ArtistSeriesHeader_artistSeries" | "ArtistSeriesArtworksFilter_artistSeries">;
    readonly " $refType": "ArtistSeriesApp_artistSeries";
};
export type ArtistSeriesApp_artistSeries$data = ArtistSeriesApp_artistSeries;
export type ArtistSeriesApp_artistSeries$key = {
    readonly " $data"?: ArtistSeriesApp_artistSeries$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesApp_artistSeries">;
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
    },
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
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtistSeriesArtworksFilter_artistSeries"
    }
  ],
  "type": "ArtistSeries",
  "abstractKey": null
};
(node as any).hash = 'c6215cab1d3c95d2a542476325745470';
export default node;
