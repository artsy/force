/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TagApp_Test_QueryVariables = {};
export type TagApp_Test_QueryResponse = {
    readonly tag: {
        readonly " $fragmentRefs": FragmentRefs<"TagApp_tag">;
    } | null;
};
export type TagApp_Test_Query = {
    readonly response: TagApp_Test_QueryResponse;
    readonly variables: TagApp_Test_QueryVariables;
};



/*
query TagApp_Test_Query {
  tag(id: "example") {
    ...TagApp_tag
    id
  }
}

fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {
  id
  pageInfo {
    hasNextPage
    endCursor
  }
  pageCursors {
    ...Pagination_pageCursors
  }
  edges {
    node {
      id
    }
  }
  ...ArtworkGrid_artworks
}

fragment ArtworkGrid_artworks on ArtworkConnectionInterface {
  edges {
    __typename
    node {
      id
      slug
      href
      internalID
      image {
        aspect_ratio: aspectRatio
      }
      ...GridItem_artwork
    }
    ... on Node {
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

fragment Pagination_pageCursors on PageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
  previous {
    cursor
    page
  }
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment TagApp_tag on Tag {
  ...TagArtworkFilter_tag_2NZCvC
  ...TagMeta_tag
  name
}

fragment TagArtworkFilter_tag_2NZCvC on Tag {
  slug
  internalID
  sidebar: filterArtworksConnection(first: 1) {
    aggregations {
      slice
      counts {
        name
        value
        count
      }
    }
    id
  }
  filtered_artworks: filterArtworksConnection(first: 30) {
    id
    ...ArtworkFilterArtworkGrid_filtered_artworks
  }
}

fragment TagMeta_tag on Tag {
  name
  href
  description
  image {
    cropped(width: 1200, height: 630) {
      src
    }
  }
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
  "name": "name",
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
  "name": "cursor",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v7 = [
  (v5/*: any*/),
  (v6/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v11 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v13 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v14 = {
  "type": "FilterArtworksConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v15 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v16 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v17 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v18 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v19 = {
  "type": "PageCursor",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v20 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TagApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Tag",
        "kind": "LinkedField",
        "name": "tag",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TagApp_tag"
          }
        ],
        "storageKey": "tag(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TagApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Tag",
        "kind": "LinkedField",
        "name": "tag",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": "sidebar",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
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
                      (v3/*: any*/),
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
              (v4/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(first:1)"
          },
          {
            "alias": "filtered_artworks",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
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
                      (v1/*: any*/),
                      (v8/*: any*/),
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
                            "alias": "aspect_ratio",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "aspectRatio",
                            "storageKey": null
                          },
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
                          }
                        ],
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
                        "alias": "image_title",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
                        "storageKey": null
                      },
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
                        "args": (v9/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          (v8/*: any*/),
                          (v3/*: any*/)
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
                        "args": (v9/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v8/*: any*/),
                          (v4/*: any*/),
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
                          (v4/*: any*/),
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
                          (v4/*: any*/)
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
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "filterArtworksConnection(first:30)"
          },
          (v3/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
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
                    "value": 630
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 1200
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:630,width:1200)"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "tag(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "tag": {
          "type": "Tag",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "tag.id": (v11/*: any*/),
        "tag.name": (v12/*: any*/),
        "tag.slug": (v13/*: any*/),
        "tag.internalID": (v13/*: any*/),
        "tag.sidebar": (v14/*: any*/),
        "tag.filtered_artworks": (v14/*: any*/),
        "tag.href": (v12/*: any*/),
        "tag.description": (v12/*: any*/),
        "tag.image": (v15/*: any*/),
        "tag.sidebar.aggregations": {
          "type": "ArtworksAggregationResults",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "tag.sidebar.id": (v11/*: any*/),
        "tag.filtered_artworks.id": (v13/*: any*/),
        "tag.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "tag.sidebar.aggregations.slice": {
          "type": "ArtworkAggregation",
          "enumValues": [
            "ARTIST",
            "ARTIST_NATIONALITY",
            "ATTRIBUTION_CLASS",
            "COLOR",
            "DIMENSION_RANGE",
            "FOLLOWED_ARTISTS",
            "GALLERY",
            "INSTITUTION",
            "LOCATION_CITY",
            "MAJOR_PERIOD",
            "MATERIALS_TERMS",
            "MEDIUM",
            "MERCHANDISABLE_ARTISTS",
            "PARTNER",
            "PARTNER_CITY",
            "PERIOD",
            "PRICE_RANGE",
            "TOTAL"
          ],
          "plural": false,
          "nullable": true
        },
        "tag.sidebar.aggregations.counts": {
          "type": "AggregationCount",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "tag.filtered_artworks.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "tag.filtered_artworks.pageCursors": {
          "type": "PageCursors",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "tag.filtered_artworks.edges": {
          "type": "ArtworkEdgeInterface",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "tag.image.cropped.src": (v16/*: any*/),
        "tag.sidebar.aggregations.counts.name": (v16/*: any*/),
        "tag.sidebar.aggregations.counts.value": (v16/*: any*/),
        "tag.sidebar.aggregations.counts.count": (v17/*: any*/),
        "tag.filtered_artworks.pageInfo.hasNextPage": (v18/*: any*/),
        "tag.filtered_artworks.pageInfo.endCursor": (v12/*: any*/),
        "tag.filtered_artworks.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "tag.filtered_artworks.pageCursors.around": {
          "type": "PageCursor",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "tag.filtered_artworks.pageCursors.first": (v19/*: any*/),
        "tag.filtered_artworks.pageCursors.last": (v19/*: any*/),
        "tag.filtered_artworks.pageCursors.previous": (v19/*: any*/),
        "tag.filtered_artworks.edges.node.id": (v13/*: any*/),
        "tag.filtered_artworks.pageCursors.around.cursor": (v16/*: any*/),
        "tag.filtered_artworks.pageCursors.around.page": (v17/*: any*/),
        "tag.filtered_artworks.pageCursors.around.isCurrent": (v18/*: any*/),
        "tag.filtered_artworks.pageCursors.first.cursor": (v16/*: any*/),
        "tag.filtered_artworks.pageCursors.first.page": (v17/*: any*/),
        "tag.filtered_artworks.pageCursors.first.isCurrent": (v18/*: any*/),
        "tag.filtered_artworks.pageCursors.last.cursor": (v16/*: any*/),
        "tag.filtered_artworks.pageCursors.last.page": (v17/*: any*/),
        "tag.filtered_artworks.pageCursors.last.isCurrent": (v18/*: any*/),
        "tag.filtered_artworks.pageCursors.previous.cursor": (v16/*: any*/),
        "tag.filtered_artworks.pageCursors.previous.page": (v17/*: any*/),
        "tag.filtered_artworks.edges.node.slug": (v13/*: any*/),
        "tag.filtered_artworks.edges.node.href": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.internalID": (v13/*: any*/),
        "tag.filtered_artworks.edges.node.image": (v15/*: any*/),
        "tag.filtered_artworks.edges.id": (v11/*: any*/),
        "tag.filtered_artworks.edges.node.image.aspect_ratio": {
          "type": "Float",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "tag.filtered_artworks.edges.node.title": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.image_title": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.artistNames": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.is_saved": (v20/*: any*/),
        "tag.filtered_artworks.edges.node.image.placeholder": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.image.url": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.is_biddable": (v20/*: any*/),
        "tag.filtered_artworks.edges.node.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "tag.filtered_artworks.edges.node.date": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.sale_message": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.cultural_maker": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "tag.filtered_artworks.edges.node.collecting_institution": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "tag.filtered_artworks.edges.node.sale_artwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "tag.filtered_artworks.edges.node.is_inquireable": (v20/*: any*/),
        "tag.filtered_artworks.edges.node.sale.is_preview": (v20/*: any*/),
        "tag.filtered_artworks.edges.node.sale.display_timely_at": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.sale.id": (v11/*: any*/),
        "tag.filtered_artworks.edges.node.artists.id": (v13/*: any*/),
        "tag.filtered_artworks.edges.node.artists.href": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.artists.name": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.partner.name": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.partner.href": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.partner.id": (v11/*: any*/),
        "tag.filtered_artworks.edges.node.sale.is_auction": (v20/*: any*/),
        "tag.filtered_artworks.edges.node.sale.is_closed": (v20/*: any*/),
        "tag.filtered_artworks.edges.node.sale_artwork.counts": {
          "type": "SaleArtworkCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "tag.filtered_artworks.edges.node.sale_artwork.highest_bid": {
          "type": "SaleArtworkHighestBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "tag.filtered_artworks.edges.node.sale_artwork.opening_bid": {
          "type": "SaleArtworkOpeningBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "tag.filtered_artworks.edges.node.sale_artwork.id": (v11/*: any*/),
        "tag.filtered_artworks.edges.node.sale.is_live_open": (v20/*: any*/),
        "tag.filtered_artworks.edges.node.sale.is_open": (v20/*: any*/),
        "tag.filtered_artworks.edges.node.partner.type": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.sale_artwork.counts.bidder_positions": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "tag.filtered_artworks.edges.node.sale_artwork.highest_bid.display": (v12/*: any*/),
        "tag.filtered_artworks.edges.node.sale_artwork.opening_bid.display": (v12/*: any*/)
      }
    },
    "name": "TagApp_Test_Query",
    "operationKind": "query",
    "text": "query TagApp_Test_Query {\n  tag(id: \"example\") {\n    ...TagApp_tag\n    id\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment TagApp_tag on Tag {\n  ...TagArtworkFilter_tag_2NZCvC\n  ...TagMeta_tag\n  name\n}\n\nfragment TagArtworkFilter_tag_2NZCvC on Tag {\n  slug\n  internalID\n  sidebar: filterArtworksConnection(first: 1) {\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n    id\n  }\n  filtered_artworks: filterArtworksConnection(first: 30) {\n    id\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n  }\n}\n\nfragment TagMeta_tag on Tag {\n  name\n  href\n  description\n  image {\n    cropped(width: 1200, height: 630) {\n      src\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c14ce04dc9d657bb1554f90db208fd43';
export default node;
