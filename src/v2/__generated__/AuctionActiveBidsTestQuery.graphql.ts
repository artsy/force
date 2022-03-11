/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionActiveBidsTestQueryVariables = {
    slug: string;
};
export type AuctionActiveBidsTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionActiveBids_me">;
    } | null;
};
export type AuctionActiveBidsTestQuery = {
    readonly response: AuctionActiveBidsTestQueryResponse;
    readonly variables: AuctionActiveBidsTestQueryVariables;
};



/*
query AuctionActiveBidsTestQuery(
  $slug: String!
) {
  me {
    ...AuctionActiveBids_me_96HcF
    id
  }
}

fragment AuctionActiveBids_me_96HcF on Me {
  lotStandings(saleID: $slug, live: true) {
    isHighestBidder
    saleArtwork {
      ...AuctionLotInfo_saleArtwork_4oTW5x
      counts {
        bidderPositions
      }
      currentBid {
        display
      }
      slug
      lotLabel
      reserveStatus
      saleID
      highestBid {
        display
      }
      sale {
        liveStartAt
        endAt
        isLiveOpen
        isClosed
        id
      }
      id
    }
  }
}

fragment AuctionLotInfo_saleArtwork_4oTW5x on SaleArtwork {
  counts {
    bidderPositions
  }
  lotLabel
  currentBid {
    display
  }
  artwork {
    internalID
    date
    title
    image {
      resized(width: 100, height: 100, version: "square") {
        src
        srcSet
        width
        height
      }
    }
    imageUrl
    artistNames
    slug
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = {
  "kind": "Variable",
  "name": "saleID",
  "variableName": "slug"
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
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
  "name": "id",
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
  "type": "Boolean"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionActiveBidsTestQuery",
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
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "AuctionActiveBids_me"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuctionActiveBidsTestQuery",
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
              },
              (v1/*: any*/)
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
                "name": "isHighestBidder",
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
                    "kind": "ScalarField",
                    "name": "lotLabel",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtworkCurrentBid",
                    "kind": "LinkedField",
                    "name": "currentBid",
                    "plural": false,
                    "selections": (v2/*: any*/),
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
                        "name": "internalID",
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
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
                                "name": "version",
                                "value": "square"
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 100
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
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
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "height",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "resized(height:100,version:\"square\",width:100)"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageUrl",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/),
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
                    "name": "saleID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtworkHighestBid",
                    "kind": "LinkedField",
                    "name": "highestBid",
                    "plural": false,
                    "selections": (v2/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "liveStartAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endAt",
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
                        "name": "isClosed",
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "86ebd20026330449d16447df433990c7",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v5/*: any*/),
        "me.lotStandings": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LotStanding"
        },
        "me.lotStandings.isHighestBidder": (v6/*: any*/),
        "me.lotStandings.saleArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "me.lotStandings.saleArtwork.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.lotStandings.saleArtwork.artwork.artistNames": (v7/*: any*/),
        "me.lotStandings.saleArtwork.artwork.date": (v7/*: any*/),
        "me.lotStandings.saleArtwork.artwork.id": (v5/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.lotStandings.saleArtwork.artwork.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "me.lotStandings.saleArtwork.artwork.image.resized.height": (v8/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image.resized.src": (v9/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image.resized.srcSet": (v9/*: any*/),
        "me.lotStandings.saleArtwork.artwork.image.resized.width": (v8/*: any*/),
        "me.lotStandings.saleArtwork.artwork.imageUrl": (v7/*: any*/),
        "me.lotStandings.saleArtwork.artwork.internalID": (v5/*: any*/),
        "me.lotStandings.saleArtwork.artwork.slug": (v5/*: any*/),
        "me.lotStandings.saleArtwork.artwork.title": (v7/*: any*/),
        "me.lotStandings.saleArtwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "me.lotStandings.saleArtwork.counts.bidderPositions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "me.lotStandings.saleArtwork.currentBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCurrentBid"
        },
        "me.lotStandings.saleArtwork.currentBid.display": (v7/*: any*/),
        "me.lotStandings.saleArtwork.highestBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "me.lotStandings.saleArtwork.highestBid.display": (v7/*: any*/),
        "me.lotStandings.saleArtwork.id": (v5/*: any*/),
        "me.lotStandings.saleArtwork.lotLabel": (v7/*: any*/),
        "me.lotStandings.saleArtwork.reserveStatus": (v7/*: any*/),
        "me.lotStandings.saleArtwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "me.lotStandings.saleArtwork.sale.endAt": (v7/*: any*/),
        "me.lotStandings.saleArtwork.sale.id": (v5/*: any*/),
        "me.lotStandings.saleArtwork.sale.isClosed": (v6/*: any*/),
        "me.lotStandings.saleArtwork.sale.isLiveOpen": (v6/*: any*/),
        "me.lotStandings.saleArtwork.sale.liveStartAt": (v7/*: any*/),
        "me.lotStandings.saleArtwork.saleID": (v7/*: any*/),
        "me.lotStandings.saleArtwork.slug": (v5/*: any*/)
      }
    },
    "name": "AuctionActiveBidsTestQuery",
    "operationKind": "query",
    "text": "query AuctionActiveBidsTestQuery(\n  $slug: String!\n) {\n  me {\n    ...AuctionActiveBids_me_96HcF\n    id\n  }\n}\n\nfragment AuctionActiveBids_me_96HcF on Me {\n  lotStandings(saleID: $slug, live: true) {\n    isHighestBidder\n    saleArtwork {\n      ...AuctionLotInfo_saleArtwork_4oTW5x\n      counts {\n        bidderPositions\n      }\n      currentBid {\n        display\n      }\n      slug\n      lotLabel\n      reserveStatus\n      saleID\n      highestBid {\n        display\n      }\n      sale {\n        liveStartAt\n        endAt\n        isLiveOpen\n        isClosed\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment AuctionLotInfo_saleArtwork_4oTW5x on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  currentBid {\n    display\n  }\n  artwork {\n    internalID\n    date\n    title\n    image {\n      resized(width: 100, height: 100, version: \"square\") {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    imageUrl\n    artistNames\n    slug\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '26fd9ecab21876705e8631c119d8e2cd';
export default node;
