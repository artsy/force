/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleBody_test_QueryVariables = {};
export type ArticleBody_test_QueryResponse = {
    readonly article: {
        readonly " $fragmentRefs": FragmentRefs<"ArticleBody_article">;
    } | null;
};
export type ArticleBody_test_Query = {
    readonly response: ArticleBody_test_QueryResponse;
    readonly variables: ArticleBody_test_QueryVariables;
};



/*
query ArticleBody_test_Query {
  article(id: "example") {
    ...ArticleBody_article
    id
  }
}

fragment ArticleBody_article on Article {
  ...ArticleHeader_article
  ...ArticleByline_article
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
  vertical
  byline
  hero {
    __typename
    ... on ArticleFeatureSection {
      layout
      embed
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
      resized(width: 1220, version: ["normalized", "larger", "large"]) {
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
      resized(width: 1220, version: ["normalized", "larger", "large"]) {
        src
        srcSet
        height
        width
      }
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
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "byline",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "layout",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "embed",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v9 = [
  (v7/*: any*/),
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
  "kind": "Literal",
  "name": "height",
  "value": 60
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
  "name": "href",
  "storageKey": null
},
v14 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "normalized",
    "larger",
    "large"
  ]
},
v15 = [
  (v14/*: any*/),
  {
    "kind": "Literal",
    "name": "width",
    "value": 1220
  }
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v17 = [
  (v7/*: any*/),
  (v8/*: any*/),
  (v16/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  }
],
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": (v15/*: any*/),
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": (v17/*: any*/),
      "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:1220)"
    }
  ],
  "storageKey": null
},
v19 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v20 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v21 = {
  "kind": "InlineFragment",
  "selections": [
    (v12/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v22 = {
  "kind": "Literal",
  "name": "width",
  "value": 80
},
v23 = [
  (v12/*: any*/),
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
          (v14/*: any*/),
          (v22/*: any*/)
        ],
        "concreteType": "CroppedImageUrl",
        "kind": "LinkedField",
        "name": "cropped",
        "plural": false,
        "selections": (v17/*: any*/),
        "storageKey": "cropped(height:80,version:[\"normalized\",\"larger\",\"large\"],width:80)"
      },
      {
        "alias": "large",
        "args": (v15/*: any*/),
        "concreteType": "ResizedImageUrl",
        "kind": "LinkedField",
        "name": "resized",
        "plural": false,
        "selections": (v17/*: any*/),
        "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:1220)"
      }
    ],
    "storageKey": null
  }
],
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v28 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArticleBody_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArticleBody_article"
          }
        ],
        "storageKey": "article(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArticleBody_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Article",
        "kind": "LinkedField",
        "name": "article",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "vertical",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "hero",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
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
                        "selections": (v9/*: any*/),
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
                        "selections": (v9/*: any*/),
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
              (v10/*: any*/),
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
                      (v11/*: any*/),
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
                    "selections": (v9/*: any*/),
                    "storageKey": "cropped(height:60,width:60)"
                  }
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArticleNewsSource",
            "kind": "LinkedField",
            "name": "newsSource",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v13/*: any*/),
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
              (v3/*: any*/),
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "figures",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isArticleSectionImageCollectionFigure"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v12/*: any*/),
                          (v18/*: any*/),
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
                          (v12/*: any*/),
                          (v18/*: any*/),
                          (v13/*: any*/),
                          (v1/*: any*/),
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
                            "args": (v19/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v12/*: any*/),
                              (v13/*: any*/),
                              (v10/*: any*/)
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
                            "args": (v19/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v10/*: any*/),
                              (v13/*: any*/),
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
                                "selections": (v20/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v20/*: any*/),
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
                          }
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v21/*: any*/)
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
                  (v1/*: any*/),
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
                      (v3/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v23/*: any*/),
                        "type": "ArticleImageSection",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v23/*: any*/),
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v21/*: any*/)
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
                        "selections": (v9/*: any*/),
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
                  (v6/*: any*/),
                  (v5/*: any*/)
                ],
                "type": "ArticleSectionSocialEmbed",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/),
                  (v16/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              (v1/*: any*/),
              (v13/*: any*/),
              (v2/*: any*/),
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
                      (v11/*: any*/),
                      (v22/*: any*/)
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": "cropped(height:60,width:80)"
                  }
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v12/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "81cf25a3d7077dbd49eb7eb6dd20d434",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "article.authors": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Author"
        },
        "article.authors.bio": (v24/*: any*/),
        "article.authors.id": (v25/*: any*/),
        "article.authors.image": (v26/*: any*/),
        "article.authors.image.cropped": (v27/*: any*/),
        "article.authors.image.cropped.src": (v28/*: any*/),
        "article.authors.image.cropped.srcSet": (v28/*: any*/),
        "article.authors.initials": (v24/*: any*/),
        "article.authors.name": (v24/*: any*/),
        "article.byline": (v24/*: any*/),
        "article.hero": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleHero"
        },
        "article.hero.__typename": (v28/*: any*/),
        "article.hero.embed": (v24/*: any*/),
        "article.hero.image": (v26/*: any*/),
        "article.hero.image.split": (v29/*: any*/),
        "article.hero.image.split.src": (v28/*: any*/),
        "article.hero.image.split.srcSet": (v28/*: any*/),
        "article.hero.image.text": (v27/*: any*/),
        "article.hero.image.text.src": (v28/*: any*/),
        "article.hero.image.text.srcSet": (v28/*: any*/),
        "article.hero.image.url": (v24/*: any*/),
        "article.hero.layout": {
          "enumValues": [
            "BASIC",
            "FULLSCREEN",
            "SPLIT",
            "TEXT"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArticleFeatureSectionType"
        },
        "article.href": (v24/*: any*/),
        "article.id": (v25/*: any*/),
        "article.layout": {
          "enumValues": [
            "CLASSIC",
            "FEATURE",
            "NEWS",
            "SERIES",
            "STANDARD",
            "VIDEO"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArticleLayout"
        },
        "article.newsSource": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleNewsSource"
        },
        "article.newsSource.title": (v24/*: any*/),
        "article.newsSource.url": (v24/*: any*/),
        "article.postscript": (v24/*: any*/),
        "article.publishedAt": (v24/*: any*/),
        "article.relatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.relatedArticles.byline": (v24/*: any*/),
        "article.relatedArticles.href": (v24/*: any*/),
        "article.relatedArticles.id": (v25/*: any*/),
        "article.relatedArticles.internalID": (v25/*: any*/),
        "article.relatedArticles.thumbnailImage": (v26/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped": (v27/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped.src": (v28/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped.srcSet": (v28/*: any*/),
        "article.relatedArticles.title": (v24/*: any*/),
        "article.sections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSections"
        },
        "article.sections.__typename": (v28/*: any*/),
        "article.sections.body": (v24/*: any*/),
        "article.sections.counts": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageSetCounts"
        },
        "article.sections.counts.figures": (v30/*: any*/),
        "article.sections.cover": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSectionImageSetFigure"
        },
        "article.sections.cover.__isNode": (v28/*: any*/),
        "article.sections.cover.__typename": (v28/*: any*/),
        "article.sections.cover.id": (v25/*: any*/),
        "article.sections.cover.image": (v26/*: any*/),
        "article.sections.cover.image.large": (v29/*: any*/),
        "article.sections.cover.image.large.height": (v31/*: any*/),
        "article.sections.cover.image.large.src": (v28/*: any*/),
        "article.sections.cover.image.large.srcSet": (v28/*: any*/),
        "article.sections.cover.image.large.width": (v31/*: any*/),
        "article.sections.cover.image.small": (v27/*: any*/),
        "article.sections.cover.image.small.height": (v30/*: any*/),
        "article.sections.cover.image.small.src": (v28/*: any*/),
        "article.sections.cover.image.small.srcSet": (v28/*: any*/),
        "article.sections.cover.image.small.width": (v30/*: any*/),
        "article.sections.embed": (v24/*: any*/),
        "article.sections.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSectionImageCollectionFigure"
        },
        "article.sections.figures.__isArticleSectionImageCollectionFigure": (v28/*: any*/),
        "article.sections.figures.__isNode": (v28/*: any*/),
        "article.sections.figures.__typename": (v28/*: any*/),
        "article.sections.figures.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "article.sections.figures.artists.href": (v24/*: any*/),
        "article.sections.figures.artists.id": (v25/*: any*/),
        "article.sections.figures.artists.name": (v24/*: any*/),
        "article.sections.figures.caption": (v24/*: any*/),
        "article.sections.figures.collecting_institution": (v24/*: any*/),
        "article.sections.figures.cultural_maker": (v24/*: any*/),
        "article.sections.figures.date": (v24/*: any*/),
        "article.sections.figures.href": (v24/*: any*/),
        "article.sections.figures.id": (v25/*: any*/),
        "article.sections.figures.image": (v26/*: any*/),
        "article.sections.figures.image.resized": (v29/*: any*/),
        "article.sections.figures.image.resized.height": (v31/*: any*/),
        "article.sections.figures.image.resized.src": (v28/*: any*/),
        "article.sections.figures.image.resized.srcSet": (v28/*: any*/),
        "article.sections.figures.image.resized.width": (v31/*: any*/),
        "article.sections.figures.is_inquireable": (v32/*: any*/),
        "article.sections.figures.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "article.sections.figures.partner.href": (v24/*: any*/),
        "article.sections.figures.partner.id": (v25/*: any*/),
        "article.sections.figures.partner.name": (v24/*: any*/),
        "article.sections.figures.partner.type": (v24/*: any*/),
        "article.sections.figures.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "article.sections.figures.sale.id": (v25/*: any*/),
        "article.sections.figures.sale.is_auction": (v32/*: any*/),
        "article.sections.figures.sale.is_closed": (v32/*: any*/),
        "article.sections.figures.sale.is_live_open": (v32/*: any*/),
        "article.sections.figures.sale.is_open": (v32/*: any*/),
        "article.sections.figures.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "article.sections.figures.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "article.sections.figures.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "article.sections.figures.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "article.sections.figures.sale_artwork.highest_bid.display": (v24/*: any*/),
        "article.sections.figures.sale_artwork.id": (v25/*: any*/),
        "article.sections.figures.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "article.sections.figures.sale_artwork.opening_bid.display": (v24/*: any*/),
        "article.sections.figures.sale_message": (v24/*: any*/),
        "article.sections.figures.title": (v24/*: any*/),
        "article.sections.height": (v31/*: any*/),
        "article.sections.image": (v26/*: any*/),
        "article.sections.image.cropped": (v27/*: any*/),
        "article.sections.image.cropped.src": (v28/*: any*/),
        "article.sections.image.cropped.srcSet": (v28/*: any*/),
        "article.sections.layout": {
          "enumValues": [
            "COLUMN_WIDTH",
            "FILLWIDTH",
            "OVERFLOW_FILLWIDTH"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageCollectionLayout"
        },
        "article.sections.mobileHeight": (v31/*: any*/),
        "article.sections.setLayout": {
          "enumValues": [
            "FULL",
            "MINI"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageSetLayout"
        },
        "article.sections.title": (v24/*: any*/),
        "article.sections.url": (v24/*: any*/),
        "article.title": (v24/*: any*/),
        "article.vertical": (v24/*: any*/)
      }
    },
    "name": "ArticleBody_test_Query",
    "operationKind": "query",
    "text": "query ArticleBody_test_Query {\n  article(id: \"example\") {\n    ...ArticleBody_article\n    id\n  }\n}\n\nfragment ArticleBody_article on Article {\n  ...ArticleHeader_article\n  ...ArticleByline_article\n  layout\n  title\n  newsSource {\n    title\n    url\n  }\n  href\n  publishedAt(format: \"MMM D, YYYY h:mma\")\n  sections {\n    __typename\n    ...ArticleSectionText_section\n    ...ArticleSectionImageCollection_section\n    ...ArticleSectionImageSet_section\n    ...ArticleSectionVideo_section\n    ...ArticleSectionSocialEmbed_section\n    ...ArticleSectionEmbed_section\n  }\n  postscript\n  relatedArticles {\n    internalID\n    title\n    href\n    byline\n    thumbnailImage {\n      cropped(width: 80, height: 60) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ArticleByline_article on Article {\n  byline\n  authors {\n    name\n    initials\n    bio\n    image {\n      cropped(width: 60, height: 60) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ArticleHeader_article on Article {\n  title\n  vertical\n  byline\n  hero {\n    __typename\n    ... on ArticleFeatureSection {\n      layout\n      embed\n      image {\n        url\n        split: resized(width: 900) {\n          src\n          srcSet\n        }\n        text: cropped(width: 1600, height: 900) {\n          src\n          srcSet\n        }\n      }\n    }\n  }\n}\n\nfragment ArticleSectionEmbed_section on ArticleSectionEmbed {\n  url\n  height\n  mobileHeight\n}\n\nfragment ArticleSectionImageCollectionCaption_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  __typename\n  ...Metadata_artwork\n  ... on ArticleImageSection {\n    caption\n  }\n}\n\nfragment ArticleSectionImageCollectionImage_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  ... on ArticleImageSection {\n    id\n    image {\n      resized(width: 1220, version: [\"normalized\", \"larger\", \"large\"]) {\n        src\n        srcSet\n        height\n        width\n      }\n    }\n  }\n  ... on Artwork {\n    id\n    image {\n      resized(width: 1220, version: [\"normalized\", \"larger\", \"large\"]) {\n        src\n        srcSet\n        height\n        width\n      }\n    }\n  }\n}\n\nfragment ArticleSectionImageCollection_section on ArticleSectionImageCollection {\n  layout\n  figures {\n    __typename\n    ...ArticleSectionImageCollectionImage_figure\n    ...ArticleSectionImageCollectionCaption_figure\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ArticleImageSection {\n      id\n    }\n  }\n}\n\nfragment ArticleSectionImageSet_section on ArticleSectionImageSet {\n  setLayout: layout\n  title\n  counts {\n    figures\n  }\n  cover {\n    __typename\n    ... on ArticleImageSection {\n      id\n      image {\n        small: cropped(width: 80, height: 80, version: [\"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n        large: resized(width: 1220, version: [\"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n      }\n    }\n    ... on Artwork {\n      id\n      image {\n        small: cropped(width: 80, height: 80, version: [\"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n        large: resized(width: 1220, version: [\"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ArticleSectionSocialEmbed_section on ArticleSectionSocialEmbed {\n  url\n  embed\n}\n\nfragment ArticleSectionText_section on ArticleSectionText {\n  body\n}\n\nfragment ArticleSectionVideo_section on ArticleSectionVideo {\n  embed(autoPlay: true)\n  image {\n    cropped(width: 910, height: 512) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n"
  }
};
})();
(node as any).hash = 'aa04a3448b96c85f66845792eb69cea7';
export default node;
