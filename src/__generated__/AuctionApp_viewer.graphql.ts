/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionApp_viewer = {
    readonly showFollowedArtistsTab: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"AuctionArtworkFilter_viewer" | "AuctionWorksByFollowedArtistsRail_viewer" | "AuctionCurrentAuctionsRail_viewer">;
    readonly " $refType": "AuctionApp_viewer";
};
export type AuctionApp_viewer$data = AuctionApp_viewer;
export type AuctionApp_viewer$key = {
    readonly " $data"?: AuctionApp_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AuctionApp_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "saleID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionApp_viewer",
  "selections": [
    {
      "alias": "showFollowedArtistsTab",
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TOTAL"
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "includeArtworksByFollowedArtists",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "saleSlug",
          "variableName": "saleID"
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
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "kind": "FragmentSpread",
      "name": "AuctionArtworkFilter_viewer"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "saleID",
          "variableName": "saleID"
        }
      ],
      "kind": "FragmentSpread",
      "name": "AuctionWorksByFollowedArtistsRail_viewer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionCurrentAuctionsRail_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'd761435e9548123e40861cc1ad7ea4a0';
export default node;
