/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarBidAction_Test_QueryVariables = {};
export type ArtworkSidebarBidAction_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarBidAction_artwork">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarBidAction_me">;
    } | null;
};
export type ArtworkSidebarBidAction_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly myLotStanding: ReadonlyArray<{
            readonly most_recent_bid: ({
                readonly max_bid: ({
                    readonly cents: number | null;
                }) | null;
                readonly id: string | null;
            }) | null;
        }> | null;
        readonly slug: string;
        readonly internalID: string;
        readonly sale: ({
            readonly slug: string;
            readonly registrationStatus: ({
                readonly qualified_for_bidding: boolean | null;
                readonly id: string | null;
            }) | null;
            readonly is_preview: boolean | null;
            readonly is_open: boolean | null;
            readonly is_live_open: boolean | null;
            readonly is_closed: boolean | null;
            readonly is_registration_closed: boolean | null;
            readonly requireIdentityVerification: boolean | null;
            readonly id: string | null;
        }) | null;
        readonly sale_artwork: ({
            readonly increments: ReadonlyArray<({
                readonly cents: number | null;
                readonly display: string | null;
            }) | null> | null;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
    readonly me: ({
        readonly identityVerified: boolean | null;
        readonly id: string | null;
    }) | null;
};
export type ArtworkSidebarBidAction_Test_Query = {
    readonly response: ArtworkSidebarBidAction_Test_QueryResponse;
    readonly variables: ArtworkSidebarBidAction_Test_QueryVariables;
    readonly rawResponse: ArtworkSidebarBidAction_Test_QueryRawResponse;
};



/*
query ArtworkSidebarBidAction_Test_Query {
  artwork(id: "auction_artwork") {
    ...ArtworkSidebarBidAction_artwork
    id
  }
  me {
    ...ArtworkSidebarBidAction_me
    id
  }
}

fragment ArtworkSidebarBidAction_artwork on Artwork {
  myLotStanding(live: true) {
    most_recent_bid: mostRecentBid {
      max_bid: maxBid {
        cents
      }
      id
    }
  }
  slug
  internalID
  sale {
    slug
    registrationStatus {
      qualified_for_bidding: qualifiedForBidding
      id
    }
    is_preview: isPreview
    is_open: isOpen
    is_live_open: isLiveOpen
    is_closed: isClosed
    is_registration_closed: isRegistrationClosed
    requireIdentityVerification
    id
  }
  sale_artwork: saleArtwork {
    increments {
      cents
      display
    }
    id
  }
}

fragment ArtworkSidebarBidAction_me on Me {
  identityVerified
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "auction_artwork"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarBidAction_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarBidAction_artwork",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarBidAction_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarBidAction_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
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
                    "selections": [
                      (v1/*: any*/)
                    ]
                  },
                  (v2/*: any*/)
                ]
              }
            ]
          },
          (v3/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "internalID",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "registrationStatus",
                "storageKey": null,
                "args": null,
                "concreteType": "Bidder",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": "qualified_for_bidding",
                    "name": "qualifiedForBidding",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": "is_preview",
                "name": "isPreview",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_open",
                "name": "isOpen",
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
                "alias": "is_closed",
                "name": "isClosed",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_registration_closed",
                "name": "isRegistrationClosed",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "requireIdentityVerification",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
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
                "kind": "LinkedField",
                "alias": null,
                "name": "increments",
                "storageKey": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "display",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              (v2/*: any*/)
            ]
          },
          (v2/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "identityVerified",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkSidebarBidAction_Test_Query",
    "id": null,
    "text": "query ArtworkSidebarBidAction_Test_Query {\n  artwork(id: \"auction_artwork\") {\n    ...ArtworkSidebarBidAction_artwork\n    id\n  }\n  me {\n    ...ArtworkSidebarBidAction_me\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        cents\n      }\n      id\n    }\n  }\n  slug\n  internalID\n  sale {\n    slug\n    registrationStatus {\n      qualified_for_bidding: qualifiedForBidding\n      id\n    }\n    is_preview: isPreview\n    is_open: isOpen\n    is_live_open: isLiveOpen\n    is_closed: isClosed\n    is_registration_closed: isRegistrationClosed\n    requireIdentityVerification\n    id\n  }\n  sale_artwork: saleArtwork {\n    increments {\n      cents\n      display\n    }\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_me on Me {\n  identityVerified\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '4fd030f92a386cdc149fa85d858e09d7';
export default node;
