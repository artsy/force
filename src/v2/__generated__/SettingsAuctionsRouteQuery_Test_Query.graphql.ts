/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsAuctionsRouteQuery_Test_QueryVariables = {};
export type SettingsAuctionsRouteQuery_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsAuctionsRoute_me">;
    } | null;
};
export type SettingsAuctionsRouteQuery_Test_Query = {
    readonly response: SettingsAuctionsRouteQuery_Test_QueryResponse;
    readonly variables: SettingsAuctionsRouteQuery_Test_QueryVariables;
};



/*
query SettingsAuctionsRouteQuery_Test_Query {
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
],
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "Sale",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsAuctionsRouteQuery_Test_Query",
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
    "name": "SettingsAuctionsRouteQuery_Test_Query",
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
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v4/*: any*/),
        "me.lotStandings": {
          "type": "LotStanding",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.myBids": {
          "type": "MyBids",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.saleRegistrationsConnection": {
          "type": "SaleRegistrationConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.isLeadingBidder": (v5/*: any*/),
        "me.lotStandings.activeBid": {
          "type": "BidderPosition",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.closed": {
          "type": "MyBid",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.saleRegistrationsConnection.edges": {
          "type": "SaleRegistrationEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.lotStandings.activeBid.id": (v6/*: any*/),
        "me.lotStandings.saleArtwork.lotLabel": (v7/*: any*/),
        "me.lotStandings.saleArtwork.highestBid": {
          "type": "SaleArtworkHighestBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.counts": {
          "type": "SaleArtworkCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.id": (v4/*: any*/),
        "me.myBids.closed.sale": (v8/*: any*/),
        "me.saleRegistrationsConnection.edges.node": {
          "type": "SaleRegistration",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.highestBid.display": (v7/*: any*/),
        "me.lotStandings.saleArtwork.counts.bidderPositions": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.artwork.title": (v7/*: any*/),
        "me.lotStandings.saleArtwork.artwork.href": (v7/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.artwork.artist": {
          "type": "Artist",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.artwork.id": (v4/*: any*/),
        "me.myBids.closed.sale.name": (v7/*: any*/),
        "me.myBids.closed.sale.href": (v7/*: any*/),
        "me.myBids.closed.sale.endAt": (v7/*: any*/),
        "me.myBids.closed.sale.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.closed.sale.id": (v4/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale": (v8/*: any*/),
        "me.saleRegistrationsConnection.edges.node.id": (v4/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.lotStandings.saleArtwork.artwork.artist.name": (v7/*: any*/),
        "me.lotStandings.saleArtwork.artwork.artist.id": (v4/*: any*/),
        "me.myBids.closed.sale.profile.bio": (v7/*: any*/),
        "me.myBids.closed.sale.profile.id": (v4/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.id": (v6/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.name": (v7/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.href": (v7/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.startAt": (v7/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.isClosed": (v5/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image.cropped.src": (v9/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image.cropped.srcSet": (v9/*: any*/)
      }
    },
    "name": "SettingsAuctionsRouteQuery_Test_Query",
    "operationKind": "query",
    "text": "query SettingsAuctionsRouteQuery_Test_Query {\n  me {\n    ...SettingsAuctionsRoute_me\n    id\n  }\n}\n\nfragment SettingsAuctionsRoute_me on Me {\n  ...UserActiveBids_me\n  ...UserBidHistory_me\n  ...UserRegistrationAuctions_me\n}\n\nfragment UserActiveBids_me on Me {\n  lotStandings {\n    isLeadingBidder\n    activeBid {\n      id\n    }\n    saleArtwork {\n      lotLabel\n      highestBid {\n        display\n      }\n      counts {\n        bidderPositions\n      }\n      artwork {\n        title\n        href\n        image {\n          cropped(height: 100, width: 100) {\n            src\n            srcSet\n          }\n        }\n        artist {\n          name\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment UserBidHistory_me on Me {\n  myBids {\n    closed {\n      sale {\n        name\n        href\n        endAt(format: \"MMMM D, h:mmA\")\n        profile {\n          bio\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment UserRegistrationAuctions_me on Me {\n  saleRegistrationsConnection(published: true, isAuction: true, sort: CREATED_AT_DESC, first: 10, registered: false) {\n    edges {\n      node {\n        sale {\n          id\n          name\n          href\n          startAt(format: \"MMMM D, h:mmA\")\n          isClosed\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '40a6dfae10813d606d91b054d59e896d';
export default node;
