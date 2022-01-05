/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsCurrentShowsQueryVariables = {
    first?: number | null;
    after?: string | null;
};
export type ShowsCurrentShowsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ShowsCurrentShows_viewer">;
    } | null;
};
export type ShowsCurrentShowsQuery = {
    readonly response: ShowsCurrentShowsQueryResponse;
    readonly variables: ShowsCurrentShowsQueryVariables;
};



/*
query ShowsCurrentShowsQuery(
  $first: Int
  $after: String
) {
  viewer {
    ...ShowsCurrentShows_viewer_2HEEH6
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

fragment GridItem_artwork on Artwork {
  internalID
  title
  image_title: imageTitle
  image {
    placeholder
    url(version: "large")
    aspect_ratio: aspectRatio
  }
  artistNames
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
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

fragment ShowsCurrentShow_show on Show {
  name
  href
  startAt(format: "MMM D")
  endAt(format: "MMM D")
  partner {
    __typename
    ... on Partner {
      name
    }
    ... on ExternalPartner {
      name
      id
    }
    ... on Node {
      id
    }
  }
  location {
    city
    id
  }
  artworksConnection(first: 15) {
    totalCount
    edges {
      node {
        internalID
        ...GridItem_artwork
        id
      }
    }
  }
}

fragment ShowsCurrentShows_viewer_2HEEH6 on Viewer {
  showsConnection(first: $first, after: $after, displayable: true, atAFair: false, sort: END_AT_ASC, status: CURRENT) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        internalID
        ...ShowsCurrentShow_show
        id
        __typename
      }
      cursor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after",
    "type": "String"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "atAFair",
    "value": false
  },
  {
    "kind": "Literal",
    "name": "displayable",
    "value": true
  },
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "sort",
    "value": "END_AT_ASC"
  },
  {
    "kind": "Literal",
    "name": "status",
    "value": "CURRENT"
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
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = [
  (v5/*: any*/)
],
v11 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v12 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowsCurrentShowsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ShowsCurrentShows_viewer"
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
    "name": "ShowsCurrentShowsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ShowEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Show",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": (v7/*: any*/),
                        "kind": "ScalarField",
                        "name": "startAt",
                        "storageKey": "startAt(format:\"MMM D\")"
                      },
                      {
                        "alias": null,
                        "args": (v7/*: any*/),
                        "kind": "ScalarField",
                        "name": "endAt",
                        "storageKey": "endAt(format:\"MMM D\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          (v9/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v10/*: any*/),
                            "type": "Partner"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v10/*: any*/),
                            "type": "ExternalPartner"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Location",
                        "kind": "LinkedField",
                        "name": "location",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "city",
                            "storageKey": null
                          },
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 15
                          }
                        ],
                        "concreteType": "ArtworkConnection",
                        "kind": "LinkedField",
                        "name": "artworksConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "totalCount",
                            "storageKey": null
                          },
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
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "title",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": "image_title",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "imageTitle",
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
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": "large"
                                          }
                                        ],
                                        "kind": "ScalarField",
                                        "name": "url",
                                        "storageKey": "url(version:\"large\")"
                                      },
                                      {
                                        "alias": "aspect_ratio",
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
                                    "kind": "ScalarField",
                                    "name": "artistNames",
                                    "storageKey": null
                                  },
                                  (v6/*: any*/),
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
                                    "args": (v11/*: any*/),
                                    "concreteType": "Artist",
                                    "kind": "LinkedField",
                                    "name": "artists",
                                    "plural": true,
                                    "selections": [
                                      (v9/*: any*/),
                                      (v6/*: any*/),
                                      (v5/*: any*/)
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
                                    "args": (v11/*: any*/),
                                    "concreteType": "Partner",
                                    "kind": "LinkedField",
                                    "name": "partner",
                                    "plural": false,
                                    "selections": [
                                      (v5/*: any*/),
                                      (v6/*: any*/),
                                      (v9/*: any*/),
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
                                      (v9/*: any*/),
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
                                        "selections": (v12/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "opening_bid",
                                        "args": null,
                                        "concreteType": "SaleArtworkOpeningBid",
                                        "kind": "LinkedField",
                                        "name": "openingBid",
                                        "plural": false,
                                        "selections": (v12/*: any*/),
                                        "storageKey": null
                                      },
                                      (v9/*: any*/)
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
                                  (v9/*: any*/),
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
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "artworksConnection(first:15)"
                      },
                      (v9/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
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
            "args": (v3/*: any*/),
            "filters": [
              "displayable",
              "atAFair",
              "sort",
              "status"
            ],
            "handle": "connection",
            "key": "ShowsCurrentShowsQuery_showsConnection",
            "kind": "LinkedHandle",
            "name": "showsConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ShowsCurrentShowsQuery",
    "operationKind": "query",
    "text": "query ShowsCurrentShowsQuery(\n  $first: Int\n  $after: String\n) {\n  viewer {\n    ...ShowsCurrentShows_viewer_2HEEH6\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShowsCurrentShow_show on Show {\n  name\n  href\n  startAt(format: \"MMM D\")\n  endAt(format: \"MMM D\")\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Node {\n      id\n    }\n  }\n  location {\n    city\n    id\n  }\n  artworksConnection(first: 15) {\n    totalCount\n    edges {\n      node {\n        internalID\n        ...GridItem_artwork\n        id\n      }\n    }\n  }\n}\n\nfragment ShowsCurrentShows_viewer_2HEEH6 on Viewer {\n  showsConnection(first: $first, after: $after, displayable: true, atAFair: false, sort: END_AT_ASC, status: CURRENT) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        internalID\n        ...ShowsCurrentShow_show\n        id\n        __typename\n      }\n      cursor\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8597429b17141bd36b066a95a215c43f';
export default node;
