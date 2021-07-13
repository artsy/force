/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeArtworkModuleRailQueryVariables = {
    key?: string | null;
    id?: string | null;
    relatedArtistID?: string | null;
    followedArtistID?: string | null;
};
export type HomeArtworkModuleRailQueryResponse = {
    readonly homePage: {
        readonly artworkModule: {
            readonly " $fragmentRefs": FragmentRefs<"HomeArtworkModuleRail_artworkModule">;
        } | null;
    } | null;
};
export type HomeArtworkModuleRailQuery = {
    readonly response: HomeArtworkModuleRailQueryResponse;
    readonly variables: HomeArtworkModuleRailQueryVariables;
};



/*
query HomeArtworkModuleRailQuery(
  $key: String
  $id: String
  $relatedArtistID: String
  $followedArtistID: String
) {
  homePage {
    artworkModule(key: $key, id: $id, relatedArtistID: $relatedArtistID, followedArtistID: $followedArtistID) {
      ...HomeArtworkModuleRail_artworkModule
      id
    }
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

fragment HomeArtworkModuleContext_context on HomePageArtworkModuleContext {
  __typename
  ... on Sale {
    href
    liveStartAt(format: "MMM D")
    startAt(format: "MMM D")
    endAt(format: "MMM D")
  }
  ... on Fair {
    href
    exhibitionPeriod
  }
  ... on Gene {
    href
  }
  ... on HomePageRelatedArtistArtworkModule {
    artist {
      name
      href
      id
    }
    basedOn {
      name
      href
      id
    }
  }
  ... on HomePageFollowedArtistArtworkModule {
    artist {
      href
      id
    }
  }
  ... on TrendingArtists {
    artists {
      href
      name
      id
    }
  }
  ... on FollowArtists {
    artists {
      href
      name
      id
    }
  }
}

fragment HomeArtworkModuleRail_artworkModule on HomePageArtworkModule {
  title
  key
  results {
    ...ShelfArtwork_artwork
    id
  }
  context {
    __typename
    ...HomeArtworkModuleContext_context
    ... on Node {
      id
    }
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "key",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "relatedArtistID",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "followedArtistID",
    "type": "String"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "followedArtistID",
    "variableName": "followedArtistID"
  },
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "key",
    "variableName": "key"
  },
  {
    "kind": "Variable",
    "name": "relatedArtistID",
    "variableName": "relatedArtistID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
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
  "name": "name",
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
v9 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v10 = [
  (v7/*: any*/),
  (v4/*: any*/),
  (v6/*: any*/)
],
v11 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Artist",
    "kind": "LinkedField",
    "name": "artists",
    "plural": true,
    "selections": [
      (v4/*: any*/),
      (v7/*: any*/),
      (v6/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeArtworkModuleRailQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "HomePageArtworkModule",
            "kind": "LinkedField",
            "name": "artworkModule",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "HomeArtworkModuleRail_artworkModule"
              }
            ],
            "storageKey": null
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
    "name": "HomeArtworkModuleRailQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "HomePageArtworkModule",
            "kind": "LinkedField",
            "name": "artworkModule",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "key",
                "storageKey": null
              },
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
                            "value": 200
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
                          (v3/*: any*/)
                        ],
                        "storageKey": "resized(width:200)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "aspectRatio",
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
                    "name": "imageTitle",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v4/*: any*/),
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
                    "args": (v5/*: any*/),
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artists",
                    "plural": true,
                    "selections": [
                      (v6/*: any*/),
                      (v4/*: any*/),
                      (v7/*: any*/)
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
                    "args": (v5/*: any*/),
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v4/*: any*/),
                      (v6/*: any*/),
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
                      (v6/*: any*/),
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
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": "opening_bid",
                        "args": null,
                        "concreteType": "SaleArtworkOpeningBid",
                        "kind": "LinkedField",
                        "name": "openingBid",
                        "plural": false,
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      },
                      (v6/*: any*/)
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
                  (v6/*: any*/),
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
                    "alias": "is_biddable",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isBiddable",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "context",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": (v9/*: any*/),
                        "kind": "ScalarField",
                        "name": "liveStartAt",
                        "storageKey": "liveStartAt(format:\"MMM D\")"
                      },
                      {
                        "alias": null,
                        "args": (v9/*: any*/),
                        "kind": "ScalarField",
                        "name": "startAt",
                        "storageKey": "startAt(format:\"MMM D\")"
                      },
                      {
                        "alias": null,
                        "args": (v9/*: any*/),
                        "kind": "ScalarField",
                        "name": "endAt",
                        "storageKey": "endAt(format:\"MMM D\")"
                      }
                    ],
                    "type": "Sale"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "exhibitionPeriod",
                        "storageKey": null
                      }
                    ],
                    "type": "Fair"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/)
                    ],
                    "type": "Gene"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": (v10/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "basedOn",
                        "plural": false,
                        "selections": (v10/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "HomePageRelatedArtistArtworkModule"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "HomePageFollowedArtistArtworkModule"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v11/*: any*/),
                    "type": "TrendingArtists"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v11/*: any*/),
                    "type": "FollowArtists"
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "HomeArtworkModuleRailQuery",
    "operationKind": "query",
    "text": "query HomeArtworkModuleRailQuery(\n  $key: String\n  $id: String\n  $relatedArtistID: String\n  $followedArtistID: String\n) {\n  homePage {\n    artworkModule(key: $key, id: $id, relatedArtistID: $relatedArtistID, followedArtistID: $followedArtistID) {\n      ...HomeArtworkModuleRail_artworkModule\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment HomeArtworkModuleContext_context on HomePageArtworkModuleContext {\n  __typename\n  ... on Sale {\n    href\n    liveStartAt(format: \"MMM D\")\n    startAt(format: \"MMM D\")\n    endAt(format: \"MMM D\")\n  }\n  ... on Fair {\n    href\n    exhibitionPeriod\n  }\n  ... on Gene {\n    href\n  }\n  ... on HomePageRelatedArtistArtworkModule {\n    artist {\n      name\n      href\n      id\n    }\n    basedOn {\n      name\n      href\n      id\n    }\n  }\n  ... on HomePageFollowedArtistArtworkModule {\n    artist {\n      href\n      id\n    }\n  }\n  ... on TrendingArtists {\n    artists {\n      href\n      name\n      id\n    }\n  }\n  ... on FollowArtists {\n    artists {\n      href\n      name\n      id\n    }\n  }\n}\n\nfragment HomeArtworkModuleRail_artworkModule on HomePageArtworkModule {\n  title\n  key\n  results {\n    ...ShelfArtwork_artwork\n    id\n  }\n  context {\n    __typename\n    ...HomeArtworkModuleContext_context\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  image {\n    resized(width: 200) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n"
  }
};
})();
(node as any).hash = 'e60fbd85d83306ee9e5e3d3c22cf46e3';
export default node;
