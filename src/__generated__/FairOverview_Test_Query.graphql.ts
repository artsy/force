/**
 * @generated SignedSource<<34577caa32d85c1dac70f3b9515204e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairOverview_Test_Query$variables = {};
export type FairOverview_Test_Query$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairOverview_fair">;
  } | null;
};
export type FairOverview_Test_Query = {
  variables: FairOverview_Test_Query$variables;
  response: FairOverview_Test_Query$data;
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
  "name": "id",
  "storageKey": null
},
v6 = {
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
v7 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v11 = [
  (v8/*: any*/),
  (v5/*: any*/)
],
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FilterArtworksConnection"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "FilterArtworksEdge"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairOverview_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairOverview_fair"
          }
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairOverview_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 6
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "PUBLISHED_AT_DESC"
              }
            ],
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "vertical",
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "thumbnailTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "byline",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM D, YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "publishedAt",
                        "storageKey": "publishedAt(format:\"MMM D, YYYY\")"
                      },
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
                                "value": 334
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 445
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
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
                                "args": null,
                                "kind": "ScalarField",
                                "name": "src",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "srcSet",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "cropped(height:334,width:445)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:6,sort:\"PUBLISHED_AT_DESC\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 5
              }
            ],
            "concreteType": "MarketingCollection",
            "kind": "LinkedField",
            "name": "marketingCollections",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v4/*: any*/),
              (v1/*: any*/),
              {
                "alias": "artworks",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 3
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
                    "concreteType": "FilterArtworksCounts",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "total",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": "artworksConnection(first:3)"
              }
            ],
            "storageKey": "marketingCollections(size:5)"
          },
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": "followedArtistArtworks",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              },
              {
                "kind": "Literal",
                "name": "includeArtworksByFollowedArtists",
                "value": true
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
                    "alias": "artwork",
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
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
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "aspectRatio",
                            "storageKey": null
                          }
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
                      (v1/*: any*/),
                      (v2/*: any*/),
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
                        "args": (v7/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v5/*: any*/),
                          (v2/*: any*/),
                          (v8/*: any*/)
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
                        "args": (v7/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          (v2/*: any*/),
                          (v5/*: any*/)
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
                          (v9/*: any*/),
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
                          (v5/*: any*/),
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
                          (v9/*: any*/),
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
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AttributionClass",
                        "kind": "LinkedField",
                        "name": "attributionClass",
                        "plural": false,
                        "selections": (v11/*: any*/),
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
                            "selections": (v11/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
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
              (v5/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(first:20,includeArtworksByFollowedArtists:true)"
          },
          (v9/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "about",
            "storageKey": "about(format:\"HTML\")"
          },
          (v2/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "bd0a07d065e3994220a6ffc3780df583",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.about": (v12/*: any*/),
        "fair.articlesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "fair.articlesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArticleEdge"
        },
        "fair.articlesConnection.edges.__typename": (v13/*: any*/),
        "fair.articlesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "fair.articlesConnection.edges.node.byline": (v12/*: any*/),
        "fair.articlesConnection.edges.node.href": (v12/*: any*/),
        "fair.articlesConnection.edges.node.id": (v14/*: any*/),
        "fair.articlesConnection.edges.node.internalID": (v14/*: any*/),
        "fair.articlesConnection.edges.node.publishedAt": (v12/*: any*/),
        "fair.articlesConnection.edges.node.slug": (v12/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage": (v15/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "fair.articlesConnection.edges.node.thumbnailImage.cropped.height": (v16/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.cropped.src": (v13/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.cropped.srcSet": (v13/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailImage.cropped.width": (v16/*: any*/),
        "fair.articlesConnection.edges.node.thumbnailTitle": (v12/*: any*/),
        "fair.articlesConnection.edges.node.title": (v12/*: any*/),
        "fair.articlesConnection.edges.node.vertical": (v12/*: any*/),
        "fair.articlesConnection.totalCount": (v17/*: any*/),
        "fair.endAt": (v12/*: any*/),
        "fair.followedArtistArtworks": (v18/*: any*/),
        "fair.followedArtistArtworks.edges": (v19/*: any*/),
        "fair.followedArtistArtworks.edges.artwork": (v20/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "fair.followedArtistArtworks.edges.artwork.artists.href": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.artists.id": (v14/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.artists.name": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "fair.followedArtistArtworks.edges.artwork.attributionClass.id": (v14/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.attributionClass.name": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.collecting_institution": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.cultural_maker": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.date": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.href": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.id": (v14/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.image": (v15/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "fair.followedArtistArtworks.edges.artwork.image.url": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.imageTitle": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.internalID": (v14/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.is_biddable": (v21/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.is_saved": (v21/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "fair.followedArtistArtworks.edges.artwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "fair.followedArtistArtworks.edges.artwork.mediumType.filterGene.id": (v14/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.mediumType.filterGene.name": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "fair.followedArtistArtworks.edges.artwork.partner.href": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.partner.id": (v14/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.partner.name": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "fair.followedArtistArtworks.edges.artwork.sale.cascadingEndTimeIntervalMinutes": (v17/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale.display_timely_at": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale.endAt": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale.extendedBiddingIntervalMinutes": (v17/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale.id": (v14/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale.is_auction": (v21/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale.is_closed": (v21/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale.is_preview": (v21/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale.startAt": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.counts.bidder_positions": (v22/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.endAt": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.extendedBiddingEndAt": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.formattedEndDateTime": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.highest_bid.display": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.id": (v14/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.lotID": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.lotLabel": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "fair.followedArtistArtworks.edges.artwork.sale_artwork.opening_bid.display": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.sale_message": (v12/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.slug": (v14/*: any*/),
        "fair.followedArtistArtworks.edges.artwork.title": (v12/*: any*/),
        "fair.followedArtistArtworks.id": (v14/*: any*/),
        "fair.href": (v12/*: any*/),
        "fair.id": (v14/*: any*/),
        "fair.internalID": (v14/*: any*/),
        "fair.marketingCollections": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "MarketingCollection"
        },
        "fair.marketingCollections.artworks": (v18/*: any*/),
        "fair.marketingCollections.artworks.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "fair.marketingCollections.artworks.counts.total": (v22/*: any*/),
        "fair.marketingCollections.artworks.edges": (v19/*: any*/),
        "fair.marketingCollections.artworks.edges.node": (v20/*: any*/),
        "fair.marketingCollections.artworks.edges.node.id": (v14/*: any*/),
        "fair.marketingCollections.artworks.edges.node.image": (v15/*: any*/),
        "fair.marketingCollections.artworks.edges.node.image.url": (v12/*: any*/),
        "fair.marketingCollections.artworks.id": (v14/*: any*/),
        "fair.marketingCollections.id": (v14/*: any*/),
        "fair.marketingCollections.slug": (v13/*: any*/),
        "fair.marketingCollections.title": (v13/*: any*/),
        "fair.slug": (v14/*: any*/)
      }
    },
    "name": "FairOverview_Test_Query",
    "operationKind": "query",
    "text": "query FairOverview_Test_Query {\n  fair(id: \"example\") {\n    ...FairOverview_fair\n    id\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment FairAbout_fair on Fair {\n  ...FairTimer_fair\n  about(format: HTML)\n}\n\nfragment FairCollection_collection on MarketingCollection {\n  id\n  slug\n  title\n  artworks: artworksConnection(first: 3) {\n    counts {\n      total\n    }\n    edges {\n      node {\n        image {\n          url(version: \"larger\")\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment FairCollections_fair on Fair {\n  marketingCollections(size: 5) {\n    id\n    slug\n    ...FairCollection_collection\n  }\n}\n\nfragment FairEditorialRailArticles_fair on Fair {\n  articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {\n    edges {\n      node {\n        ...CellArticle_article\n        internalID\n        slug\n        id\n      }\n    }\n  }\n}\n\nfragment FairEditorial_fair on Fair {\n  ...FairEditorialRailArticles_fair\n}\n\nfragment FairFollowedArtists_fair on Fair {\n  internalID\n  slug\n  followedArtistArtworks: filterArtworksConnection(includeArtworksByFollowedArtists: true, first: 20) {\n    edges {\n      artwork: node {\n        internalID\n        slug\n        ...FillwidthItem_artwork\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment FairOverview_fair on Fair {\n  ...FairEditorial_fair\n  ...FairCollections_fair\n  ...FairFollowedArtists_fair\n  ...FairAbout_fair\n  href\n  slug\n  articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      __typename\n    }\n  }\n  marketingCollections(size: 5) {\n    id\n  }\n}\n\nfragment FairTimer_fair on Fair {\n  endAt\n}\n\nfragment FillwidthItem_artwork on Artwork {\n  image {\n    url(version: \"larger\")\n    aspectRatio\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n"
  }
};
})();

(node as any).hash = "a11835f350b7546e1a799b79ff87ad34";

export default node;
