/**
 * @generated SignedSource<<7bf8e3402f58f85d6f422db397e77b00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCurrentBidInfo_artwork$data = {
  readonly myLotStanding: ReadonlyArray<{
    readonly active_bid: {
      readonly is_winning: boolean | null | undefined;
    } | null | undefined;
    readonly most_recent_bid: {
      readonly max_bid: {
        readonly display: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  }> | null | undefined;
  readonly sale: {
    readonly internalID: string;
    readonly is_closed: boolean | null | undefined;
    readonly is_live_open: boolean | null | undefined;
    readonly is_with_buyers_premium: boolean | null | undefined;
  } | null | undefined;
  readonly sale_artwork: {
    readonly counts: {
      readonly bidder_positions: any | null | undefined;
    } | null | undefined;
    readonly current_bid: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly endedAt: string | null | undefined;
    readonly is_with_reserve: boolean | null | undefined;
    readonly reserve_message: string | null | undefined;
    readonly reserve_status: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarBiddingClosedMessage_artwork">;
  readonly " $fragmentType": "ArtworkSidebarCurrentBidInfo_artwork";
};
export type ArtworkSidebarCurrentBidInfo_artwork$key = {
  readonly " $data"?: ArtworkSidebarCurrentBidInfo_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarCurrentBidInfo_artwork">;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "endedAt",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarBiddingClosedMessage_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "67fdc5196b20e1f34a2cfbadc088c7b8";

export default node;
