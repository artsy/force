/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_SettingsAuctionsRouteQueryVariables = {};
export type settingsRoutes_SettingsAuctionsRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsAuctionsRoute_me">;
    } | null;
};
export type settingsRoutes_SettingsAuctionsRouteQuery = {
    readonly response: settingsRoutes_SettingsAuctionsRouteQueryResponse;
    readonly variables: settingsRoutes_SettingsAuctionsRouteQueryVariables;
};



/*
query settingsRoutes_SettingsAuctionsRouteQuery {
  me {
    ...SettingsAuctionsRoute_me
    id
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message: saleMessage
  cultural_maker: culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collecting_institution: collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    counts {
      bidder_positions: bidderPositions
    }
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    id
  }
}

fragment SettingsAuctionsRoute_me on Me {
  ...UserActiveBids_me
  ...UserBidHistory_me
  ...UserRegistrationAuctions_me
}

fragment UserActiveBids_me on Me {
  lotStandings(live: true) {
    isLeadingBidder
    saleArtwork {
      lotLabel
      highestBid {
        display
      }
      counts {
        bidderPositions
      }
      artwork {
        ...Details_artwork
        href
        image {
          cropped(height: 100, width: 100) {
            src
            srcSet
          }
        }
        id
      }
      id
    }
  }
}

fragment UserBidHistory_me on Me {
  myBids {
    closed {
      sale {
        name
        href
        endAt(format: "MMMM D, h:mmA")
        profile {
          bio
          id
        }
        id
      }
    }
  }
}

fragment UserRegistrationAuctions_me on Me {
  saleRegistrationsConnection(published: true, isAuction: true, sort: CREATED_AT_DESC, first: 10, registered: false) {
    edges {
      node {
        isRegistered
        sale {
          id
          name
          href
          startAt(format: "MMMM D, h:mmA")
          isClosed
        }
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMMM D, h:mmA"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_SettingsAuctionsRouteQuery",
    "selections": [
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
            "name": "SettingsAuctionsRoute_me"
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
    "name": "settingsRoutes_SettingsAuctionsRouteQuery",
    "selections": [
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
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": true
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
                "name": "isLeadingBidder",
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
                    "kind": "ScalarField",
                    "name": "lotLabel",
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
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "date",
                        "storageKey": null
                      },
                      {
                        "alias": "sale_message",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleMessage",
                        "storageKey": null
                      },
                      {
                        "alias": "cultural_maker",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "culturalMaker",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v2/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v1/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": "artists(shallow:true)"
                      },
                      {
                        "alias": "collecting_institution",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "collectingInstitution",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v2/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v1/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": "partner(shallow:true)"
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
                            "alias": "is_auction",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAuction",
                            "storageKey": null
                          },
                          {
                            "alias": "is_closed",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isClosed",
                            "storageKey": null
                          },
                          (v3/*: any*/)
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
                          {
                            "alias": "highest_bid",
                            "args": null,
                            "concreteType": "SaleArtworkHighestBid",
                            "kind": "LinkedField",
                            "name": "highestBid",
                            "plural": false,
                            "selections": (v0/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v0/*: any*/),
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 100
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 100
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "src",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "srcSet",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "cropped(height:100,width:100)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "lotStandings(live:true)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MyBids",
            "kind": "LinkedField",
            "name": "myBids",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MyBid",
                "kind": "LinkedField",
                "name": "closed",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "sale",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": (v5/*: any*/),
                        "kind": "ScalarField",
                        "name": "endAt",
                        "storageKey": "endAt(format:\"MMMM D, h:mmA\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Profile",
                        "kind": "LinkedField",
                        "name": "profile",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "bio",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
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
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "isAuction",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "published",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "registered",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "CREATED_AT_DESC"
              }
            ],
            "concreteType": "SaleRegistrationConnection",
            "kind": "LinkedField",
            "name": "saleRegistrationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleRegistrationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleRegistration",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isRegistered",
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
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": (v5/*: any*/),
                            "kind": "ScalarField",
                            "name": "startAt",
                            "storageKey": "startAt(format:\"MMMM D, h:mmA\")"
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleRegistrationsConnection(first:10,isAuction:true,published:true,registered:false,sort:\"CREATED_AT_DESC\")"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3c600d212878590e2ce7b804007afa33",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_SettingsAuctionsRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SettingsAuctionsRouteQuery {\n  me {\n    ...SettingsAuctionsRoute_me\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment SettingsAuctionsRoute_me on Me {\n  ...UserActiveBids_me\n  ...UserBidHistory_me\n  ...UserRegistrationAuctions_me\n}\n\nfragment UserActiveBids_me on Me {\n  lotStandings(live: true) {\n    isLeadingBidder\n    saleArtwork {\n      lotLabel\n      highestBid {\n        display\n      }\n      counts {\n        bidderPositions\n      }\n      artwork {\n        ...Details_artwork\n        href\n        image {\n          cropped(height: 100, width: 100) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment UserBidHistory_me on Me {\n  myBids {\n    closed {\n      sale {\n        name\n        href\n        endAt(format: \"MMMM D, h:mmA\")\n        profile {\n          bio\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment UserRegistrationAuctions_me on Me {\n  saleRegistrationsConnection(published: true, isAuction: true, sort: CREATED_AT_DESC, first: 10, registered: false) {\n    edges {\n      node {\n        isRegistered\n        sale {\n          id\n          name\n          href\n          startAt(format: \"MMMM D, h:mmA\")\n          isClosed\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3af1586ea7ecf6789e852e6ecc3a2912';
export default node;
