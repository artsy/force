/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
                readonly id: string;
            }) | null;
        }> | null;
        readonly slug: string;
        readonly internalID: string;
        readonly sale: ({
            readonly slug: string;
            readonly registrationStatus: ({
                readonly qualified_for_bidding: boolean | null;
                readonly id: string;
            }) | null;
            readonly is_preview: boolean | null;
            readonly is_open: boolean | null;
            readonly is_live_open: boolean | null;
            readonly is_closed: boolean | null;
            readonly is_registration_closed: boolean | null;
            readonly requireIdentityVerification: boolean | null;
            readonly id: string;
        }) | null;
        readonly sale_artwork: ({
            readonly increments: ReadonlyArray<({
                readonly cents: number | null;
                readonly display: string | null;
            }) | null> | null;
            readonly endedAt: string | null;
            readonly id: string;
        }) | null;
        readonly id: string;
    }) | null;
    readonly me: ({
        readonly identityVerified: boolean | null;
        readonly pendingIdentityVerification: ({
            readonly internalID: string;
            readonly id: string;
        }) | null;
        readonly id: string;
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
    endedAt
    id
  }
}

fragment ArtworkSidebarBidAction_me on Me {
  identityVerified
  pendingIdentityVerification {
    internalID
    id
  }
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
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
  "type": "Float"
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
    "name": "ArtworkSidebarBidAction_Test_Query",
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
            "name": "ArtworkSidebarBidAction_artwork"
          }
        ],
        "storageKey": "artwork(id:\"auction_artwork\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarBidAction_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarBidAction_Test_Query",
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
                    "selections": [
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "myLotStanding(live:true)"
          },
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Bidder",
                "kind": "LinkedField",
                "name": "registrationStatus",
                "plural": false,
                "selections": [
                  {
                    "alias": "qualified_for_bidding",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "qualifiedForBidding",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "is_preview",
                "args": null,
                "kind": "ScalarField",
                "name": "isPreview",
                "storageKey": null
              },
              {
                "alias": "is_open",
                "args": null,
                "kind": "ScalarField",
                "name": "isOpen",
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
                "alias": "is_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": "is_registration_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isRegistrationClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "requireIdentityVerification",
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
                "alias": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "kind": "LinkedField",
                "name": "increments",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "display",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endedAt",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"auction_artwork\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "identityVerified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "IdentityVerification",
            "kind": "LinkedField",
            "name": "pendingIdentityVerification",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ea15b5cac3d99c5cb1723fa8559dfaca",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": (v5/*: any*/),
        "artwork.internalID": (v5/*: any*/),
        "artwork.myLotStanding": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LotStanding"
        },
        "artwork.myLotStanding.most_recent_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BidderPosition"
        },
        "artwork.myLotStanding.most_recent_bid.id": (v5/*: any*/),
        "artwork.myLotStanding.most_recent_bid.max_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BidderPositionMaxBid"
        },
        "artwork.myLotStanding.most_recent_bid.max_bid.cents": (v6/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.id": (v5/*: any*/),
        "artwork.sale.is_closed": (v7/*: any*/),
        "artwork.sale.is_live_open": (v7/*: any*/),
        "artwork.sale.is_open": (v7/*: any*/),
        "artwork.sale.is_preview": (v7/*: any*/),
        "artwork.sale.is_registration_closed": (v7/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v5/*: any*/),
        "artwork.sale.registrationStatus.qualified_for_bidding": (v7/*: any*/),
        "artwork.sale.requireIdentityVerification": (v7/*: any*/),
        "artwork.sale.slug": (v5/*: any*/),
        "artwork.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.sale_artwork.endedAt": (v8/*: any*/),
        "artwork.sale_artwork.id": (v5/*: any*/),
        "artwork.sale_artwork.increments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BidIncrementsFormatted"
        },
        "artwork.sale_artwork.increments.cents": (v6/*: any*/),
        "artwork.sale_artwork.increments.display": (v8/*: any*/),
        "artwork.slug": (v5/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v5/*: any*/),
        "me.identityVerified": (v7/*: any*/),
        "me.pendingIdentityVerification": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "IdentityVerification"
        },
        "me.pendingIdentityVerification.id": (v5/*: any*/),
        "me.pendingIdentityVerification.internalID": (v5/*: any*/)
      }
    },
    "name": "ArtworkSidebarBidAction_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarBidAction_Test_Query {\n  artwork(id: \"auction_artwork\") {\n    ...ArtworkSidebarBidAction_artwork\n    id\n  }\n  me {\n    ...ArtworkSidebarBidAction_me\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        cents\n      }\n      id\n    }\n  }\n  slug\n  internalID\n  sale {\n    slug\n    registrationStatus {\n      qualified_for_bidding: qualifiedForBidding\n      id\n    }\n    is_preview: isPreview\n    is_open: isOpen\n    is_live_open: isLiveOpen\n    is_closed: isClosed\n    is_registration_closed: isRegistrationClosed\n    requireIdentityVerification\n    id\n  }\n  sale_artwork: saleArtwork {\n    increments {\n      cents\n      display\n    }\n    endedAt\n    id\n  }\n}\n\nfragment ArtworkSidebarBidAction_me on Me {\n  identityVerified\n  pendingIdentityVerification {\n    internalID\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '69febe1492a563ce173be7ca02dc28c6';
export default node;
