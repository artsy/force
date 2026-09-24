/**
 * @generated SignedSource<<fe3bae9e1195a8e1d49ead9dd7b3974c>>
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
v15 = [
  (v6/*: any*/)
],
v16 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v19 = {
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
        (v16/*: any*/)
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"main\",\"normalized\",\"larger\",\"large\"])"
    },
    (v17/*: any*/),
    (v18/*: any*/)
  ],
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "formattedMetadata",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v23 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v24 = {
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
        (v22/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "priceWithDiscount",
          "plural": false,
          "selections": (v23/*: any*/),
          "storageKey": null
        },
        (v6/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v25 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v26 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v27 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v28 = {
  "alias": null,
  "args": (v27/*: any*/),
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
v29 = {
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
v30 = {
  "alias": null,
  "args": (v27/*: any*/),
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
v31 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": (v27/*: any*/),
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
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cascadingEndTimeIntervalMinutes",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingIntervalMinutes",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v36 = {
  "alias": "is_auction",
  "args": null,
  "kind": "ScalarField",
  "name": "isAuction",
  "storageKey": null
},
v37 = {
  "alias": "is_closed",
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOpen",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v41 = {
  "alias": "sale_artwork",
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v39/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lotLabel",
      "storageKey": null
    },
    (v22/*: any*/),
    (v40/*: any*/),
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
      "selections": (v23/*: any*/),
      "storageKey": null
    },
    {
      "alias": "opening_bid",
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v23/*: any*/),
      "storageKey": null
    },
    (v6/*: any*/)
  ],
  "storageKey": null
},
v42 = [
  (v5/*: any*/),
  (v6/*: any*/)
],
v43 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": (v42/*: any*/),
  "storageKey": null
},
v44 = {
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
      "selections": (v42/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v45 = [
  (v5/*: any*/)
],
v46 = {
  "kind": "InlineFragment",
  "selections": (v15/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v47 = [
  (v7/*: any*/),
  (v8/*: any*/),
  (v18/*: any*/),
  (v17/*: any*/)
],
v48 = {
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
        (v16/*: any*/),
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
      "selections": (v47/*: any*/),
      "storageKey": "cropped(height:80,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:80)"
    },
    {
      "alias": "large",
      "args": [
        (v16/*: any*/),
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
      "selections": (v47/*: any*/),
      "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:1220)"
    }
  ],
  "storageKey": null
},
v49 = [
  {
    "kind": "Literal",
    "name": "autoPlay",
    "value": true
  }
],
v50 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v51 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Article"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v53 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v56 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v60 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ArtistTargetSupply"
},
v61 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v62 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v63 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AttributionClass"
},
v64 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CollectorSignals"
},
v65 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionCollectorSignals"
},
v66 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v67 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v68 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerOfferToCollector"
},
v69 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v70 = {
  "enumValues": [
    "CURATORS_PICK",
    "INCREASED_INTEREST",
    "PARTNER_OFFER"
  ],
  "nullable": true,
  "plural": false,
  "type": "LabelSignalEnum"
},
v71 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v72 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkPriceInsights"
},
v73 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v74 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkMedium"
},
v75 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Gene"
},
v76 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v77 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v78 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v79 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v80 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v81 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v82 = {
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
              },
              {
                "kind": "InlineFragment",
                "selections": (v15/*: any*/),
                "type": "ArticleImageSection",
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
                          (v19/*: any*/),
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
                          (v20/*: any*/),
                          (v19/*: any*/),
                          (v3/*: any*/),
                          (v2/*: any*/),
                          (v1/*: any*/),
                          (v21/*: any*/),
                          (v24/*: any*/),
                          (v25/*: any*/),
                          (v26/*: any*/),
                          (v28/*: any*/),
                          (v29/*: any*/),
                          (v30/*: any*/),
                          (v31/*: any*/),
                          (v32/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Sale",
                            "kind": "LinkedField",
                            "name": "sale",
                            "plural": false,
                            "selections": [
                              (v22/*: any*/),
                              (v33/*: any*/),
                              (v34/*: any*/),
                              (v35/*: any*/),
                              (v36/*: any*/),
                              (v37/*: any*/),
                              (v6/*: any*/),
                              (v38/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v41/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SaleArtwork",
                            "kind": "LinkedField",
                            "name": "saleArtwork",
                            "plural": false,
                            "selections": [
                              (v39/*: any*/),
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v43/*: any*/),
                          (v44/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v6/*: any*/),
                          (v19/*: any*/),
                          (v1/*: any*/),
                          (v21/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArticleUnpublishedArtworkArtist",
                            "kind": "LinkedField",
                            "name": "artist",
                            "plural": false,
                            "selections": (v45/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArticleUnpublishedArtworkPartner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": (v45/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "type": "ArticleUnpublishedArtwork",
                        "abstractKey": null
                      },
                      (v46/*: any*/)
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
                          (v48/*: any*/)
                        ],
                        "type": "ArticleImageSection",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v20/*: any*/),
                          (v6/*: any*/),
                          (v48/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v46/*: any*/)
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
                    "args": (v49/*: any*/),
                    "kind": "ScalarField",
                    "name": "embed",
                    "storageKey": "embed(autoPlay:true)"
                  },
                  {
                    "alias": "fallbackEmbed",
                    "args": (v49/*: any*/),
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
                  (v18/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "columns",
                    "storageKey": null
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
                        "alias": "artworkEdges",
                        "args": null,
                        "concreteType": "ArtworkEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          (v11/*: any*/)
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
                              (v11/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v6/*: any*/),
                                  (v4/*: any*/),
                                  (v2/*: any*/),
                                  (v3/*: any*/),
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "includeAll",
                                        "value": false
                                      }
                                    ],
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "aspectRatio",
                                        "storageKey": null
                                      },
                                      (v3/*: any*/),
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
                                          (v50/*: any*/)
                                        ],
                                        "kind": "ScalarField",
                                        "name": "url",
                                        "storageKey": "url(version:[\"larger\",\"large\"])"
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "versions",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": [
                                          (v50/*: any*/),
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
                                          (v7/*: any*/),
                                          (v8/*: any*/),
                                          (v17/*: any*/),
                                          (v18/*: any*/)
                                        ],
                                        "storageKey": "resized(version:[\"larger\",\"large\"],width:445)"
                                      }
                                    ],
                                    "storageKey": "image(includeAll:false)"
                                  },
                                  (v1/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "imageTitle",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "artistNames",
                                    "storageKey": null
                                  },
                                  (v21/*: any*/),
                                  (v24/*: any*/),
                                  (v25/*: any*/),
                                  (v26/*: any*/),
                                  (v28/*: any*/),
                                  (v29/*: any*/),
                                  (v30/*: any*/),
                                  (v31/*: any*/),
                                  (v32/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Sale",
                                    "kind": "LinkedField",
                                    "name": "sale",
                                    "plural": false,
                                    "selections": [
                                      (v22/*: any*/),
                                      (v33/*: any*/),
                                      (v34/*: any*/),
                                      (v35/*: any*/),
                                      (v36/*: any*/),
                                      (v37/*: any*/),
                                      (v6/*: any*/),
                                      (v38/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "extendedBiddingPeriodMinutes",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v41/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "SaleArtwork",
                                    "kind": "LinkedField",
                                    "name": "saleArtwork",
                                    "plural": false,
                                    "selections": [
                                      (v39/*: any*/),
                                      (v6/*: any*/),
                                      (v22/*: any*/),
                                      (v40/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v43/*: any*/),
                                  (v44/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isUnlisted",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": "image_title",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "imageTitle",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v46/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "ArtworkConnectionInterface",
                        "abstractKey": "__isArtworkConnectionInterface"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ArticleSectionArtworkGrid",
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
            "kind": "ScalarField",
            "name": "publishedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArticleOutlineEntry",
            "kind": "LinkedField",
            "name": "outline",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "heading",
                "storageKey": null
              },
              (v4/*: any*/),
              (v6/*: any*/)
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
    "cacheID": "11d59e6adb6e39483d932e3249b65d6c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "article": (v51/*: any*/),
        "article.authors": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Author"
        },
        "article.authors.bio": (v52/*: any*/),
        "article.authors.id": (v53/*: any*/),
        "article.authors.image": (v54/*: any*/),
        "article.authors.image.cropped": (v55/*: any*/),
        "article.authors.image.cropped.src": (v56/*: any*/),
        "article.authors.image.cropped.srcSet": (v56/*: any*/),
        "article.authors.initials": (v52/*: any*/),
        "article.authors.internalID": (v53/*: any*/),
        "article.authors.name": (v56/*: any*/),
        "article.authors.slug": (v57/*: any*/),
        "article.byline": (v52/*: any*/),
        "article.hero": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleHero"
        },
        "article.hero.__typename": (v56/*: any*/),
        "article.hero.embed": (v52/*: any*/),
        "article.hero.id": (v53/*: any*/),
        "article.hero.image": (v54/*: any*/),
        "article.hero.image.split": (v58/*: any*/),
        "article.hero.image.split.src": (v56/*: any*/),
        "article.hero.image.split.srcSet": (v56/*: any*/),
        "article.hero.image.text": (v55/*: any*/),
        "article.hero.image.text.src": (v56/*: any*/),
        "article.hero.image.text.srcSet": (v56/*: any*/),
        "article.hero.image.url": (v52/*: any*/),
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
        "article.hero.media": (v52/*: any*/),
        "article.href": (v52/*: any*/),
        "article.id": (v53/*: any*/),
        "article.internalID": (v53/*: any*/),
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
        "article.leadParagraph": (v52/*: any*/),
        "article.newsSource": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleNewsSource"
        },
        "article.newsSource.title": (v52/*: any*/),
        "article.newsSource.url": (v52/*: any*/),
        "article.outline": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleOutlineEntry"
        },
        "article.outline.heading": (v56/*: any*/),
        "article.outline.id": (v53/*: any*/),
        "article.outline.slug": (v56/*: any*/),
        "article.postscript": (v52/*: any*/),
        "article.publishedAt": (v52/*: any*/),
        "article.relatedArticles": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Article"
        },
        "article.relatedArticles.byline": (v52/*: any*/),
        "article.relatedArticles.href": (v52/*: any*/),
        "article.relatedArticles.id": (v53/*: any*/),
        "article.relatedArticles.internalID": (v53/*: any*/),
        "article.relatedArticles.thumbnailImage": (v54/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped": (v55/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped.src": (v56/*: any*/),
        "article.relatedArticles.thumbnailImage.cropped.srcSet": (v56/*: any*/),
        "article.relatedArticles.title": (v52/*: any*/),
        "article.sections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSections"
        },
        "article.sections.__isArticleSections": (v56/*: any*/),
        "article.sections.__typename": (v56/*: any*/),
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
        "article.sections.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "article.sections.artworksConnection.__isArtworkConnectionInterface": (v56/*: any*/),
        "article.sections.artworksConnection.artworkEdges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "article.sections.artworksConnection.artworkEdges.__typename": (v56/*: any*/),
        "article.sections.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "article.sections.artworksConnection.edges.__isNode": (v56/*: any*/),
        "article.sections.artworksConnection.edges.__typename": (v56/*: any*/),
        "article.sections.artworksConnection.edges.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "article.sections.artworksConnection.edges.node.artist": (v59/*: any*/),
        "article.sections.artworksConnection.edges.node.artist.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.artist.targetSupply": (v60/*: any*/),
        "article.sections.artworksConnection.edges.node.artist.targetSupply.isP1": (v61/*: any*/),
        "article.sections.artworksConnection.edges.node.artistNames": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.artists": (v62/*: any*/),
        "article.sections.artworksConnection.edges.node.artists.href": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.artists.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.artists.name": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.attributionClass": (v63/*: any*/),
        "article.sections.artworksConnection.edges.node.attributionClass.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.attributionClass.name": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.collecting_institution": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals": (v64/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.auction": (v65/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.auction.bidCount": (v66/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.auction.liveBiddingStarted": (v67/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.auction.lotClosesAt": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.auction.onlineBiddingExtended": (v67/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.auction.registrationEndsAt": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.partnerOffer": (v68/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.partnerOffer.endAt": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.partnerOffer.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": (v69/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.collectorSignals.primaryLabel": (v70/*: any*/),
        "article.sections.artworksConnection.edges.node.cultural_maker": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.date": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.href": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.image": (v54/*: any*/),
        "article.sections.artworksConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "article.sections.artworksConnection.edges.node.image.internalID": (v57/*: any*/),
        "article.sections.artworksConnection.edges.node.image.placeholder": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.image.resized": (v58/*: any*/),
        "article.sections.artworksConnection.edges.node.image.resized.height": (v71/*: any*/),
        "article.sections.artworksConnection.edges.node.image.resized.src": (v56/*: any*/),
        "article.sections.artworksConnection.edges.node.image.resized.srcSet": (v56/*: any*/),
        "article.sections.artworksConnection.edges.node.image.resized.width": (v71/*: any*/),
        "article.sections.artworksConnection.edges.node.image.url": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "article.sections.artworksConnection.edges.node.imageTitle": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.image_title": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.internalID": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.isUnlisted": (v67/*: any*/),
        "article.sections.artworksConnection.edges.node.marketPriceInsights": (v72/*: any*/),
        "article.sections.artworksConnection.edges.node.marketPriceInsights.demandRank": (v73/*: any*/),
        "article.sections.artworksConnection.edges.node.mediumType": (v74/*: any*/),
        "article.sections.artworksConnection.edges.node.mediumType.filterGene": (v75/*: any*/),
        "article.sections.artworksConnection.edges.node.mediumType.filterGene.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.mediumType.filterGene.name": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.partner": (v76/*: any*/),
        "article.sections.artworksConnection.edges.node.partner.href": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.partner.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.partner.name": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.sale": (v77/*: any*/),
        "article.sections.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v71/*: any*/),
        "article.sections.artworksConnection.edges.node.sale.endAt": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v71/*: any*/),
        "article.sections.artworksConnection.edges.node.sale.extendedBiddingPeriodMinutes": (v71/*: any*/),
        "article.sections.artworksConnection.edges.node.sale.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.sale.isOpen": (v61/*: any*/),
        "article.sections.artworksConnection.edges.node.sale.is_auction": (v61/*: any*/),
        "article.sections.artworksConnection.edges.node.sale.is_closed": (v61/*: any*/),
        "article.sections.artworksConnection.edges.node.sale.startAt": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.saleArtwork": (v78/*: any*/),
        "article.sections.artworksConnection.edges.node.saleArtwork.endAt": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.saleArtwork.extendedBiddingEndAt": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.saleArtwork.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.saleArtwork.lotID": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork": (v78/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.counts": (v79/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v80/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.endAt": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.highest_bid": (v81/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.id": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.lotID": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.lotLabel": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.opening_bid": (v82/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.sale_message": (v52/*: any*/),
        "article.sections.artworksConnection.edges.node.slug": (v53/*: any*/),
        "article.sections.artworksConnection.edges.node.title": (v52/*: any*/),
        "article.sections.body": (v52/*: any*/),
        "article.sections.columns": (v66/*: any*/),
        "article.sections.counts": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageSetCounts"
        },
        "article.sections.counts.figures": (v66/*: any*/),
        "article.sections.cover": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleSectionImageSetFigure"
        },
        "article.sections.cover.__isNode": (v56/*: any*/),
        "article.sections.cover.__typename": (v56/*: any*/),
        "article.sections.cover.formattedMetadata": (v52/*: any*/),
        "article.sections.cover.id": (v53/*: any*/),
        "article.sections.cover.image": (v54/*: any*/),
        "article.sections.cover.image.large": (v58/*: any*/),
        "article.sections.cover.image.large.height": (v71/*: any*/),
        "article.sections.cover.image.large.src": (v56/*: any*/),
        "article.sections.cover.image.large.srcSet": (v56/*: any*/),
        "article.sections.cover.image.large.width": (v71/*: any*/),
        "article.sections.cover.image.small": (v55/*: any*/),
        "article.sections.cover.image.small.height": (v66/*: any*/),
        "article.sections.cover.image.small.src": (v56/*: any*/),
        "article.sections.cover.image.small.srcSet": (v56/*: any*/),
        "article.sections.cover.image.small.width": (v66/*: any*/),
        "article.sections.embed": (v52/*: any*/),
        "article.sections.fallbackEmbed": (v52/*: any*/),
        "article.sections.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArticleSectionImageCollectionFigure"
        },
        "article.sections.figures.__isArticleSectionImageCollectionFigure": (v56/*: any*/),
        "article.sections.figures.__isNode": (v56/*: any*/),
        "article.sections.figures.__typename": (v56/*: any*/),
        "article.sections.figures.artist": (v59/*: any*/),
        "article.sections.figures.artist.id": (v53/*: any*/),
        "article.sections.figures.artist.name": (v52/*: any*/),
        "article.sections.figures.artist.targetSupply": (v60/*: any*/),
        "article.sections.figures.artist.targetSupply.isP1": (v61/*: any*/),
        "article.sections.figures.artists": (v62/*: any*/),
        "article.sections.figures.artists.href": (v52/*: any*/),
        "article.sections.figures.artists.id": (v53/*: any*/),
        "article.sections.figures.artists.name": (v52/*: any*/),
        "article.sections.figures.attributionClass": (v63/*: any*/),
        "article.sections.figures.attributionClass.id": (v53/*: any*/),
        "article.sections.figures.attributionClass.name": (v52/*: any*/),
        "article.sections.figures.caption": (v52/*: any*/),
        "article.sections.figures.collecting_institution": (v52/*: any*/),
        "article.sections.figures.collectorSignals": (v64/*: any*/),
        "article.sections.figures.collectorSignals.auction": (v65/*: any*/),
        "article.sections.figures.collectorSignals.auction.bidCount": (v66/*: any*/),
        "article.sections.figures.collectorSignals.auction.liveBiddingStarted": (v67/*: any*/),
        "article.sections.figures.collectorSignals.auction.lotClosesAt": (v52/*: any*/),
        "article.sections.figures.collectorSignals.auction.onlineBiddingExtended": (v67/*: any*/),
        "article.sections.figures.collectorSignals.auction.registrationEndsAt": (v52/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer": (v68/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.endAt": (v52/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.id": (v53/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.priceWithDiscount": (v69/*: any*/),
        "article.sections.figures.collectorSignals.partnerOffer.priceWithDiscount.display": (v52/*: any*/),
        "article.sections.figures.collectorSignals.primaryLabel": (v70/*: any*/),
        "article.sections.figures.cultural_maker": (v52/*: any*/),
        "article.sections.figures.date": (v52/*: any*/),
        "article.sections.figures.formattedMetadata": (v52/*: any*/),
        "article.sections.figures.href": (v52/*: any*/),
        "article.sections.figures.id": (v53/*: any*/),
        "article.sections.figures.image": (v54/*: any*/),
        "article.sections.figures.image.height": (v71/*: any*/),
        "article.sections.figures.image.url": (v52/*: any*/),
        "article.sections.figures.image.width": (v71/*: any*/),
        "article.sections.figures.internalID": (v53/*: any*/),
        "article.sections.figures.marketPriceInsights": (v72/*: any*/),
        "article.sections.figures.marketPriceInsights.demandRank": (v73/*: any*/),
        "article.sections.figures.mediumType": (v74/*: any*/),
        "article.sections.figures.mediumType.filterGene": (v75/*: any*/),
        "article.sections.figures.mediumType.filterGene.id": (v53/*: any*/),
        "article.sections.figures.mediumType.filterGene.name": (v52/*: any*/),
        "article.sections.figures.partner": (v76/*: any*/),
        "article.sections.figures.partner.href": (v52/*: any*/),
        "article.sections.figures.partner.id": (v53/*: any*/),
        "article.sections.figures.partner.name": (v52/*: any*/),
        "article.sections.figures.sale": (v77/*: any*/),
        "article.sections.figures.sale.cascadingEndTimeIntervalMinutes": (v71/*: any*/),
        "article.sections.figures.sale.endAt": (v52/*: any*/),
        "article.sections.figures.sale.extendedBiddingIntervalMinutes": (v71/*: any*/),
        "article.sections.figures.sale.id": (v53/*: any*/),
        "article.sections.figures.sale.isOpen": (v61/*: any*/),
        "article.sections.figures.sale.is_auction": (v61/*: any*/),
        "article.sections.figures.sale.is_closed": (v61/*: any*/),
        "article.sections.figures.sale.startAt": (v52/*: any*/),
        "article.sections.figures.saleArtwork": (v78/*: any*/),
        "article.sections.figures.saleArtwork.id": (v53/*: any*/),
        "article.sections.figures.saleArtwork.lotID": (v52/*: any*/),
        "article.sections.figures.sale_artwork": (v78/*: any*/),
        "article.sections.figures.sale_artwork.counts": (v79/*: any*/),
        "article.sections.figures.sale_artwork.counts.bidder_positions": (v80/*: any*/),
        "article.sections.figures.sale_artwork.endAt": (v52/*: any*/),
        "article.sections.figures.sale_artwork.extendedBiddingEndAt": (v52/*: any*/),
        "article.sections.figures.sale_artwork.formattedEndDateTime": (v52/*: any*/),
        "article.sections.figures.sale_artwork.highest_bid": (v81/*: any*/),
        "article.sections.figures.sale_artwork.highest_bid.display": (v52/*: any*/),
        "article.sections.figures.sale_artwork.id": (v53/*: any*/),
        "article.sections.figures.sale_artwork.lotID": (v52/*: any*/),
        "article.sections.figures.sale_artwork.lotLabel": (v52/*: any*/),
        "article.sections.figures.sale_artwork.opening_bid": (v82/*: any*/),
        "article.sections.figures.sale_artwork.opening_bid.display": (v52/*: any*/),
        "article.sections.figures.sale_message": (v52/*: any*/),
        "article.sections.figures.title": (v52/*: any*/),
        "article.sections.height": (v71/*: any*/),
        "article.sections.image": (v54/*: any*/),
        "article.sections.image.cropped": (v55/*: any*/),
        "article.sections.image.cropped.src": (v56/*: any*/),
        "article.sections.image.cropped.srcSet": (v56/*: any*/),
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
        "article.sections.mobileHeight": (v71/*: any*/),
        "article.sections.setLayout": {
          "enumValues": [
            "FULL",
            "MINI"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArticleSectionImageSetLayout"
        },
        "article.sections.title": (v52/*: any*/),
        "article.sections.url": (v52/*: any*/),
        "article.seriesArticle": (v51/*: any*/),
        "article.seriesArticle.href": (v52/*: any*/),
        "article.seriesArticle.id": (v53/*: any*/),
        "article.seriesArticle.thumbnailTitle": (v52/*: any*/),
        "article.slug": (v52/*: any*/),
        "article.title": (v52/*: any*/),
        "article.updatedAt": (v52/*: any*/),
        "article.vertical": (v52/*: any*/)
      }
    },
    "name": "ArticleBody_test_Query",
    "operationKind": "query",
    "text": "query ArticleBody_test_Query {\n  article(id: \"example\") {\n    ...ArticleBody_article\n    id\n  }\n}\n\nfragment ArticleBody_article on Article {\n  ...ArticleHero_article\n  ...ArticleByline_article\n  ...ArticleSectionAd_article\n  ...ArticleNewsSource_article\n  ...ArticleTimestamp_article\n  ...ArticleTableOfContents_article\n  hero {\n    __typename\n    ... on ArticleImageSection {\n      id\n    }\n  }\n  seriesArticle {\n    thumbnailTitle\n    href\n    id\n  }\n  vertical\n  authors {\n    internalID\n    slug\n    name\n    id\n  }\n  byline\n  internalID\n  slug\n  layout\n  leadParagraph\n  title\n  href\n  outline {\n    heading\n    slug\n    id\n  }\n  sections {\n    __typename\n    ...ArticleSection_section\n    ... on ArticleSectionText {\n      body\n    }\n  }\n  postscript\n  relatedArticles {\n    internalID\n    title\n    href\n    byline\n    thumbnailImage {\n      cropped(width: 100, height: 100) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ArticleByline_article on Article {\n  byline\n  authors {\n    internalID\n    slug\n    name\n    initials\n    bio\n    image {\n      cropped(width: 60, height: 60) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment ArticleHero_article on Article {\n  title\n  href\n  vertical\n  authors {\n    internalID\n    slug\n    name\n    id\n  }\n  byline\n  hero {\n    __typename\n    ... on ArticleFeatureSection {\n      layout\n      embed\n      media\n      image {\n        url\n        split: resized(width: 900) {\n          src\n          srcSet\n        }\n        text: cropped(width: 1600, height: 900) {\n          src\n          srcSet\n        }\n      }\n    }\n    ... on ArticleImageSection {\n      id\n    }\n  }\n}\n\nfragment ArticleNewsSource_article on Article {\n  newsSource {\n    title\n    url\n  }\n}\n\nfragment ArticleSectionAd_article on Article {\n  layout\n  sections {\n    __typename\n  }\n}\n\nfragment ArticleSectionArtworkGrid_section on ArticleSectionArtworkGrid {\n  columns\n  artworksConnection {\n    artworkEdges: edges {\n      __typename\n    }\n    ...ArtworkGrid_artworks\n  }\n}\n\nfragment ArticleSectionEmbed_section on ArticleSectionEmbed {\n  url\n  height\n  mobileHeight\n  _layout: layout\n}\n\nfragment ArticleSectionImageCollectionCaption_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  __typename\n  ...Metadata_artwork\n  ... on ArticleImageSection {\n    caption\n  }\n  ... on ArticleUnpublishedArtwork {\n    title\n    date\n    artist {\n      name\n    }\n    partner {\n      name\n    }\n  }\n}\n\nfragment ArticleSectionImageCollectionImage_figure on ArticleSectionImageCollectionFigure {\n  __isArticleSectionImageCollectionFigure: __typename\n  ... on ArticleImageSection {\n    id\n    image {\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n  ... on Artwork {\n    id\n    formattedMetadata\n    image {\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n  ... on ArticleUnpublishedArtwork {\n    id\n    image {\n      url(version: [\"main\", \"normalized\", \"larger\", \"large\"])\n      width\n      height\n    }\n  }\n}\n\nfragment ArticleSectionImageCollection_section on ArticleSectionImageCollection {\n  layout\n  figures {\n    __typename\n    ...ArticleSectionImageCollectionImage_figure\n    ...ArticleSectionImageCollectionCaption_figure\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on ArticleImageSection {\n      id\n    }\n    ... on ArticleUnpublishedArtwork {\n      id\n    }\n  }\n}\n\nfragment ArticleSectionImageSet_section on ArticleSectionImageSet {\n  setLayout: layout\n  title\n  counts {\n    figures\n  }\n  cover {\n    __typename\n    ... on ArticleImageSection {\n      id\n      image {\n        small: cropped(width: 80, height: 80, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n        large: resized(width: 1220, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n      }\n    }\n    ... on Artwork {\n      formattedMetadata\n      id\n      image {\n        small: cropped(width: 80, height: 80, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n        large: resized(width: 1220, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n          height\n          width\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ArticleSectionSocialEmbed_section on ArticleSectionSocialEmbed {\n  url\n  embed\n}\n\nfragment ArticleSectionText_section on ArticleSectionText {\n  body\n}\n\nfragment ArticleSectionVideo_section on ArticleSectionVideo {\n  embed(autoPlay: true)\n  fallbackEmbed: embed(autoPlay: true)\n  image {\n    cropped(width: 910, height: 512) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArticleSection_section on ArticleSections {\n  __isArticleSections: __typename\n  __typename\n  ...ArticleSectionText_section\n  ...ArticleSectionImageCollection_section\n  ...ArticleSectionImageSet_section\n  ...ArticleSectionVideo_section\n  ...ArticleSectionSocialEmbed_section\n  ...ArticleSectionEmbed_section\n  ...ArticleSectionArtworkGrid_section\n}\n\nfragment ArticleTableOfContents_article on Article {\n  slug\n  href\n  outline {\n    heading\n    slug\n    id\n  }\n}\n\nfragment ArticleTimestamp_article on Article {\n  publishedAt\n  updatedAt\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    isOpen\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  artistNames\n  href\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa04a3448b96c85f66845792eb69cea7";

export default node;
