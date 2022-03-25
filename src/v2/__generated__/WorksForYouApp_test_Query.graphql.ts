/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForYouApp_test_QueryVariables = {
    includeSelectedArtist: boolean;
    artistSlug: string;
};
export type WorksForYouApp_test_QueryResponse = {
    readonly viewerArtist: {
        readonly " $fragmentRefs": FragmentRefs<"WorksForYouApp_viewerArtist">;
    } | null;
    readonly viewerFeed: {
        readonly " $fragmentRefs": FragmentRefs<"WorksForYouApp_viewerFeed">;
    } | null;
    readonly viewerMe: {
        readonly " $fragmentRefs": FragmentRefs<"WorksForYouApp_viewerMe">;
    } | null;
    readonly viewerSidebarAggregations: {
        readonly " $fragmentRefs": FragmentRefs<"WorksForYouApp_viewerSidebarAggregations">;
    } | null;
};
export type WorksForYouApp_test_Query = {
    readonly response: WorksForYouApp_test_QueryResponse;
    readonly variables: WorksForYouApp_test_QueryVariables;
};



/*
query WorksForYouApp_test_Query(
  $includeSelectedArtist: Boolean!
  $artistSlug: String!
) {
  viewerArtist: viewer {
    ...WorksForYouApp_viewerArtist_1H2h5M @include(if: $includeSelectedArtist)
  }
  viewerFeed: viewer {
    ...WorksForYouApp_viewerFeed @skip(if: $includeSelectedArtist)
  }
  viewerMe: viewer {
    ...WorksForYouApp_viewerMe
  }
  viewerSidebarAggregations: viewer {
    ...WorksForYouApp_viewerSidebarAggregations
  }
}

fragment ArtworkGrid_artworks on ArtworkConnectionInterface {
  __isArtworkConnectionInterface: __typename
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
      ...FlatGridItem_artwork
    }
    ... on Node {
      __isNode: __typename
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
    endAt
    cascadingEndTimeInterval
    startAt
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    lotLabel
    endAt
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
  ...HoverDetails_artwork
}

fragment FlatGridItem_artwork on Artwork {
  ...Metadata_artwork
  ...SaveButton_artwork
  internalID
  title
  image_title: imageTitle
  image {
    resized(width: 445, version: ["normalized", "larger", "large"]) {
      src
      srcSet
      width
      height
    }
  }
  artistNames
  href
  is_saved: isSaved
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

fragment HoverDetails_artwork on Artwork {
  internalID
  attributionClass {
    name
    id
  }
  mediumType {
    name
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

fragment WorksForYouApp_viewerArtist_1H2h5M on Viewer {
  ...WorksForYouArtistFeed_viewer_1H2h5M
}

fragment WorksForYouApp_viewerFeed on Viewer {
  ...WorksForYouFeed_viewer
}

fragment WorksForYouApp_viewerMe on Viewer {
  me {
    followsAndSaves {
      bundledArtworksByArtistConnection(first: 1, forSale: true) {
        edges {
          node {
            id
          }
        }
      }
    }
    id
  }
}

fragment WorksForYouApp_viewerSidebarAggregations on Viewer {
  sidebarAggregations: artworksConnection(aggregations: [ARTIST, FOLLOWED_ARTISTS], first: 1) {
    counts {
      followedArtists
    }
    aggregations {
      counts {
        label: name
        value
        count
      }
    }
    id
  }
}

fragment WorksForYouArtistFeed_viewer_1H2h5M on Viewer {
  artist(id: $artistSlug) {
    internalID
    name
    href
    counts {
      artworks
      forSaleArtworks
    }
    image {
      resized(height: 80, width: 80) {
        src
        srcSet
      }
    }
    artworksConnection(sort: PUBLISHED_AT_DESC, first: 25, filter: [IS_FOR_SALE]) {
      ...ArtworkGrid_artworks
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          __typename
        }
        cursor
      }
    }
    id
  }
}

fragment WorksForYouFeed_viewer on Viewer {
  me {
    followsAndSaves {
      bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 25, forSale: true) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            href
            summary
            artists
            publishedAt(format: "MMM DD")
            artworksConnection {
              ...ArtworkGrid_artworks
            }
            image {
              resized(height: 80, width: 80) {
                src
                srcSet
              }
            }
            __typename
          }
          cursor
        }
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artistSlug"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeSelectedArtist"
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
  "name": "href",
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
          "value": 80
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 80
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        (v6/*: any*/)
      ],
      "storageKey": "resized(height:80,width:80)"
    }
  ],
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "first",
  "value": 25
},
v9 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC"
},
v10 = [
  {
    "kind": "Literal",
    "name": "filter",
    "value": [
      "IS_FOR_SALE"
    ]
  },
  (v8/*: any*/),
  (v9/*: any*/)
],
v11 = {
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
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v16 = {
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
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": [
            "normalized",
            "larger",
            "large"
          ]
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 445
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        (v6/*: any*/),
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
      "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:445)"
    }
  ],
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v18 = {
  "alias": "image_title",
  "args": null,
  "kind": "ScalarField",
  "name": "imageTitle",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v20 = {
  "alias": "is_saved",
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v22 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v23 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v24 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v25 = {
  "alias": null,
  "args": (v24/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artists",
  "plural": true,
  "selections": [
    (v12/*: any*/),
    (v4/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v26 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": (v24/*: any*/),
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
    (v12/*: any*/),
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
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "concreteType": "Sale",
  "kind": "LinkedField",
  "name": "sale",
  "plural": false,
  "selections": [
    (v28/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cascadingEndTimeInterval",
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
    (v12/*: any*/),
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
v30 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v31 = {
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
    (v28/*: any*/),
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
      "selections": (v30/*: any*/),
      "storageKey": null
    },
    {
      "alias": "opening_bid",
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v30/*: any*/),
      "storageKey": null
    },
    (v12/*: any*/)
  ],
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v12/*: any*/)
  ],
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtworkMedium",
  "kind": "LinkedField",
  "name": "mediumType",
  "plural": false,
  "selections": [
    (v3/*: any*/)
  ],
  "storageKey": null
},
v34 = {
  "alias": "is_inquireable",
  "args": null,
  "kind": "ScalarField",
  "name": "isInquireable",
  "storageKey": null
},
v35 = {
  "alias": "is_biddable",
  "args": null,
  "kind": "ScalarField",
  "name": "isBiddable",
  "storageKey": null
},
v36 = [
  (v12/*: any*/)
],
v37 = {
  "kind": "InlineFragment",
  "selections": (v36/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v38 = {
  "kind": "Literal",
  "name": "forSale",
  "value": true
},
v39 = [
  (v8/*: any*/),
  (v38/*: any*/),
  (v9/*: any*/)
],
v40 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v41 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Viewer"
},
v42 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v43 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v44 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtworkEdgeInterface"
},
v45 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v47 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v48 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AttributionClass"
},
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v51 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkMedium"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v60 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v61 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v62 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkOpeningBid"
},
v63 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "PageInfo"
},
v64 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v65 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Me"
},
v66 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FollowsAndSaves"
},
v67 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FollowedArtistsArtworksGroupConnection"
},
v68 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "FollowedArtistsArtworksGroupEdge"
},
v69 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FollowedArtistsArtworksGroup"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorksForYouApp_test_Query",
    "selections": [
      {
        "alias": "viewerArtist",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "args": [
                  {
                    "kind": "Variable",
                    "name": "artistSlug",
                    "variableName": "artistSlug"
                  }
                ],
                "kind": "FragmentSpread",
                "name": "WorksForYouApp_viewerArtist"
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerFeed",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "WorksForYouApp_viewerFeed"
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerMe",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorksForYouApp_viewerMe"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerSidebarAggregations",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorksForYouApp_viewerSidebarAggregations"
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
    "name": "WorksForYouApp_test_Query",
    "selections": [
      {
        "alias": "viewerArtist",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "artistSlug"
                  }
                ],
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "artist",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
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
                        "name": "artworks",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "forSaleArtworks",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": (v10/*: any*/),
                    "concreteType": "ArtworkConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
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
                              (v12/*: any*/),
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v15/*: any*/),
                                  (v4/*: any*/),
                                  (v2/*: any*/),
                                  (v16/*: any*/),
                                  (v17/*: any*/),
                                  (v18/*: any*/),
                                  (v19/*: any*/),
                                  (v20/*: any*/),
                                  (v21/*: any*/),
                                  (v22/*: any*/),
                                  (v23/*: any*/),
                                  (v25/*: any*/),
                                  (v26/*: any*/),
                                  (v27/*: any*/),
                                  (v29/*: any*/),
                                  (v31/*: any*/),
                                  (v32/*: any*/),
                                  (v33/*: any*/),
                                  (v34/*: any*/),
                                  (v35/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v37/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "ArtworkConnectionInterface",
                        "abstractKey": "__isArtworkConnectionInterface"
                      }
                    ],
                    "storageKey": "artworksConnection(filter:[\"IS_FOR_SALE\"],first:25,sort:\"PUBLISHED_AT_DESC\")"
                  },
                  {
                    "alias": null,
                    "args": (v10/*: any*/),
                    "filters": [
                      "sort",
                      "filter"
                    ],
                    "handle": "connection",
                    "key": "WorksForYouArtistFeed_artworksConnection",
                    "kind": "LinkedHandle",
                    "name": "artworksConnection"
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerFeed",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Me",
                "kind": "LinkedField",
                "name": "me",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FollowsAndSaves",
                    "kind": "LinkedField",
                    "name": "followsAndSaves",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": (v39/*: any*/),
                        "concreteType": "FollowedArtistsArtworksGroupConnection",
                        "kind": "LinkedField",
                        "name": "bundledArtworksByArtistConnection",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "FollowedArtistsArtworksGroupEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "FollowedArtistsArtworksGroup",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v12/*: any*/),
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "summary",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "artists",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "format",
                                        "value": "MMM DD"
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "publishedAt",
                                    "storageKey": "publishedAt(format:\"MMM DD\")"
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ArtworkConnection",
                                    "kind": "LinkedField",
                                    "name": "artworksConnection",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": null,
                                            "kind": "LinkedField",
                                            "name": "edges",
                                            "plural": true,
                                            "selections": [
                                              (v13/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "Artwork",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  (v12/*: any*/),
                                                  (v15/*: any*/),
                                                  (v4/*: any*/),
                                                  (v2/*: any*/),
                                                  (v16/*: any*/),
                                                  (v17/*: any*/),
                                                  (v18/*: any*/),
                                                  (v19/*: any*/),
                                                  (v20/*: any*/),
                                                  (v21/*: any*/),
                                                  (v22/*: any*/),
                                                  (v23/*: any*/),
                                                  (v25/*: any*/),
                                                  (v26/*: any*/),
                                                  (v27/*: any*/),
                                                  (v29/*: any*/),
                                                  (v31/*: any*/),
                                                  (v32/*: any*/),
                                                  (v33/*: any*/),
                                                  (v34/*: any*/),
                                                  (v35/*: any*/)
                                                ],
                                                "storageKey": null
                                              },
                                              (v37/*: any*/)
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "type": "ArtworkConnectionInterface",
                                        "abstractKey": "__isArtworkConnectionInterface"
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v7/*: any*/),
                                  (v13/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v14/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "bundledArtworksByArtistConnection(first:25,forSale:true,sort:\"PUBLISHED_AT_DESC\")"
                      },
                      {
                        "alias": null,
                        "args": (v39/*: any*/),
                        "filters": [
                          "sort",
                          "forSale"
                        ],
                        "handle": "connection",
                        "key": "WorksForYouFeed_bundledArtworksByArtistConnection",
                        "kind": "LinkedHandle",
                        "name": "bundledArtworksByArtistConnection"
                      }
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerMe",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FollowsAndSaves",
                "kind": "LinkedField",
                "name": "followsAndSaves",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      (v40/*: any*/),
                      (v38/*: any*/)
                    ],
                    "concreteType": "FollowedArtistsArtworksGroupConnection",
                    "kind": "LinkedField",
                    "name": "bundledArtworksByArtistConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FollowedArtistsArtworksGroupEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "FollowedArtistsArtworksGroup",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": (v36/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "bundledArtworksByArtistConnection(first:1,forSale:true)"
                  }
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerSidebarAggregations",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "sidebarAggregations",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "ARTIST",
                  "FOLLOWED_ARTISTS"
                ]
              },
              (v40/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
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
                    "name": "followedArtists",
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
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      {
                        "alias": "label",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
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
              (v12/*: any*/)
            ],
            "storageKey": "artworksConnection(aggregations:[\"ARTIST\",\"FOLLOWED_ARTISTS\"],first:1)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "31e994cb377f9f6bbf770d2631a112db",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewerArtist": (v41/*: any*/),
        "viewerArtist.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "viewerArtist.artist.artworksConnection": (v42/*: any*/),
        "viewerArtist.artist.artworksConnection.__isArtworkConnectionInterface": (v43/*: any*/),
        "viewerArtist.artist.artworksConnection.edges": (v44/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.__isNode": (v43/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.__typename": (v43/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.cursor": (v43/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.id": (v45/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node": (v46/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.__typename": (v43/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artistNames": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists": (v48/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists.href": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists.id": (v45/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists.name": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.attributionClass": (v49/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.attributionClass.id": (v45/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.attributionClass.name": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collecting_institution": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.cultural_maker": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.date": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.href": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.id": (v45/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.aspect_ratio": (v51/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.placeholder": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized": (v52/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.height": (v53/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.src": (v43/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.srcSet": (v43/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.width": (v53/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.url": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image_title": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.internalID": (v45/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.is_biddable": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.is_inquireable": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.is_saved": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.mediumType": (v55/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.mediumType.name": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner.href": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner.id": (v45/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner.name": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner.type": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale": (v57/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.cascadingEndTimeInterval": (v53/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.display_timely_at": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.endAt": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.id": (v45/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.is_auction": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.is_closed": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.is_live_open": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.is_open": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.is_preview": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.startAt": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork": (v58/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.counts": (v59/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.endAt": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.highest_bid": (v61/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.id": (v45/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.lotLabel": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.opening_bid": (v62/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_message": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.slug": (v45/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.title": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.pageInfo": (v63/*: any*/),
        "viewerArtist.artist.artworksConnection.pageInfo.endCursor": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.pageInfo.hasNextPage": (v64/*: any*/),
        "viewerArtist.artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "viewerArtist.artist.counts.artworks": (v60/*: any*/),
        "viewerArtist.artist.counts.forSaleArtworks": (v60/*: any*/),
        "viewerArtist.artist.href": (v47/*: any*/),
        "viewerArtist.artist.id": (v45/*: any*/),
        "viewerArtist.artist.image": (v50/*: any*/),
        "viewerArtist.artist.image.resized": (v52/*: any*/),
        "viewerArtist.artist.image.resized.src": (v43/*: any*/),
        "viewerArtist.artist.image.resized.srcSet": (v43/*: any*/),
        "viewerArtist.artist.internalID": (v45/*: any*/),
        "viewerArtist.artist.name": (v47/*: any*/),
        "viewerFeed": (v41/*: any*/),
        "viewerFeed.me": (v65/*: any*/),
        "viewerFeed.me.followsAndSaves": (v66/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection": (v67/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges": (v68/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.cursor": (v43/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node": (v69/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.__typename": (v43/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artists": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection": (v42/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.__isArtworkConnectionInterface": (v43/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges": (v44/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.__isNode": (v43/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.__typename": (v43/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.id": (v45/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node": (v46/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artistNames": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists": (v48/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists.href": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists.id": (v45/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists.name": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.attributionClass": (v49/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.attributionClass.id": (v45/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.attributionClass.name": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collecting_institution": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.cultural_maker": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.date": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.href": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.id": (v45/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.aspect_ratio": (v51/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.placeholder": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized": (v52/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.height": (v53/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.src": (v43/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.srcSet": (v43/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.width": (v53/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.url": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image_title": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.internalID": (v45/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.is_biddable": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.is_inquireable": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.is_saved": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.mediumType": (v55/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.mediumType.name": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner.href": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner.id": (v45/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner.name": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner.type": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale": (v57/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.cascadingEndTimeInterval": (v53/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.display_timely_at": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.endAt": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.id": (v45/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.is_auction": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.is_closed": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.is_live_open": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.is_open": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.is_preview": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.startAt": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork": (v58/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.counts": (v59/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.endAt": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.highest_bid": (v61/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.id": (v45/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.lotLabel": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.opening_bid": (v62/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_message": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.slug": (v45/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.title": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.href": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.id": (v45/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image.resized": (v52/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image.resized.src": (v43/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image.resized.srcSet": (v43/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.publishedAt": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.summary": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.pageInfo": (v63/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.pageInfo.endCursor": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.pageInfo.hasNextPage": (v64/*: any*/),
        "viewerFeed.me.id": (v45/*: any*/),
        "viewerMe": (v41/*: any*/),
        "viewerMe.me": (v65/*: any*/),
        "viewerMe.me.followsAndSaves": (v66/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection": (v67/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection.edges": (v68/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node": (v69/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.id": (v45/*: any*/),
        "viewerMe.me.id": (v45/*: any*/),
        "viewerSidebarAggregations": (v41/*: any*/),
        "viewerSidebarAggregations.sidebarAggregations": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "viewerSidebarAggregations.sidebarAggregations.aggregations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworksAggregationResults"
        },
        "viewerSidebarAggregations.sidebarAggregations.aggregations.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AggregationCount"
        },
        "viewerSidebarAggregations.sidebarAggregations.aggregations.counts.count": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "viewerSidebarAggregations.sidebarAggregations.aggregations.counts.label": (v43/*: any*/),
        "viewerSidebarAggregations.sidebarAggregations.aggregations.counts.value": (v43/*: any*/),
        "viewerSidebarAggregations.sidebarAggregations.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "viewerSidebarAggregations.sidebarAggregations.counts.followedArtists": (v60/*: any*/),
        "viewerSidebarAggregations.sidebarAggregations.id": (v45/*: any*/)
      }
    },
    "name": "WorksForYouApp_test_Query",
    "operationKind": "query",
    "text": "query WorksForYouApp_test_Query(\n  $includeSelectedArtist: Boolean!\n  $artistSlug: String!\n) {\n  viewerArtist: viewer {\n    ...WorksForYouApp_viewerArtist_1H2h5M @include(if: $includeSelectedArtist)\n  }\n  viewerFeed: viewer {\n    ...WorksForYouApp_viewerFeed @skip(if: $includeSelectedArtist)\n  }\n  viewerMe: viewer {\n    ...WorksForYouApp_viewerMe\n  }\n  viewerSidebarAggregations: viewer {\n    ...WorksForYouApp_viewerSidebarAggregations\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeInterval\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotLabel\n    endAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...HoverDetails_artwork\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    resized(width: 445, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  artistNames\n  href\n  is_saved: isSaved\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    name\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment WorksForYouApp_viewerArtist_1H2h5M on Viewer {\n  ...WorksForYouArtistFeed_viewer_1H2h5M\n}\n\nfragment WorksForYouApp_viewerFeed on Viewer {\n  ...WorksForYouFeed_viewer\n}\n\nfragment WorksForYouApp_viewerMe on Viewer {\n  me {\n    followsAndSaves {\n      bundledArtworksByArtistConnection(first: 1, forSale: true) {\n        edges {\n          node {\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouApp_viewerSidebarAggregations on Viewer {\n  sidebarAggregations: artworksConnection(aggregations: [ARTIST, FOLLOWED_ARTISTS], first: 1) {\n    counts {\n      followedArtists\n    }\n    aggregations {\n      counts {\n        label: name\n        value\n        count\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouArtistFeed_viewer_1H2h5M on Viewer {\n  artist(id: $artistSlug) {\n    internalID\n    name\n    href\n    counts {\n      artworks\n      forSaleArtworks\n    }\n    image {\n      resized(height: 80, width: 80) {\n        src\n        srcSet\n      }\n    }\n    artworksConnection(sort: PUBLISHED_AT_DESC, first: 25, filter: [IS_FOR_SALE]) {\n      ...ArtworkGrid_artworks\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          __typename\n        }\n        cursor\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouFeed_viewer on Viewer {\n  me {\n    followsAndSaves {\n      bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 25, forSale: true) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            href\n            summary\n            artists\n            publishedAt(format: \"MMM DD\")\n            artworksConnection {\n              ...ArtworkGrid_artworks\n            }\n            image {\n              resized(height: 80, width: 80) {\n                src\n                srcSet\n              }\n            }\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '6d321061913d6d233dd28ffd9c497f4c';
export default node;
