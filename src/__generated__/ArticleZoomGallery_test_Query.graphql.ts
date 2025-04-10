/**
 * @generated SignedSource<<b476d09969fcb45aa27a7d34a5f1681b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleZoomGallery_test_Query$variables = Record<PropertyKey, never>;
export type ArticleZoomGallery_test_Query$data = {
  readonly article: {
    readonly " $fragmentSpreads": FragmentRefs<"ArticleZoomGallery_article">;
  } | null | undefined;
};
export type ArticleZoomGallery_test_Query = {
  response: ArticleZoomGallery_test_Query$data;
  variables: ArticleZoomGallery_test_Query$variables;
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
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "formattedMetadata",
  "storageKey": null
},
v3 = {
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
            "main",
            "normalized",
            "larger",
            "large"
          ]
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"main\",\"normalized\",\"larger\",\"large\"])"
    }
  ],
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
  "name": "href",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
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
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
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
        (v8/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "priceWithDiscount",
          "plural": false,
          "selections": (v9/*: any*/),
          "storageKey": null
        },
        (v10/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v13 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v14 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v15 = {
  "alias": null,
  "args": (v14/*: any*/),
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
    (v10/*: any*/)
  ],
  "storageKey": "artist(shallow:true)"
},
v16 = {
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
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": (v14/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artists",
  "plural": true,
  "selections": [
    (v10/*: any*/),
    (v5/*: any*/),
    (v17/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v19 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": (v14/*: any*/),
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    (v17/*: any*/),
    (v5/*: any*/),
    (v10/*: any*/)
  ],
  "storageKey": "partner(shallow:true)"
},
v21 = {
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
    (v10/*: any*/),
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
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v23 = {
  "alias": "sale_artwork",
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v22/*: any*/),
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
    (v10/*: any*/)
  ],
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v22/*: any*/),
    (v10/*: any*/)
  ],
  "storageKey": null
},
v25 = [
  (v17/*: any*/),
  (v10/*: any*/)
],
v26 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": (v25/*: any*/),
  "storageKey": null
},
v27 = {
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
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "caption",
  "storageKey": null
},
v29 = [
  (v17/*: any*/)
],
v30 = {
  "alias": null,
  "args": null,
  "concreteType": "ArticleUnpublishedArtworkArtist",
  "kind": "LinkedField",
  "name": "artist",
  "plural": false,
  "selections": (v29/*: any*/),
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "concreteType": "ArticleUnpublishedArtworkPartner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": (v29/*: any*/),
  "storageKey": null
},
v32 = [
  (v10/*: any*/)
],
v33 = {
  "kind": "InlineFragment",
  "selections": (v32/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v34 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v35 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v36 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v37 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v38 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
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
  "type": "SaleArtwork"
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
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v15/*: any*/),
                          (v16/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v21/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          (v26/*: any*/),
                          (v27/*: any*/),
                          (v10/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
                          (v28/*: any*/),
                          (v10/*: any*/)
                        ],
                        "type": "ArticleImageSection",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v30/*: any*/),
                          (v31/*: any*/),
                          (v10/*: any*/)
                        ],
                        "type": "ArticleUnpublishedArtwork",
                        "abstractKey": null
                      },
                      (v33/*: any*/)
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
                  (v6/*: any*/),
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
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              (v4/*: any*/),
                              (v5/*: any*/),
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v11/*: any*/),
                              (v12/*: any*/),
                              (v13/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v18/*: any*/),
                              (v19/*: any*/),
                              (v20/*: any*/),
                              (v21/*: any*/),
                              (v23/*: any*/),
                              (v24/*: any*/),
                              (v26/*: any*/),
                              (v27/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v28/*: any*/)
                            ],
                            "type": "ArticleImageSection",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v30/*: any*/),
                              (v31/*: any*/)
                            ],
                            "type": "ArticleUnpublishedArtwork",
                            "abstractKey": null
                          }
                        ],
                        "type": "ArticleSectionImageCollectionFigure",
                        "abstractKey": "__isArticleSectionImageCollectionFigure"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v32/*: any*/),
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v32/*: any*/),
                        "type": "ArticleImageSection",
                        "abstractKey": null
                      },
                      (v33/*: any*/)
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
          (v10/*: any*/)
        ],
        "storageKey": "article(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "cdf94c6a96c28d961b5ff832f87788a5",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "article.id": (v34/*: any*/),
        "article.sections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSections"
        },
        "article.sections.__typename": (v35/*: any*/),
        "article.sections.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSectionImageCollectionFigure"
        },
        "article.sections.figures.__isArticleSectionImageCollectionFigure": (v35/*: any*/),
        "article.sections.figures.__isNode": (v35/*: any*/),
        "article.sections.figures.__typename": (v35/*: any*/),
        "article.sections.figures.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "article.sections.figures.artist.id": (v34/*: any*/),
        "article.sections.figures.artist.name": (v36/*: any*/),
        "article.sections.figures.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "article.sections.figures.artist.targetSupply.isP1": (v37/*: any*/),
        "article.sections.figures.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "article.sections.figures.artists.href": (v36/*: any*/),
        "article.sections.figures.artists.id": (v34/*: any*/),
        "article.sections.figures.artists.name": (v36/*: any*/),
        "article.sections.figures.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "article.sections.figures.attributionClass.id": (v34/*: any*/),
        "article.sections.figures.attributionClass.name": (v36/*: any*/),
        "article.sections.figures.caption": (v36/*: any*/),
        "article.sections.figures.collecting_institution": (v36/*: any*/),
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
        "article.sections.figures.collectorSignals.auction.bidCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "article.sections.figures.collectorSignals.auction.liveBiddingStarted": (v38/*: any*/),
        "article.sections.figures.collectorSignals.auction.lotClosesAt": (v36/*: any*/),
        "article.sections.figures.collectorSignals.auction.onlineBiddingExtended": (v38/*: any*/),
        "article.sections.figures.collectorSignals.auction.registrationEndsAt": (v36/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "article.sections.figures.collectorSignals.partnerOffer.endAt": (v36/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.id": (v34/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "article.sections.figures.collectorSignals.partnerOffer.priceWithDiscount.display": (v36/*: any*/),
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
        "article.sections.figures.cultural_maker": (v36/*: any*/),
        "article.sections.figures.date": (v36/*: any*/),
        "article.sections.figures.formattedMetadata": (v36/*: any*/),
        "article.sections.figures.href": (v36/*: any*/),
        "article.sections.figures.id": (v34/*: any*/),
        "article.sections.figures.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "article.sections.figures.image.height": (v39/*: any*/),
        "article.sections.figures.image.url": (v36/*: any*/),
        "article.sections.figures.image.width": (v39/*: any*/),
        "article.sections.figures.internalID": (v34/*: any*/),
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
        "article.sections.figures.mediumType.filterGene.id": (v34/*: any*/),
        "article.sections.figures.mediumType.filterGene.name": (v36/*: any*/),
        "article.sections.figures.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "article.sections.figures.partner.href": (v36/*: any*/),
        "article.sections.figures.partner.id": (v34/*: any*/),
        "article.sections.figures.partner.name": (v36/*: any*/),
        "article.sections.figures.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "article.sections.figures.sale.cascadingEndTimeIntervalMinutes": (v39/*: any*/),
        "article.sections.figures.sale.endAt": (v36/*: any*/),
        "article.sections.figures.sale.extendedBiddingIntervalMinutes": (v39/*: any*/),
        "article.sections.figures.sale.id": (v34/*: any*/),
        "article.sections.figures.sale.isOpen": (v37/*: any*/),
        "article.sections.figures.sale.is_auction": (v37/*: any*/),
        "article.sections.figures.sale.is_closed": (v37/*: any*/),
        "article.sections.figures.sale.startAt": (v36/*: any*/),
        "article.sections.figures.saleArtwork": (v40/*: any*/),
        "article.sections.figures.saleArtwork.id": (v34/*: any*/),
        "article.sections.figures.saleArtwork.lotID": (v36/*: any*/),
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
        "article.sections.figures.sale_artwork.endAt": (v36/*: any*/),
        "article.sections.figures.sale_artwork.extendedBiddingEndAt": (v36/*: any*/),
        "article.sections.figures.sale_artwork.formattedEndDateTime": (v36/*: any*/),
        "article.sections.figures.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "article.sections.figures.sale_artwork.highest_bid.display": (v36/*: any*/),
        "article.sections.figures.sale_artwork.id": (v34/*: any*/),
        "article.sections.figures.sale_artwork.lotID": (v36/*: any*/),
        "article.sections.figures.sale_artwork.lotLabel": (v36/*: any*/),
        "article.sections.figures.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "article.sections.figures.sale_artwork.opening_bid.display": (v36/*: any*/),
        "article.sections.figures.sale_message": (v36/*: any*/),
        "article.sections.figures.title": (v36/*: any*/),
        "article.sections.title": (v36/*: any*/)
      }
    },
    "name": "ArticleZoomGallery_test_Query",
    "operationKind": "query",
    "text": "query ArticleZoomGallery_test_Query {\n  article(id: \"example\") {\n    ...ArticleZoomGallery_article\n    id\n  }\n}\n\nfragment ArticleZoomGalleryCaption_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  __typename\n  ... on Artwork {\n    ...Metadata_artwork\n    href\n  }\n  ... on ArticleImageSection {\n    caption\n  }\n  ... on ArticleUnpublishedArtwork {\n    title\n    date\n    artist {\n      name\n    }\n    partner {\n      name\n    }\n  }\n}\n\nfragment ArticleZoomGalleryFigure_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  __typename\n  ... on Artwork {\n    formattedMetadata\n    image {\n      width\n      height\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n    }\n  }\n  ... on ArticleImageSection {\n    image {\n      width\n      height\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n    }\n  }\n  ... on ArticleUnpublishedArtwork {\n    image {\n      width\n      height\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n    }\n  }\n}\n\nfragment ArticleZoomGallery_article on Article {\n  sections {\n    __typename\n    ... on ArticleSectionImageCollection {\n      figures {\n        ...ArticleZoomGalleryFigure_figure\n        ...ArticleZoomGalleryCaption_figure\n        __typename\n        ... on Artwork {\n          id\n        }\n        ... on ArticleImageSection {\n          id\n        }\n        ... on ArticleUnpublishedArtwork {\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n    ... on ArticleSectionImageSet {\n      title\n      figures {\n        ...ArticleZoomGalleryFigure_figure\n        ...ArticleZoomGalleryCaption_figure\n        __typename\n        ... on Artwork {\n          id\n        }\n        ... on ArticleImageSection {\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2523033682aa7a3ad5d0fe7ec81db7f1";

export default node;
