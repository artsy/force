/**
 * @generated SignedSource<<0e6dc6a3c3d9c147c805e322a1a2f7b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleBody_test_Query$variables = Record<PropertyKey, never>;
export type ArticleBody_test_Query$data = {
  readonly article: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticleBody_article">;
  } | null | undefined;
};
export type ArticleBody_test_Query = {
  response: ArticleBody_test_Query$data;
  variables: ArticleBody_test_Query$variables;
};

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
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
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
  "name": "id",
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
  "name": "byline",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "layout",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "embed",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v15 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
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
      "args": [
        (v15/*: any*/)
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"main\",\"normalized\",\"larger\",\"large\"])"
    },
    (v16/*: any*/),
    (v17/*: any*/)
  ],
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "formattedMetadata",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v22 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v23 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v25 = [
  (v5/*: any*/),
  (v6/*: any*/)
],
v26 = [
  (v5/*: any*/)
],
v27 = {
  "kind": "InlineFragment",
  "selections": [
    (v6/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v28 = [
  (v7/*: any*/),
  (v8/*: any*/),
  (v17/*: any*/),
  (v16/*: any*/)
],
v29 = {
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
        (v15/*: any*/),
        {
          "kind": "Literal",
          "name": "width",
          "value": 80
        }
      ],
      "concreteType": "CroppedImageUrl",
      "kind": "LinkedField",
      "name": "cropped",
      "plural": false,
      "selections": (v28/*: any*/),
      "storageKey": "cropped(height:80,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:80)"
    },
    {
      "alias": "large",
      "args": [
        (v15/*: any*/),
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
      "selections": (v28/*: any*/),
      "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:1220)"
    }
  ],
  "storageKey": null
},
v30 = [
  {
    "kind": "Literal",
    "name": "autoPlay",
    "value": true
  }
],
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Article"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v33 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v35 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v36 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v37 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v38 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v39 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v40 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v41 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v42 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "vertical",
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
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
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
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 60
                      },
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
              }
            ],
            "storageKey": null
          },
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "hero",
            "plural": false,
            "selections": [
              (v11/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v12/*: any*/),
                  (v13/*: any*/),
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
                      (v14/*: any*/),
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
          (v12/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "sections",
            "plural": true,
            "selections": [
              (v11/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isArticleSections"
              },
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
                  (v12/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "figures",
                    "plural": true,
                    "selections": [
                      (v11/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isArticleSectionImageCollectionFigure"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v6/*: any*/),
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
                          (v6/*: any*/),
                          (v19/*: any*/),
                          (v18/*: any*/),
                          (v3/*: any*/),
                          (v2/*: any*/),
                          (v1/*: any*/),
                          (v20/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CollectorSignals",
                            "kind": "LinkedField",
                            "name": "collectorSignals",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "primaryLabel",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "AuctionCollectorSignals",
                                "kind": "LinkedField",
                                "name": "auction",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "bidCount",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "lotClosesAt",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "liveBiddingStarted",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "registrationEndsAt",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "onlineBiddingExtended",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "PartnerOfferToCollector",
                                "kind": "LinkedField",
                                "name": "partnerOffer",
                                "plural": false,
                                "selections": [
                                  (v21/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Money",
                                    "kind": "LinkedField",
                                    "name": "priceWithDiscount",
                                    "plural": false,
                                    "selections": (v22/*: any*/),
                                    "storageKey": null
                                  },
                                  (v6/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
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
                            "name": "artist",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtistTargetSupply",
                                "kind": "LinkedField",
                                "name": "targetSupply",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isP1",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v6/*: any*/)
                            ],
                            "storageKey": "artist(shallow:true)"
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
                                "name": "demandRank",
                                "storageKey": null
                              }
                            ],
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
                              (v6/*: any*/),
                              (v2/*: any*/),
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
                            "args": (v23/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              (v2/*: any*/),
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
                              (v21/*: any*/),
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
                              (v6/*: any*/),
                              {
                                "alias": null,
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
                              (v24/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotLabel",
                                "storageKey": null
                              },
                              (v21/*: any*/),
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
                                "selections": (v22/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v22/*: any*/),
                                "storageKey": null
                              },
                              (v6/*: any*/)
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
                              (v24/*: any*/),
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": (v25/*: any*/),
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
                                "selections": (v25/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v6/*: any*/),
                          (v18/*: any*/),
                          (v1/*: any*/),
                          (v20/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArticleUnpublishedArtworkArtist",
                            "kind": "LinkedField",
                            "name": "artist",
                            "plural": false,
                            "selections": (v26/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArticleUnpublishedArtworkPartner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": (v26/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "type": "ArticleUnpublishedArtwork",
                        "abstractKey": null
                      },
                      (v27/*: any*/)
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
                      (v11/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v6/*: any*/),
                          (v29/*: any*/)
                        ],
                        "type": "ArticleImageSection",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v19/*: any*/),
                          (v6/*: any*/),
                          (v29/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v27/*: any*/)
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
                    "args": (v30/*: any*/),
                    "kind": "ScalarField",
                    "name": "embed",
                    "storageKey": "embed(autoPlay:true)"
                  },
                  {
                    "alias": "fallbackEmbed",
                    "args": (v30/*: any*/),
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
                  (v14/*: any*/),
                  (v13/*: any*/)
                ],
                "type": "ArticleSectionSocialEmbed",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v14/*: any*/),
                  (v17/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mobileHeight",
                    "storageKey": null
                  },
                  {
                    "alias": "_layout",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "layout",
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
            "concreteType": "ArticleNewsSource",
            "kind": "LinkedField",
            "name": "newsSource",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v14/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "seriesArticle",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "thumbnailTitle",
                "storageKey": null
              },
              (v2/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "leadParagraph",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "publishedAt",
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
              (v3/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v10/*: any*/),
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
                    "selections": (v9/*: any*/),
                    "storageKey": "cropped(height:100,width:100)"
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/)
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
    "cacheID": "3cf4ae8475f4559298a4e3e1f6ff6740",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": (v31/*: any*/),
        "article.authors": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Author"
        },
        "article.authors.bio": (v32/*: any*/),
        "article.authors.id": (v33/*: any*/),
        "article.authors.image": (v34/*: any*/),
        "article.authors.image.cropped": (v35/*: any*/),
        "article.authors.image.cropped.src": (v36/*: any*/),
        "article.authors.image.cropped.srcSet": (v36/*: any*/),
        "article.authors.initials": (v32/*: any*/),
        "article.authors.internalID": (v33/*: any*/),
        "article.authors.name": (v36/*: any*/),
        "article.authors.slug": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "article.byline": (v32/*: any*/),
        "article.hero": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleHero"
        },
        "article.hero.__typename": (v36/*: any*/),
        "article.hero.embed": (v32/*: any*/),
        "article.hero.image": (v34/*: any*/),
        "article.hero.image.split": (v37/*: any*/),
        "article.hero.image.split.src": (v36/*: any*/),
        "article.hero.image.split.srcSet": (v36/*: any*/),
        "article.hero.image.text": (v35/*: any*/),
        "article.hero.image.text.src": (v36/*: any*/),
        "article.hero.image.text.srcSet": (v36/*: any*/),
        "article.hero.image.url": (v32/*: any*/),
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
        "article.hero.media": (v32/*: any*/),
        "article.href": (v32/*: any*/),
        "article.id": (v33/*: any*/),
        "article.internalID": (v33/*: any*/),
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
        "article.leadParagraph": (v32/*: any*/),
        "article.newsSource": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleNewsSource"
        },
        "article.newsSource.title": (v32/*: any*/),
        "article.newsSource.url": (v32/*: any*/),
        "article.postscript": (v32/*: any*/),
        "article.publishedAt": (v32/*: any*/),
        "article.relatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.relatedArticles.byline": (v32/*: any*/),
        "article.relatedArticles.href": (v32/*: any*/),
        "article.relatedArticles.id": (v33/*: any*/),
        "article.relatedArticles.internalID": (v33/*: any*/),
        "article.relatedArticles.thumbnailImage": (v34/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped": (v35/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped.src": (v36/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped.srcSet": (v36/*: any*/),
        "article.relatedArticles.title": (v32/*: any*/),
        "article.sections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSections"
        },
        "article.sections.__isArticleSections": (v36/*: any*/),
        "article.sections.__typename": (v36/*: any*/),
        "article.sections._layout": {
          "enumValues": [
            "COLUMN_WIDTH",
            "FILLWIDTH",
            "OVERFLOW",
            "OVERFLOW_FILLWIDTH"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArticleSectionEmbedLayout"
        },
        "article.sections.body": (v32/*: any*/),
        "article.sections.counts": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageSetCounts"
        },
        "article.sections.counts.figures": (v38/*: any*/),
        "article.sections.cover": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSectionImageSetFigure"
        },
        "article.sections.cover.__isNode": (v36/*: any*/),
        "article.sections.cover.__typename": (v36/*: any*/),
        "article.sections.cover.formattedMetadata": (v32/*: any*/),
        "article.sections.cover.id": (v33/*: any*/),
        "article.sections.cover.image": (v34/*: any*/),
        "article.sections.cover.image.large": (v37/*: any*/),
        "article.sections.cover.image.large.height": (v39/*: any*/),
        "article.sections.cover.image.large.src": (v36/*: any*/),
        "article.sections.cover.image.large.srcSet": (v36/*: any*/),
        "article.sections.cover.image.large.width": (v39/*: any*/),
        "article.sections.cover.image.small": (v35/*: any*/),
        "article.sections.cover.image.small.height": (v38/*: any*/),
        "article.sections.cover.image.small.src": (v36/*: any*/),
        "article.sections.cover.image.small.srcSet": (v36/*: any*/),
        "article.sections.cover.image.small.width": (v38/*: any*/),
        "article.sections.embed": (v32/*: any*/),
        "article.sections.fallbackEmbed": (v32/*: any*/),
        "article.sections.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSectionImageCollectionFigure"
        },
        "article.sections.figures.__isArticleSectionImageCollectionFigure": (v36/*: any*/),
        "article.sections.figures.__isNode": (v36/*: any*/),
        "article.sections.figures.__typename": (v36/*: any*/),
        "article.sections.figures.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "article.sections.figures.artist.id": (v33/*: any*/),
        "article.sections.figures.artist.name": (v32/*: any*/),
        "article.sections.figures.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "article.sections.figures.artist.targetSupply.isP1": (v40/*: any*/),
        "article.sections.figures.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "article.sections.figures.artists.href": (v32/*: any*/),
        "article.sections.figures.artists.id": (v33/*: any*/),
        "article.sections.figures.artists.name": (v32/*: any*/),
        "article.sections.figures.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "article.sections.figures.attributionClass.id": (v33/*: any*/),
        "article.sections.figures.attributionClass.name": (v32/*: any*/),
        "article.sections.figures.caption": (v32/*: any*/),
        "article.sections.figures.collecting_institution": (v32/*: any*/),
        "article.sections.figures.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "article.sections.figures.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "article.sections.figures.collectorSignals.auction.bidCount": (v38/*: any*/),
        "article.sections.figures.collectorSignals.auction.liveBiddingStarted": (v41/*: any*/),
        "article.sections.figures.collectorSignals.auction.lotClosesAt": (v32/*: any*/),
        "article.sections.figures.collectorSignals.auction.onlineBiddingExtended": (v41/*: any*/),
        "article.sections.figures.collectorSignals.auction.registrationEndsAt": (v32/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "article.sections.figures.collectorSignals.partnerOffer.endAt": (v32/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.id": (v33/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "article.sections.figures.collectorSignals.partnerOffer.priceWithDiscount.display": (v32/*: any*/),
        "article.sections.figures.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "article.sections.figures.cultural_maker": (v32/*: any*/),
        "article.sections.figures.date": (v32/*: any*/),
        "article.sections.figures.formattedMetadata": (v32/*: any*/),
        "article.sections.figures.href": (v32/*: any*/),
        "article.sections.figures.id": (v33/*: any*/),
        "article.sections.figures.image": (v34/*: any*/),
        "article.sections.figures.image.height": (v39/*: any*/),
        "article.sections.figures.image.url": (v32/*: any*/),
        "article.sections.figures.image.width": (v39/*: any*/),
        "article.sections.figures.internalID": (v33/*: any*/),
        "article.sections.figures.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "article.sections.figures.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
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
        "article.sections.figures.mediumType.filterGene.id": (v33/*: any*/),
        "article.sections.figures.mediumType.filterGene.name": (v32/*: any*/),
        "article.sections.figures.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "article.sections.figures.partner.href": (v32/*: any*/),
        "article.sections.figures.partner.id": (v33/*: any*/),
        "article.sections.figures.partner.name": (v32/*: any*/),
        "article.sections.figures.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "article.sections.figures.sale.cascadingEndTimeIntervalMinutes": (v39/*: any*/),
        "article.sections.figures.sale.endAt": (v32/*: any*/),
        "article.sections.figures.sale.extendedBiddingIntervalMinutes": (v39/*: any*/),
        "article.sections.figures.sale.id": (v33/*: any*/),
        "article.sections.figures.sale.isOpen": (v40/*: any*/),
        "article.sections.figures.sale.is_auction": (v40/*: any*/),
        "article.sections.figures.sale.is_closed": (v40/*: any*/),
        "article.sections.figures.sale.startAt": (v32/*: any*/),
        "article.sections.figures.saleArtwork": (v42/*: any*/),
        "article.sections.figures.saleArtwork.id": (v33/*: any*/),
        "article.sections.figures.saleArtwork.lotID": (v32/*: any*/),
        "article.sections.figures.sale_artwork": (v42/*: any*/),
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
        "article.sections.figures.sale_artwork.endAt": (v32/*: any*/),
        "article.sections.figures.sale_artwork.extendedBiddingEndAt": (v32/*: any*/),
        "article.sections.figures.sale_artwork.formattedEndDateTime": (v32/*: any*/),
        "article.sections.figures.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "article.sections.figures.sale_artwork.highest_bid.display": (v32/*: any*/),
        "article.sections.figures.sale_artwork.id": (v33/*: any*/),
        "article.sections.figures.sale_artwork.lotID": (v32/*: any*/),
        "article.sections.figures.sale_artwork.lotLabel": (v32/*: any*/),
        "article.sections.figures.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "article.sections.figures.sale_artwork.opening_bid.display": (v32/*: any*/),
        "article.sections.figures.sale_message": (v32/*: any*/),
        "article.sections.figures.title": (v32/*: any*/),
        "article.sections.height": (v39/*: any*/),
        "article.sections.image": (v34/*: any*/),
        "article.sections.image.cropped": (v35/*: any*/),
        "article.sections.image.cropped.src": (v36/*: any*/),
        "article.sections.image.cropped.srcSet": (v36/*: any*/),
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
        "article.sections.mobileHeight": (v39/*: any*/),
        "article.sections.setLayout": {
          "enumValues": [
            "FULL",
            "MINI"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageSetLayout"
        },
        "article.sections.title": (v32/*: any*/),
        "article.sections.url": (v32/*: any*/),
        "article.seriesArticle": (v31/*: any*/),
        "article.seriesArticle.href": (v32/*: any*/),
        "article.seriesArticle.id": (v33/*: any*/),
        "article.seriesArticle.thumbnailTitle": (v32/*: any*/),
        "article.slug": (v32/*: any*/),
        "article.title": (v32/*: any*/),
        "article.vertical": (v32/*: any*/)
      }
    },
    "name": "ArticleBody_test_Query",
    "operationKind": "query",
    "text": "query ArticleBody_test_Query {\n  article(id: \"example\") {\n    ...ArticleBody_article\n    id\n  }\n}\n\nfragment ArticleBody_article on Article {\n  ...ArticleHero_article\n  ...ArticleByline_article\n  ...ArticleSectionAd_article\n  ...ArticleNewsSource_article\n  hero {\n    __typename\n  }\n  seriesArticle {\n    thumbnailTitle\n    href\n    id\n  }\n  vertical\n  authors {\n    internalID\n    slug\n    name\n    id\n  }\n  byline\n  internalID\n  slug\n  layout\n  leadParagraph\n  title\n  href\n  publishedAt\n  sections {\n    __typename\n    ...ArticleSection_section\n  }\n  postscript\n  relatedArticles {\n    internalID\n    title\n    href\n    byline\n    thumbnailImage {\n      cropped(width: 100, height: 100) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ArticleByline_article on Article {\n  byline\n  authors {\n    internalID\n    slug\n    name\n    initials\n    bio\n    image {\n      cropped(width: 60, height: 60) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ArticleHero_article on Article {\n  title\n  href\n  vertical\n  authors {\n    internalID\n    slug\n    name\n    id\n  }\n  byline\n  hero {\n    __typename\n    ... on ArticleFeatureSection {\n      layout\n      embed\n      media\n      image {\n        url\n        split: resized(width: 900) {\n          src\n          srcSet\n        }\n        text: cropped(width: 1600, height: 900) {\n          src\n          srcSet\n        }\n      }\n    }\n  }\n}\n\nfragment ArticleNewsSource_article on Article {\n  newsSource {\n    title\n    url\n  }\n}\n\nfragment ArticleSectionAd_article on Article {\n  layout\n  sections {\n    __typename\n  }\n}\n\nfragment ArticleSectionEmbed_section on ArticleSectionEmbed {\n  url\n  height\n  mobileHeight\n  _layout: layout\n}\n\nfragment ArticleSectionImageCollectionCaption_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  __typename\n  ...Metadata_artwork\n  ... on ArticleImageSection {\n    caption\n  }\n  ... on ArticleUnpublishedArtwork {\n    title\n    date\n    artist {\n      name\n    }\n    partner {\n      name\n    }\n  }\n}\n\nfragment ArticleSectionImageCollectionImage_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  ... on ArticleImageSection {\n    id\n    image {\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n  ... on Artwork {\n    id\n    formattedMetadata\n    image {\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n  ... on ArticleUnpublishedArtwork {\n    id\n    image {\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n}\n\nfragment ArticleSectionImageCollection_section on ArticleSectionImageCollection {\n  layout\n  figures {\n    __typename\n    ...ArticleSectionImageCollectionImage_figure\n    ...ArticleSectionImageCollectionCaption_figure\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ArticleImageSection {\n      id\n    }\n    ... on ArticleUnpublishedArtwork {\n      id\n    }\n  }\n}\n\nfragment ArticleSectionImageSet_section on ArticleSectionImageSet {\n  setLayout: layout\n  title\n  counts {\n    figures\n  }\n  cover {\n    __typename\n    ... on ArticleImageSection {\n      id\n      image {\n        small: cropped(width: 80, height: 80, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n        large: resized(width: 1220, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n      }\n    }\n    ... on Artwork {\n      formattedMetadata\n      id\n      image {\n        small: cropped(width: 80, height: 80, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n        large: resized(width: 1220, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ArticleSectionSocialEmbed_section on ArticleSectionSocialEmbed {\n  url\n  embed\n}\n\nfragment ArticleSectionText_section on ArticleSectionText {\n  body\n}\n\nfragment ArticleSectionVideo_section on ArticleSectionVideo {\n  embed(autoPlay: true)\n  fallbackEmbed: embed(autoPlay: true)\n  image {\n    cropped(width: 910, height: 512) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArticleSection_section on ArticleSections {\n  __isArticleSections: __typename\n  __typename\n  ...ArticleSectionText_section\n  ...ArticleSectionImageCollection_section\n  ...ArticleSectionImageSet_section\n  ...ArticleSectionVideo_section\n  ...ArticleSectionSocialEmbed_section\n  ...ArticleSectionEmbed_section\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa04a3448b96c85f66845792eb69cea7";

export default node;
