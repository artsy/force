/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneShow_Test_QueryVariables = {};
export type GeneShow_Test_QueryResponse = {
    readonly gene: {
        readonly " $fragmentRefs": FragmentRefs<"GeneShow_gene">;
    } | null;
};
export type GeneShow_Test_Query = {
    readonly response: GeneShow_Test_QueryResponse;
    readonly variables: GeneShow_Test_QueryVariables;
};



/*
query GeneShow_Test_Query {
  gene(id: "example") {
    ...GeneShow_gene
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

fragment FollowGeneButton_gene on Gene {
  id
  slug
  name
  internalID
  isFollowed
}

fragment GeneArtworkFilter_gene_2NZCvC on Gene {
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

fragment GeneMeta_gene on Gene {
  name
  href
  meta {
    description
  }
  image {
    cropped(width: 1200, height: 630) {
      src
    }
  }
}

fragment GeneShow_gene on Gene {
  ...GeneMeta_gene
  ...GeneArtworkFilter_gene_2NZCvC
  ...FollowGeneButton_gene
  name
  formattedDescription: description(format: HTML)
  similar(first: 10) {
    edges {
      node {
        internalID
        name
        href
        id
      }
    }
  }
  artistsConnection(first: 10) {
    edges {
      node {
        internalID
        name
        href
        id
      }
    }
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
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v8 = [
  (v6/*: any*/),
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
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
v11 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v12 = [
  (v4/*: any*/),
  (v1/*: any*/),
  (v2/*: any*/),
  (v5/*: any*/)
],
v13 = {
  "type": "Gene",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v15 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v16 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v17 = {
  "type": "FilterArtworksConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v18 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v19 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v20 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v21 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v22 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v23 = {
  "type": "PageCursor",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneShow_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GeneShow_gene"
          }
        ],
        "storageKey": "gene(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GeneShow_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Gene",
        "kind": "LinkedField",
        "name": "gene",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "GeneMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              }
            ],
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
          (v3/*: any*/),
          (v4/*: any*/),
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
                      (v1/*: any*/),
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
              (v5/*: any*/)
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
              (v5/*: any*/),
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
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v8/*: any*/),
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
                      (v6/*: any*/),
                      (v7/*: any*/)
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
                      (v5/*: any*/),
                      (v3/*: any*/),
                      (v2/*: any*/),
                      (v4/*: any*/),
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
                          (v5/*: any*/),
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
                        "args": (v9/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/),
                          (v5/*: any*/),
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
                          (v5/*: any*/),
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
                          (v5/*: any*/)
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
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "filterArtworksConnection(first:30)"
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          },
          {
            "alias": "formattedDescription",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "description",
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "GeneConnection",
            "kind": "LinkedField",
            "name": "similar",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GeneEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Gene",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "similar(first:10)"
          },
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "ArtistConnection",
            "kind": "LinkedField",
            "name": "artistsConnection",
            "plural": false,
            "selections": [
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
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistsConnection(first:10)"
          }
        ],
        "storageKey": "gene(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "gene": (v13/*: any*/),
        "gene.id": (v14/*: any*/),
        "gene.name": (v15/*: any*/),
        "gene.formattedDescription": (v15/*: any*/),
        "gene.similar": {
          "type": "GeneConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.artistsConnection": {
          "type": "ArtistConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.href": (v15/*: any*/),
        "gene.meta": {
          "type": "GeneMeta",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "gene.image": (v16/*: any*/),
        "gene.slug": (v14/*: any*/),
        "gene.internalID": (v14/*: any*/),
        "gene.sidebar": (v17/*: any*/),
        "gene.filtered_artworks": (v17/*: any*/),
        "gene.isFollowed": (v18/*: any*/),
        "gene.similar.edges": {
          "type": "GeneEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "gene.artistsConnection.edges": {
          "type": "ArtistEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "gene.meta.description": (v19/*: any*/),
        "gene.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.sidebar.aggregations": {
          "type": "ArtworksAggregationResults",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "gene.sidebar.id": (v20/*: any*/),
        "gene.filtered_artworks.id": (v14/*: any*/),
        "gene.similar.edges.node": (v13/*: any*/),
        "gene.artistsConnection.edges.node": {
          "type": "Artist",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.image.cropped.src": (v19/*: any*/),
        "gene.sidebar.aggregations.slice": {
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
        "gene.sidebar.aggregations.counts": {
          "type": "AggregationCount",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "gene.filtered_artworks.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "gene.filtered_artworks.pageCursors": {
          "type": "PageCursors",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "gene.filtered_artworks.edges": {
          "type": "ArtworkEdgeInterface",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "gene.similar.edges.node.internalID": (v14/*: any*/),
        "gene.similar.edges.node.name": (v15/*: any*/),
        "gene.similar.edges.node.href": (v15/*: any*/),
        "gene.similar.edges.node.id": (v20/*: any*/),
        "gene.artistsConnection.edges.node.internalID": (v14/*: any*/),
        "gene.artistsConnection.edges.node.name": (v15/*: any*/),
        "gene.artistsConnection.edges.node.href": (v15/*: any*/),
        "gene.artistsConnection.edges.node.id": (v20/*: any*/),
        "gene.sidebar.aggregations.counts.name": (v19/*: any*/),
        "gene.sidebar.aggregations.counts.value": (v19/*: any*/),
        "gene.sidebar.aggregations.counts.count": (v21/*: any*/),
        "gene.filtered_artworks.pageInfo.hasNextPage": (v22/*: any*/),
        "gene.filtered_artworks.pageInfo.endCursor": (v15/*: any*/),
        "gene.filtered_artworks.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.filtered_artworks.pageCursors.around": {
          "type": "PageCursor",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "gene.filtered_artworks.pageCursors.first": (v23/*: any*/),
        "gene.filtered_artworks.pageCursors.last": (v23/*: any*/),
        "gene.filtered_artworks.pageCursors.previous": (v23/*: any*/),
        "gene.filtered_artworks.edges.node.id": (v14/*: any*/),
        "gene.filtered_artworks.pageCursors.around.cursor": (v19/*: any*/),
        "gene.filtered_artworks.pageCursors.around.page": (v21/*: any*/),
        "gene.filtered_artworks.pageCursors.around.isCurrent": (v22/*: any*/),
        "gene.filtered_artworks.pageCursors.first.cursor": (v19/*: any*/),
        "gene.filtered_artworks.pageCursors.first.page": (v21/*: any*/),
        "gene.filtered_artworks.pageCursors.first.isCurrent": (v22/*: any*/),
        "gene.filtered_artworks.pageCursors.last.cursor": (v19/*: any*/),
        "gene.filtered_artworks.pageCursors.last.page": (v21/*: any*/),
        "gene.filtered_artworks.pageCursors.last.isCurrent": (v22/*: any*/),
        "gene.filtered_artworks.pageCursors.previous.cursor": (v19/*: any*/),
        "gene.filtered_artworks.pageCursors.previous.page": (v21/*: any*/),
        "gene.filtered_artworks.edges.node.slug": (v14/*: any*/),
        "gene.filtered_artworks.edges.node.href": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.internalID": (v14/*: any*/),
        "gene.filtered_artworks.edges.node.image": (v16/*: any*/),
        "gene.filtered_artworks.edges.id": (v20/*: any*/),
        "gene.filtered_artworks.edges.node.image.aspect_ratio": {
          "type": "Float",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "gene.filtered_artworks.edges.node.title": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.image_title": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.artistNames": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.is_saved": (v18/*: any*/),
        "gene.filtered_artworks.edges.node.image.placeholder": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.image.url": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.is_biddable": (v18/*: any*/),
        "gene.filtered_artworks.edges.node.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.filtered_artworks.edges.node.date": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.sale_message": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.cultural_maker": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "gene.filtered_artworks.edges.node.collecting_institution": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.filtered_artworks.edges.node.sale_artwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.filtered_artworks.edges.node.is_inquireable": (v18/*: any*/),
        "gene.filtered_artworks.edges.node.sale.is_preview": (v18/*: any*/),
        "gene.filtered_artworks.edges.node.sale.display_timely_at": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.sale.id": (v20/*: any*/),
        "gene.filtered_artworks.edges.node.artists.id": (v14/*: any*/),
        "gene.filtered_artworks.edges.node.artists.href": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.artists.name": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.partner.name": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.partner.href": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.partner.id": (v20/*: any*/),
        "gene.filtered_artworks.edges.node.sale.is_auction": (v18/*: any*/),
        "gene.filtered_artworks.edges.node.sale.is_closed": (v18/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.counts": {
          "type": "SaleArtworkCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.filtered_artworks.edges.node.sale_artwork.highest_bid": {
          "type": "SaleArtworkHighestBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.filtered_artworks.edges.node.sale_artwork.opening_bid": {
          "type": "SaleArtworkOpeningBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.filtered_artworks.edges.node.sale_artwork.id": (v20/*: any*/),
        "gene.filtered_artworks.edges.node.sale.is_live_open": (v18/*: any*/),
        "gene.filtered_artworks.edges.node.sale.is_open": (v18/*: any*/),
        "gene.filtered_artworks.edges.node.partner.type": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.counts.bidder_positions": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "gene.filtered_artworks.edges.node.sale_artwork.highest_bid.display": (v15/*: any*/),
        "gene.filtered_artworks.edges.node.sale_artwork.opening_bid.display": (v15/*: any*/)
      }
    },
    "name": "GeneShow_Test_Query",
    "operationKind": "query",
    "text": "query GeneShow_Test_Query {\n  gene(id: \"example\") {\n    ...GeneShow_gene\n    id\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FollowGeneButton_gene on Gene {\n  id\n  slug\n  name\n  internalID\n  isFollowed\n}\n\nfragment GeneArtworkFilter_gene_2NZCvC on Gene {\n  slug\n  internalID\n  sidebar: filterArtworksConnection(first: 1) {\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n    id\n  }\n  filtered_artworks: filterArtworksConnection(first: 30) {\n    id\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n  }\n}\n\nfragment GeneMeta_gene on Gene {\n  name\n  href\n  meta {\n    description\n  }\n  image {\n    cropped(width: 1200, height: 630) {\n      src\n    }\n  }\n}\n\nfragment GeneShow_gene on Gene {\n  ...GeneMeta_gene\n  ...GeneArtworkFilter_gene_2NZCvC\n  ...FollowGeneButton_gene\n  name\n  formattedDescription: description(format: HTML)\n  similar(first: 10) {\n    edges {\n      node {\n        internalID\n        name\n        href\n        id\n      }\n    }\n  }\n  artistsConnection(first: 10) {\n    edges {\n      node {\n        internalID\n        name\n        href\n        id\n      }\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n"
  }
};
})();
(node as any).hash = 'a133b56c5a96885afe9f9b6effd89a28';
export default node;
