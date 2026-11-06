/**
 * @generated SignedSource<<106d4d296cc5dc2c3b614cd841fda5dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeaderSeries_artist$data = {
  readonly artistSeriesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly featured: boolean;
        readonly forSaleArtworksCount: number;
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ArtistHeaderSeriesItem_artistSeries">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly href: string | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ArtistHeaderSeries_artist";
};
export type ArtistHeaderSeries_artist$key = {
  readonly " $data"?: ArtistHeaderSeries_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeaderSeries_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistHeaderSeries_artist",
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
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        }
      ],
      "concreteType": "ArtistSeriesConnection",
      "kind": "LinkedField",
      "name": "artistSeriesConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistSeriesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtistSeries",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtistHeaderSeriesItem_artistSeries"
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
                  "name": "featured",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "forSaleArtworksCount",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistSeriesConnection(first:10)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "bc1df01e7fa75231068fe8f0cea7b6cc";

export default node;
