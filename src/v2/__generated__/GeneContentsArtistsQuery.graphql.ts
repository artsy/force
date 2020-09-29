/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneContentsArtistsQueryVariables = {
    geneID: string;
};
export type GeneContentsArtistsQueryResponse = {
    readonly gene: {
        readonly " $fragmentRefs": FragmentRefs<"Artists_gene">;
    } | null;
};
export type GeneContentsArtistsQuery = {
    readonly response: GeneContentsArtistsQueryResponse;
    readonly variables: GeneContentsArtistsQueryVariables;
};



/*
query GeneContentsArtistsQuery(
  $geneID: String!
) {
  gene(id: $geneID) {
    ...Artists_gene
    id
  }
}

fragment ArtistRow_artist on Artist {
  name
  href
  internalID
  slug
  ...FollowArtistButton_artist
  artworks: artworksConnection(first: 6) {
    edges {
      node {
        id
        ...FillwidthItem_artwork
      }
    }
  }
}

fragment Artists_gene on Gene {
  id
  artists: artistsConnection(first: 10, after: "") {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        ...ArtistRow_artist
        __typename
      }
      cursor
    }
  }
  filter_aggregations: filterArtworksConnection(aggregations: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE], size: 0, includeMediumFilterInAggregation: true) {
    ...TotalCount_filter_artworks
    aggregations {
      slice
      ...Dropdown_aggregation
    }
    id
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

fragment Dropdown_aggregation on ArtworksAggregationResults {
  slice
  counts {
    name
    value
    count
  }
}

fragment FillwidthItem_artwork on Artwork {
  image {
    url(version: "large")
    aspectRatio
  }
  imageTitle
  title
  href
  ...Metadata_artwork
  ...Save_artwork
  ...Badge_artwork
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
  }
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment Save_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment TotalCount_filter_artworks on FilterArtworksConnection {
  counts {
    total
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "geneID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "geneID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "after",
    "value": ""
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v9 = [
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
    "name": "GeneContentsArtistsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Artists_gene"
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
    "name": "GeneContentsArtistsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": "artists",
            "args": (v3/*: any*/),
            "concreteType": "ArtistConnection",
            "kind": "LinkedField",
            "name": "artistsConnection",
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
                "concreteType": "ArtistEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": "is_followed",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFollowed",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtistCounts",
                        "kind": "LinkedField",
                        "name": "counts",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "follows",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "artworks",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 6
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
                                  (v2/*: any*/),
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
                                            "value": "large"
                                          }
                                        ],
                                        "kind": "ScalarField",
                                        "name": "url",
                                        "storageKey": "url(version:\"large\")"
                                      },
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
                                  (v5/*: any*/),
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
                                      (v2/*: any*/),
                                      (v5/*: any*/),
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
                                    "args": (v8/*: any*/),
                                    "concreteType": "Partner",
                                    "kind": "LinkedField",
                                    "name": "partner",
                                    "plural": false,
                                    "selections": [
                                      (v4/*: any*/),
                                      (v5/*: any*/),
                                      (v2/*: any*/),
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
                                      (v2/*: any*/),
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
                                        "selections": (v9/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "opening_bid",
                                        "args": null,
                                        "concreteType": "SaleArtworkOpeningBid",
                                        "kind": "LinkedField",
                                        "name": "openingBid",
                                        "plural": false,
                                        "selections": (v9/*: any*/),
                                        "storageKey": null
                                      },
                                      (v2/*: any*/)
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
                                  (v7/*: any*/),
                                  {
                                    "alias": "is_saved",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isSaved",
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
                        "storageKey": "artworksConnection(first:6)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
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
            "storageKey": "artistsConnection(after:\"\",first:10)"
          },
          {
            "alias": "artists",
            "args": (v3/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "Artists_artists",
            "kind": "LinkedHandle",
            "name": "artistsConnection"
          },
          {
            "alias": "filter_aggregations",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "MEDIUM",
                  "TOTAL",
                  "PRICE_RANGE",
                  "DIMENSION_RANGE"
                ]
              },
              {
                "kind": "Literal",
                "name": "includeMediumFilterInAggregation",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 0
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "total",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(aggregations:[\"MEDIUM\",\"TOTAL\",\"PRICE_RANGE\",\"DIMENSION_RANGE\"],includeMediumFilterInAggregation:true,size:0)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "GeneContentsArtistsQuery",
    "operationKind": "query",
    "text": "query GeneContentsArtistsQuery(\n  $geneID: String!\n) {\n  gene(id: $geneID) {\n    ...Artists_gene\n    id\n  }\n}\n\nfragment ArtistRow_artist on Artist {\n  name\n  href\n  internalID\n  slug\n  ...FollowArtistButton_artist\n  artworks: artworksConnection(first: 6) {\n    edges {\n      node {\n        id\n        ...FillwidthItem_artwork\n      }\n    }\n  }\n}\n\nfragment Artists_gene on Gene {\n  id\n  artists: artistsConnection(first: 10, after: \"\") {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        ...ArtistRow_artist\n        __typename\n      }\n      cursor\n    }\n  }\n  filter_aggregations: filterArtworksConnection(aggregations: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE], size: 0, includeMediumFilterInAggregation: true) {\n    ...TotalCount_filter_artworks\n    aggregations {\n      slice\n      ...Dropdown_aggregation\n    }\n    id\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment Dropdown_aggregation on ArtworksAggregationResults {\n  slice\n  counts {\n    name\n    value\n    count\n  }\n}\n\nfragment FillwidthItem_artwork on Artwork {\n  image {\n    url(version: \"large\")\n    aspectRatio\n  }\n  imageTitle\n  title\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment TotalCount_filter_artworks on FilterArtworksConnection {\n  counts {\n    total\n  }\n}\n"
  }
};
})();
(node as any).hash = '475032821c1a214fe810bfa6b8f3d4e2';
export default node;
