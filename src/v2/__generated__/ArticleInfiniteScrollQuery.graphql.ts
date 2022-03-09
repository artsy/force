/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleInfiniteScrollQueryVariables = {
    after?: string | null;
    channelID: string;
    articleID: string;
};
export type ArticleInfiniteScrollQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ArticleInfiniteScroll_viewer">;
    } | null;
};
export type ArticleInfiniteScrollQuery = {
    readonly response: ArticleInfiniteScrollQueryResponse;
    readonly variables: ArticleInfiniteScrollQueryVariables;
};



/*
query ArticleInfiniteScrollQuery(
  $after: String
  $channelID: String!
  $articleID: String!
) {
  viewer {
    ...ArticleInfiniteScroll_viewer_1LMuZg
  }
}

fragment ArticleBody_article on Article {
  ...ArticleHeader_article
  ...ArticleByline_article
  internalID
  layout
  title
  newsSource {
    title
    url
  }
  href
  publishedAt(format: "MMM D, YYYY h:mma")
  sections {
    __typename
    ...ArticleSectionText_section
    ...ArticleSectionImageCollection_section
    ...ArticleSectionImageSet_section
    ...ArticleSectionVideo_section
    ...ArticleSectionSocialEmbed_section
    ...ArticleSectionEmbed_section
  }
  postscript
  relatedArticles {
    internalID
    title
    href
    byline
    thumbnailImage {
      cropped(width: 80, height: 60) {
        src
        srcSet
      }
    }
    id
  }
}

fragment ArticleByline_article on Article {
  byline
  authors {
    internalID
    name
    initials
    bio
    image {
      cropped(width: 60, height: 60) {
        src
        srcSet
      }
    }
    id
  }
}

fragment ArticleHeader_article on Article {
  title
  href
  vertical
  byline
  hero {
    __typename
    ... on ArticleFeatureSection {
      layout
      embed
      media
      image {
        url
        split: resized(width: 900) {
          src
          srcSet
        }
        text: cropped(width: 1600, height: 900) {
          src
          srcSet
        }
      }
    }
  }
}

fragment ArticleInfiniteScroll_viewer_1LMuZg on Viewer {
  articlesConnection(first: 1, after: $after, channelId: $channelID, omit: [$articleID], sort: PUBLISHED_AT_DESC, layout: STANDARD) {
    edges {
      node {
        ...ArticleBody_article
        ...ArticleVisibilityMetadata_article
        internalID
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment ArticleSectionEmbed_section on ArticleSectionEmbed {
  url
  height
  mobileHeight
}

fragment ArticleSectionImageCollectionCaption_figure on ArticleSectionImageCollectionFigure {
  __isArticleSectionImageCollectionFigure: __typename
  __typename
  ...Metadata_artwork
  ... on ArticleImageSection {
    caption
  }
}

fragment ArticleSectionImageCollectionImage_figure on ArticleSectionImageCollectionFigure {
  __isArticleSectionImageCollectionFigure: __typename
  ... on ArticleImageSection {
    id
    image {
      url(version: ["normalized", "larger", "large"])
      width
      height
    }
  }
  ... on Artwork {
    id
    image {
      url(version: ["normalized", "larger", "large"])
      width
      height
    }
  }
}

fragment ArticleSectionImageCollection_section on ArticleSectionImageCollection {
  layout
  figures {
    __typename
    ...ArticleSectionImageCollectionImage_figure
    ...ArticleSectionImageCollectionCaption_figure
    ... on Node {
      __isNode: __typename
      id
    }
    ... on ArticleImageSection {
      id
    }
  }
}

fragment ArticleSectionImageSet_section on ArticleSectionImageSet {
  setLayout: layout
  title
  counts {
    figures
  }
  cover {
    __typename
    ... on ArticleImageSection {
      id
      image {
        small: cropped(width: 80, height: 80, version: ["normalized", "larger", "large"]) {
          src
          srcSet
          height
          width
        }
        large: resized(width: 1220, version: ["normalized", "larger", "large"]) {
          src
          srcSet
          height
          width
        }
      }
    }
    ... on Artwork {
      id
      image {
        small: cropped(width: 80, height: 80, version: ["normalized", "larger", "large"]) {
          src
          srcSet
          height
          width
        }
        large: resized(width: 1220, version: ["normalized", "larger", "large"]) {
          src
          srcSet
          height
          width
        }
      }
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
}

fragment ArticleSectionSocialEmbed_section on ArticleSectionSocialEmbed {
  url
  embed
}

fragment ArticleSectionText_section on ArticleSectionText {
  body
}

fragment ArticleSectionVideo_section on ArticleSectionVideo {
  embed(autoPlay: true)
  image {
    cropped(width: 910, height: 512) {
      src
      srcSet
    }
  }
}

fragment ArticleVisibilityMetadata_article on Article {
  title
  href
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

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "articleID"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "channelID"
},
v3 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v4 = [
  (v3/*: any*/),
  {
    "kind": "Variable",
    "name": "channelId",
    "variableName": "channelID"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  },
  {
    "kind": "Literal",
    "name": "layout",
    "value": "STANDARD"
  },
  {
    "items": [
      {
        "kind": "Variable",
        "name": "omit.0",
        "variableName": "articleID"
      }
    ],
    "kind": "ListValue",
    "name": "omit"
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "PUBLISHED_AT_DESC"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "byline",
  "storageKey": null
},
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
  "name": "layout",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "embed",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v14 = [
  (v12/*: any*/),
  (v13/*: any*/)
],
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v17 = {
  "kind": "Literal",
  "name": "height",
  "value": 60
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v19 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "normalized",
    "larger",
    "large"
  ]
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v22 = {
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
        (v19/*: any*/)
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"normalized\",\"larger\",\"large\"])"
    },
    (v20/*: any*/),
    (v21/*: any*/)
  ],
  "storageKey": null
},
v23 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v24 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v25 = {
  "kind": "InlineFragment",
  "selections": [
    (v18/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v26 = {
  "kind": "Literal",
  "name": "width",
  "value": 80
},
v27 = [
  (v12/*: any*/),
  (v13/*: any*/),
  (v21/*: any*/),
  (v20/*: any*/)
],
v28 = [
  (v18/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Image",
    "kind": "LinkedField",
    "name": "image",
    "plural": false,
    "selections": [
      {
        "alias": "small",
        "args": [
          {
            "kind": "Literal",
            "name": "height",
            "value": 80
          },
          (v19/*: any*/),
          (v26/*: any*/)
        ],
        "concreteType": "CroppedImageUrl",
        "kind": "LinkedField",
        "name": "cropped",
        "plural": false,
        "selections": (v27/*: any*/),
        "storageKey": "cropped(height:80,version:[\"normalized\",\"larger\",\"large\"],width:80)"
      },
      {
        "alias": "large",
        "args": [
          (v19/*: any*/),
          {
            "kind": "Literal",
            "name": "width",
            "value": 1220
          }
        ],
        "concreteType": "ResizedImageUrl",
        "kind": "LinkedField",
        "name": "resized",
        "plural": false,
        "selections": (v27/*: any*/),
        "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:1220)"
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArticleInfiniteScrollQuery",
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
              (v3/*: any*/),
              {
                "kind": "Variable",
                "name": "articleID",
                "variableName": "articleID"
              },
              {
                "kind": "Variable",
                "name": "channelID",
                "variableName": "channelID"
              }
            ],
            "kind": "FragmentSpread",
            "name": "ArticleInfiniteScroll_viewer"
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
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "ArticleInfiniteScrollQuery",
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
            "args": (v4/*: any*/),
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArticleEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Article",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "vertical",
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "hero",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v9/*: any*/),
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "media",
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
                                  (v11/*: any*/),
                                  {
                                    "alias": "split",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 900
                                      }
                                    ],
                                    "concreteType": "ResizedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "resized",
                                    "plural": false,
                                    "selections": (v14/*: any*/),
                                    "storageKey": "resized(width:900)"
                                  },
                                  {
                                    "alias": "text",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 900
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 1600
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": (v14/*: any*/),
                                    "storageKey": "cropped(height:900,width:1600)"
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "ArticleFeatureSection",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Author",
                        "kind": "LinkedField",
                        "name": "authors",
                        "plural": true,
                        "selections": [
                          (v15/*: any*/),
                          (v16/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "initials",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "bio",
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
                                  (v17/*: any*/),
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 60
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": (v14/*: any*/),
                                "storageKey": "cropped(height:60,width:60)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v18/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArticleNewsSource",
                        "kind": "LinkedField",
                        "name": "newsSource",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM D, YYYY h:mma"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMM D, YYYY h:mma\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "sections",
                        "plural": true,
                        "selections": [
                          (v8/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "body",
                                "storageKey": null
                              }
                            ],
                            "type": "ArticleSectionText",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "figures",
                                "plural": true,
                                "selections": [
                                  (v8/*: any*/),
                                  {
                                    "kind": "TypeDiscriminator",
                                    "abstractKey": "__isArticleSectionImageCollectionFigure"
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v18/*: any*/),
                                      (v22/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "caption",
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "ArticleImageSection",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v18/*: any*/),
                                      (v22/*: any*/),
                                      (v6/*: any*/),
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
                                        "args": (v23/*: any*/),
                                        "concreteType": "Artist",
                                        "kind": "LinkedField",
                                        "name": "artists",
                                        "plural": true,
                                        "selections": [
                                          (v18/*: any*/),
                                          (v6/*: any*/),
                                          (v16/*: any*/)
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
                                        "args": (v23/*: any*/),
                                        "concreteType": "Partner",
                                        "kind": "LinkedField",
                                        "name": "partner",
                                        "plural": false,
                                        "selections": [
                                          (v16/*: any*/),
                                          (v6/*: any*/),
                                          (v18/*: any*/),
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
                                          (v18/*: any*/),
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
                                            "selections": (v24/*: any*/),
                                            "storageKey": null
                                          },
                                          {
                                            "alias": "opening_bid",
                                            "args": null,
                                            "concreteType": "SaleArtworkOpeningBid",
                                            "kind": "LinkedField",
                                            "name": "openingBid",
                                            "plural": false,
                                            "selections": (v24/*: any*/),
                                            "storageKey": null
                                          },
                                          (v18/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "is_inquireable",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "isInquireable",
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "Artwork",
                                    "abstractKey": null
                                  },
                                  (v25/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "ArticleSectionImageCollection",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": "setLayout",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "layout",
                                "storageKey": null
                              },
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArticleSectionImageSetCounts",
                                "kind": "LinkedField",
                                "name": "counts",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "figures",
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
                                "name": "cover",
                                "plural": false,
                                "selections": [
                                  (v8/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v28/*: any*/),
                                    "type": "ArticleImageSection",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v28/*: any*/),
                                    "type": "Artwork",
                                    "abstractKey": null
                                  },
                                  (v25/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "ArticleSectionImageSet",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "autoPlay",
                                    "value": true
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "embed",
                                "storageKey": "embed(autoPlay:true)"
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
                                        "value": 512
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 910
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "cropped",
                                    "plural": false,
                                    "selections": (v14/*: any*/),
                                    "storageKey": "cropped(height:512,width:910)"
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "ArticleSectionVideo",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v11/*: any*/),
                              (v10/*: any*/)
                            ],
                            "type": "ArticleSectionSocialEmbed",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v11/*: any*/),
                              (v21/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "mobileHeight",
                                "storageKey": null
                              }
                            ],
                            "type": "ArticleSectionEmbed",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "postscript",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Article",
                        "kind": "LinkedField",
                        "name": "relatedArticles",
                        "plural": true,
                        "selections": [
                          (v15/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "thumbnailImage",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": [
                                  (v17/*: any*/),
                                  (v26/*: any*/)
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": (v14/*: any*/),
                                "storageKey": "cropped(height:60,width:80)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v18/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v18/*: any*/),
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
              },
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
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
            "args": (v4/*: any*/),
            "filters": [
              "channelId",
              "omit",
              "sort",
              "layout"
            ],
            "handle": "connection",
            "key": "ArticleInfiniteScroll_articlesConnection",
            "kind": "LinkedHandle",
            "name": "articlesConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6948bbee5fe7baa14cd6320e6e16fdeb",
    "id": null,
    "metadata": {},
    "name": "ArticleInfiniteScrollQuery",
    "operationKind": "query",
    "text": "query ArticleInfiniteScrollQuery(\n  $after: String\n  $channelID: String!\n  $articleID: String!\n) {\n  viewer {\n    ...ArticleInfiniteScroll_viewer_1LMuZg\n  }\n}\n\nfragment ArticleBody_article on Article {\n  ...ArticleHeader_article\n  ...ArticleByline_article\n  internalID\n  layout\n  title\n  newsSource {\n    title\n    url\n  }\n  href\n  publishedAt(format: \"MMM D, YYYY h:mma\")\n  sections {\n    __typename\n    ...ArticleSectionText_section\n    ...ArticleSectionImageCollection_section\n    ...ArticleSectionImageSet_section\n    ...ArticleSectionVideo_section\n    ...ArticleSectionSocialEmbed_section\n    ...ArticleSectionEmbed_section\n  }\n  postscript\n  relatedArticles {\n    internalID\n    title\n    href\n    byline\n    thumbnailImage {\n      cropped(width: 80, height: 60) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ArticleByline_article on Article {\n  byline\n  authors {\n    internalID\n    name\n    initials\n    bio\n    image {\n      cropped(width: 60, height: 60) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ArticleHeader_article on Article {\n  title\n  href\n  vertical\n  byline\n  hero {\n    __typename\n    ... on ArticleFeatureSection {\n      layout\n      embed\n      media\n      image {\n        url\n        split: resized(width: 900) {\n          src\n          srcSet\n        }\n        text: cropped(width: 1600, height: 900) {\n          src\n          srcSet\n        }\n      }\n    }\n  }\n}\n\nfragment ArticleInfiniteScroll_viewer_1LMuZg on Viewer {\n  articlesConnection(first: 1, after: $after, channelId: $channelID, omit: [$articleID], sort: PUBLISHED_AT_DESC, layout: STANDARD) {\n    edges {\n      node {\n        ...ArticleBody_article\n        ...ArticleVisibilityMetadata_article\n        internalID\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ArticleSectionEmbed_section on ArticleSectionEmbed {\n  url\n  height\n  mobileHeight\n}\n\nfragment ArticleSectionImageCollectionCaption_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  __typename\n  ...Metadata_artwork\n  ... on ArticleImageSection {\n    caption\n  }\n}\n\nfragment ArticleSectionImageCollectionImage_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  ... on ArticleImageSection {\n    id\n    image {\n      url(version: [\"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n  ... on Artwork {\n    id\n    image {\n      url(version: [\"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n}\n\nfragment ArticleSectionImageCollection_section on ArticleSectionImageCollection {\n  layout\n  figures {\n    __typename\n    ...ArticleSectionImageCollectionImage_figure\n    ...ArticleSectionImageCollectionCaption_figure\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ArticleImageSection {\n      id\n    }\n  }\n}\n\nfragment ArticleSectionImageSet_section on ArticleSectionImageSet {\n  setLayout: layout\n  title\n  counts {\n    figures\n  }\n  cover {\n    __typename\n    ... on ArticleImageSection {\n      id\n      image {\n        small: cropped(width: 80, height: 80, version: [\"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n        large: resized(width: 1220, version: [\"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n      }\n    }\n    ... on Artwork {\n      id\n      image {\n        small: cropped(width: 80, height: 80, version: [\"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n        large: resized(width: 1220, version: [\"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ArticleSectionSocialEmbed_section on ArticleSectionSocialEmbed {\n  url\n  embed\n}\n\nfragment ArticleSectionText_section on ArticleSectionText {\n  body\n}\n\nfragment ArticleSectionVideo_section on ArticleSectionVideo {\n  embed(autoPlay: true)\n  image {\n    cropped(width: 910, height: 512) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArticleVisibilityMetadata_article on Article {\n  title\n  href\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n"
  }
};
})();
(node as any).hash = '1d2c3c983644a88967914754042ace4d';
export default node;
