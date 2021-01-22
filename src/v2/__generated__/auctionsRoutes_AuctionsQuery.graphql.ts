/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionsRoutes_AuctionsQueryVariables = {};
export type auctionsRoutes_AuctionsQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_me">;
    } | null;
    readonly currentSales: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_currentSales">;
    } | null;
    readonly pastSales: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_pastSales">;
    } | null;
};
export type auctionsRoutes_AuctionsQuery = {
    readonly response: auctionsRoutes_AuctionsQueryResponse;
    readonly variables: auctionsRoutes_AuctionsQueryVariables;
};



/*
query auctionsRoutes_AuctionsQuery {
  me {
    ...AuctionsApp_me
    id
  }
  currentSales: salesConnection(first: 99, published: true, sort: START_AT_ASC) {
    ...AuctionsApp_currentSales
  }
  pastSales: salesConnection(first: 20, published: true, live: false, sort: START_AT_ASC) {
    ...AuctionsApp_pastSales
  }
}

fragment AuctionTimer_sale on Sale {
  live_start_at: liveStartAt
  end_at: endAt
}

fragment AuctionsApp_currentSales on SaleConnection {
  edges {
    node {
      ...SaleItem_sale
      id
    }
  }
}

fragment AuctionsApp_me on Me {
  ...MyBids_me
}

fragment AuctionsApp_pastSales on SaleConnection {
  edges {
    node {
      name
      formattedStartDateTime
      href
      id
    }
  }
}

fragment MyBids_me on Me {
  name
  auctionsLotStandingConnection(first: 25) {
    edges {
      node {
        isHighestBidder
        lot {
          saleId
          soldStatus
          internalID
          bidCount
          reserveStatus
          askingPrice: onlineAskingPrice {
            display
          }
          sellingPrice: floorSellingPrice {
            display
          }
          id
        }
        saleArtwork {
          position
          lotLabel
          artwork {
            artistNames
            href
            image {
              cropped(width: 70, height: 70) {
                url
              }
            }
            id
          }
          sale {
            internalID
            liveStartAt
            endAt
            status
            id
          }
          id
        }
        id
      }
    }
  }
}

fragment SaleItem_sale on Sale {
  ...AuctionTimer_sale
  id
  slug
  liveStartAt
  isOpen
  isPreview
  isClosed
  isBenefit
  isLiveOpen
  isAuction
  status
  startAt
  endAt
  saleType
  name
  href
  coverImage {
    imageURL
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "published",
  "value": true
},
v1 = {
  "kind": "Literal",
  "name": "sort",
  "value": "START_AT_ASC"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 99
  },
  (v0/*: any*/),
  (v1/*: any*/)
],
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  {
    "kind": "Literal",
    "name": "live",
    "value": false
  },
  (v0/*: any*/),
  (v1/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "liveStartAt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "auctionsRoutes_AuctionsQuery",
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
            "name": "AuctionsApp_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "currentSales",
        "args": (v2/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionsApp_currentSales"
          }
        ],
        "storageKey": "salesConnection(first:99,published:true,sort:\"START_AT_ASC\")"
      },
      {
        "alias": "pastSales",
        "args": (v3/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionsApp_pastSales"
          }
        ],
        "storageKey": "salesConnection(first:20,live:false,published:true,sort:\"START_AT_ASC\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "auctionsRoutes_AuctionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 25
              }
            ],
            "concreteType": "AuctionsLotStandingConnection",
            "kind": "LinkedField",
            "name": "auctionsLotStandingConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionsLotStandingEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionsLotStanding",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isHighestBidder",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionsLotState",
                        "kind": "LinkedField",
                        "name": "lot",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "saleId",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "soldStatus",
                            "storageKey": null
                          },
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "bidCount",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "reserveStatus",
                            "storageKey": null
                          },
                          {
                            "alias": "askingPrice",
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "onlineAskingPrice",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "sellingPrice",
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "floorSellingPrice",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          (v7/*: any*/)
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
                            "name": "position",
                            "storageKey": null
                          },
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
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "artwork",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "artistNames",
                                "storageKey": null
                              },
                              (v8/*: any*/),
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
                                        "value": 70
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 70
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
                                        "name": "url",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": "cropped(height:70,width:70)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v7/*: any*/)
                            ],
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
                              (v5/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/),
                              (v11/*: any*/),
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "auctionsLotStandingConnection(first:25)"
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "currentSales",
        "args": (v2/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": "live_start_at",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "liveStartAt",
                    "storageKey": null
                  },
                  {
                    "alias": "end_at",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endAt",
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isOpen",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isPreview",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isClosed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isBenefit",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLiveOpen",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isAuction",
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startAt",
                    "storageKey": null
                  },
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "saleType",
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageURL",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "salesConnection(first:99,published:true,sort:\"START_AT_ASC\")"
      },
      {
        "alias": "pastSales",
        "args": (v3/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "formattedStartDateTime",
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "salesConnection(first:20,live:false,published:true,sort:\"START_AT_ASC\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "auctionsRoutes_AuctionsQuery",
    "operationKind": "query",
    "text": "query auctionsRoutes_AuctionsQuery {\n  me {\n    ...AuctionsApp_me\n    id\n  }\n  currentSales: salesConnection(first: 99, published: true, sort: START_AT_ASC) {\n    ...AuctionsApp_currentSales\n  }\n  pastSales: salesConnection(first: 20, published: true, live: false, sort: START_AT_ASC) {\n    ...AuctionsApp_pastSales\n  }\n}\n\nfragment AuctionTimer_sale on Sale {\n  live_start_at: liveStartAt\n  end_at: endAt\n}\n\nfragment AuctionsApp_currentSales on SaleConnection {\n  edges {\n    node {\n      ...SaleItem_sale\n      id\n    }\n  }\n}\n\nfragment AuctionsApp_me on Me {\n  ...MyBids_me\n}\n\nfragment AuctionsApp_pastSales on SaleConnection {\n  edges {\n    node {\n      name\n      formattedStartDateTime\n      href\n      id\n    }\n  }\n}\n\nfragment MyBids_me on Me {\n  name\n  auctionsLotStandingConnection(first: 25) {\n    edges {\n      node {\n        isHighestBidder\n        lot {\n          saleId\n          soldStatus\n          internalID\n          bidCount\n          reserveStatus\n          askingPrice: onlineAskingPrice {\n            display\n          }\n          sellingPrice: floorSellingPrice {\n            display\n          }\n          id\n        }\n        saleArtwork {\n          position\n          lotLabel\n          artwork {\n            artistNames\n            href\n            image {\n              cropped(width: 70, height: 70) {\n                url\n              }\n            }\n            id\n          }\n          sale {\n            internalID\n            liveStartAt\n            endAt\n            status\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SaleItem_sale on Sale {\n  ...AuctionTimer_sale\n  id\n  slug\n  liveStartAt\n  isOpen\n  isPreview\n  isClosed\n  isBenefit\n  isLiveOpen\n  isAuction\n  status\n  startAt\n  endAt\n  saleType\n  name\n  href\n  coverImage {\n    imageURL\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ca3d073a179691367a5fdd353799c237';
export default node;
