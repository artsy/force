/**
 * @generated SignedSource<<a5123c4aa3d0a51d5601060ef47a510e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "SIMPLE_PRICE_HISTOGRAM" | "TOTAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Works_partner$data = {
  readonly filtered_artworks: {
    readonly counts: {
      readonly total: any | null;
    } | null;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
  } | null;
  readonly internalID: string;
  readonly sidebar: {
    readonly aggregations: ReadonlyArray<{
      readonly counts: ReadonlyArray<{
        readonly count: number;
        readonly name: string;
        readonly value: string;
      } | null> | null;
      readonly slice: ArtworkAggregation | null;
    } | null> | null;
    readonly counts?: {
      readonly followedArtists: any | null;
    } | null;
  } | null;
  readonly slug: string;
  readonly " $fragmentType": "Works_partner";
};
export type Works_partner$key = {
  readonly " $data"?: Works_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"Works_partner">;
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
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "shouldFetchCounts"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Works_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": "sidebar",
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
          "condition": "shouldFetchCounts",
          "kind": "Condition",
          "passingValue": true,
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
            }
          ]
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
    },
    {
      "alias": "filtered_artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
        },
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
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
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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
              "args": [
                {
                  "kind": "Literal",
                  "name": "format",
                  "value": "0,0"
                }
              ],
              "kind": "ScalarField",
              "name": "total",
              "storageKey": "total(format:\"0,0\")"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid_filtered_artworks"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "8717354f1f5956bc30748da7d832e576";

export default node;
