/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auction2Routes_TopLevelQueryVariables = {
    slug: string;
};
export type auction2Routes_TopLevelQueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2App_sale">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"Auction2App_me">;
    } | null;
};
export type auction2Routes_TopLevelQuery = {
    readonly response: auction2Routes_TopLevelQueryResponse;
    readonly variables: auction2Routes_TopLevelQueryVariables;
};



/*
query auction2Routes_TopLevelQuery(
  $slug: String!
) {
  sale(id: $slug) @principalField {
    ...Auction2App_sale
    id
  }
  me {
    ...Auction2App_me
    id
  }
}

fragment Auction2App_me on Me {
  internalID
  hasCreditCards
  identityVerified
  pendingIdentityVerification {
    internalID
    id
  }
  bidders(saleID: $slug) {
    qualifiedForBidding
    id
  }
  lotStandings(saleID: $slug, live: true) {
    activeBid {
      internalID
      id
    }
    isLeadingBidder
    saleArtwork {
      slug
      lotLabel
      reserveStatus
      counts {
        bidderPositions
      }
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
      artwork {
        href
        title
        date
        image {
          url(version: "square")
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

fragment Auction2App_sale on Sale {
  ...Auction2Meta_sale
  internalID
  slug
  associatedSale {
    coverImage {
      cropped(width: 260, height: 110) {
        url
      }
    }
    endAt
    href
    slug
    isClosed
    isLiveOpen
    isPreview
    liveStartAt
    name
    startAt
    id
  }
  status
  coverImage {
    cropped(width: 1800, height: 600, version: "wide") {
      url
    }
  }
  currency
  description
  eligibleSaleArtworksCount
  endAt
  isAuction
  isClosed
  isLiveOpen
  isOpen
  liveStartAt
  name
  promotedSale {
    slug
    name
    saleArtworksConnection(first: 25) {
      edges {
        node {
          artwork {
            slug
            title
            date
            saleMessage
            isInAuction
            image {
              placeholder
              url
              aspectRatio
            }
            artists {
              slug
              href
              name
              id
            }
            partner {
              name
              id
            }
            href
            isAcquireable
            id
          }
          id
        }
      }
    }
    id
  }
  registrationEndsAt
  requireIdentityVerification
  startAt
  symbol
}

fragment Auction2Meta_sale on Sale {
  name
  description
  slug
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = [
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
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
  "name": "isClosed",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLiveOpen",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "liveStartAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v16 = [
  (v2/*: any*/),
  (v13/*: any*/)
],
v17 = [
  (v4/*: any*/),
  (v13/*: any*/)
],
v18 = {
  "kind": "Variable",
  "name": "saleID",
  "variableName": "slug"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "auction2Routes_TopLevelQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Auction2App_sale"
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
            "name": "Auction2App_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "auction2Routes_TopLevelQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "associatedSale",
            "plural": false,
            "selections": [
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
                        "value": 110
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 260
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": "cropped(height:110,width:260)"
                  }
                ],
                "storageKey": null
              },
              (v7/*: any*/),
              (v8/*: any*/),
              (v3/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPreview",
                "storageKey": null
              },
              (v11/*: any*/),
              (v2/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
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
                    "value": 600
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "wide"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1800
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": "cropped(height:600,version:\"wide\",width:1800)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "eligibleSaleArtworksCount",
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isAuction",
            "storageKey": null
          },
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isOpen",
            "storageKey": null
          },
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "promotedSale",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 25
                  }
                ],
                "concreteType": "SaleArtworkConnection",
                "kind": "LinkedField",
                "name": "saleArtworksConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtworkEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SaleArtwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "artwork",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "saleMessage",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isInAuction",
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
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "placeholder",
                                    "storageKey": null
                                  },
                                  (v5/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "aspectRatio",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "artists",
                                "plural": true,
                                "selections": [
                                  (v3/*: any*/),
                                  (v8/*: any*/),
                                  (v2/*: any*/),
                                  (v13/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Partner",
                                "kind": "LinkedField",
                                "name": "partner",
                                "plural": false,
                                "selections": (v16/*: any*/),
                                "storageKey": null
                              },
                              (v8/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isAcquireable",
                                "storageKey": null
                              },
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v13/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "saleArtworksConnection(first:25)"
              },
              (v13/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "registrationEndsAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "requireIdentityVerification",
            "storageKey": null
          },
          (v12/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "symbol",
            "storageKey": null
          },
          (v13/*: any*/)
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
            "name": "hasCreditCards",
            "storageKey": null
          },
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
            "selections": (v17/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v18/*: any*/)
            ],
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "bidders",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "qualifiedForBidding",
                "storageKey": null
              },
              (v13/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": true
              },
              (v18/*: any*/)
            ],
            "concreteType": "LotStanding",
            "kind": "LinkedField",
            "name": "lotStandings",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BidderPosition",
                "kind": "LinkedField",
                "name": "activeBid",
                "plural": false,
                "selections": (v17/*: any*/),
                "storageKey": null
              },
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
                  (v3/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "reserveStatus",
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
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "sale",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v7/*: any*/),
                      (v10/*: any*/),
                      (v9/*: any*/),
                      (v13/*: any*/)
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
                      (v8/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
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
                                "name": "version",
                                "value": "square"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"square\")"
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
                        "selections": (v16/*: any*/),
                        "storageKey": null
                      },
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v13/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v13/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "auction2Routes_TopLevelQuery",
    "operationKind": "query",
    "text": "query auction2Routes_TopLevelQuery(\n  $slug: String!\n) {\n  sale(id: $slug) @principalField {\n    ...Auction2App_sale\n    id\n  }\n  me {\n    ...Auction2App_me\n    id\n  }\n}\n\nfragment Auction2App_me on Me {\n  internalID\n  hasCreditCards\n  identityVerified\n  pendingIdentityVerification {\n    internalID\n    id\n  }\n  bidders(saleID: $slug) {\n    qualifiedForBidding\n    id\n  }\n  lotStandings(saleID: $slug, live: true) {\n    activeBid {\n      internalID\n      id\n    }\n    isLeadingBidder\n    saleArtwork {\n      slug\n      lotLabel\n      reserveStatus\n      counts {\n        bidderPositions\n      }\n      saleID\n      highestBid {\n        display\n      }\n      sale {\n        liveStartAt\n        endAt\n        isLiveOpen\n        isClosed\n        id\n      }\n      artwork {\n        href\n        title\n        date\n        image {\n          url(version: \"square\")\n        }\n        artist {\n          name\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment Auction2App_sale on Sale {\n  ...Auction2Meta_sale\n  internalID\n  slug\n  associatedSale {\n    coverImage {\n      cropped(width: 260, height: 110) {\n        url\n      }\n    }\n    endAt\n    href\n    slug\n    isClosed\n    isLiveOpen\n    isPreview\n    liveStartAt\n    name\n    startAt\n    id\n  }\n  status\n  coverImage {\n    cropped(width: 1800, height: 600, version: \"wide\") {\n      url\n    }\n  }\n  currency\n  description\n  eligibleSaleArtworksCount\n  endAt\n  isAuction\n  isClosed\n  isLiveOpen\n  isOpen\n  liveStartAt\n  name\n  promotedSale {\n    slug\n    name\n    saleArtworksConnection(first: 25) {\n      edges {\n        node {\n          artwork {\n            slug\n            title\n            date\n            saleMessage\n            isInAuction\n            image {\n              placeholder\n              url\n              aspectRatio\n            }\n            artists {\n              slug\n              href\n              name\n              id\n            }\n            partner {\n              name\n              id\n            }\n            href\n            isAcquireable\n            id\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n  registrationEndsAt\n  requireIdentityVerification\n  startAt\n  symbol\n}\n\nfragment Auction2Meta_sale on Sale {\n  name\n  description\n  slug\n}\n"
  }
};
})();
(node as any).hash = '677f8d63e9e3f35b178b3ff7a098d455';
export default node;
