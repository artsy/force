/**
 * @generated SignedSource<<ee51615d52fbd0512345c6fef03b6d3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TrendingLotsRail_viewer$data = {
  readonly trendingLotsConnection: {
    readonly edges: ReadonlyArray<{
      readonly counts: {
        readonly bidderPositions: any | null | undefined;
      } | null | undefined;
      readonly node: {
        readonly collectorSignals: {
          readonly auction: {
            readonly bidCount: number;
            readonly lotWatcherCount: number;
          } | null | undefined;
        } | null | undefined;
        readonly internalID: string;
        readonly sale: {
          readonly isClosed: boolean | null | undefined;
        } | null | undefined;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
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
          "name": "estimateRange",
          "value": "5_000_00-*"
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
                  "alias": null,
                  "args": null,
                  "concreteType": "Sale",
                  "kind": "LinkedField",
                  "name": "sale",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isClosed",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CollectorSignals",
                  "kind": "LinkedField",
                  "name": "collectorSignals",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "AuctionCollectorSignals",
                      "kind": "LinkedField",
                      "name": "auction",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "bidCount",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "lotWatcherCount",
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
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "saleArtworksConnection(biddableSale:true,estimateRange:\"5_000_00-*\",first:10,sort:\"-bidder_positions_count\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "94e97aa738fa425ddba019bee65452b0";

export default node;
