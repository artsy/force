/**
 * @generated SignedSource<<fe3eef9833c543e3463399417b14ae59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TagArtworkFilter_tag$data = {
  readonly slug: string;
  readonly internalID: string;
  readonly sidebar: {
    readonly counts?: {
      readonly followedArtists: Int | null;
    } | null;
    readonly aggregations: ReadonlyArray<{
      readonly slice: ArtworkAggregation | null;
      readonly counts: ReadonlyArray<{
        readonly name: string;
        readonly value: string;
        readonly count: number;
      } | null> | null;
    } | null> | null;
  } | null;
  readonly filtered_artworks: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
  } | null;
  readonly " $fragmentType": "TagArtworkFilter_tag";
};
export type TagArtworkFilter_tag$key = {
  readonly " $data"?: TagArtworkFilter_tag$data;
  readonly " $fragmentSpreads": FragmentRefs<"TagArtworkFilter_tag">;
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
  "name": "TagArtworkFilter_tag",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid_filtered_artworks"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Tag",
  "abstractKey": null
};

(node as any).hash = "75fc4603531cd4a9ab6ab823cb814a0a";

export default node;
