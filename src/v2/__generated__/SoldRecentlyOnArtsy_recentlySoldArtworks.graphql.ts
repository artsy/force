/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SoldRecentlyOnArtsy_recentlySoldArtworks = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly artwork: {
                readonly slug: string;
                readonly href: string | null;
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
            } | null;
            readonly lowEstimateUSD: string | null;
            readonly highEstimateUSD: string | null;
            readonly priceRealized: string | null;
        } | null;
    } | null> | null;
    readonly " $refType": "SoldRecentlyOnArtsy_recentlySoldArtworks";
};
export type SoldRecentlyOnArtsy_recentlySoldArtworks$data = SoldRecentlyOnArtsy_recentlySoldArtworks;
export type SoldRecentlyOnArtsy_recentlySoldArtworks$key = {
    readonly " $data"?: SoldRecentlyOnArtsy_recentlySoldArtworks$data;
    readonly " $fragmentRefs": FragmentRefs<"SoldRecentlyOnArtsy_recentlySoldArtworks">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SoldRecentlyOnArtsy_recentlySoldArtworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "RecentlySoldArtworkTypeEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "RecentlySoldArtworkType",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "artwork",
              "plural": false,
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
                  "name": "href",
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lowEstimateUSD",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "highEstimateUSD",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "priceRealized",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RecentlySoldArtworkTypeConnection",
  "abstractKey": null
};
(node as any).hash = '37ecd81ac9b840ece5f7beb96d0f7d25';
export default node;
