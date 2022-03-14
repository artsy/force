/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2BidRouteTestQueryVariables = {};
export type Auction2BidRouteTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2BidRoute_artwork">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2BidRoute_me">;
    } | null;
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2BidRoute_sale">;
    } | null;
};
export type Auction2BidRouteTestQuery = {
    readonly response: Auction2BidRouteTestQueryResponse;
    readonly variables: Auction2BidRouteTestQueryVariables;
};



/*
query Auction2BidRouteTestQuery {
  artwork(id: "foo") {
    ...Auction2BidRoute_artwork
    id
  }
  me {
    ...Auction2BidRoute_me
    id
  }
  sale(id: "foo") {
    ...Auction2BidRoute_sale
    id
  }
}

fragment Auction2BidRoute_artwork on Artwork {
  slug
  internalID
  saleArtwork {
    ...AuctionLotInfo_saleArtwork
    minimumNextBid {
      cents
    }
    increments(useMyMaxBid: true) {
      cents
      display
    }
    sale {
      internalID
      bidder {
        id
      }
      slug
      registrationStatus {
        qualifiedForBidding
        id
      }
      id
    }
    id
  }
}

fragment Auction2BidRoute_me on Me {
  internalID
  hasQualifiedCreditCards
}

fragment Auction2BidRoute_sale on Sale {
  internalID
  slug
}

fragment AuctionLotInfo_saleArtwork on SaleArtwork {
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
      resized(width: 150, height: 150, version: "square") {
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
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Bidder"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Auction2BidRouteTestQuery",
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
            "name": "Auction2BidRoute_artwork"
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
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
            "name": "Auction2BidRoute_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Auction2BidRoute_sale"
          }
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Auction2BidRouteTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
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
                "selections": [
                  (v3/*: any*/)
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
                  (v2/*: any*/),
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
                            "value": 150
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "square"
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 150
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
                        "storageKey": "resized(height:150,version:\"square\",width:150)"
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
                  (v1/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkMinimumNextBid",
                "kind": "LinkedField",
                "name": "minimumNextBid",
                "plural": false,
                "selections": [
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "useMyMaxBid",
                    "value": true
                  }
                ],
                "concreteType": "BidIncrementsFormatted",
                "kind": "LinkedField",
                "name": "increments",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": "increments(useMyMaxBid:true)"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "sale",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "bidder",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "qualifiedForBidding",
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "artwork(id:\"foo\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasQualifiedCreditCards",
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v1/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "4d38083ba91a7a6267d8fe58890ee109",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": (v6/*: any*/),
        "artwork.id": (v7/*: any*/),
        "artwork.internalID": (v7/*: any*/),
        "artwork.saleArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.saleArtwork.artwork": (v6/*: any*/),
        "artwork.saleArtwork.artwork.artistNames": (v8/*: any*/),
        "artwork.saleArtwork.artwork.date": (v8/*: any*/),
        "artwork.saleArtwork.artwork.id": (v7/*: any*/),
        "artwork.saleArtwork.artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artwork.saleArtwork.artwork.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artwork.saleArtwork.artwork.image.resized.height": (v9/*: any*/),
        "artwork.saleArtwork.artwork.image.resized.src": (v10/*: any*/),
        "artwork.saleArtwork.artwork.image.resized.srcSet": (v10/*: any*/),
        "artwork.saleArtwork.artwork.image.resized.width": (v9/*: any*/),
        "artwork.saleArtwork.artwork.imageUrl": (v8/*: any*/),
        "artwork.saleArtwork.artwork.internalID": (v7/*: any*/),
        "artwork.saleArtwork.artwork.slug": (v7/*: any*/),
        "artwork.saleArtwork.artwork.title": (v8/*: any*/),
        "artwork.saleArtwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.saleArtwork.counts.bidderPositions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artwork.saleArtwork.currentBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCurrentBid"
        },
        "artwork.saleArtwork.currentBid.display": (v8/*: any*/),
        "artwork.saleArtwork.id": (v7/*: any*/),
        "artwork.saleArtwork.increments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BidIncrementsFormatted"
        },
        "artwork.saleArtwork.increments.cents": (v11/*: any*/),
        "artwork.saleArtwork.increments.display": (v8/*: any*/),
        "artwork.saleArtwork.lotLabel": (v8/*: any*/),
        "artwork.saleArtwork.minimumNextBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkMinimumNextBid"
        },
        "artwork.saleArtwork.minimumNextBid.cents": (v11/*: any*/),
        "artwork.saleArtwork.sale": (v12/*: any*/),
        "artwork.saleArtwork.sale.bidder": (v13/*: any*/),
        "artwork.saleArtwork.sale.bidder.id": (v7/*: any*/),
        "artwork.saleArtwork.sale.id": (v7/*: any*/),
        "artwork.saleArtwork.sale.internalID": (v7/*: any*/),
        "artwork.saleArtwork.sale.registrationStatus": (v13/*: any*/),
        "artwork.saleArtwork.sale.registrationStatus.id": (v7/*: any*/),
        "artwork.saleArtwork.sale.registrationStatus.qualifiedForBidding": (v14/*: any*/),
        "artwork.saleArtwork.sale.slug": (v7/*: any*/),
        "artwork.slug": (v7/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.hasQualifiedCreditCards": (v14/*: any*/),
        "me.id": (v7/*: any*/),
        "me.internalID": (v7/*: any*/),
        "sale": (v12/*: any*/),
        "sale.id": (v7/*: any*/),
        "sale.internalID": (v7/*: any*/),
        "sale.slug": (v7/*: any*/)
      }
    },
    "name": "Auction2BidRouteTestQuery",
    "operationKind": "query",
    "text": "query Auction2BidRouteTestQuery {\n  artwork(id: \"foo\") {\n    ...Auction2BidRoute_artwork\n    id\n  }\n  me {\n    ...Auction2BidRoute_me\n    id\n  }\n  sale(id: \"foo\") {\n    ...Auction2BidRoute_sale\n    id\n  }\n}\n\nfragment Auction2BidRoute_artwork on Artwork {\n  slug\n  internalID\n  saleArtwork {\n    ...AuctionLotInfo_saleArtwork\n    minimumNextBid {\n      cents\n    }\n    increments(useMyMaxBid: true) {\n      cents\n      display\n    }\n    sale {\n      internalID\n      bidder {\n        id\n      }\n      slug\n      registrationStatus {\n        qualifiedForBidding\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Auction2BidRoute_me on Me {\n  internalID\n  hasQualifiedCreditCards\n}\n\nfragment Auction2BidRoute_sale on Sale {\n  internalID\n  slug\n}\n\nfragment AuctionLotInfo_saleArtwork on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  currentBid {\n    display\n  }\n  artwork {\n    internalID\n    date\n    title\n    image {\n      resized(width: 150, height: 150, version: \"square\") {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    imageUrl\n    artistNames\n    slug\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b222f13d2f85474df06afc9c3587eefb';
export default node;
