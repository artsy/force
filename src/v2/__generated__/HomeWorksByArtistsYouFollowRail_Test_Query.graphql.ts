/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeWorksByArtistsYouFollowRail_Test_QueryVariables = {};
export type HomeWorksByArtistsYouFollowRail_Test_QueryResponse = {
    readonly homePage: {
        readonly " $fragmentRefs": FragmentRefs<"HomeWorksByArtistsYouFollowRail_homePage">;
    } | null;
};
export type HomeWorksByArtistsYouFollowRail_Test_Query = {
    readonly response: HomeWorksByArtistsYouFollowRail_Test_QueryResponse;
    readonly variables: HomeWorksByArtistsYouFollowRail_Test_QueryVariables;
};



/*
query HomeWorksByArtistsYouFollowRail_Test_Query {
  homePage {
    ...HomeWorksByArtistsYouFollowRail_homePage
  }
}

fragment Badge_artwork on Artwork {
  is_biddable: isBiddable
  href
  sale {
    is_preview: isPreview
    display_timely_at: displayTimelyAt
    id
  }
}

fragment Contact_artwork on Artwork {
  href
  is_inquireable: isInquireable
  sale {
    is_auction: isAuction
    is_live_open: isLiveOpen
    is_open: isOpen
    is_closed: isClosed
    id
  }
  partner(shallow: true) {
    type
    id
  }
  sale_artwork: saleArtwork {
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    counts {
      bidder_positions: bidderPositions
    }
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
    lotLabel
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

fragment HomeWorksByArtistsYouFollowRail_homePage on HomePage {
  artworkModule(key: FOLLOWED_ARTISTS) {
    results {
      internalID
      slug
      ...ShelfArtwork_artwork_1s6r3G
      id
    }
    id
  }
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment ShelfArtwork_artwork_1s6r3G on Artwork {
  image {
    resized(width: 210) {
      src
      srcSet
      width
      height
    }
    aspectRatio
    height
  }
  imageTitle
  title
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
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
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
},
v10 = {
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
    "name": "HomeWorksByArtistsYouFollowRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeWorksByArtistsYouFollowRail_homePage"
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
    "name": "HomeWorksByArtistsYouFollowRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "key",
                "value": "FOLLOWED_ARTISTS"
              }
            ],
            "concreteType": "HomePageArtworkModule",
            "kind": "LinkedField",
            "name": "artworkModule",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "results",
                "plural": true,
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
                    "name": "slug",
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
                            "name": "width",
                            "value": 210
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
                          (v0/*: any*/)
                        ],
                        "storageKey": "resized(width:210)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "aspectRatio",
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "imageTitle",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  {
                    "alias": "is_saved",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isSaved",
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
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      }
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
                      (v3/*: any*/),
                      {
                        "alias": "is_live_open",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isLiveOpen",
                        "storageKey": null
                      },
                      {
                        "alias": "is_open",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isOpen",
                        "storageKey": null
                      },
                      {
                        "alias": "is_preview",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isPreview",
                        "storageKey": null
                      },
                      {
                        "alias": "display_timely_at",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayTimelyAt",
                        "storageKey": null
                      }
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
                        "kind": "ScalarField",
                        "name": "lotLabel",
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
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": "opening_bid",
                        "args": null,
                        "concreteType": "SaleArtworkOpeningBid",
                        "kind": "LinkedField",
                        "name": "openingBid",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": "is_inquireable",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isInquireable",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "alias": "is_biddable",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isBiddable",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": "artworkModule(key:\"FOLLOWED_ARTISTS\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4cd1f1e7fa6378225bb5a814fb4a807b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "homePage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "HomePage"
        },
        "homePage.artworkModule": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "HomePageArtworkModule"
        },
        "homePage.artworkModule.id": (v6/*: any*/),
        "homePage.artworkModule.results": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artwork"
        },
        "homePage.artworkModule.results.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "homePage.artworkModule.results.artists.href": (v7/*: any*/),
        "homePage.artworkModule.results.artists.id": (v6/*: any*/),
        "homePage.artworkModule.results.artists.name": (v7/*: any*/),
        "homePage.artworkModule.results.collecting_institution": (v7/*: any*/),
        "homePage.artworkModule.results.cultural_maker": (v7/*: any*/),
        "homePage.artworkModule.results.date": (v7/*: any*/),
        "homePage.artworkModule.results.href": (v7/*: any*/),
        "homePage.artworkModule.results.id": (v6/*: any*/),
        "homePage.artworkModule.results.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "homePage.artworkModule.results.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "homePage.artworkModule.results.image.height": (v8/*: any*/),
        "homePage.artworkModule.results.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "homePage.artworkModule.results.image.resized.height": (v8/*: any*/),
        "homePage.artworkModule.results.image.resized.src": (v9/*: any*/),
        "homePage.artworkModule.results.image.resized.srcSet": (v9/*: any*/),
        "homePage.artworkModule.results.image.resized.width": (v8/*: any*/),
        "homePage.artworkModule.results.imageTitle": (v7/*: any*/),
        "homePage.artworkModule.results.internalID": (v6/*: any*/),
        "homePage.artworkModule.results.is_biddable": (v10/*: any*/),
        "homePage.artworkModule.results.is_inquireable": (v10/*: any*/),
        "homePage.artworkModule.results.is_saved": (v10/*: any*/),
        "homePage.artworkModule.results.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "homePage.artworkModule.results.partner.href": (v7/*: any*/),
        "homePage.artworkModule.results.partner.id": (v6/*: any*/),
        "homePage.artworkModule.results.partner.name": (v7/*: any*/),
        "homePage.artworkModule.results.partner.type": (v7/*: any*/),
        "homePage.artworkModule.results.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "homePage.artworkModule.results.sale.display_timely_at": (v7/*: any*/),
        "homePage.artworkModule.results.sale.id": (v6/*: any*/),
        "homePage.artworkModule.results.sale.is_auction": (v10/*: any*/),
        "homePage.artworkModule.results.sale.is_closed": (v10/*: any*/),
        "homePage.artworkModule.results.sale.is_live_open": (v10/*: any*/),
        "homePage.artworkModule.results.sale.is_open": (v10/*: any*/),
        "homePage.artworkModule.results.sale.is_preview": (v10/*: any*/),
        "homePage.artworkModule.results.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "homePage.artworkModule.results.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "homePage.artworkModule.results.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "homePage.artworkModule.results.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "homePage.artworkModule.results.sale_artwork.highest_bid.display": (v7/*: any*/),
        "homePage.artworkModule.results.sale_artwork.id": (v6/*: any*/),
        "homePage.artworkModule.results.sale_artwork.lotLabel": (v7/*: any*/),
        "homePage.artworkModule.results.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "homePage.artworkModule.results.sale_artwork.opening_bid.display": (v7/*: any*/),
        "homePage.artworkModule.results.sale_message": (v7/*: any*/),
        "homePage.artworkModule.results.slug": (v6/*: any*/),
        "homePage.artworkModule.results.title": (v7/*: any*/)
      }
    },
    "name": "HomeWorksByArtistsYouFollowRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeWorksByArtistsYouFollowRail_Test_Query {\n  homePage {\n    ...HomeWorksByArtistsYouFollowRail_homePage\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotLabel\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment HomeWorksByArtistsYouFollowRail_homePage on HomePage {\n  artworkModule(key: FOLLOWED_ARTISTS) {\n    results {\n      internalID\n      slug\n      ...ShelfArtwork_artwork_1s6r3G\n      id\n    }\n    id\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork_1s6r3G on Artwork {\n  image {\n    resized(width: 210) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n"
  }
};
})();
(node as any).hash = 'cb902ac8ff13f607179605fce299e166';
export default node;
