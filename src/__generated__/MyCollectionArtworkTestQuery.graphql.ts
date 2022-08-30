/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkTestQueryVariables = {};
export type MyCollectionArtworkTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtwork_artwork">;
    } | null;
};
export type MyCollectionArtworkTestQuery = {
    readonly response: MyCollectionArtworkTestQueryResponse;
    readonly variables: MyCollectionArtworkTestQueryVariables;
};



/*
query MyCollectionArtworkTestQuery {
  artwork(id: "foo") {
    ...MyCollectionArtwork_artwork
    id
  }
}

fragment ArtistAuctionResultItem_auctionResult on AuctionResult {
  title
  dimension_text: dimensionText
  organization
  images {
    larger {
      cropped(width: 100, height: 100) {
        src
        srcSet
        width
        height
      }
    }
  }
  mediumText
  categoryText
  date_text: dateText
  saleDate
  boughtIn
  currency
  price_realized: priceRealized {
    display
    display_usd: displayUSD
    cents_usd: centsUSD
  }
  performance {
    mid
  }
  estimate {
    display
  }
}

fragment ArtworkActionsSaveButton_artwork on Artwork {
  internalID
  id
  slug
  title
  sale {
    isAuction
    isClosed
    id
  }
  is_saved: isSaved
}

fragment ArtworkActions_artwork on Artwork {
  ...ArtworkActionsSaveButton_artwork
  ...ArtworkSharePanel_artwork
  ...ViewInRoom_artwork
  artists {
    name
    id
  }
  date
  dimensions {
    cm
  }
  slug
  image {
    internalID
    url(version: "larger")
    height
    width
  }
  downloadableImageUrl
  is_downloadable: isDownloadable
  is_hangable: isHangable
  partner {
    slug
    id
  }
  title
  sale {
    is_closed: isClosed
    is_auction: isAuction
    id
  }
  is_saved: isSaved
}

fragment ArtworkImageBrowserLarge_artwork on Artwork {
  ...ArtworkLightbox_artwork
  ...ArtworkVideoPlayer_artwork
  figures {
    __typename
    ... on Image {
      type: __typename
      internalID
      isZoomable
      ...DeepZoom_image
    }
    ... on Video {
      type: __typename
    }
  }
}

fragment ArtworkImageBrowserSmall_artwork on Artwork {
  ...ArtworkLightbox_artwork
  ...ArtworkVideoPlayer_artwork
  figures {
    __typename
    ... on Image {
      ...DeepZoom_image
      internalID
      isZoomable
      type: __typename
    }
    ... on Video {
      type: __typename
    }
  }
}

fragment ArtworkImageBrowser_artwork on Artwork {
  ...ArtworkActions_artwork
  ...ArtworkImageBrowserSmall_artwork
  ...ArtworkImageBrowserLarge_artwork
  internalID
  images {
    width
    height
  }
  figures {
    __typename
    ... on Image {
      internalID
      isDefault
    }
    ... on Video {
      type: __typename
    }
  }
}

fragment ArtworkLightbox_artwork on Artwork {
  formattedMetadata
  images {
    isDefault
    placeholder: url(version: ["small", "medium"])
    fallback: cropped(width: 800, height: 800, version: ["normalized", "larger", "large"]) {
      width
      height
      src
      srcSet
    }
    resized(width: 800, height: 800, version: ["normalized", "larger", "large"]) {
      width
      height
      src
      srcSet
    }
  }
}

fragment ArtworkSharePanel_artwork on Artwork {
  href
  images {
    url
  }
  artworkMeta: meta {
    share
  }
}

fragment ArtworkVideoPlayer_artwork on Artwork {
  figures {
    __typename
    ... on Video {
      type: __typename
      url
      height
      width
    }
  }
}

fragment DeepZoom_image on Image {
  deepZoom {
    Image {
      xmlns
      Url
      Format
      TileSize
      Overlap
      Size {
        Width
        Height
      }
    }
  }
}

fragment MyCollectionArtworkArtistMarket_marketPriceInsights on ArtworkPriceInsights {
  annualLotsSold
  annualValueSoldDisplayText
  medianSaleOverEstimatePercentage
  liquidityRankDisplayText
  sellThroughRate
}

fragment MyCollectionArtworkAuctionResults_artist on Artist {
  slug
  internalID
  auctionResultsConnection(first: 6) {
    totalCount
    pageInfo {
      hasNextPage
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    edges {
      node {
        ...ArtistAuctionResultItem_auctionResult
        id
      }
    }
  }
}

fragment MyCollectionArtworkComparables_artwork on Artwork {
  auctionResult: comparableAuctionResults(first: 6) @optionalField {
    edges {
      cursor
      node {
        ...ArtistAuctionResultItem_auctionResult
        artistID
        internalID
        id
      }
    }
  }
  artist {
    name
    id
  }
}

fragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {
  demandRank
  demandRankDisplayText
}

fragment MyCollectionArtworkImageBrowser_artwork on Artwork {
  ...ArtworkImageBrowser_artwork
  internalID
  images {
    width
    height
  }
}

fragment MyCollectionArtworkInsights_artwork on Artwork {
  ...MyCollectionArtworkComparables_artwork
  artist {
    ...MyCollectionArtworkAuctionResults_artist
    id
  }
  marketPriceInsights {
    ...MyCollectionArtworkArtistMarket_marketPriceInsights
    ...MyCollectionArtworkDemandIndex_marketPriceInsights
  }
}

fragment MyCollectionArtworkMeta_artwork on Artwork {
  artistNames
  title
}

fragment MyCollectionArtworkSidebarMetadata_artwork on Artwork {
  category
  medium
  dimensions {
    in
    cm
  }
  provenance
  attributionClass {
    shortDescription
    id
  }
  pricePaid {
    display
  }
  artworkLocation
}

fragment MyCollectionArtworkSidebarTitleInfo_artwork on Artwork {
  artistNames
  title
  date
}

fragment MyCollectionArtworkSidebar_artwork on Artwork {
  ...MyCollectionArtworkSidebarTitleInfo_artwork
  ...MyCollectionArtworkSidebarMetadata_artwork
}

fragment MyCollectionArtwork_artwork on Artwork {
  ...MyCollectionArtworkSidebar_artwork
  ...MyCollectionArtworkMeta_artwork
  ...MyCollectionArtworkInsights_artwork
  ...MyCollectionArtworkImageBrowser_artwork
  ...MyCollectionArtworkComparables_artwork
  ...MyCollectionArtworkSidebarTitleInfo_artwork
  comparables: comparableAuctionResults {
    totalCount
  }
  hasMarketPriceInsights
  internalID
  artist {
    slug
    auctionResults: auctionResultsConnection {
      totalCount
    }
    ...MyCollectionArtworkAuctionResults_artist
    id
  }
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

fragment ViewInRoomArtwork_artwork on Artwork {
  widthCm
  heightCm
  image {
    resized(width: 800, height: 800, version: ["normalized", "larger", "large"]) {
      src
      srcSet
      width
      height
    }
  }
}

fragment ViewInRoom_artwork on Artwork {
  ...ViewInRoomArtwork_artwork
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 6
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
  "alias": "dimension_text",
  "args": null,
  "kind": "ScalarField",
  "name": "dimensionText",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "organization",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v13 = [
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotImages",
  "kind": "LinkedField",
  "name": "images",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "larger",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 100
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 100
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v13/*: any*/),
          "storageKey": "cropped(height:100,width:100)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumText",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categoryText",
  "storageKey": null
},
v17 = {
  "alias": "date_text",
  "args": null,
  "kind": "ScalarField",
  "name": "dateText",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleDate",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "boughtIn",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v21 = {
  "alias": "price_realized",
  "args": null,
  "concreteType": "AuctionResultPriceRealized",
  "kind": "LinkedField",
  "name": "priceRealized",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    {
      "alias": "display_usd",
      "args": null,
      "kind": "ScalarField",
      "name": "displayUSD",
      "storageKey": null
    },
    {
      "alias": "cents_usd",
      "args": null,
      "kind": "ScalarField",
      "name": "centsUSD",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotPerformance",
  "kind": "LinkedField",
  "name": "performance",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mid",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotEstimate",
  "kind": "LinkedField",
  "name": "estimate",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v29 = [
  (v6/*: any*/),
  (v28/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v30 = [
  (v27/*: any*/)
],
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v33 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 800
  },
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
    "value": 800
  }
],
v34 = [
  (v11/*: any*/),
  (v12/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v35 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v36 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultConnection"
},
v37 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v38 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "AuctionResultEdge"
},
v39 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResult"
},
v40 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v41 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v42 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotEstimate"
},
v43 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v44 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotImages"
},
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v47 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v48 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotPerformance"
},
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v51 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v52 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionArtworkTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollectionArtwork_artwork"
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionArtworkTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          (v1/*: any*/),
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
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "dimensions",
            "kind": "LinkedField",
            "name": "dimensions",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "in",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cm",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "provenance",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shortDescription",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "pricePaid",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artworkLocation",
            "storageKey": null
          },
          {
            "alias": "auctionResult",
            "args": (v5/*: any*/),
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "comparableAuctionResults",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistID",
                        "storageKey": null
                      },
                      (v24/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "comparableAuctionResults(first:6)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v25/*: any*/),
              (v2/*: any*/),
              (v26/*: any*/),
              (v24/*: any*/),
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "AuctionResultConnection",
                "kind": "LinkedField",
                "name": "auctionResultsConnection",
                "plural": false,
                "selections": [
                  (v27/*: any*/),
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
                        "selections": (v29/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "first",
                        "plural": false,
                        "selections": (v29/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "last",
                        "plural": false,
                        "selections": (v29/*: any*/),
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
                          (v28/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResultEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionResult",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          (v16/*: any*/),
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v21/*: any*/),
                          (v22/*: any*/),
                          (v23/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "auctionResultsConnection(first:6)"
              },
              {
                "alias": "auctionResults",
                "args": null,
                "concreteType": "AuctionResultConnection",
                "kind": "LinkedField",
                "name": "auctionResultsConnection",
                "plural": false,
                "selections": (v30/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkPriceInsights",
            "kind": "LinkedField",
            "name": "marketPriceInsights",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "annualLotsSold",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "annualValueSoldDisplayText",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "medianSaleOverEstimatePercentage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "liquidityRankDisplayText",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "sellThroughRate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "demandRank",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "demandRankDisplayText",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v24/*: any*/),
          (v2/*: any*/),
          (v26/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": "is_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": "is_auction",
                "args": null,
                "kind": "ScalarField",
                "name": "isAuction",
                "storageKey": null
              }
            ],
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
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              (v31/*: any*/),
              (v32/*: any*/),
              {
                "alias": "placeholder",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "small",
                      "medium"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"small\",\"medium\"])"
              },
              {
                "alias": "fallback",
                "args": (v33/*: any*/),
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v34/*: any*/),
                "storageKey": "cropped(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v33/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v34/*: any*/),
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "artworkMeta",
            "args": null,
            "concreteType": "ArtworkMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "share",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "widthCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "heightCm",
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
                "args": (v33/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v13/*: any*/),
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              (v24/*: any*/),
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
              (v12/*: any*/),
              (v11/*: any*/)
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
              (v25/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "downloadableImageUrl",
            "storageKey": null
          },
          {
            "alias": "is_downloadable",
            "args": null,
            "kind": "ScalarField",
            "name": "isDownloadable",
            "storageKey": null
          },
          {
            "alias": "is_hangable",
            "args": null,
            "kind": "ScalarField",
            "name": "isHangable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v26/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedMetadata",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "figures",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v35/*: any*/),
                  (v31/*: any*/),
                  (v12/*: any*/),
                  (v11/*: any*/)
                ],
                "type": "Video",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DeepZoom",
                    "kind": "LinkedField",
                    "name": "deepZoom",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DeepZoomImage",
                        "kind": "LinkedField",
                        "name": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "xmlns",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Url",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Format",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "TileSize",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Overlap",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "DeepZoomImageSize",
                            "kind": "LinkedField",
                            "name": "Size",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Height",
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
                  (v24/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isZoomable",
                    "storageKey": null
                  },
                  (v35/*: any*/),
                  (v32/*: any*/)
                ],
                "type": "Image",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "comparables",
            "args": null,
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "comparableAuctionResults",
            "plural": false,
            "selections": (v30/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasMarketPriceInsights",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "d1adceaa59b4174cfc461300ea149d87",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artwork.artist.auctionResults": (v36/*: any*/),
        "artwork.artist.auctionResults.totalCount": (v37/*: any*/),
        "artwork.artist.auctionResultsConnection": (v36/*: any*/),
        "artwork.artist.auctionResultsConnection.edges": (v38/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node": (v39/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.boughtIn": (v40/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.categoryText": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.currency": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.date_text": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.dimension_text": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate": (v42/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate.display": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.id": (v43/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.larger": (v45/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.larger.cropped": (v46/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.larger.cropped.height": (v47/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.larger.cropped.src": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.larger.cropped.srcSet": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.larger.cropped.width": (v47/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.mediumText": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.organization": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance": (v49/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance.mid": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized": (v50/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.cents_usd": (v51/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display_usd": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.saleDate": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.title": (v41/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "artwork.artist.auctionResultsConnection.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "artwork.artist.auctionResultsConnection.pageCursors.around.cursor": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.isCurrent": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.page": (v47/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first": (v53/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.cursor": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.isCurrent": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.page": (v47/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last": (v53/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.cursor": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.isCurrent": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.page": (v47/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous": (v53/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.cursor": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.page": (v47/*: any*/),
        "artwork.artist.auctionResultsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artwork.artist.auctionResultsConnection.pageInfo.hasNextPage": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.totalCount": (v37/*: any*/),
        "artwork.artist.id": (v43/*: any*/),
        "artwork.artist.internalID": (v43/*: any*/),
        "artwork.artist.name": (v41/*: any*/),
        "artwork.artist.slug": (v43/*: any*/),
        "artwork.artistNames": (v41/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v43/*: any*/),
        "artwork.artists.name": (v41/*: any*/),
        "artwork.artworkLocation": (v41/*: any*/),
        "artwork.artworkMeta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMeta"
        },
        "artwork.artworkMeta.share": (v41/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v43/*: any*/),
        "artwork.attributionClass.shortDescription": (v41/*: any*/),
        "artwork.auctionResult": (v36/*: any*/),
        "artwork.auctionResult.edges": (v38/*: any*/),
        "artwork.auctionResult.edges.cursor": (v48/*: any*/),
        "artwork.auctionResult.edges.node": (v39/*: any*/),
        "artwork.auctionResult.edges.node.artistID": (v48/*: any*/),
        "artwork.auctionResult.edges.node.boughtIn": (v40/*: any*/),
        "artwork.auctionResult.edges.node.categoryText": (v41/*: any*/),
        "artwork.auctionResult.edges.node.currency": (v41/*: any*/),
        "artwork.auctionResult.edges.node.date_text": (v41/*: any*/),
        "artwork.auctionResult.edges.node.dimension_text": (v41/*: any*/),
        "artwork.auctionResult.edges.node.estimate": (v42/*: any*/),
        "artwork.auctionResult.edges.node.estimate.display": (v41/*: any*/),
        "artwork.auctionResult.edges.node.id": (v43/*: any*/),
        "artwork.auctionResult.edges.node.images": (v44/*: any*/),
        "artwork.auctionResult.edges.node.images.larger": (v45/*: any*/),
        "artwork.auctionResult.edges.node.images.larger.cropped": (v46/*: any*/),
        "artwork.auctionResult.edges.node.images.larger.cropped.height": (v47/*: any*/),
        "artwork.auctionResult.edges.node.images.larger.cropped.src": (v48/*: any*/),
        "artwork.auctionResult.edges.node.images.larger.cropped.srcSet": (v48/*: any*/),
        "artwork.auctionResult.edges.node.images.larger.cropped.width": (v47/*: any*/),
        "artwork.auctionResult.edges.node.internalID": (v43/*: any*/),
        "artwork.auctionResult.edges.node.mediumText": (v41/*: any*/),
        "artwork.auctionResult.edges.node.organization": (v41/*: any*/),
        "artwork.auctionResult.edges.node.performance": (v49/*: any*/),
        "artwork.auctionResult.edges.node.performance.mid": (v41/*: any*/),
        "artwork.auctionResult.edges.node.price_realized": (v50/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.cents_usd": (v51/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display": (v41/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display_usd": (v41/*: any*/),
        "artwork.auctionResult.edges.node.saleDate": (v41/*: any*/),
        "artwork.auctionResult.edges.node.title": (v41/*: any*/),
        "artwork.category": (v41/*: any*/),
        "artwork.comparables": (v36/*: any*/),
        "artwork.comparables.totalCount": (v37/*: any*/),
        "artwork.date": (v41/*: any*/),
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.cm": (v41/*: any*/),
        "artwork.dimensions.in": (v41/*: any*/),
        "artwork.downloadableImageUrl": (v41/*: any*/),
        "artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "artwork.figures.__typename": (v48/*: any*/),
        "artwork.figures.deepZoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoom"
        },
        "artwork.figures.deepZoom.Image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImage"
        },
        "artwork.figures.deepZoom.Image.Format": (v41/*: any*/),
        "artwork.figures.deepZoom.Image.Overlap": (v37/*: any*/),
        "artwork.figures.deepZoom.Image.Size": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImageSize"
        },
        "artwork.figures.deepZoom.Image.Size.Height": (v37/*: any*/),
        "artwork.figures.deepZoom.Image.Size.Width": (v37/*: any*/),
        "artwork.figures.deepZoom.Image.TileSize": (v37/*: any*/),
        "artwork.figures.deepZoom.Image.Url": (v41/*: any*/),
        "artwork.figures.deepZoom.Image.xmlns": (v41/*: any*/),
        "artwork.figures.height": (v47/*: any*/),
        "artwork.figures.internalID": (v54/*: any*/),
        "artwork.figures.isDefault": (v40/*: any*/),
        "artwork.figures.isZoomable": (v40/*: any*/),
        "artwork.figures.type": (v48/*: any*/),
        "artwork.figures.url": (v48/*: any*/),
        "artwork.figures.width": (v47/*: any*/),
        "artwork.formattedMetadata": (v41/*: any*/),
        "artwork.hasMarketPriceInsights": (v40/*: any*/),
        "artwork.heightCm": (v51/*: any*/),
        "artwork.href": (v41/*: any*/),
        "artwork.id": (v43/*: any*/),
        "artwork.image": (v45/*: any*/),
        "artwork.image.height": (v37/*: any*/),
        "artwork.image.internalID": (v54/*: any*/),
        "artwork.image.resized": (v55/*: any*/),
        "artwork.image.resized.height": (v37/*: any*/),
        "artwork.image.resized.src": (v48/*: any*/),
        "artwork.image.resized.srcSet": (v48/*: any*/),
        "artwork.image.resized.width": (v37/*: any*/),
        "artwork.image.url": (v41/*: any*/),
        "artwork.image.width": (v37/*: any*/),
        "artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "artwork.images.fallback": (v46/*: any*/),
        "artwork.images.fallback.height": (v47/*: any*/),
        "artwork.images.fallback.src": (v48/*: any*/),
        "artwork.images.fallback.srcSet": (v48/*: any*/),
        "artwork.images.fallback.width": (v47/*: any*/),
        "artwork.images.height": (v37/*: any*/),
        "artwork.images.isDefault": (v40/*: any*/),
        "artwork.images.placeholder": (v41/*: any*/),
        "artwork.images.resized": (v55/*: any*/),
        "artwork.images.resized.height": (v37/*: any*/),
        "artwork.images.resized.src": (v48/*: any*/),
        "artwork.images.resized.srcSet": (v48/*: any*/),
        "artwork.images.resized.width": (v37/*: any*/),
        "artwork.images.url": (v41/*: any*/),
        "artwork.images.width": (v37/*: any*/),
        "artwork.internalID": (v43/*: any*/),
        "artwork.is_downloadable": (v40/*: any*/),
        "artwork.is_hangable": (v40/*: any*/),
        "artwork.is_saved": (v40/*: any*/),
        "artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.marketPriceInsights.annualLotsSold": (v37/*: any*/),
        "artwork.marketPriceInsights.annualValueSoldDisplayText": (v41/*: any*/),
        "artwork.marketPriceInsights.demandRank": (v51/*: any*/),
        "artwork.marketPriceInsights.demandRankDisplayText": (v41/*: any*/),
        "artwork.marketPriceInsights.liquidityRankDisplayText": (v41/*: any*/),
        "artwork.marketPriceInsights.medianSaleOverEstimatePercentage": (v51/*: any*/),
        "artwork.marketPriceInsights.sellThroughRate": (v51/*: any*/),
        "artwork.medium": (v41/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v43/*: any*/),
        "artwork.partner.slug": (v43/*: any*/),
        "artwork.pricePaid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "artwork.pricePaid.display": (v41/*: any*/),
        "artwork.provenance": (v41/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.id": (v43/*: any*/),
        "artwork.sale.isAuction": (v40/*: any*/),
        "artwork.sale.isClosed": (v40/*: any*/),
        "artwork.sale.is_auction": (v40/*: any*/),
        "artwork.sale.is_closed": (v40/*: any*/),
        "artwork.slug": (v43/*: any*/),
        "artwork.title": (v41/*: any*/),
        "artwork.widthCm": (v51/*: any*/)
      }
    },
    "name": "MyCollectionArtworkTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkTestQuery {\n  artwork(id: \"foo\") {\n    ...MyCollectionArtwork_artwork\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  title\n  dimension_text: dimensionText\n  organization\n  images {\n    larger {\n      cropped(width: 100, height: 100) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  internalID\n  id\n  slug\n  title\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  is_saved: isSaved\n}\n\nfragment ArtworkActions_artwork on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkSharePanel_artwork\n  ...ViewInRoom_artwork\n  artists {\n    name\n    id\n  }\n  date\n  dimensions {\n    cm\n  }\n  slug\n  image {\n    internalID\n    url(version: \"larger\")\n    height\n    width\n  }\n  downloadableImageUrl\n  is_downloadable: isDownloadable\n  is_hangable: isHangable\n  partner {\n    slug\n    id\n  }\n  title\n  sale {\n    is_closed: isClosed\n    is_auction: isAuction\n    id\n  }\n  is_saved: isSaved\n}\n\nfragment ArtworkImageBrowserLarge_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  ...ArtworkVideoPlayer_artwork\n  figures {\n    __typename\n    ... on Image {\n      type: __typename\n      internalID\n      isZoomable\n      ...DeepZoom_image\n    }\n    ... on Video {\n      type: __typename\n    }\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  ...ArtworkVideoPlayer_artwork\n  figures {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      internalID\n      isZoomable\n      type: __typename\n    }\n    ... on Video {\n      type: __typename\n    }\n  }\n}\n\nfragment ArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkActions_artwork\n  ...ArtworkImageBrowserSmall_artwork\n  ...ArtworkImageBrowserLarge_artwork\n  internalID\n  images {\n    width\n    height\n  }\n  figures {\n    __typename\n    ... on Image {\n      internalID\n      isDefault\n    }\n    ... on Video {\n      type: __typename\n    }\n  }\n}\n\nfragment ArtworkLightbox_artwork on Artwork {\n  formattedMetadata\n  images {\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkVideoPlayer_artwork on Artwork {\n  figures {\n    __typename\n    ... on Video {\n      type: __typename\n      url\n      height\n      width\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkArtistMarket_marketPriceInsights on ArtworkPriceInsights {\n  annualLotsSold\n  annualValueSoldDisplayText\n  medianSaleOverEstimatePercentage\n  liquidityRankDisplayText\n  sellThroughRate\n}\n\nfragment MyCollectionArtworkAuctionResults_artist on Artist {\n  slug\n  internalID\n  auctionResultsConnection(first: 6) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkComparables_artwork on Artwork {\n  auctionResult: comparableAuctionResults(first: 6) @optionalField {\n    edges {\n      cursor\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        artistID\n        internalID\n        id\n      }\n    }\n  }\n  artist {\n    name\n    id\n  }\n}\n\nfragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {\n  demandRank\n  demandRankDisplayText\n}\n\nfragment MyCollectionArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkImageBrowser_artwork\n  internalID\n  images {\n    width\n    height\n  }\n}\n\nfragment MyCollectionArtworkInsights_artwork on Artwork {\n  ...MyCollectionArtworkComparables_artwork\n  artist {\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n  marketPriceInsights {\n    ...MyCollectionArtworkArtistMarket_marketPriceInsights\n    ...MyCollectionArtworkDemandIndex_marketPriceInsights\n  }\n}\n\nfragment MyCollectionArtworkMeta_artwork on Artwork {\n  artistNames\n  title\n}\n\nfragment MyCollectionArtworkSidebarMetadata_artwork on Artwork {\n  category\n  medium\n  dimensions {\n    in\n    cm\n  }\n  provenance\n  attributionClass {\n    shortDescription\n    id\n  }\n  pricePaid {\n    display\n  }\n  artworkLocation\n}\n\nfragment MyCollectionArtworkSidebarTitleInfo_artwork on Artwork {\n  artistNames\n  title\n  date\n}\n\nfragment MyCollectionArtworkSidebar_artwork on Artwork {\n  ...MyCollectionArtworkSidebarTitleInfo_artwork\n  ...MyCollectionArtworkSidebarMetadata_artwork\n}\n\nfragment MyCollectionArtwork_artwork on Artwork {\n  ...MyCollectionArtworkSidebar_artwork\n  ...MyCollectionArtworkMeta_artwork\n  ...MyCollectionArtworkInsights_artwork\n  ...MyCollectionArtworkImageBrowser_artwork\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkSidebarTitleInfo_artwork\n  comparables: comparableAuctionResults {\n    totalCount\n  }\n  hasMarketPriceInsights\n  internalID\n  artist {\n    slug\n    auctionResults: auctionResultsConnection {\n      totalCount\n    }\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();
(node as any).hash = '5fd3b94bce8eb91054083f590353edf7';
export default node;
