/**
 * @generated SignedSource<<5deb197cfcd4e5ebd0bb545c9eca65b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCurrentBidInfo_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkSidebarCurrentBidInfo_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarCurrentBidInfo_artwork">;
  } | null | undefined;
};
export type ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse = {
  readonly artwork: {
    readonly artists: ReadonlyArray<{
      readonly id: string;
      readonly internalID: string;
    } | null | undefined> | null | undefined;
    readonly attributionClass: {
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
    readonly id: string;
    readonly isEligibleToCreateAlert: boolean;
    readonly mediumType: {
      readonly filterGene: {
        readonly id: string;
        readonly slug: string;
      } | null | undefined;
    } | null | undefined;
    readonly myLotStanding: ReadonlyArray<{
      readonly active_bid: {
        readonly id: string;
        readonly is_winning: boolean | null | undefined;
      } | null | undefined;
      readonly most_recent_bid: {
        readonly id: string;
        readonly max_bid: {
          readonly display: string | null | undefined;
        } | null | undefined;
      } | null | undefined;
    }> | null | undefined;
    readonly sale: {
      readonly id: string;
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
      readonly id: string;
      readonly is_with_reserve: boolean | null | undefined;
      readonly reserve_message: string | null | undefined;
      readonly reserve_status: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type ArtworkSidebarCurrentBidInfo_Test_Query = {
  rawResponse: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse;
  response: ArtworkSidebarCurrentBidInfo_Test_Query$data;
  variables: ArtworkSidebarCurrentBidInfo_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "auction_artwork_estimate_premium"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v4 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "BidderPosition"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarCurrentBidInfo_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarCurrentBidInfo_artwork"
          }
        ],
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarCurrentBidInfo_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
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
              (v1/*: any*/),
              {
                "alias": "is_with_buyers_premium",
                "args": null,
                "kind": "ScalarField",
                "name": "isWithBuyersPremium",
                "storageKey": null
              },
              (v2/*: any*/)
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
                "selections": (v3/*: any*/),
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
              },
              (v2/*: any*/)
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
                  },
                  (v2/*: any*/)
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
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "myLotStanding(live:true)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isEligibleToCreateAlert",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Gene",
                "kind": "LinkedField",
                "name": "filterGene",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")"
      }
    ]
  },
  "params": {
    "cacheID": "04dac0b4f83c83f12ad9dd5e90e7f123",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v5/*: any*/),
        "artwork.artists.internalID": (v5/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v5/*: any*/),
        "artwork.attributionClass.internalID": (v5/*: any*/),
        "artwork.id": (v5/*: any*/),
        "artwork.isEligibleToCreateAlert": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artwork.mediumType.filterGene.id": (v5/*: any*/),
        "artwork.mediumType.filterGene.slug": (v5/*: any*/),
        "artwork.myLotStanding": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LotStanding"
        },
        "artwork.myLotStanding.active_bid": (v6/*: any*/),
        "artwork.myLotStanding.active_bid.id": (v5/*: any*/),
        "artwork.myLotStanding.active_bid.is_winning": (v7/*: any*/),
        "artwork.myLotStanding.most_recent_bid": (v6/*: any*/),
        "artwork.myLotStanding.most_recent_bid.id": (v5/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BidderPositionMaxBid"
        },
        "artwork.myLotStanding.most_recent_bid.max_bid.display": (v8/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.id": (v5/*: any*/),
        "artwork.sale.internalID": (v5/*: any*/),
        "artwork.sale.is_closed": (v7/*: any*/),
        "artwork.sale.is_live_open": (v7/*: any*/),
        "artwork.sale.is_with_buyers_premium": (v7/*: any*/),
        "artwork.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artwork.sale_artwork.current_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCurrentBid"
        },
        "artwork.sale_artwork.current_bid.display": (v8/*: any*/),
        "artwork.sale_artwork.endedAt": (v8/*: any*/),
        "artwork.sale_artwork.id": (v5/*: any*/),
        "artwork.sale_artwork.is_with_reserve": (v7/*: any*/),
        "artwork.sale_artwork.reserve_message": (v8/*: any*/),
        "artwork.sale_artwork.reserve_status": (v8/*: any*/)
      }
    },
    "name": "ArtworkSidebarCurrentBidInfo_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarCurrentBidInfo_Test_Query {\n  artwork(id: \"auction_artwork_estimate_premium\") {\n    ...ArtworkSidebarCurrentBidInfo_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {\n  isEligibleToCreateAlert\n  artists {\n    internalID\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  sale {\n    is_closed: isClosed\n    is_live_open: isLiveOpen\n    internalID\n    is_with_buyers_premium: isWithBuyersPremium\n    id\n  }\n  sale_artwork: saleArtwork {\n    is_with_reserve: isWithReserve\n    reserve_message: reserveMessage\n    reserve_status: reserveStatus\n    endedAt\n    current_bid: currentBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid: activeBid {\n      is_winning: isWinning\n      id\n    }\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        display\n      }\n      id\n    }\n  }\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n}\n"
  }
};
})();

(node as any).hash = "9f53bea289b18fcf11082e0ef5bc824a";

export default node;
