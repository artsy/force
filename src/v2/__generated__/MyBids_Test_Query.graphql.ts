/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyBids_Test_QueryVariables = {};
export type MyBids_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"MyBids_me">;
    } | null;
};
export type MyBids_Test_Query = {
    readonly response: MyBids_Test_QueryResponse;
    readonly variables: MyBids_Test_QueryVariables;
};



/*
query MyBids_Test_Query {
  me {
    ...MyBids_me
    id
  }
}

fragment MyBidsBidHeader_sale on Sale {
  coverImage {
    cropped(width: 330, height: 100) {
      src
      srcSet
    }
  }
  formattedStartDateTime
  name
  partner {
    name
    id
  }
  slug
}

fragment MyBidsBidItem_saleArtwork on SaleArtwork {
  artwork {
    artistNames
    image {
      resized(width: 55, height: 55) {
        src
        srcSet
      }
    }
    id
  }
  estimate
  currentBid {
    display
  }
  internalID
  isHighestBidder
  isWatching
  lotState {
    bidCount
    sellingPrice {
      display
    }
  }
  lotLabel
  slug
}

fragment MyBids_me on Me {
  myBids {
    active {
      sale {
        slug
        ...MyBidsBidHeader_sale
        id
      }
      saleArtworks {
        ...MyBidsBidItem_saleArtwork
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
  "name": "slug",
  "storageKey": null
},
v1 = [
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v5 = {
  "type": "ID",
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
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
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
    "name": "MyBids_Test_Query",
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
    "name": "MyBids_Test_Query",
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
                                "value": 330
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v1/*: any*/),
                            "storageKey": "cropped(height:100,width:330)"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "formattedStartDateTime",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
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
                                    "value": 55
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 55
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": (v1/*: any*/),
                                "storageKey": "resized(height:55,width:55)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SaleArtworkCurrentBid",
                        "kind": "LinkedField",
                        "name": "currentBid",
                        "plural": false,
                        "selections": (v4/*: any*/),
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
                        "concreteType": "CausalityLotState",
                        "kind": "LinkedField",
                        "name": "lotState",
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
                            "name": "sellingPrice",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lotLabel",
                        "storageKey": null
                      },
                      (v0/*: any*/),
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
          (v3/*: any*/)
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
        "me.id": (v5/*: any*/),
        "me.myBids": {
          "type": "MyBids",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.active": {
          "type": "MyBid",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.myBids.active.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.active.saleArtworks": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.myBids.active.sale.slug": (v6/*: any*/),
        "me.myBids.active.sale.id": (v5/*: any*/),
        "me.myBids.active.saleArtworks.id": (v5/*: any*/),
        "me.myBids.active.sale.coverImage": (v7/*: any*/),
        "me.myBids.active.sale.formattedStartDateTime": (v8/*: any*/),
        "me.myBids.active.sale.name": (v8/*: any*/),
        "me.myBids.active.sale.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.active.saleArtworks.artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.active.saleArtworks.estimate": (v8/*: any*/),
        "me.myBids.active.saleArtworks.currentBid": {
          "type": "SaleArtworkCurrentBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.active.saleArtworks.internalID": (v6/*: any*/),
        "me.myBids.active.saleArtworks.isHighestBidder": (v9/*: any*/),
        "me.myBids.active.saleArtworks.isWatching": (v9/*: any*/),
        "me.myBids.active.saleArtworks.lotState": {
          "type": "CausalityLotState",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.active.saleArtworks.lotLabel": (v8/*: any*/),
        "me.myBids.active.saleArtworks.slug": (v6/*: any*/),
        "me.myBids.active.sale.coverImage.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.active.sale.partner.name": (v8/*: any*/),
        "me.myBids.active.sale.partner.id": (v5/*: any*/),
        "me.myBids.active.saleArtworks.artwork.artistNames": (v8/*: any*/),
        "me.myBids.active.saleArtworks.artwork.image": (v7/*: any*/),
        "me.myBids.active.saleArtworks.artwork.id": (v5/*: any*/),
        "me.myBids.active.saleArtworks.currentBid.display": (v8/*: any*/),
        "me.myBids.active.saleArtworks.lotState.bidCount": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.active.saleArtworks.lotState.sellingPrice": {
          "type": "Money",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.active.sale.coverImage.cropped.src": (v10/*: any*/),
        "me.myBids.active.sale.coverImage.cropped.srcSet": (v10/*: any*/),
        "me.myBids.active.saleArtworks.artwork.image.resized": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.myBids.active.saleArtworks.lotState.sellingPrice.display": (v8/*: any*/),
        "me.myBids.active.saleArtworks.artwork.image.resized.src": (v10/*: any*/),
        "me.myBids.active.saleArtworks.artwork.image.resized.srcSet": (v10/*: any*/)
      }
    },
    "name": "MyBids_Test_Query",
    "operationKind": "query",
    "text": "query MyBids_Test_Query {\n  me {\n    ...MyBids_me\n    id\n  }\n}\n\nfragment MyBidsBidHeader_sale on Sale {\n  coverImage {\n    cropped(width: 330, height: 100) {\n      src\n      srcSet\n    }\n  }\n  formattedStartDateTime\n  name\n  partner {\n    name\n    id\n  }\n  slug\n}\n\nfragment MyBidsBidItem_saleArtwork on SaleArtwork {\n  artwork {\n    artistNames\n    image {\n      resized(width: 55, height: 55) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  estimate\n  currentBid {\n    display\n  }\n  internalID\n  isHighestBidder\n  isWatching\n  lotState {\n    bidCount\n    sellingPrice {\n      display\n    }\n  }\n  lotLabel\n  slug\n}\n\nfragment MyBids_me on Me {\n  myBids {\n    active {\n      sale {\n        slug\n        ...MyBidsBidHeader_sale\n        id\n      }\n      saleArtworks {\n        ...MyBidsBidItem_saleArtwork\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd73525e93af1b239024242559ac1cec8';
export default node;
