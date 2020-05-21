/* tslint:disable */

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
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "ArtworkSidebarCurrentBidInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "is_closed",
          "name": "isClosed",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "is_live_open",
          "name": "isLiveOpen",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "is_with_buyers_premium",
          "name": "isWithBuyersPremium",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "sale_artwork",
      "name": "saleArtwork",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtwork",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "is_with_reserve",
          "name": "isWithReserve",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "reserve_message",
          "name": "reserveMessage",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "reserve_status",
          "name": "reserveStatus",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": "current_bid",
          "name": "currentBid",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworkCurrentBid",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "counts",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworkCounts",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": "bidder_positions",
              "name": "bidderPositions",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "myLotStanding",
      "storageKey": "myLotStanding(live:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "live",
          "value": true
        }
      ],
      "concreteType": "LotStanding",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": "active_bid",
          "name": "activeBid",
          "storageKey": null,
          "args": null,
          "concreteType": "BidderPosition",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": "is_winning",
              "name": "isWinning",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": "most_recent_bid",
          "name": "mostRecentBid",
          "storageKey": null,
          "args": null,
          "concreteType": "BidderPosition",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": "max_bid",
              "name": "maxBid",
              "storageKey": null,
              "args": null,
              "concreteType": "BidderPositionMaxBid",
              "plural": false,
              "selections": (v0/*: any*/)
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '683ff598c60c16fd85ebe10e5225e24d';
export default node;
