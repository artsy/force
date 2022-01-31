/**
 * @generated SignedSource<<9b3bd223b0f1afe0a9b01c4fc5005445>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TrendingLotsRail_viewer$data = {
  readonly trendingLotsConnection: {
    readonly edges: ReadonlyArray<{
      readonly counts: {
        readonly bidderPositions: Int | null;
      } | null;
      readonly node: {
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "TrendingLotsRail_viewer";
};
export type TrendingLotsRail_viewer$key = {
  readonly " $data"?: TrendingLotsRail_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"TrendingLotsRail_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TrendingLotsRail_viewer",
  "selections": [
    {
      "alias": "trendingLotsConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "biddableSale",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "-bidder_positions_count"
        }
      ],
      "concreteType": "SaleArtworksConnection",
      "kind": "LinkedField",
      "name": "saleArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleArtwork",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "SaleArtworkCounts",
              "kind": "LinkedField",
              "name": "counts",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "bidderPositions",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
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
                      "kind": "Literal",
                      "name": "width",
                      "value": 325
                    }
                  ],
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "saleArtworksConnection(biddableSale:true,first:10,sort:\"-bidder_positions_count\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "2005b66ba10525ca3634d80108f148ef";

export default node;
