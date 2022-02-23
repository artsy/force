/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionActiveBids_me = {
    readonly lotStandings: ReadonlyArray<{
        readonly isHighestBidder: boolean | null;
        readonly saleArtwork: {
            readonly counts: {
                readonly bidderPositions: number | null;
            } | null;
            readonly currentBid: {
                readonly display: string | null;
            } | null;
            readonly slug: string;
            readonly lotLabel: string | null;
            readonly reserveStatus: string | null;
            readonly saleID: string | null;
            readonly highestBid: {
                readonly display: string | null;
            } | null;
            readonly sale: {
                readonly liveStartAt: string | null;
                readonly endAt: string | null;
                readonly isLiveOpen: boolean | null;
                readonly isClosed: boolean | null;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"AuctionLotInfo_saleArtwork">;
        } | null;
    } | null> | null;
    readonly " $refType": "AuctionActiveBids_me";
};
export type AuctionActiveBids_me$data = AuctionActiveBids_me;
export type AuctionActiveBids_me$key = {
    readonly " $data"?: AuctionActiveBids_me$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionActiveBids_me">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "saleID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionActiveBids_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "live",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "saleID",
          "variableName": "saleID"
        }
      ],
      "concreteType": "LotStanding",
      "kind": "LinkedField",
      "name": "lotStandings",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isHighestBidder",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleArtwork",
          "kind": "LinkedField",
          "name": "saleArtwork",
          "plural": false,
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
              "concreteType": "SaleArtworkCurrentBid",
              "kind": "LinkedField",
              "name": "currentBid",
              "plural": false,
              "selections": (v0/*: any*/),
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
              "kind": "ScalarField",
              "name": "lotLabel",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "reserveStatus",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "saleID",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "SaleArtworkHighestBid",
              "kind": "LinkedField",
              "name": "highestBid",
              "plural": false,
              "selections": (v0/*: any*/),
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
                  "name": "liveStartAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isLiveOpen",
                  "storageKey": null
                },
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
              "args": [
                {
                  "kind": "Literal",
                  "name": "imageHeight",
                  "value": 100
                },
                {
                  "kind": "Literal",
                  "name": "imageWidth",
                  "value": 100
                }
              ],
              "kind": "FragmentSpread",
              "name": "AuctionLotInfo_saleArtwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();
(node as any).hash = 'ce4d279116ca20a6f48099b26921b1d6';
export default node;
