/**
 * @generated SignedSource<<408f4ddbfbe3be21c9ce73d52fae2116>>
 * @relayHash 1c396244e730a6b063d8c6bdcf1e51d7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1c396244e730a6b063d8c6bdcf1e51d7

import { ConcreteRequest, Query } from 'relay-runtime';
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
  "name": "byline",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "layout",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "embed",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v10 = [
  (v8/*: any*/),
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v14 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v17 = {
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
        (v14/*: any*/)
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"main\",\"normalized\",\"larger\",\"large\"])"
    },
    (v15/*: any*/),
    (v16/*: any*/)
  ],
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "formattedMetadata",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v21 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v22 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v24 = [
  (v12/*: any*/),
  (v13/*: any*/)
],
v25 = [
  (v12/*: any*/)
],
v26 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v27 = [
  (v8/*: any*/),
  (v9/*: any*/),
  (v16/*: any*/),
  (v15/*: any*/)
],
v28 = {
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
      "selections": (v27/*: any*/),
      "storageKey": "cropped(height:80,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:80)"
    },
    {
      "alias": "large",
      "args": [
        (v14/*: any*/),
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
      "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:1220)"
    }
  ],
  "storageKey": null
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Article"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v31 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v34 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v35 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v36 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
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
  "plural": false,
  "type": "Boolean"
},
v39 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v40 = {
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "hero",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
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
                      (v7/*: any*/),
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
                        "selections": (v10/*: any*/),
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
                        "selections": (v10/*: any*/),
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
              (v11/*: any*/),
              (v12/*: any*/),
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
                    "selections": (v10/*: any*/),
                    "storageKey": "cropped(height:60,width:60)"
                  }
                ],
                "storageKey": null
              },
              (v13/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "sections",
            "plural": true,
            "selections": [
              (v4/*: any*/),
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
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "figures",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isArticleSectionImageCollectionFigure"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v13/*: any*/),
                          (v17/*: any*/),
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
                          (v13/*: any*/),
                          (v18/*: any*/),
                          (v17/*: any*/),
                          (v11/*: any*/),
                          (v2/*: any*/),
                          (v1/*: any*/),
                          (v19/*: any*/),
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
                                  (v20/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Money",
                                    "kind": "LinkedField",
                                    "name": "priceWithDiscount",
                                    "plural": false,
                                    "selections": (v21/*: any*/),
                                    "storageKey": null
                                  },
                                  (v13/*: any*/)
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
                            "args": (v22/*: any*/),
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
                              (v13/*: any*/)
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
                            "args": (v22/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v13/*: any*/),
                              (v2/*: any*/),
                              (v12/*: any*/)
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
                            "args": (v22/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v12/*: any*/),
                              (v2/*: any*/),
                              (v13/*: any*/)
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
                              (v20/*: any*/),
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
                              (v13/*: any*/),
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
                              (v23/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotLabel",
                                "storageKey": null
                              },
                              (v20/*: any*/),
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
                                "selections": (v21/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v21/*: any*/),
                                "storageKey": null
                              },
                              (v13/*: any*/)
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
                              (v23/*: any*/),
                              (v13/*: any*/)
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
                            "selections": (v24/*: any*/),
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
                                "selections": (v24/*: any*/),
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
                          (v13/*: any*/),
                          (v17/*: any*/),
                          (v1/*: any*/),
                          (v19/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArticleUnpublishedArtworkArtist",
                            "kind": "LinkedField",
                            "name": "artist",
                            "plural": false,
                            "selections": (v25/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArticleUnpublishedArtworkPartner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": (v25/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "type": "ArticleUnpublishedArtwork",
                        "abstractKey": null
                      },
                      (v26/*: any*/)
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
                      (v4/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v13/*: any*/),
                          (v28/*: any*/)
                        ],
                        "type": "ArticleImageSection",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v18/*: any*/),
                          (v13/*: any*/),
                          (v28/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v26/*: any*/)
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
                    "alias": "fallbackEmbed",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "autoPlay",
                        "value": false
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "embed",
                    "storageKey": "embed(autoPlay:false)"
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
                        "selections": (v10/*: any*/),
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
                  (v7/*: any*/),
                  (v6/*: any*/)
                ],
                "type": "ArticleSectionSocialEmbed",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/),
                  (v16/*: any*/),
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
              (v7/*: any*/)
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
              (v13/*: any*/)
            ],
            "storageKey": null
          },
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
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
              (v11/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
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
                    "selections": (v10/*: any*/),
                    "storageKey": "cropped(height:100,width:100)"
                  }
                ],
                "storageKey": null
              },
              (v13/*: any*/)
            ],
            "storageKey": null
          },
          (v13/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": "1c396244e730a6b063d8c6bdcf1e51d7",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": (v29/*: any*/),
        "article.authors": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Author"
        },
        "article.authors.bio": (v30/*: any*/),
        "article.authors.id": (v31/*: any*/),
        "article.authors.image": (v32/*: any*/),
        "article.authors.image.cropped": (v33/*: any*/),
        "article.authors.image.cropped.src": (v34/*: any*/),
        "article.authors.image.cropped.srcSet": (v34/*: any*/),
        "article.authors.initials": (v30/*: any*/),
        "article.authors.internalID": (v31/*: any*/),
        "article.authors.name": (v30/*: any*/),
        "article.byline": (v30/*: any*/),
        "article.hero": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleHero"
        },
        "article.hero.__typename": (v34/*: any*/),
        "article.hero.embed": (v30/*: any*/),
        "article.hero.image": (v32/*: any*/),
        "article.hero.image.split": (v35/*: any*/),
        "article.hero.image.split.src": (v34/*: any*/),
        "article.hero.image.split.srcSet": (v34/*: any*/),
        "article.hero.image.text": (v33/*: any*/),
        "article.hero.image.text.src": (v34/*: any*/),
        "article.hero.image.text.srcSet": (v34/*: any*/),
        "article.hero.image.url": (v30/*: any*/),
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
        "article.hero.media": (v30/*: any*/),
        "article.href": (v30/*: any*/),
        "article.id": (v31/*: any*/),
        "article.internalID": (v31/*: any*/),
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
        "article.leadParagraph": (v30/*: any*/),
        "article.newsSource": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleNewsSource"
        },
        "article.newsSource.title": (v30/*: any*/),
        "article.newsSource.url": (v30/*: any*/),
        "article.postscript": (v30/*: any*/),
        "article.publishedAt": (v30/*: any*/),
        "article.relatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.relatedArticles.byline": (v30/*: any*/),
        "article.relatedArticles.href": (v30/*: any*/),
        "article.relatedArticles.id": (v31/*: any*/),
        "article.relatedArticles.internalID": (v31/*: any*/),
        "article.relatedArticles.thumbnailImage": (v32/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped": (v33/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped.src": (v34/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped.srcSet": (v34/*: any*/),
        "article.relatedArticles.title": (v30/*: any*/),
        "article.sections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSections"
        },
        "article.sections.__isArticleSections": (v34/*: any*/),
        "article.sections.__typename": (v34/*: any*/),
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
        "article.sections.body": (v30/*: any*/),
        "article.sections.counts": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageSetCounts"
        },
        "article.sections.counts.figures": (v36/*: any*/),
        "article.sections.cover": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSectionImageSetFigure"
        },
        "article.sections.cover.__isNode": (v34/*: any*/),
        "article.sections.cover.__typename": (v34/*: any*/),
        "article.sections.cover.formattedMetadata": (v30/*: any*/),
        "article.sections.cover.id": (v31/*: any*/),
        "article.sections.cover.image": (v32/*: any*/),
        "article.sections.cover.image.large": (v35/*: any*/),
        "article.sections.cover.image.large.height": (v37/*: any*/),
        "article.sections.cover.image.large.src": (v34/*: any*/),
        "article.sections.cover.image.large.srcSet": (v34/*: any*/),
        "article.sections.cover.image.large.width": (v37/*: any*/),
        "article.sections.cover.image.small": (v33/*: any*/),
        "article.sections.cover.image.small.height": (v36/*: any*/),
        "article.sections.cover.image.small.src": (v34/*: any*/),
        "article.sections.cover.image.small.srcSet": (v34/*: any*/),
        "article.sections.cover.image.small.width": (v36/*: any*/),
        "article.sections.embed": (v30/*: any*/),
        "article.sections.fallbackEmbed": (v30/*: any*/),
        "article.sections.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSectionImageCollectionFigure"
        },
        "article.sections.figures.__isArticleSectionImageCollectionFigure": (v34/*: any*/),
        "article.sections.figures.__isNode": (v34/*: any*/),
        "article.sections.figures.__typename": (v34/*: any*/),
        "article.sections.figures.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "article.sections.figures.artist.id": (v31/*: any*/),
        "article.sections.figures.artist.name": (v30/*: any*/),
        "article.sections.figures.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "article.sections.figures.artist.targetSupply.isP1": (v38/*: any*/),
        "article.sections.figures.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "article.sections.figures.artists.href": (v30/*: any*/),
        "article.sections.figures.artists.id": (v31/*: any*/),
        "article.sections.figures.artists.name": (v30/*: any*/),
        "article.sections.figures.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "article.sections.figures.attributionClass.id": (v31/*: any*/),
        "article.sections.figures.attributionClass.name": (v30/*: any*/),
        "article.sections.figures.caption": (v30/*: any*/),
        "article.sections.figures.collecting_institution": (v30/*: any*/),
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
        "article.sections.figures.collectorSignals.auction.bidCount": (v36/*: any*/),
        "article.sections.figures.collectorSignals.auction.liveBiddingStarted": (v39/*: any*/),
        "article.sections.figures.collectorSignals.auction.lotClosesAt": (v30/*: any*/),
        "article.sections.figures.collectorSignals.auction.onlineBiddingExtended": (v39/*: any*/),
        "article.sections.figures.collectorSignals.auction.registrationEndsAt": (v30/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "article.sections.figures.collectorSignals.partnerOffer.endAt": (v30/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.id": (v31/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "article.sections.figures.collectorSignals.partnerOffer.priceWithDiscount.display": (v30/*: any*/),
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
        "article.sections.figures.cultural_maker": (v30/*: any*/),
        "article.sections.figures.date": (v30/*: any*/),
        "article.sections.figures.formattedMetadata": (v30/*: any*/),
        "article.sections.figures.href": (v30/*: any*/),
        "article.sections.figures.id": (v31/*: any*/),
        "article.sections.figures.image": (v32/*: any*/),
        "article.sections.figures.image.height": (v37/*: any*/),
        "article.sections.figures.image.url": (v30/*: any*/),
        "article.sections.figures.image.width": (v37/*: any*/),
        "article.sections.figures.internalID": (v31/*: any*/),
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
        "article.sections.figures.mediumType.filterGene.id": (v31/*: any*/),
        "article.sections.figures.mediumType.filterGene.name": (v30/*: any*/),
        "article.sections.figures.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "article.sections.figures.partner.href": (v30/*: any*/),
        "article.sections.figures.partner.id": (v31/*: any*/),
        "article.sections.figures.partner.name": (v30/*: any*/),
        "article.sections.figures.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "article.sections.figures.sale.cascadingEndTimeIntervalMinutes": (v37/*: any*/),
        "article.sections.figures.sale.endAt": (v30/*: any*/),
        "article.sections.figures.sale.extendedBiddingIntervalMinutes": (v37/*: any*/),
        "article.sections.figures.sale.id": (v31/*: any*/),
        "article.sections.figures.sale.isOpen": (v38/*: any*/),
        "article.sections.figures.sale.is_auction": (v38/*: any*/),
        "article.sections.figures.sale.is_closed": (v38/*: any*/),
        "article.sections.figures.sale.startAt": (v30/*: any*/),
        "article.sections.figures.saleArtwork": (v40/*: any*/),
        "article.sections.figures.saleArtwork.id": (v31/*: any*/),
        "article.sections.figures.saleArtwork.lotID": (v30/*: any*/),
        "article.sections.figures.sale_artwork": (v40/*: any*/),
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
        "article.sections.figures.sale_artwork.endAt": (v30/*: any*/),
        "article.sections.figures.sale_artwork.extendedBiddingEndAt": (v30/*: any*/),
        "article.sections.figures.sale_artwork.formattedEndDateTime": (v30/*: any*/),
        "article.sections.figures.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "article.sections.figures.sale_artwork.highest_bid.display": (v30/*: any*/),
        "article.sections.figures.sale_artwork.id": (v31/*: any*/),
        "article.sections.figures.sale_artwork.lotID": (v30/*: any*/),
        "article.sections.figures.sale_artwork.lotLabel": (v30/*: any*/),
        "article.sections.figures.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "article.sections.figures.sale_artwork.opening_bid.display": (v30/*: any*/),
        "article.sections.figures.sale_message": (v30/*: any*/),
        "article.sections.figures.title": (v30/*: any*/),
        "article.sections.height": (v37/*: any*/),
        "article.sections.image": (v32/*: any*/),
        "article.sections.image.cropped": (v33/*: any*/),
        "article.sections.image.cropped.src": (v34/*: any*/),
        "article.sections.image.cropped.srcSet": (v34/*: any*/),
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
        "article.sections.mobileHeight": (v37/*: any*/),
        "article.sections.setLayout": {
          "enumValues": [
            "FULL",
            "MINI"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageSetLayout"
        },
        "article.sections.title": (v30/*: any*/),
        "article.sections.url": (v30/*: any*/),
        "article.seriesArticle": (v29/*: any*/),
        "article.seriesArticle.href": (v30/*: any*/),
        "article.seriesArticle.id": (v31/*: any*/),
        "article.seriesArticle.thumbnailTitle": (v30/*: any*/),
        "article.slug": (v30/*: any*/),
        "article.title": (v30/*: any*/),
        "article.vertical": (v30/*: any*/)
      }
    },
    "name": "ArticleBody_test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "aa04a3448b96c85f66845792eb69cea7";

export default node;
