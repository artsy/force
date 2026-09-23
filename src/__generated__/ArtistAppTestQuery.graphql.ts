/**
 * @generated SignedSource<<f7d0b218e5f376b1ccda5b8ebc6e9215>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAppTestQuery$variables = {
  saleEndYear?: number | null | undefined;
  saleStartYear?: number | null | undefined;
};
export type ArtistAppTestQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistApp_artist">;
  } | null | undefined;
};
export type ArtistAppTestQuery = {
  response: ArtistAppTestQuery$data;
  variables: ArtistAppTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "saleEndYear"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "saleStartYear"
},
v2 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "name": "text",
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
  "name": "width",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
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
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v14 = [
  (v4/*: any*/),
  (v10/*: any*/)
],
v15 = [
  (v7/*: any*/)
],
v16 = {
  "kind": "Literal",
  "name": "size",
  "value": 3
},
v17 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v18 = [
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
],
v19 = {
  "kind": "Literal",
  "name": "minValue",
  "value": 50
},
v20 = [
  (v11/*: any*/),
  (v4/*: any*/),
  (v3/*: any*/),
  (v10/*: any*/)
],
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistBlurb"
},
v29 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "Gene"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistApp_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ArtistAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "alternateNames",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "awards",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "birthday",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "deathday",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "gender",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hometown",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "nationality",
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": "biographyBlurbPlain",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "PLAIN"
              }
            ],
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              (v6/*: any*/)
            ],
            "storageKey": "biographyBlurb(format:\"PLAIN\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "coverArtwork",
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
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 900
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": [
                          "larger",
                          "large"
                        ]
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 1200
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": "cropped(height:900,version:[\"larger\",\"large\"],width:1200)"
                  },
                  {
                    "alias": "large",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "large"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"large\")"
                  },
                  {
                    "alias": "src",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": [
                          "larger",
                          "larger"
                        ]
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:[\"larger\",\"larger\"])"
                  },
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/),
              (v3/*: any*/),
              (v5/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "imageTitle",
                "storageKey": null
              },
              {
                "alias": "fallbackArtist",
                "args": null,
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "artist",
                "plural": false,
                "selections": (v14/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "VerifiedRepresentative",
            "kind": "LinkedField",
            "name": "verifiedRepresentatives",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partner",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "profile",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "icon",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "src1x",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 30
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 30
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v15/*: any*/),
                            "storageKey": "cropped(height:30,width:30)"
                          },
                          {
                            "alias": "src2x",
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
                            "selections": (v15/*: any*/),
                            "storageKey": "cropped(height:60,width:60)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v16/*: any*/)
            ],
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "notableArtworks",
            "plural": true,
            "selections": [
              (v12/*: any*/),
              (v5/*: any*/),
              (v13/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": "notableArtworks(size:3)"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 10
              }
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v14/*: any*/),
            "storageKey": "genes(size:10)"
          },
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "instagramHandle",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedNationalityAndBirthday",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "follows",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v17/*: any*/),
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "credit",
                "storageKey": null
              }
            ],
            "storageKey": "biographyBlurb(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "kind",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "entities",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v17/*: any*/),
                "kind": "ScalarField",
                "name": "description",
                "storageKey": "description(format:\"HTML\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "label",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 3
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
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
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
                      (v11/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "byline",
                        "storageKey": null
                      },
                      (v12/*: any*/),
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
                            "alias": "small",
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
                            "selections": (v18/*: any*/),
                            "storageKey": "cropped(height:100,width:100)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:3,sort:\"PUBLISHED_AT_DESC\")"
          },
          {
            "alias": "recentAuctionResultsConnection",
            "args": [
              {
                "kind": "Literal",
                "name": "allowUnspecifiedSaleDates",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "includeUnknownPrices",
                "value": false
              },
              {
                "kind": "Variable",
                "name": "saleEndYear",
                "variableName": "saleEndYear"
              },
              {
                "kind": "Variable",
                "name": "saleStartYear",
                "variableName": "saleStartYear"
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "DATE_DESC"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v10/*: any*/),
                      (v3/*: any*/),
                      (v12/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "dateText",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleDate",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionLotImages",
                        "kind": "LinkedField",
                        "name": "images",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "thumbnail",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 130
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 130
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": (v18/*: any*/),
                                "storageKey": "resized(height:130,width:130)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "display",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "centsUSD",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionLotPerformance",
                        "kind": "LinkedField",
                        "name": "performance",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "mid",
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": "movementGenes",
            "args": [
              {
                "kind": "Literal",
                "name": "geneFamilyID",
                "value": "styles-and-movements"
              },
              (v19/*: any*/),
              (v16/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v20/*: any*/),
            "storageKey": "genes(geneFamilyID:\"styles-and-movements\",minValue:50,size:3)"
          },
          {
            "alias": "mediumGenes",
            "args": [
              {
                "kind": "Literal",
                "name": "geneFamilyID",
                "value": "medium-and-techniques"
              },
              (v19/*: any*/),
              (v16/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v20/*: any*/),
            "storageKey": "genes(geneFamilyID:\"medium-and-techniques\",minValue:50,size:3)"
          },
          (v10/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "7a9290cd3a62b8f64927afc569af9848",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": (v21/*: any*/),
        "artist.alternateNames": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artist.articlesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArticleConnection"
        },
        "artist.articlesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArticleEdge"
        },
        "artist.articlesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "artist.articlesConnection.edges.node.byline": (v22/*: any*/),
        "artist.articlesConnection.edges.node.href": (v22/*: any*/),
        "artist.articlesConnection.edges.node.id": (v23/*: any*/),
        "artist.articlesConnection.edges.node.internalID": (v23/*: any*/),
        "artist.articlesConnection.edges.node.publishedAt": (v22/*: any*/),
        "artist.articlesConnection.edges.node.slug": (v22/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage": (v24/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small": (v25/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small.src": (v26/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small.srcSet": (v26/*: any*/),
        "artist.articlesConnection.edges.node.title": (v22/*: any*/),
        "artist.articlesConnection.totalCount": (v27/*: any*/),
        "artist.awards": (v22/*: any*/),
        "artist.biographyBlurb": (v28/*: any*/),
        "artist.biographyBlurb.credit": (v22/*: any*/),
        "artist.biographyBlurb.text": (v22/*: any*/),
        "artist.biographyBlurbPlain": (v28/*: any*/),
        "artist.biographyBlurbPlain.text": (v22/*: any*/),
        "artist.birthday": (v22/*: any*/),
        "artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "artist.counts.follows": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artist.coverArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artist.coverArtwork.date": (v22/*: any*/),
        "artist.coverArtwork.fallbackArtist": (v21/*: any*/),
        "artist.coverArtwork.fallbackArtist.id": (v23/*: any*/),
        "artist.coverArtwork.fallbackArtist.name": (v22/*: any*/),
        "artist.coverArtwork.href": (v22/*: any*/),
        "artist.coverArtwork.id": (v23/*: any*/),
        "artist.coverArtwork.image": (v24/*: any*/),
        "artist.coverArtwork.image.cropped": (v25/*: any*/),
        "artist.coverArtwork.image.cropped.height": (v29/*: any*/),
        "artist.coverArtwork.image.cropped.src": (v26/*: any*/),
        "artist.coverArtwork.image.cropped.width": (v29/*: any*/),
        "artist.coverArtwork.image.height": (v27/*: any*/),
        "artist.coverArtwork.image.large": (v22/*: any*/),
        "artist.coverArtwork.image.src": (v22/*: any*/),
        "artist.coverArtwork.image.width": (v27/*: any*/),
        "artist.coverArtwork.imageTitle": (v22/*: any*/),
        "artist.coverArtwork.internalID": (v23/*: any*/),
        "artist.coverArtwork.slug": (v23/*: any*/),
        "artist.coverArtwork.title": (v22/*: any*/),
        "artist.deathday": (v22/*: any*/),
        "artist.formattedNationalityAndBirthday": (v22/*: any*/),
        "artist.gender": (v22/*: any*/),
        "artist.genes": (v30/*: any*/),
        "artist.genes.id": (v23/*: any*/),
        "artist.genes.name": (v22/*: any*/),
        "artist.hometown": (v22/*: any*/),
        "artist.href": (v22/*: any*/),
        "artist.id": (v23/*: any*/),
        "artist.insights": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistInsight"
        },
        "artist.insights.description": (v22/*: any*/),
        "artist.insights.entities": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "artist.insights.kind": {
          "enumValues": [
            "ACTIVE_SECONDARY_MARKET",
            "ARTSY_VANGUARD_YEAR",
            "AWARDS",
            "BIENNIAL",
            "COLLECTED",
            "CRITICALLY_ACCLAIMED",
            "CURATORS_PICK_EMERGING",
            "FOUNDATIONS",
            "GAINING_FOLLOWERS",
            "GROUP_SHOW",
            "HIGH_AUCTION_RECORD",
            "PRIVATE_COLLECTIONS",
            "RECENT_CAREER_EVENT",
            "RESIDENCIES",
            "REVIEWED",
            "SOLO_SHOW",
            "TRENDING_NOW"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArtistInsightKind"
        },
        "artist.insights.label": (v26/*: any*/),
        "artist.instagramHandle": (v22/*: any*/),
        "artist.internalID": (v23/*: any*/),
        "artist.mediumGenes": (v30/*: any*/),
        "artist.mediumGenes.id": (v23/*: any*/),
        "artist.mediumGenes.internalID": (v23/*: any*/),
        "artist.mediumGenes.name": (v22/*: any*/),
        "artist.mediumGenes.slug": (v23/*: any*/),
        "artist.movementGenes": (v30/*: any*/),
        "artist.movementGenes.id": (v23/*: any*/),
        "artist.movementGenes.internalID": (v23/*: any*/),
        "artist.movementGenes.name": (v22/*: any*/),
        "artist.movementGenes.slug": (v23/*: any*/),
        "artist.name": (v22/*: any*/),
        "artist.nationality": (v22/*: any*/),
        "artist.notableArtworks": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Artwork"
        },
        "artist.notableArtworks.date": (v22/*: any*/),
        "artist.notableArtworks.href": (v22/*: any*/),
        "artist.notableArtworks.id": (v23/*: any*/),
        "artist.notableArtworks.title": (v22/*: any*/),
        "artist.recentAuctionResultsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultConnection"
        },
        "artist.recentAuctionResultsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AuctionResultEdge"
        },
        "artist.recentAuctionResultsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResult"
        },
        "artist.recentAuctionResultsConnection.edges.node.dateText": (v22/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.id": (v23/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.images": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionLotImages"
        },
        "artist.recentAuctionResultsConnection.edges.node.images.thumbnail": (v24/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.images.thumbnail.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artist.recentAuctionResultsConnection.edges.node.images.thumbnail.resized.src": (v26/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.images.thumbnail.resized.srcSet": (v26/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.internalID": (v23/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.performance": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionLotPerformance"
        },
        "artist.recentAuctionResultsConnection.edges.node.performance.mid": (v22/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.priceRealized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultPriceRealized"
        },
        "artist.recentAuctionResultsConnection.edges.node.priceRealized.centsUSD": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artist.recentAuctionResultsConnection.edges.node.priceRealized.display": (v22/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.saleDate": (v22/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.slug": (v22/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.title": (v22/*: any*/),
        "artist.slug": (v23/*: any*/),
        "artist.verifiedRepresentatives": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "VerifiedRepresentative"
        },
        "artist.verifiedRepresentatives.id": (v23/*: any*/),
        "artist.verifiedRepresentatives.partner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Partner"
        },
        "artist.verifiedRepresentatives.partner.href": (v22/*: any*/),
        "artist.verifiedRepresentatives.partner.id": (v23/*: any*/),
        "artist.verifiedRepresentatives.partner.internalID": (v23/*: any*/),
        "artist.verifiedRepresentatives.partner.name": (v22/*: any*/),
        "artist.verifiedRepresentatives.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artist.verifiedRepresentatives.partner.profile.icon": (v24/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src1x": (v25/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src1x.src": (v26/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src2x": (v25/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src2x.src": (v26/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.id": (v23/*: any*/)
      }
    },
    "name": "ArtistAppTestQuery",
    "operationKind": "query",
    "text": "query ArtistAppTestQuery(\n  $saleStartYear: Int\n  $saleEndYear: Int\n) {\n  artist(id: \"example\") {\n    ...ArtistApp_artist\n    id\n  }\n}\n\nfragment ArtistApp_artist on Artist {\n  ...ArtistMeta_artist\n  ...ArtistHeader_artist\n  internalID\n  name\n}\n\nfragment ArtistCareerHighlight_insight on ArtistInsight {\n  kind\n  label\n  entities\n  description(format: HTML)\n}\n\nfragment ArtistGenesRow_genes on Gene {\n  internalID\n  name\n  slug\n}\n\nfragment ArtistHeaderEditorialItem_article on Article {\n  internalID\n  slug\n  href\n  byline\n  title\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    small: cropped(width: 100, height: 100) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistHeaderEditorial_artist on Artist {\n  internalID\n  slug\n  name\n  href\n  articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      node {\n        ...ArtistHeaderEditorialItem_article\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistHeaderImage_artwork on Artwork {\n  imageTitle\n  image {\n    src: url(version: [\"larger\", \"larger\"])\n    width\n    height\n  }\n  fallbackArtist: artist {\n    name\n    id\n  }\n}\n\nfragment ArtistHeaderRecentAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  slug\n  title\n  dateText\n  saleDate\n  images {\n    thumbnail {\n      resized(width: 130, height: 130) {\n        src\n        srcSet\n      }\n    }\n  }\n  priceRealized {\n    display\n    centsUSD\n  }\n  performance {\n    mid\n  }\n}\n\nfragment ArtistHeaderRecentAuctionResults_artist on Artist {\n  internalID\n  slug\n  href\n  recentAuctionResultsConnection: auctionResultsConnection(first: 10, sort: DATE_DESC, saleStartYear: $saleStartYear, saleEndYear: $saleEndYear, includeUnknownPrices: false, allowUnspecifiedSaleDates: false) {\n    edges {\n      node {\n        internalID\n        ...ArtistHeaderRecentAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistHeader_artist on Artist {\n  internalID\n  slug\n  name\n  instagramHandle\n  formattedNationalityAndBirthday\n  counts {\n    follows\n  }\n  biographyBlurb(format: HTML) {\n    text\n    credit\n  }\n  insights {\n    kind\n    entities\n    description(format: HTML)\n    ...ArtistCareerHighlight_insight\n  }\n  articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {\n    totalCount\n  }\n  recentAuctionResultsConnection: auctionResultsConnection(first: 10, sort: DATE_DESC, saleStartYear: $saleStartYear, saleEndYear: $saleEndYear, includeUnknownPrices: false, allowUnspecifiedSaleDates: false) {\n    edges {\n      node {\n        internalID\n        id\n      }\n    }\n  }\n  ...ArtistHeaderRecentAuctionResults_artist\n  ...ArtistHeaderEditorial_artist\n  ...ArtistStylesAndTechniques_artist\n  verifiedRepresentatives {\n    partner {\n      internalID\n      name\n      href\n      profile {\n        icon {\n          src1x: cropped(width: 30, height: 30) {\n            src\n          }\n          src2x: cropped(width: 60, height: 60) {\n            src\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n  coverArtwork {\n    internalID\n    slug\n    href\n    title\n    date\n    image {\n      src: url(version: [\"larger\", \"larger\"])\n      width\n      height\n    }\n    ...ArtistHeaderImage_artwork\n    id\n  }\n}\n\nfragment ArtistMeta_artist on Artist {\n  ...ArtistStructuredData_artist\n  name\n  nationality\n  birthday\n  deathday\n  alternateNames\n  biographyBlurbPlain: biographyBlurb(format: PLAIN) {\n    text\n  }\n  coverArtwork {\n    image {\n      large: url(version: \"large\")\n    }\n    id\n  }\n}\n\nfragment ArtistStructuredData_artist on Artist {\n  slug\n  name\n  alternateNames\n  awards\n  birthday\n  deathday\n  gender\n  hometown\n  nationality\n  href\n  biographyBlurbPlain: biographyBlurb(format: PLAIN) {\n    text\n  }\n  coverArtwork {\n    image {\n      cropped(width: 1200, height: 900, version: [\"larger\", \"large\"]) {\n        src\n        width\n        height\n      }\n    }\n    id\n  }\n  verifiedRepresentatives {\n    partner {\n      name\n      href\n      id\n    }\n    id\n  }\n  notableArtworks(size: 3) {\n    title\n    href\n    date\n    id\n  }\n  genes(size: 10) {\n    name\n    id\n  }\n}\n\nfragment ArtistStylesAndTechniques_artist on Artist {\n  movementGenes: genes(geneFamilyID: \"styles-and-movements\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n  mediumGenes: genes(geneFamilyID: \"medium-and-techniques\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1256b33a8c50faa24e32a1ee6e4be8d0";

export default node;
