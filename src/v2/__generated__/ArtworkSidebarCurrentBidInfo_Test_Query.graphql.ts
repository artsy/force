/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCurrentBidInfo_Test_QueryVariables = {};
export type ArtworkSidebarCurrentBidInfo_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarCurrentBidInfo_artwork">;
    } | null;
};
export type ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly sale: ({
            readonly is_closed: boolean | null;
            readonly is_live_open: boolean | null;
            readonly internalID: string;
            readonly is_with_buyers_premium: boolean | null;
            readonly id: string | null;
        }) | null;
        readonly sale_artwork: ({
            readonly is_with_reserve: boolean | null;
            readonly reserve_message: string | null;
            readonly reserve_status: string | null;
            readonly current_bid: ({
                readonly display: string | null;
            }) | null;
            readonly counts: ({
                readonly bidder_positions: number | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly myLotStanding: ReadonlyArray<{
            readonly active_bid: ({
                readonly is_winning: boolean | null;
                readonly id: string | null;
            }) | null;
            readonly most_recent_bid: ({
                readonly max_bid: ({
                    readonly display: string | null;
                }) | null;
                readonly id: string | null;
            }) | null;
        }> | null;
        readonly id: string | null;
    }) | null;
};
export type ArtworkSidebarCurrentBidInfo_Test_Query = {
    readonly response: ArtworkSidebarCurrentBidInfo_Test_QueryResponse;
    readonly variables: ArtworkSidebarCurrentBidInfo_Test_QueryVariables;
    readonly rawResponse: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse;
};



/*
query ArtworkSidebarCurrentBidInfo_Test_Query {
  artwork(id: "auction_artwork_estimate_premium") {
    ...ArtworkSidebarCurrentBidInfo_artwork
    id
  }
}

fragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {
  sale {
    is_closed: isClosed
    is_live_open: isLiveOpen
    internalID
    is_with_buyers_premium: isWithBuyersPremium
    id
  }
  sale_artwork: saleArtwork {
    is_with_reserve: isWithReserve
    reserve_message: reserveMessage
    reserve_status: reserveStatus
    current_bid: currentBid {
      display
    }
    counts {
      bidder_positions: bidderPositions
    }
    id
  }
  myLotStanding(live: true) {
    active_bid: activeBid {
      is_winning: isWinning
      id
    }
    most_recent_bid: mostRecentBid {
      max_bid: maxBid {
        display
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "auction_artwork_estimate_premium"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarCurrentBidInfo_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarCurrentBidInfo_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarCurrentBidInfo_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
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
              },
              (v1/*: any*/)
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
                "selections": (v2/*: any*/)
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
              },
              (v1/*: any*/)
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
                  },
                  (v1/*: any*/)
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
                    "selections": (v2/*: any*/)
                  },
                  (v1/*: any*/)
                ]
              }
            ]
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkSidebarCurrentBidInfo_Test_Query",
    "id": null,
    "text": "query ArtworkSidebarCurrentBidInfo_Test_Query {\n  artwork(id: \"auction_artwork_estimate_premium\") {\n    ...ArtworkSidebarCurrentBidInfo_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  sale {\n    is_closed: isClosed\n    is_live_open: isLiveOpen\n    internalID\n    is_with_buyers_premium: isWithBuyersPremium\n    id\n  }\n  sale_artwork: saleArtwork {\n    is_with_reserve: isWithReserve\n    reserve_message: reserveMessage\n    reserve_status: reserveStatus\n    current_bid: currentBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid: activeBid {\n      is_winning: isWinning\n      id\n    }\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        display\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '8ddf50200304994b30c1daf0736d8180';
export default node;
