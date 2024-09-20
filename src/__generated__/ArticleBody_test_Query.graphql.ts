/**
 * @generated SignedSource<<d9f0462610593dd3a60e9520de7f382e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
v22 = {
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lotWatcherCount",
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
v23 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v24 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v25 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v26 = {
  "alias": null,
  "args": (v25/*: any*/),
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
v27 = {
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
v28 = {
  "alias": null,
  "args": (v25/*: any*/),
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
v29 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": (v25/*: any*/),
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
v31 = {
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
    (v13/*: any*/)
  ],
  "storageKey": null
},
v32 = {
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
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v36 = {
  "alias": "preview",
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
          "name": "version",
          "value": "square"
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:\"square\")"
    }
  ],
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInAuction",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSavedToList",
  "storageKey": null
},
v39 = [
  (v12/*: any*/),
  (v13/*: any*/)
],
v40 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": (v39/*: any*/),
  "storageKey": null
},
v41 = {
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
      "selections": (v39/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v42 = [
  (v12/*: any*/)
],
v43 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v44 = [
  (v8/*: any*/),
  (v9/*: any*/),
  (v16/*: any*/),
  (v15/*: any*/)
],
v45 = {
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
      "selections": (v44/*: any*/),
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
      "selections": (v44/*: any*/),
      "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:1220)"
    }
  ],
  "storageKey": null
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Article"
},
v47 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v48 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v51 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
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
  "type": "Artist"
},
v54 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ArtistTargetSupply"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AttributionClass"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CollectorSignals"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionCollectorSignals"
},
v60 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v61 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v62 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerOfferToCollector"
},
v63 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v64 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v65 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkPriceInsights"
},
v66 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v67 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkMedium"
},
v68 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Gene"
},
v69 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v70 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v71 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v72 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v73 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v74 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v75 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkOpeningBid"
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
                          (v22/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          (v26/*: any*/),
                          (v27/*: any*/),
                          (v28/*: any*/),
                          (v29/*: any*/),
                          (v30/*: any*/),
                          (v31/*: any*/),
                          (v32/*: any*/),
                          (v33/*: any*/),
                          (v34/*: any*/),
                          (v35/*: any*/),
                          (v36/*: any*/),
                          (v37/*: any*/),
                          (v38/*: any*/),
                          (v40/*: any*/),
                          (v41/*: any*/)
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
                            "selections": (v42/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArticleUnpublishedArtworkPartner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": (v42/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "type": "ArticleUnpublishedArtwork",
                        "abstractKey": null
                      },
                      (v43/*: any*/)
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
                          (v45/*: any*/)
                        ],
                        "type": "ArticleImageSection",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v18/*: any*/),
                          (v13/*: any*/),
                          (v45/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v43/*: any*/)
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
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v33/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MarketingCollection",
                    "kind": "LinkedField",
                    "name": "collection",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 20
                          }
                        ],
                        "concreteType": "FilterArtworksConnection",
                        "kind": "LinkedField",
                        "name": "artworksConnection",
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
                                  (v11/*: any*/),
                                  (v33/*: any*/),
                                  (v2/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isUnlisted",
                                    "storageKey": null
                                  },
                                  (v1/*: any*/),
                                  (v19/*: any*/),
                                  (v22/*: any*/),
                                  (v23/*: any*/),
                                  (v24/*: any*/),
                                  (v26/*: any*/),
                                  (v27/*: any*/),
                                  (v28/*: any*/),
                                  (v29/*: any*/),
                                  (v30/*: any*/),
                                  (v31/*: any*/),
                                  (v32/*: any*/),
                                  (v13/*: any*/),
                                  (v34/*: any*/),
                                  (v35/*: any*/),
                                  (v36/*: any*/),
                                  (v37/*: any*/),
                                  (v38/*: any*/),
                                  (v40/*: any*/),
                                  (v41/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": "src",
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": [
                                              "larger",
                                              "large"
                                            ]
                                          }
                                        ],
                                        "kind": "ScalarField",
                                        "name": "url",
                                        "storageKey": "url(version:[\"larger\",\"large\"])"
                                      },
                                      (v15/*: any*/),
                                      (v16/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "blurhashDataURL",
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
                          (v13/*: any*/)
                        ],
                        "storageKey": "artworksConnection(first:20)"
                      },
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ArticleSectionCollection",
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
          (v33/*: any*/),
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
    "cacheID": "cf89d272c4ee541b4c2459387a17906c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": (v46/*: any*/),
        "article.authors": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Author"
        },
        "article.authors.bio": (v47/*: any*/),
        "article.authors.id": (v48/*: any*/),
        "article.authors.image": (v49/*: any*/),
        "article.authors.image.cropped": (v50/*: any*/),
        "article.authors.image.cropped.src": (v51/*: any*/),
        "article.authors.image.cropped.srcSet": (v51/*: any*/),
        "article.authors.initials": (v47/*: any*/),
        "article.authors.internalID": (v48/*: any*/),
        "article.authors.name": (v47/*: any*/),
        "article.byline": (v47/*: any*/),
        "article.hero": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleHero"
        },
        "article.hero.__typename": (v51/*: any*/),
        "article.hero.embed": (v47/*: any*/),
        "article.hero.image": (v49/*: any*/),
        "article.hero.image.split": (v52/*: any*/),
        "article.hero.image.split.src": (v51/*: any*/),
        "article.hero.image.split.srcSet": (v51/*: any*/),
        "article.hero.image.text": (v50/*: any*/),
        "article.hero.image.text.src": (v51/*: any*/),
        "article.hero.image.text.srcSet": (v51/*: any*/),
        "article.hero.image.url": (v47/*: any*/),
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
        "article.hero.media": (v47/*: any*/),
        "article.href": (v47/*: any*/),
        "article.id": (v48/*: any*/),
        "article.internalID": (v48/*: any*/),
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
        "article.leadParagraph": (v47/*: any*/),
        "article.newsSource": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleNewsSource"
        },
        "article.newsSource.title": (v47/*: any*/),
        "article.newsSource.url": (v47/*: any*/),
        "article.postscript": (v47/*: any*/),
        "article.publishedAt": (v47/*: any*/),
        "article.relatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.relatedArticles.byline": (v47/*: any*/),
        "article.relatedArticles.href": (v47/*: any*/),
        "article.relatedArticles.id": (v48/*: any*/),
        "article.relatedArticles.internalID": (v48/*: any*/),
        "article.relatedArticles.thumbnailImage": (v49/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped": (v50/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped.src": (v51/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped.srcSet": (v51/*: any*/),
        "article.relatedArticles.title": (v47/*: any*/),
        "article.sections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSections"
        },
        "article.sections.__isArticleSections": (v51/*: any*/),
        "article.sections.__typename": (v51/*: any*/),
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
        "article.sections.body": (v47/*: any*/),
        "article.sections.collection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MarketingCollection"
        },
        "article.sections.collection.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "article.sections.collection.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FilterArtworksEdge"
        },
        "article.sections.collection.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "article.sections.collection.artworksConnection.edges.node.artist": (v53/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.artist.id": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.artist.targetSupply": (v54/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.artist.targetSupply.isP1": (v55/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.artistNames": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.artists": (v56/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.artists.href": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.artists.id": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.artists.name": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.attributionClass": (v57/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.attributionClass.id": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.attributionClass.name": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collecting_institution": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals": (v58/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.auction": (v59/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.auction.bidCount": (v60/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.auction.liveBiddingStarted": (v61/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.auction.lotClosesAt": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.auction.lotWatcherCount": (v60/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.auction.onlineBiddingExtended": (v61/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.auction.registrationEndsAt": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.partnerOffer": (v62/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.partnerOffer.endAt": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.partnerOffer.id": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": (v63/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.cultural_maker": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.date": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.href": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.id": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.image": (v49/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.image.blurhashDataURL": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.image.height": (v64/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.image.src": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.image.width": (v64/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.internalID": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.isInAuction": (v55/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.isSaved": (v55/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.isSavedToList": (v61/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.isUnlisted": (v61/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.marketPriceInsights": (v65/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.marketPriceInsights.demandRank": (v66/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.mediumType": (v67/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.mediumType.filterGene": (v68/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.mediumType.filterGene.id": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.mediumType.filterGene.name": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.partner": (v69/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.partner.href": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.partner.id": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.partner.name": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.preview": (v49/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.preview.url": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale": (v70/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v64/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale.endAt": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v64/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale.id": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale.is_auction": (v55/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale.is_closed": (v55/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale.startAt": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork": (v71/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.counts": (v72/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v73/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.endAt": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.highest_bid": (v74/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.id": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.lotID": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.lotLabel": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.opening_bid": (v75/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.sale_message": (v47/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.slug": (v48/*: any*/),
        "article.sections.collection.artworksConnection.edges.node.title": (v47/*: any*/),
        "article.sections.collection.artworksConnection.id": (v48/*: any*/),
        "article.sections.collection.id": (v48/*: any*/),
        "article.sections.collection.title": (v51/*: any*/),
        "article.sections.counts": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageSetCounts"
        },
        "article.sections.counts.figures": (v60/*: any*/),
        "article.sections.cover": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSectionImageSetFigure"
        },
        "article.sections.cover.__isNode": (v51/*: any*/),
        "article.sections.cover.__typename": (v51/*: any*/),
        "article.sections.cover.formattedMetadata": (v47/*: any*/),
        "article.sections.cover.id": (v48/*: any*/),
        "article.sections.cover.image": (v49/*: any*/),
        "article.sections.cover.image.large": (v52/*: any*/),
        "article.sections.cover.image.large.height": (v64/*: any*/),
        "article.sections.cover.image.large.src": (v51/*: any*/),
        "article.sections.cover.image.large.srcSet": (v51/*: any*/),
        "article.sections.cover.image.large.width": (v64/*: any*/),
        "article.sections.cover.image.small": (v50/*: any*/),
        "article.sections.cover.image.small.height": (v60/*: any*/),
        "article.sections.cover.image.small.src": (v51/*: any*/),
        "article.sections.cover.image.small.srcSet": (v51/*: any*/),
        "article.sections.cover.image.small.width": (v60/*: any*/),
        "article.sections.embed": (v47/*: any*/),
        "article.sections.fallbackEmbed": (v47/*: any*/),
        "article.sections.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSectionImageCollectionFigure"
        },
        "article.sections.figures.__isArticleSectionImageCollectionFigure": (v51/*: any*/),
        "article.sections.figures.__isNode": (v51/*: any*/),
        "article.sections.figures.__typename": (v51/*: any*/),
        "article.sections.figures.artist": (v53/*: any*/),
        "article.sections.figures.artist.id": (v48/*: any*/),
        "article.sections.figures.artist.name": (v47/*: any*/),
        "article.sections.figures.artist.targetSupply": (v54/*: any*/),
        "article.sections.figures.artist.targetSupply.isP1": (v55/*: any*/),
        "article.sections.figures.artistNames": (v47/*: any*/),
        "article.sections.figures.artists": (v56/*: any*/),
        "article.sections.figures.artists.href": (v47/*: any*/),
        "article.sections.figures.artists.id": (v48/*: any*/),
        "article.sections.figures.artists.name": (v47/*: any*/),
        "article.sections.figures.attributionClass": (v57/*: any*/),
        "article.sections.figures.attributionClass.id": (v48/*: any*/),
        "article.sections.figures.attributionClass.name": (v47/*: any*/),
        "article.sections.figures.caption": (v47/*: any*/),
        "article.sections.figures.collecting_institution": (v47/*: any*/),
        "article.sections.figures.collectorSignals": (v58/*: any*/),
        "article.sections.figures.collectorSignals.auction": (v59/*: any*/),
        "article.sections.figures.collectorSignals.auction.bidCount": (v60/*: any*/),
        "article.sections.figures.collectorSignals.auction.liveBiddingStarted": (v61/*: any*/),
        "article.sections.figures.collectorSignals.auction.lotClosesAt": (v47/*: any*/),
        "article.sections.figures.collectorSignals.auction.lotWatcherCount": (v60/*: any*/),
        "article.sections.figures.collectorSignals.auction.onlineBiddingExtended": (v61/*: any*/),
        "article.sections.figures.collectorSignals.auction.registrationEndsAt": (v47/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer": (v62/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.endAt": (v47/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.id": (v48/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.priceWithDiscount": (v63/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.priceWithDiscount.display": (v47/*: any*/),
        "article.sections.figures.cultural_maker": (v47/*: any*/),
        "article.sections.figures.date": (v47/*: any*/),
        "article.sections.figures.formattedMetadata": (v47/*: any*/),
        "article.sections.figures.href": (v47/*: any*/),
        "article.sections.figures.id": (v48/*: any*/),
        "article.sections.figures.image": (v49/*: any*/),
        "article.sections.figures.image.height": (v64/*: any*/),
        "article.sections.figures.image.url": (v47/*: any*/),
        "article.sections.figures.image.width": (v64/*: any*/),
        "article.sections.figures.internalID": (v48/*: any*/),
        "article.sections.figures.isInAuction": (v55/*: any*/),
        "article.sections.figures.isSaved": (v55/*: any*/),
        "article.sections.figures.isSavedToList": (v61/*: any*/),
        "article.sections.figures.marketPriceInsights": (v65/*: any*/),
        "article.sections.figures.marketPriceInsights.demandRank": (v66/*: any*/),
        "article.sections.figures.mediumType": (v67/*: any*/),
        "article.sections.figures.mediumType.filterGene": (v68/*: any*/),
        "article.sections.figures.mediumType.filterGene.id": (v48/*: any*/),
        "article.sections.figures.mediumType.filterGene.name": (v47/*: any*/),
        "article.sections.figures.partner": (v69/*: any*/),
        "article.sections.figures.partner.href": (v47/*: any*/),
        "article.sections.figures.partner.id": (v48/*: any*/),
        "article.sections.figures.partner.name": (v47/*: any*/),
        "article.sections.figures.preview": (v49/*: any*/),
        "article.sections.figures.preview.url": (v47/*: any*/),
        "article.sections.figures.sale": (v70/*: any*/),
        "article.sections.figures.sale.cascadingEndTimeIntervalMinutes": (v64/*: any*/),
        "article.sections.figures.sale.endAt": (v47/*: any*/),
        "article.sections.figures.sale.extendedBiddingIntervalMinutes": (v64/*: any*/),
        "article.sections.figures.sale.id": (v48/*: any*/),
        "article.sections.figures.sale.is_auction": (v55/*: any*/),
        "article.sections.figures.sale.is_closed": (v55/*: any*/),
        "article.sections.figures.sale.startAt": (v47/*: any*/),
        "article.sections.figures.sale_artwork": (v71/*: any*/),
        "article.sections.figures.sale_artwork.counts": (v72/*: any*/),
        "article.sections.figures.sale_artwork.counts.bidder_positions": (v73/*: any*/),
        "article.sections.figures.sale_artwork.endAt": (v47/*: any*/),
        "article.sections.figures.sale_artwork.extendedBiddingEndAt": (v47/*: any*/),
        "article.sections.figures.sale_artwork.formattedEndDateTime": (v47/*: any*/),
        "article.sections.figures.sale_artwork.highest_bid": (v74/*: any*/),
        "article.sections.figures.sale_artwork.highest_bid.display": (v47/*: any*/),
        "article.sections.figures.sale_artwork.id": (v48/*: any*/),
        "article.sections.figures.sale_artwork.lotID": (v47/*: any*/),
        "article.sections.figures.sale_artwork.lotLabel": (v47/*: any*/),
        "article.sections.figures.sale_artwork.opening_bid": (v75/*: any*/),
        "article.sections.figures.sale_artwork.opening_bid.display": (v47/*: any*/),
        "article.sections.figures.sale_message": (v47/*: any*/),
        "article.sections.figures.slug": (v48/*: any*/),
        "article.sections.figures.title": (v47/*: any*/),
        "article.sections.height": (v64/*: any*/),
        "article.sections.image": (v49/*: any*/),
        "article.sections.image.cropped": (v50/*: any*/),
        "article.sections.image.cropped.src": (v51/*: any*/),
        "article.sections.image.cropped.srcSet": (v51/*: any*/),
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
        "article.sections.mobileHeight": (v64/*: any*/),
        "article.sections.setLayout": {
          "enumValues": [
            "FULL",
            "MINI"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageSetLayout"
        },
        "article.sections.slug": (v47/*: any*/),
        "article.sections.title": (v47/*: any*/),
        "article.sections.url": (v47/*: any*/),
        "article.seriesArticle": (v46/*: any*/),
        "article.seriesArticle.href": (v47/*: any*/),
        "article.seriesArticle.id": (v48/*: any*/),
        "article.seriesArticle.thumbnailTitle": (v47/*: any*/),
        "article.slug": (v47/*: any*/),
        "article.title": (v47/*: any*/),
        "article.vertical": (v47/*: any*/)
      }
    },
    "name": "ArticleBody_test_Query",
    "operationKind": "query",
    "text": "query ArticleBody_test_Query {\n  article(id: \"example\") {\n    ...ArticleBody_article\n    id\n  }\n}\n\nfragment ArticleBody_article on Article {\n  ...ArticleHero_article\n  ...ArticleByline_article\n  ...ArticleSectionAd_article\n  ...ArticleNewsSource_article\n  hero {\n    __typename\n  }\n  seriesArticle {\n    thumbnailTitle\n    href\n    id\n  }\n  vertical\n  byline\n  internalID\n  slug\n  layout\n  leadParagraph\n  title\n  href\n  publishedAt\n  sections {\n    __typename\n    ...ArticleSection_section\n  }\n  postscript\n  relatedArticles {\n    internalID\n    title\n    href\n    byline\n    thumbnailImage {\n      cropped(width: 100, height: 100) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ArticleByline_article on Article {\n  byline\n  authors {\n    internalID\n    name\n    initials\n    bio\n    image {\n      cropped(width: 60, height: 60) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ArticleHero_article on Article {\n  title\n  href\n  vertical\n  byline\n  hero {\n    __typename\n    ... on ArticleFeatureSection {\n      layout\n      embed\n      media\n      image {\n        url\n        split: resized(width: 900) {\n          src\n          srcSet\n        }\n        text: cropped(width: 1600, height: 900) {\n          src\n          srcSet\n        }\n      }\n    }\n  }\n}\n\nfragment ArticleNewsSource_article on Article {\n  newsSource {\n    title\n    url\n  }\n}\n\nfragment ArticleSectionAd_article on Article {\n  layout\n  sections {\n    __typename\n  }\n}\n\nfragment ArticleSectionEmbed_section on ArticleSectionEmbed {\n  url\n  height\n  mobileHeight\n  _layout: layout\n}\n\nfragment ArticleSectionImageCollectionCaption_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  __typename\n  ...Metadata_artwork\n  ... on ArticleImageSection {\n    caption\n  }\n  ... on ArticleUnpublishedArtwork {\n    title\n    date\n    artist {\n      name\n    }\n    partner {\n      name\n    }\n  }\n}\n\nfragment ArticleSectionImageCollectionImage_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  ... on ArticleImageSection {\n    id\n    image {\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n  ... on Artwork {\n    id\n    formattedMetadata\n    image {\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n  ... on ArticleUnpublishedArtwork {\n    id\n    image {\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n}\n\nfragment ArticleSectionImageCollection_section on ArticleSectionImageCollection {\n  layout\n  figures {\n    __typename\n    ...ArticleSectionImageCollectionImage_figure\n    ...ArticleSectionImageCollectionCaption_figure\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ArticleImageSection {\n      id\n    }\n    ... on ArticleUnpublishedArtwork {\n      id\n    }\n  }\n}\n\nfragment ArticleSectionImageSet_section on ArticleSectionImageSet {\n  setLayout: layout\n  title\n  counts {\n    figures\n  }\n  cover {\n    __typename\n    ... on ArticleImageSection {\n      id\n      image {\n        small: cropped(width: 80, height: 80, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n        large: resized(width: 1220, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n      }\n    }\n    ... on Artwork {\n      formattedMetadata\n      id\n      image {\n        small: cropped(width: 80, height: 80, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n        large: resized(width: 1220, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ArticleSectionMarketingCollection_section on ArticleSectionCollection {\n  slug\n  collection {\n    title\n    artworksConnection(first: 20) {\n      edges {\n        node {\n          internalID\n          slug\n          href\n          ...ShelfArtwork_artwork\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment ArticleSectionSocialEmbed_section on ArticleSectionSocialEmbed {\n  url\n  embed\n}\n\nfragment ArticleSectionText_section on ArticleSectionText {\n  body\n}\n\nfragment ArticleSectionVideo_section on ArticleSectionVideo {\n  embed(autoPlay: true)\n  fallbackEmbed: embed(autoPlay: false)\n  image {\n    cropped(width: 910, height: 512) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArticleSection_section on ArticleSections {\n  __isArticleSections: __typename\n  __typename\n  ...ArticleSectionText_section\n  ...ArticleSectionImageCollection_section\n  ...ArticleSectionImageSet_section\n  ...ArticleSectionVideo_section\n  ...ArticleSectionSocialEmbed_section\n  ...ArticleSectionEmbed_section\n  ...ArticleSectionMarketingCollection_section\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork_1ZRKfT on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...BidTimerLine_artwork\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork_1ZRKfT\n  internalID\n  href\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isInAuction\n  isSavedToList\n  collectorSignals {\n    auction {\n      lotWatcherCount\n      lotClosesAt\n      liveBiddingStarted\n    }\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n  collectorSignals {\n    auction {\n      lotWatcherCount\n      lotClosesAt\n    }\n  }\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n    blurhashDataURL\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa04a3448b96c85f66845792eb69cea7";

export default node;
