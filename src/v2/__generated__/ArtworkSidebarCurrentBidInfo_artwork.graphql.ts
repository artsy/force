/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCurrentBidInfo_artwork = {
    readonly sale: {
        readonly is_closed: boolean | null;
        readonly is_live_open: boolean | null;
        readonly internalID: string;
        readonly is_with_buyers_premium: boolean | null;
    } | null;
    readonly sale_artwork: {
        readonly is_with_reserve: boolean | null;
        readonly reserve_message: string | null;
        readonly reserve_status: string | null;
        readonly current_bid: {
            readonly display: string | null;
        } | null;
        readonly counts: {
            readonly bidder_positions: number | null;
        } | null;
    } | null;
    readonly myLotStanding: ReadonlyArray<{
        readonly active_bid: {
            readonly is_winning: boolean | null;
        } | null;
        readonly most_recent_bid: {
            readonly max_bid: {
                readonly display: string | null;
            } | null;
        } | null;
    }> | null;
    readonly " $refType": "ArtworkSidebarCurrentBidInfo_artwork";
};
export type ArtworkSidebarCurrentBidInfo_artwork$data = ArtworkSidebarCurrentBidInfo_artwork;
export type ArtworkSidebarCurrentBidInfo_artwork$key = {
    readonly " $data"?: ArtworkSidebarCurrentBidInfo_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarCurrentBidInfo_artwork">;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarCurrentBidInfo_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "alias": "is_closed",
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        },
        {
          "alias": "is_live_open",
          "args": null,
          "kind": "ScalarField",
          "name": "isLiveOpen",
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
          "alias": "is_with_buyers_premium",
          "args": null,
          "kind": "ScalarField",
          "name": "isWithBuyersPremium",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "sale_artwork",
      "args": null,
      "concreteType": "SaleArtwork",
      "kind": "LinkedField",
      "name": "saleArtwork",
      "plural": false,
      "selections": [
        {
          "alias": "is_with_reserve",
          "args": null,
          "kind": "ScalarField",
          "name": "isWithReserve",
          "storageKey": null
        },
        {
          "alias": "reserve_message",
          "args": null,
          "kind": "ScalarField",
          "name": "reserveMessage",
          "storageKey": null
        },
        {
          "alias": "reserve_status",
          "args": null,
          "kind": "ScalarField",
          "name": "reserveStatus",
          "storageKey": null
        },
        {
          "alias": "current_bid",
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
          "concreteType": "SaleArtworkCounts",
          "kind": "LinkedField",
          "name": "counts",
          "plural": false,
          "selections": [
            {
              "alias": "bidder_positions",
              "args": null,
              "kind": "ScalarField",
              "name": "bidderPositions",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "live",
          "value": true
        }
      ],
      "concreteType": "LotStanding",
      "kind": "LinkedField",
      "name": "myLotStanding",
      "plural": true,
      "selections": [
        {
          "alias": "active_bid",
          "args": null,
          "concreteType": "BidderPosition",
          "kind": "LinkedField",
          "name": "activeBid",
          "plural": false,
          "selections": [
            {
              "alias": "is_winning",
              "args": null,
              "kind": "ScalarField",
              "name": "isWinning",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": "most_recent_bid",
          "args": null,
          "concreteType": "BidderPosition",
          "kind": "LinkedField",
          "name": "mostRecentBid",
          "plural": false,
          "selections": [
            {
              "alias": "max_bid",
              "args": null,
              "concreteType": "BidderPositionMaxBid",
              "kind": "LinkedField",
              "name": "maxBid",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "myLotStanding(live:true)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = '683ff598c60c16fd85ebe10e5225e24d';
export default node;
