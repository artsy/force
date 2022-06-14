/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignRoute_Test_QueryVariables = {};
export type ArtistConsignRoute_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistConsignRoute_artist">;
    } | null;
};
export type ArtistConsignRoute_Test_Query = {
    readonly response: ArtistConsignRoute_Test_QueryResponse;
    readonly variables: ArtistConsignRoute_Test_QueryVariables;
};



/*
query ArtistConsignRoute_Test_Query {
  artist(id: "example") {
    ...ArtistConsignRoute_artist
    id
  }
}

fragment ArtistConsignFAQ_artist on Artist {
  href
}

fragment ArtistConsignHeader_artist on Artist {
  name
  href
  targetSupply {
    microfunnel {
      artworksConnection {
        edges {
          node {
            image {
              cropped(width: 300, height: 300) {
                width
                height
                src
                srcSet
              }
            }
            id
          }
        }
      }
    }
  }
}

fragment ArtistConsignHowToSell_artist on Artist {
  href
}

fragment ArtistConsignMarketTrends_artist on Artist {
  href
  targetSupply {
    microfunnel {
      metadata {
        highestRealized
        str
        realized
      }
    }
  }
}

fragment ArtistConsignMeta_artist on Artist {
  name
  href
  targetSupply {
    microfunnel {
      artworksConnection {
        edges {
          node {
            image {
              imageURL: url(version: "medium")
            }
            id
          }
        }
      }
    }
  }
}

fragment ArtistConsignPageViews_artist on Artist {
  name
  targetSupply {
    microfunnel {
      metadata {
        roundedViews
        roundedUniqueVisitors
      }
    }
  }
}

fragment ArtistConsignRecentlySold_artist on Artist {
  name
  targetSupply {
    microfunnel {
      artworksConnection {
        edges {
          node {
            ...FillwidthItem_artwork
            ...ShelfArtwork_artwork
            internalID
            realizedPrice
            id
          }
        }
      }
    }
  }
}

fragment ArtistConsignRoute_artist on Artist {
  ...ArtistConsignMeta_artist
  ...ArtistConsignHeader_artist
  ...ArtistConsignRecentlySold_artist
  ...ArtistConsignPageViews_artist
  ...ArtistConsignMarketTrends_artist
  ...ArtistConsignHowToSell_artist
  ...ArtistConsignFAQ_artist
  ...ArtistConsignSellArt_artist
}

fragment ArtistConsignSellArt_artist on Artist {
  href
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
    endAt
    cascadingEndTimeIntervalMinutes
    extendedBiddingIntervalMinutes
    startAt
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    lotID
    lotLabel
    endAt
    extendedBiddingEndAt
    formattedEndDateTime
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
  ...NewSaveButton_artwork
  ...HoverDetails_artwork
}

fragment FillwidthItem_artwork on Artwork {
  image {
    url(version: "larger")
    aspectRatio
  }
  imageTitle
  title
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
}

fragment HoverDetails_artwork on Artwork {
  internalID
  attributionClass {
    name
    id
  }
  mediumType {
    filterGene {
      name
      id
    }
  }
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  href
}

fragment NewSaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment ShelfArtwork_artwork on Artwork {
  image {
    resized(width: 200) {
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
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v11 = [
  (v1/*: any*/),
  (v7/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistConsignRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistConsignRoute_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistConsignRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistTargetSupply",
            "kind": "LinkedField",
            "name": "targetSupply",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistTargetSupplyMicrofunnel",
                "kind": "LinkedField",
                "name": "microfunnel",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtworkConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Image",
                                "kind": "LinkedField",
                                "name": "image",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": "imageURL",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": "medium"
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": "url(version:\"medium\")"
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 300
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 300
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": [
                                      (v3/*: any*/),
                                      (v4/*: any*/),
                                      (v5/*: any*/),
                                      (v6/*: any*/)
                                    ],
                                    "storageKey": "cropped(height:300,width:300)"
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": "larger"
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": "url(version:\"larger\")"
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "aspectRatio",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 200
                                      }
                                    ],
                                    "concreteType": "ResizedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "resized",
                                    "plural": false,
                                    "selections": [
                                      (v5/*: any*/),
                                      (v6/*: any*/),
                                      (v3/*: any*/),
                                      (v4/*: any*/)
                                    ],
                                    "storageKey": "resized(width:200)"
                                  },
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v7/*: any*/),
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
                              (v2/*: any*/),
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
                                "args": (v8/*: any*/),
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "artists",
                                "plural": true,
                                "selections": [
                                  (v7/*: any*/),
                                  (v2/*: any*/),
                                  (v1/*: any*/)
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
                                "args": (v8/*: any*/),
                                "concreteType": "Partner",
                                "kind": "LinkedField",
                                "name": "partner",
                                "plural": false,
                                "selections": [
                                  (v1/*: any*/),
                                  (v2/*: any*/),
                                  (v7/*: any*/)
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
                                  (v9/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "cascadingEndTimeIntervalMinutes",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "extendedBiddingIntervalMinutes",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "startAt",
                                    "storageKey": null
                                  },
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
                                  (v7/*: any*/),
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
                                    "name": "lotID",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "lotLabel",
                                    "storageKey": null
                                  },
                                  (v9/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "extendedBiddingEndAt",
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
                                    "selections": (v10/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": "opening_bid",
                                    "args": null,
                                    "concreteType": "SaleArtworkOpeningBid",
                                    "kind": "LinkedField",
                                    "name": "openingBid",
                                    "plural": false,
                                    "selections": (v10/*: any*/),
                                    "storageKey": null
                                  },
                                  (v7/*: any*/)
                                ],
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
                                "name": "slug",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "AttributionClass",
                                "kind": "LinkedField",
                                "name": "attributionClass",
                                "plural": false,
                                "selections": (v11/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtworkMedium",
                                "kind": "LinkedField",
                                "name": "mediumType",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Gene",
                                    "kind": "LinkedField",
                                    "name": "filterGene",
                                    "plural": false,
                                    "selections": (v11/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": "is_biddable",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isBiddable",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "realizedPrice",
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TargetSupplyMicrofunnelMetadata",
                    "kind": "LinkedField",
                    "name": "metadata",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "roundedViews",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "roundedUniqueVisitors",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "highestRealized",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "str",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "realized",
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
          },
          (v7/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "a096d9d01d7d8e3c34ba61087a3f99b8",
    "id": null,
    "metadata": {},
    "name": "ArtistConsignRoute_Test_Query",
    "operationKind": "query",
    "text": "query ArtistConsignRoute_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistConsignRoute_artist\n    id\n  }\n}\n\nfragment ArtistConsignFAQ_artist on Artist {\n  href\n}\n\nfragment ArtistConsignHeader_artist on Artist {\n  name\n  href\n  targetSupply {\n    microfunnel {\n      artworksConnection {\n        edges {\n          node {\n            image {\n              cropped(width: 300, height: 300) {\n                width\n                height\n                src\n                srcSet\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistConsignHowToSell_artist on Artist {\n  href\n}\n\nfragment ArtistConsignMarketTrends_artist on Artist {\n  href\n  targetSupply {\n    microfunnel {\n      metadata {\n        highestRealized\n        str\n        realized\n      }\n    }\n  }\n}\n\nfragment ArtistConsignMeta_artist on Artist {\n  name\n  href\n  targetSupply {\n    microfunnel {\n      artworksConnection {\n        edges {\n          node {\n            image {\n              imageURL: url(version: \"medium\")\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistConsignPageViews_artist on Artist {\n  name\n  targetSupply {\n    microfunnel {\n      metadata {\n        roundedViews\n        roundedUniqueVisitors\n      }\n    }\n  }\n}\n\nfragment ArtistConsignRecentlySold_artist on Artist {\n  name\n  targetSupply {\n    microfunnel {\n      artworksConnection {\n        edges {\n          node {\n            ...FillwidthItem_artwork\n            ...ShelfArtwork_artwork\n            internalID\n            realizedPrice\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistConsignRoute_artist on Artist {\n  ...ArtistConsignMeta_artist\n  ...ArtistConsignHeader_artist\n  ...ArtistConsignRecentlySold_artist\n  ...ArtistConsignPageViews_artist\n  ...ArtistConsignMarketTrends_artist\n  ...ArtistConsignHowToSell_artist\n  ...ArtistConsignFAQ_artist\n  ...ArtistConsignSellArt_artist\n}\n\nfragment ArtistConsignSellArt_artist on Artist {\n  href\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment FillwidthItem_artwork on Artwork {\n  image {\n    url(version: \"larger\")\n    aspectRatio\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  image {\n    resized(width: 200) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n"
  }
};
})();
(node as any).hash = '4488f57889fab9e2f6cf2b24e733e4e2';
export default node;
