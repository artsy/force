/* tslint:disable */
/* eslint-disable */

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

fragment SettingsAuctionsRoute_me on Me {
  ...UserActiveBids_me
  ...UserBidHistory_me
  ...UserRegistrationAuctions_me
}

fragment UserActiveBids_me on Me {
  lotStandings {
    isLeadingBidder
    activeBid {
      id
    }
    saleArtwork {
      lotLabel
      highestBid {
        display
      }
      counts {
        bidderPositions
      }
      artwork {
        title
        href
        image {
          cropped(height: 100, width: 100) {
            src
            srcSet
          }
        }
        artist {
          name
          id
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
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
    "type": "Query"
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
            "args": null,
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
                "concreteType": "BidderPosition",
                "kind": "LinkedField",
                "name": "activeBid",
                "plural": false,
                "selections": [
                  (v0/*: any*/)
                ],
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
                    "selections": [
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      (v1/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
                      (v2/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": (v3/*: any*/),
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
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v0/*: any*/)
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
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v2/*: any*/),
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": (v3/*: any*/),
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
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleRegistrationsConnection(first:10,isAuction:true,published:true,registered:false,sort:\"CREATED_AT_DESC\")"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_SettingsAuctionsRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_SettingsAuctionsRouteQuery {\n  me {\n    ...SettingsAuctionsRoute_me\n    id\n  }\n}\n\nfragment SettingsAuctionsRoute_me on Me {\n  ...UserActiveBids_me\n  ...UserBidHistory_me\n  ...UserRegistrationAuctions_me\n}\n\nfragment UserActiveBids_me on Me {\n  lotStandings {\n    isLeadingBidder\n    activeBid {\n      id\n    }\n    saleArtwork {\n      lotLabel\n      highestBid {\n        display\n      }\n      counts {\n        bidderPositions\n      }\n      artwork {\n        title\n        href\n        image {\n          cropped(height: 100, width: 100) {\n            src\n            srcSet\n          }\n        }\n        artist {\n          name\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment UserBidHistory_me on Me {\n  myBids {\n    closed {\n      sale {\n        name\n        href\n        endAt(format: \"MMMM D, h:mmA\")\n        profile {\n          bio\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment UserRegistrationAuctions_me on Me {\n  saleRegistrationsConnection(published: true, isAuction: true, sort: CREATED_AT_DESC, first: 10, registered: false) {\n    edges {\n      node {\n        sale {\n          id\n          name\n          href\n          startAt(format: \"MMMM D, h:mmA\")\n          isClosed\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3af1586ea7ecf6789e852e6ecc3a2912';
export default node;
