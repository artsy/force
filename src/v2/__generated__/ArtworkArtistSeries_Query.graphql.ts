/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkArtistSeries_QueryVariables = {
    slug: string;
};
export type ArtworkArtistSeries_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkArtistSeries_artwork">;
    } | null;
};
export type ArtworkArtistSeries_QueryRawResponse = {
    readonly artwork: ({
        readonly internalID: string;
        readonly slug: string;
        readonly artistSeriesConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly slug: string;
                    readonly internalID: string;
                    readonly filterArtworksConnection: ({
                        readonly edges: ReadonlyArray<({
                            readonly node: ({
                                readonly slug: string;
                                readonly internalID: string;
                                readonly image: ({
                                    readonly resized: ({
                                        readonly src: string;
                                        readonly srcSet: string;
                                        readonly width: number | null;
                                        readonly height: number | null;
                                    }) | null;
                                    readonly aspectRatio: number;
                                    readonly height: number | null;
                                }) | null;
                                readonly imageTitle: string | null;
                                readonly title: string | null;
                                readonly href: string | null;
                                readonly is_saved: boolean | null;
                                readonly date: string | null;
                                readonly saleMessage: string | null;
                                readonly culturalMaker: string | null;
                                readonly artists: ReadonlyArray<({
                                    readonly id: string;
                                    readonly href: string | null;
                                    readonly name: string | null;
                                }) | null> | null;
                                readonly collectingInstitution: string | null;
                                readonly partner: ({
                                    readonly name: string | null;
                                    readonly href: string | null;
                                    readonly id: string;
                                    readonly type: string | null;
                                }) | null;
                                readonly sale: ({
                                    readonly isAuction: boolean | null;
                                    readonly isClosed: boolean | null;
                                    readonly id: string;
                                    readonly is_auction: boolean | null;
                                    readonly is_live_open: boolean | null;
                                    readonly is_open: boolean | null;
                                    readonly is_closed: boolean | null;
                                    readonly is_preview: boolean | null;
                                    readonly display_timely_at: string | null;
                                }) | null;
                                readonly saleArtwork: ({
                                    readonly lotLabel: string | null;
                                    readonly counts: ({
                                        readonly bidderPositions: number | null;
                                    }) | null;
                                    readonly highestBid: ({
                                        readonly display: string | null;
                                    }) | null;
                                    readonly openingBid: ({
                                        readonly display: string | null;
                                    }) | null;
                                    readonly id: string;
                                }) | null;
                                readonly is_inquireable: boolean | null;
                                readonly sale_artwork: ({
                                    readonly highest_bid: ({
                                        readonly display: string | null;
                                    }) | null;
                                    readonly opening_bid: ({
                                        readonly display: string | null;
                                    }) | null;
                                    readonly counts: ({
                                        readonly bidder_positions: number | null;
                                    }) | null;
                                    readonly id: string;
                                }) | null;
                                readonly id: string;
                                readonly is_biddable: boolean | null;
                            }) | null;
                        }) | null> | null;
                        readonly id: string;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly seriesArtist: ({
            readonly artistSeriesConnection: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly internalID: string;
                        readonly title: string;
                        readonly slug: string;
                        readonly featured: boolean;
                        readonly artworksCountMessage: string | null;
                        readonly image: ({
                            readonly cropped: ({
                                readonly width: number;
                                readonly height: number;
                                readonly src: string;
                                readonly srcSet: string;
                            }) | null;
                        }) | null;
                    }) | null;
                }) | null> | null;
            }) | null;
            readonly id: string;
        }) | null;
        readonly seriesForCounts: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artworksCount: number;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string;
    }) | null;
};
export type ArtworkArtistSeries_Query = {
    readonly response: ArtworkArtistSeries_QueryResponse;
    readonly variables: ArtworkArtistSeries_QueryVariables;
    readonly rawResponse: ArtworkArtistSeries_QueryRawResponse;
};



/*
query ArtworkArtistSeries_Query(
  $slug: String!
) {
  artwork(id: $slug) {
    ...ArtworkArtistSeries_artwork
    id
  }
}

fragment ArtistSeriesArtworkRail_artwork on Artwork {
  internalID
  slug
  artistSeriesConnection(first: 1) {
    edges {
      node {
        slug
        internalID
        filterArtworksConnection(sort: "-decayed_merch", first: 20) {
          edges {
            node {
              slug
              internalID
              ...ShelfArtwork_artwork
              id
            }
          }
          id
        }
      }
    }
  }
}

fragment ArtistSeriesItem_artistSeries on ArtistSeries {
  title
  slug
  featured
  internalID
  artworksCountMessage
  image {
    cropped(width: 325, height: 244) {
      width
      height
      src
      srcSet
    }
  }
}

fragment ArtistSeriesRail_artist on Artist {
  artistSeriesConnection(first: 50) {
    edges {
      node {
        internalID
        ...ArtistSeriesItem_artistSeries
      }
    }
  }
}

fragment ArtworkArtistSeries_artwork on Artwork {
  ...ArtistSeriesArtworkRail_artwork
  internalID
  slug
  seriesArtist: artist(shallow: true) {
    artistSeriesConnection(first: 50) {
      edges {
        node {
          internalID
        }
      }
    }
    ...ArtistSeriesRail_artist
    id
  }
  seriesForCounts: artistSeriesConnection(first: 1) {
    edges {
      node {
        artworksCount
      }
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
  saleMessage
  culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    isAuction
    isClosed
    id
  }
  saleArtwork {
    lotLabel
    counts {
      bidderPositions
    }
    highestBid {
      display
    }
    openingBid {
      display
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
    "name": "slug"
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
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
  "name": "width",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v11 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
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
  "name": "name",
  "storageKey": null
},
v14 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistSeriesConnection"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtistSeriesEdge"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistSeries"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkOpeningBid"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkArtistSeries_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkArtistSeries_artwork"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtworkArtistSeries_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "ArtistSeriesConnection",
            "kind": "LinkedField",
            "name": "artistSeriesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistSeriesEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistSeries",
                    "kind": "LinkedField",
                    "name": "node",
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
                            "value": 20
                          },
                          {
                            "kind": "Literal",
                            "name": "sort",
                            "value": "-decayed_merch"
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
                                  (v3/*: any*/),
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
                                          (v7/*: any*/),
                                          (v8/*: any*/)
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
                                      (v8/*: any*/)
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
                                  (v9/*: any*/),
                                  (v10/*: any*/),
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
                                      (v12/*: any*/),
                                      (v10/*: any*/),
                                      (v13/*: any*/)
                                    ],
                                    "storageKey": "artists(shallow:true)"
                                  },
                                  {
                                    "alias": null,
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
                                      (v13/*: any*/),
                                      (v10/*: any*/),
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
                                      (v12/*: any*/),
                                      {
                                        "alias": "is_auction",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "isAuction",
                                        "storageKey": null
                                      },
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
                                        "alias": "is_closed",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "isClosed",
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
                                    "alias": null,
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
                                        "concreteType": "SaleArtworkHighestBid",
                                        "kind": "LinkedField",
                                        "name": "highestBid",
                                        "plural": false,
                                        "selections": (v14/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "SaleArtworkOpeningBid",
                                        "kind": "LinkedField",
                                        "name": "openingBid",
                                        "plural": false,
                                        "selections": (v14/*: any*/),
                                        "storageKey": null
                                      },
                                      (v12/*: any*/)
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
                                    "alias": "sale_artwork",
                                    "args": null,
                                    "concreteType": "SaleArtwork",
                                    "kind": "LinkedField",
                                    "name": "saleArtwork",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": "highest_bid",
                                        "args": null,
                                        "concreteType": "SaleArtworkHighestBid",
                                        "kind": "LinkedField",
                                        "name": "highestBid",
                                        "plural": false,
                                        "selections": (v14/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "opening_bid",
                                        "args": null,
                                        "concreteType": "SaleArtworkOpeningBid",
                                        "kind": "LinkedField",
                                        "name": "openingBid",
                                        "plural": false,
                                        "selections": (v14/*: any*/),
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
                                      (v12/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v12/*: any*/),
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
                          },
                          (v12/*: any*/)
                        ],
                        "storageKey": "filterArtworksConnection(first:20,sort:\"-decayed_merch\")"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistSeriesConnection(first:1)"
          },
          {
            "alias": "seriesArtist",
            "args": (v11/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 50
                  }
                ],
                "concreteType": "ArtistSeriesConnection",
                "kind": "LinkedField",
                "name": "artistSeriesConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistSeriesEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtistSeries",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v9/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "featured",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artworksCountMessage",
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
                                    "value": 244
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 325
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/)
                                ],
                                "storageKey": "cropped(height:244,width:325)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "artistSeriesConnection(first:50)"
              },
              (v12/*: any*/)
            ],
            "storageKey": "artist(shallow:true)"
          },
          {
            "alias": "seriesForCounts",
            "args": (v4/*: any*/),
            "concreteType": "ArtistSeriesConnection",
            "kind": "LinkedField",
            "name": "artistSeriesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistSeriesEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistSeries",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artworksCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistSeriesConnection(first:1)"
          },
          (v12/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "074a3de762a4f5a363dff10176558a65",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": (v15/*: any*/),
        "artwork.artistSeriesConnection": (v16/*: any*/),
        "artwork.artistSeriesConnection.edges": (v17/*: any*/),
        "artwork.artistSeriesConnection.edges.node": (v18/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node": (v15/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artists.href": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artists.id": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.artists.name": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.collectingInstitution": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.culturalMaker": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.date": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.href": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.id": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image": (v21/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image.height": (v22/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image.resized.height": (v22/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image.resized.src": (v23/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image.resized.srcSet": (v23/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.image.resized.width": (v22/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.imageTitle": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.internalID": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.is_biddable": (v24/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.is_inquireable": (v24/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.is_saved": (v24/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.partner.href": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.partner.id": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.partner.name": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.partner.type": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.display_timely_at": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.id": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.isAuction": (v24/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.isClosed": (v24/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.is_auction": (v24/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.is_closed": (v24/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.is_live_open": (v24/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.is_open": (v24/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale.is_preview": (v24/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.saleArtwork": (v25/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.saleArtwork.counts": (v26/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.saleArtwork.counts.bidderPositions": (v27/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.saleArtwork.highestBid": (v28/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.saleArtwork.highestBid.display": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.saleArtwork.id": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.saleArtwork.lotLabel": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.saleArtwork.openingBid": (v29/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.saleArtwork.openingBid.display": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.saleMessage": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork": (v25/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.counts": (v26/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v27/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.highest_bid": (v28/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.highest_bid.display": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.id": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.opening_bid": (v29/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.sale_artwork.opening_bid.display": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.slug": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.edges.node.title": (v19/*: any*/),
        "artwork.artistSeriesConnection.edges.node.filterArtworksConnection.id": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.internalID": (v20/*: any*/),
        "artwork.artistSeriesConnection.edges.node.slug": (v23/*: any*/),
        "artwork.id": (v20/*: any*/),
        "artwork.internalID": (v20/*: any*/),
        "artwork.seriesArtist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artwork.seriesArtist.artistSeriesConnection": (v16/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges": (v17/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node": (v18/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.artworksCountMessage": (v19/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.featured": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image": (v21/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image.cropped.height": (v30/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image.cropped.src": (v23/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image.cropped.srcSet": (v23/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.image.cropped.width": (v30/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.internalID": (v20/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.slug": (v23/*: any*/),
        "artwork.seriesArtist.artistSeriesConnection.edges.node.title": (v23/*: any*/),
        "artwork.seriesArtist.id": (v20/*: any*/),
        "artwork.seriesForCounts": (v16/*: any*/),
        "artwork.seriesForCounts.edges": (v17/*: any*/),
        "artwork.seriesForCounts.edges.node": (v18/*: any*/),
        "artwork.seriesForCounts.edges.node.artworksCount": (v30/*: any*/),
        "artwork.slug": (v20/*: any*/)
      }
    },
    "name": "ArtworkArtistSeries_Query",
    "operationKind": "query",
    "text": "query ArtworkArtistSeries_Query(\n  $slug: String!\n) {\n  artwork(id: $slug) {\n    ...ArtworkArtistSeries_artwork\n    id\n  }\n}\n\nfragment ArtistSeriesArtworkRail_artwork on Artwork {\n  internalID\n  slug\n  artistSeriesConnection(first: 1) {\n    edges {\n      node {\n        slug\n        internalID\n        filterArtworksConnection(sort: \"-decayed_merch\", first: 20) {\n          edges {\n            node {\n              slug\n              internalID\n              ...ShelfArtwork_artwork\n              id\n            }\n          }\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistSeriesItem_artistSeries on ArtistSeries {\n  title\n  slug\n  featured\n  internalID\n  artworksCountMessage\n  image {\n    cropped(width: 325, height: 244) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistSeriesRail_artist on Artist {\n  artistSeriesConnection(first: 50) {\n    edges {\n      node {\n        internalID\n        ...ArtistSeriesItem_artistSeries\n      }\n    }\n  }\n}\n\nfragment ArtworkArtistSeries_artwork on Artwork {\n  ...ArtistSeriesArtworkRail_artwork\n  internalID\n  slug\n  seriesArtist: artist(shallow: true) {\n    artistSeriesConnection(first: 50) {\n      edges {\n        node {\n          internalID\n        }\n      }\n    }\n    ...ArtistSeriesRail_artist\n    id\n  }\n  seriesForCounts: artistSeriesConnection(first: 1) {\n    edges {\n      node {\n        artworksCount\n      }\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  saleMessage\n  culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  saleArtwork {\n    lotLabel\n    counts {\n      bidderPositions\n    }\n    highestBid {\n      display\n    }\n    openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  image {\n    resized(width: 200) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n"
  }
};
})();
(node as any).hash = '2c6458f0f50c16b9e3322b48d09967db';
export default node;
