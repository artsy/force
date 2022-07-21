/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleZoomGallery_test_QueryVariables = {};
export type ArticleZoomGallery_test_QueryResponse = {
    readonly article: {
        readonly " $fragmentRefs": FragmentRefs<"ArticleZoomGallery_article">;
    } | null;
};
export type ArticleZoomGallery_test_Query = {
    readonly response: ArticleZoomGallery_test_QueryResponse;
    readonly variables: ArticleZoomGallery_test_QueryVariables;
};



/*
query ArticleZoomGallery_test_Query {
  article(id: "example") {
    ...ArticleZoomGallery_article
    id
  }
}

fragment ArticleZoomGalleryCaption_figure on ArticleSectionImageCollectionFigure {
  __isArticleSectionImageCollectionFigure: __typename
  __typename
  ... on Artwork {
    ...Metadata_artwork
    href
  }
  ... on ArticleImageSection {
    caption
  }
}

fragment ArticleZoomGalleryFigure_figure on ArticleSectionImageCollectionFigure {
  __isArticleSectionImageCollectionFigure: __typename
  __typename
  ... on Artwork {
    image {
      width
      height
      url(version: ["normalized", "larger", "large"])
    }
  }
  ... on ArticleImageSection {
    image {
      width
      height
      url(version: ["normalized", "larger", "large"])
    }
  }
}

fragment ArticleZoomGallery_article on Article {
  sections {
    __typename
    ... on ArticleSectionImageCollection {
      figures {
        ...ArticleZoomGalleryFigure_figure
        ...ArticleZoomGalleryCaption_figure
        __typename
        ... on Artwork {
          id
        }
        ... on ArticleImageSection {
          id
        }
        ... on Node {
          __isNode: __typename
          id
        }
      }
    }
    ... on ArticleSectionImageSet {
      title
      figures {
        ...ArticleZoomGalleryFigure_figure
        ...ArticleZoomGalleryCaption_figure
        __typename
        ... on Artwork {
          id
        }
        ... on ArticleImageSection {
          id
        }
        ... on Node {
          __isNode: __typename
          id
        }
      }
    }
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
    cascadingEndTimeIntervalMinutes
    extendedBiddingIntervalMinutes
    startAt
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    lotID
    lotLabel
    endAt
    extendedBiddingEndAt
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
  ...NewSaveButton_artwork
  ...HoverDetails_artwork
}

fragment HoverDetails_artwork on Artwork {
  internalID
  attributionClass {
    name
    id
  }
  mediumType {
    filterGene {
      name
      id
    }
  }
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  href
}

fragment NewSaveButton_artwork on Artwork {
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
  "name": "__typename",
  "storageKey": null
},
v2 = {
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
      "name": "width",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "height",
      "storageKey": null
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
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"normalized\",\"larger\",\"large\"])"
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v10 = [
  (v7/*: any*/),
  (v6/*: any*/)
],
v11 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
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
        (v3/*: any*/),
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
        (v3/*: any*/),
        (v6/*: any*/)
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
        (v8/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cascadingEndTimeIntervalMinutes",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extendedBiddingIntervalMinutes",
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
        (v6/*: any*/)
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
          "kind": "ScalarField",
          "name": "lotID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lotLabel",
          "storageKey": null
        },
        (v8/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extendedBiddingEndAt",
          "storageKey": null
        },
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
        (v6/*: any*/)
      ],
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
      "alias": "is_saved",
      "args": null,
      "kind": "ScalarField",
      "name": "isSaved",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AttributionClass",
      "kind": "LinkedField",
      "name": "attributionClass",
      "plural": false,
      "selections": (v10/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkMedium",
      "kind": "LinkedField",
      "name": "mediumType",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Gene",
          "kind": "LinkedField",
          "name": "filterGene",
          "plural": false,
          "selections": (v10/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "caption",
  "storageKey": null
},
v13 = [
  (v6/*: any*/)
],
v14 = {
  "kind": "InlineFragment",
  "selections": (v13/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v19 = {
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
    "name": "ArticleZoomGallery_test_Query",
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
            "name": "ArticleZoomGallery_article"
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
    "name": "ArticleZoomGallery_test_Query",
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
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "sections",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "figures",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isArticleSectionImageCollectionFigure"
                      },
                      (v1/*: any*/),
                      (v11/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v12/*: any*/),
                          (v6/*: any*/)
                        ],
                        "type": "ArticleImageSection",
                        "abstractKey": null
                      },
                      (v14/*: any*/)
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "figures",
                    "plural": true,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v11/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/),
                              (v12/*: any*/)
                            ],
                            "type": "ArticleImageSection",
                            "abstractKey": null
                          }
                        ],
                        "type": "ArticleSectionImageCollectionFigure",
                        "abstractKey": "__isArticleSectionImageCollectionFigure"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v13/*: any*/),
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v13/*: any*/),
                        "type": "ArticleImageSection",
                        "abstractKey": null
                      },
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ArticleSectionImageSet",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "de570d4daba3216327ed031f1ee45e08",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "article.id": (v15/*: any*/),
        "article.sections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSections"
        },
        "article.sections.__typename": (v16/*: any*/),
        "article.sections.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSectionImageCollectionFigure"
        },
        "article.sections.figures.__isArticleSectionImageCollectionFigure": (v16/*: any*/),
        "article.sections.figures.__isNode": (v16/*: any*/),
        "article.sections.figures.__typename": (v16/*: any*/),
        "article.sections.figures.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "article.sections.figures.artists.href": (v17/*: any*/),
        "article.sections.figures.artists.id": (v15/*: any*/),
        "article.sections.figures.artists.name": (v17/*: any*/),
        "article.sections.figures.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "article.sections.figures.attributionClass.id": (v15/*: any*/),
        "article.sections.figures.attributionClass.name": (v17/*: any*/),
        "article.sections.figures.caption": (v17/*: any*/),
        "article.sections.figures.collecting_institution": (v17/*: any*/),
        "article.sections.figures.cultural_maker": (v17/*: any*/),
        "article.sections.figures.date": (v17/*: any*/),
        "article.sections.figures.href": (v17/*: any*/),
        "article.sections.figures.id": (v15/*: any*/),
        "article.sections.figures.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "article.sections.figures.image.height": (v18/*: any*/),
        "article.sections.figures.image.url": (v17/*: any*/),
        "article.sections.figures.image.width": (v18/*: any*/),
        "article.sections.figures.internalID": (v15/*: any*/),
        "article.sections.figures.is_saved": (v19/*: any*/),
        "article.sections.figures.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "article.sections.figures.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "article.sections.figures.mediumType.filterGene.id": (v15/*: any*/),
        "article.sections.figures.mediumType.filterGene.name": (v17/*: any*/),
        "article.sections.figures.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "article.sections.figures.partner.href": (v17/*: any*/),
        "article.sections.figures.partner.id": (v15/*: any*/),
        "article.sections.figures.partner.name": (v17/*: any*/),
        "article.sections.figures.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "article.sections.figures.sale.cascadingEndTimeIntervalMinutes": (v18/*: any*/),
        "article.sections.figures.sale.endAt": (v17/*: any*/),
        "article.sections.figures.sale.extendedBiddingIntervalMinutes": (v18/*: any*/),
        "article.sections.figures.sale.id": (v15/*: any*/),
        "article.sections.figures.sale.is_auction": (v19/*: any*/),
        "article.sections.figures.sale.is_closed": (v19/*: any*/),
        "article.sections.figures.sale.startAt": (v17/*: any*/),
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
        "article.sections.figures.sale_artwork.endAt": (v17/*: any*/),
        "article.sections.figures.sale_artwork.extendedBiddingEndAt": (v17/*: any*/),
        "article.sections.figures.sale_artwork.formattedEndDateTime": (v17/*: any*/),
        "article.sections.figures.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "article.sections.figures.sale_artwork.highest_bid.display": (v17/*: any*/),
        "article.sections.figures.sale_artwork.id": (v15/*: any*/),
        "article.sections.figures.sale_artwork.lotID": (v17/*: any*/),
        "article.sections.figures.sale_artwork.lotLabel": (v17/*: any*/),
        "article.sections.figures.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "article.sections.figures.sale_artwork.opening_bid.display": (v17/*: any*/),
        "article.sections.figures.sale_message": (v17/*: any*/),
        "article.sections.figures.slug": (v15/*: any*/),
        "article.sections.figures.title": (v17/*: any*/),
        "article.sections.title": (v17/*: any*/)
      }
    },
    "name": "ArticleZoomGallery_test_Query",
    "operationKind": "query",
    "text": "query ArticleZoomGallery_test_Query {\n  article(id: \"example\") {\n    ...ArticleZoomGallery_article\n    id\n  }\n}\n\nfragment ArticleZoomGalleryCaption_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  __typename\n  ... on Artwork {\n    ...Metadata_artwork\n    href\n  }\n  ... on ArticleImageSection {\n    caption\n  }\n}\n\nfragment ArticleZoomGalleryFigure_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  __typename\n  ... on Artwork {\n    image {\n      width\n      height\n      url(version: [\"normalized\", \"larger\", \"large\"])\n    }\n  }\n  ... on ArticleImageSection {\n    image {\n      width\n      height\n      url(version: [\"normalized\", \"larger\", \"large\"])\n    }\n  }\n}\n\nfragment ArticleZoomGallery_article on Article {\n  sections {\n    __typename\n    ... on ArticleSectionImageCollection {\n      figures {\n        ...ArticleZoomGalleryFigure_figure\n        ...ArticleZoomGalleryCaption_figure\n        __typename\n        ... on Artwork {\n          id\n        }\n        ... on ArticleImageSection {\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n    ... on ArticleSectionImageSet {\n      title\n      figures {\n        ...ArticleZoomGalleryFigure_figure\n        ...ArticleZoomGalleryCaption_figure\n        __typename\n        ... on Artwork {\n          id\n        }\n        ... on ArticleImageSection {\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n"
  }
};
})();
(node as any).hash = '2523033682aa7a3ad5d0fe7ec81db7f1';
export default node;
