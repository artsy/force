/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyBidsQueryVariables = {};
export type MyBidsQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"MyBids_me">;
    } | null;
};
export type MyBidsQuery = {
    readonly response: MyBidsQueryResponse;
    readonly variables: MyBidsQueryVariables;
};



/*
query MyBidsQuery {
  me {
    ...MyBids_me
    id
  }
}

fragment MyBids_me on Me {
  myBids {
    active {
      sale {
        name
        slug
        liveStartAt
        endAt
        displayTimelyAt
        formattedStartDateTime
        requireIdentityVerification
        partner {
          name
          id
        }
        coverImage {
          resized(width: 300, height: 100) {
            src
            srcSet
          }
        }
        id
      }
      saleArtworks {
        artwork {
          artistNames
          image {
            resized(width: 50, height: 50) {
              src
              srcSet
            }
          }
          id
        }
        slug
        position
        isHighestBidder
        isWatching
        highestBid {
          amount
        }
        estimate
        lot {
          bidCount
          floorSellingPrice {
            display
          }
          internalID
          onlineAskingPrice {
            display
          }
          reserveStatus
          saleId
          sellingPrice {
            display
          }
          soldStatus
        }
        id
      }
    }
    closed {
      sale {
        liveStartAt
        endAt
        requireIdentityVerification
        id
      }
      saleArtworks {
        position
        lot {
          bidCount
          floorSellingPrice {
            display
          }
          internalID
          onlineAskingPrice {
            display
          }
          reserveStatus
          saleId
          sellingPrice {
            display
          }
          soldStatus
        }
        slug
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
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "liveStartAt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requireIdentityVerification",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "CausalityLotState",
  "kind": "LinkedField",
  "name": "lot",
  "plural": false,
  "selections": [
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
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "floorSellingPrice",
      "plural": false,
      "selections": (v8/*: any*/),
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
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "onlineAskingPrice",
      "plural": false,
      "selections": (v8/*: any*/),
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "sellingPrice",
      "plural": false,
      "selections": (v8/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "soldStatus",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyBidsQuery",
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
            "name": "MyBids_me"
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
    "name": "MyBidsQuery",
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
                "name": "active",
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
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayTimelyAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "formattedStartDateTime",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
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
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 100
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 300
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": "resized(height:100,width:300)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
                    "kind": "LinkedField",
                    "name": "saleArtworks",
                    "plural": true,
                    "selections": [
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
                                    "value": 50
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 50
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": (v6/*: any*/),
                                "storageKey": "resized(height:50,width:50)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      (v7/*: any*/),
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
                        "kind": "ScalarField",
                        "name": "isWatching",
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
                            "name": "amount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "estimate",
                        "storageKey": null
                      },
                      (v9/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
                    "kind": "LinkedField",
                    "name": "saleArtworks",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      (v9/*: any*/),
                      (v1/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "MyBidsQuery",
    "operationKind": "query",
    "text": "query MyBidsQuery {\n  me {\n    ...MyBids_me\n    id\n  }\n}\n\nfragment MyBids_me on Me {\n  myBids {\n    active {\n      sale {\n        name\n        slug\n        liveStartAt\n        endAt\n        displayTimelyAt\n        formattedStartDateTime\n        requireIdentityVerification\n        partner {\n          name\n          id\n        }\n        coverImage {\n          resized(width: 300, height: 100) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n      saleArtworks {\n        artwork {\n          artistNames\n          image {\n            resized(width: 50, height: 50) {\n              src\n              srcSet\n            }\n          }\n          id\n        }\n        slug\n        position\n        isHighestBidder\n        isWatching\n        highestBid {\n          amount\n        }\n        estimate\n        lot {\n          bidCount\n          floorSellingPrice {\n            display\n          }\n          internalID\n          onlineAskingPrice {\n            display\n          }\n          reserveStatus\n          saleId\n          sellingPrice {\n            display\n          }\n          soldStatus\n        }\n        id\n      }\n    }\n    closed {\n      sale {\n        liveStartAt\n        endAt\n        requireIdentityVerification\n        id\n      }\n      saleArtworks {\n        position\n        lot {\n          bidCount\n          floorSellingPrice {\n            display\n          }\n          internalID\n          onlineAskingPrice {\n            display\n          }\n          reserveStatus\n          saleId\n          sellingPrice {\n            display\n          }\n          soldStatus\n        }\n        slug\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '981b9c40ce8be1aaa7b0e0ee02952b42';
export default node;
