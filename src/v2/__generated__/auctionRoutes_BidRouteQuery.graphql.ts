/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionRoutes_BidRouteQueryVariables = {
    slug: string;
    artworkSlug: string;
};
export type auctionRoutes_BidRouteQueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionBidRoute_sale">;
    } | null;
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionBidRoute_artwork">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionBidRoute_me">;
    } | null;
};
export type auctionRoutes_BidRouteQuery = {
    readonly response: auctionRoutes_BidRouteQueryResponse;
    readonly variables: auctionRoutes_BidRouteQueryVariables;
};



/*
query auctionRoutes_BidRouteQuery(
  $slug: String!
  $artworkSlug: String!
) {
  sale(id: $slug) @principalField {
    ...AuctionBidRoute_sale
    id
  }
  artwork(id: $artworkSlug) {
    ...AuctionBidRoute_artwork
    id
  }
  me {
    ...AuctionBidRoute_me
    id
  }
}

fragment AuctionBidRoute_artwork on Artwork {
  slug
  internalID
  saleArtwork {
    ...AuctionLotInfo_saleArtwork_1WWOz5
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

fragment AuctionBidRoute_me on Me {
  internalID
  hasQualifiedCreditCards
}

fragment AuctionBidRoute_sale on Sale {
  internalID
  slug
}

fragment AuctionLotInfo_saleArtwork_1WWOz5 on SaleArtwork {
  counts {
    bidderPositions
  }
  lotLabel
  currentBid {
    display
  }
  formattedEndDateTime
  artwork {
    internalID
    date
    title
    image {
      resized(width: 150, height: 150, version: "medium") {
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artworkSlug"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "slug"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkSlug"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "auctionRoutes_BidRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionBidRoute_sale"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionBidRoute_artwork"
          }
        ],
        "storageKey": null
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
            "name": "AuctionBidRoute_me"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "auctionRoutes_BidRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v4/*: any*/),
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
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedEndDateTime",
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
                  (v4/*: any*/),
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
                            "value": "medium"
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
                        "storageKey": "resized(height:150,version:\"medium\",width:150)"
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
                  (v5/*: any*/),
                  (v6/*: any*/)
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
                  (v8/*: any*/)
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
                  (v8/*: any*/),
                  (v7/*: any*/)
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "bidder",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/),
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
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      },
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
            "args": null,
            "kind": "ScalarField",
            "name": "hasQualifiedCreditCards",
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "28ee8cf80184595581fa16841bc06fd4",
    "id": null,
    "metadata": {},
    "name": "auctionRoutes_BidRouteQuery",
    "operationKind": "query",
    "text": "query auctionRoutes_BidRouteQuery(\n  $slug: String!\n  $artworkSlug: String!\n) {\n  sale(id: $slug) @principalField {\n    ...AuctionBidRoute_sale\n    id\n  }\n  artwork(id: $artworkSlug) {\n    ...AuctionBidRoute_artwork\n    id\n  }\n  me {\n    ...AuctionBidRoute_me\n    id\n  }\n}\n\nfragment AuctionBidRoute_artwork on Artwork {\n  slug\n  internalID\n  saleArtwork {\n    ...AuctionLotInfo_saleArtwork_1WWOz5\n    minimumNextBid {\n      cents\n    }\n    increments(useMyMaxBid: true) {\n      cents\n      display\n    }\n    sale {\n      internalID\n      bidder {\n        id\n      }\n      slug\n      registrationStatus {\n        qualifiedForBidding\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment AuctionBidRoute_me on Me {\n  internalID\n  hasQualifiedCreditCards\n}\n\nfragment AuctionBidRoute_sale on Sale {\n  internalID\n  slug\n}\n\nfragment AuctionLotInfo_saleArtwork_1WWOz5 on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  currentBid {\n    display\n  }\n  formattedEndDateTime\n  artwork {\n    internalID\n    date\n    title\n    image {\n      resized(width: 150, height: 150, version: \"medium\") {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    imageUrl\n    artistNames\n    slug\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8a95737db97b5ff40cfb0ea9d1502ae7';
export default node;
