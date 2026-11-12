/**
 * @generated SignedSource<<e74ca06365f5216e23c679f0ec446293>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAppTestQuery$variables = Record<PropertyKey, never>;
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
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "name": "text",
  "storageKey": null
},
v5 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v13 = [
  (v2/*: any*/),
  (v9/*: any*/)
],
v14 = [
  (v6/*: any*/)
],
v15 = {
  "kind": "Literal",
  "name": "size",
  "value": 3
},
v16 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "credit",
  "storageKey": null
},
v18 = [
  (v6/*: any*/),
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
  (v10/*: any*/),
  (v2/*: any*/),
  (v1/*: any*/),
  (v9/*: any*/)
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
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistBlurb"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "Gene"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "instagramHandle",
            "storageKey": null
          },
          (v3/*: any*/),
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
              (v4/*: any*/)
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
                      (v5/*: any*/),
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
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/)
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
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/),
              (v10/*: any*/),
              (v1/*: any*/),
              (v3/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
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
                "selections": (v13/*: any*/),
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
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
                            "selections": (v14/*: any*/),
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
                            "selections": (v14/*: any*/),
                            "storageKey": "cropped(height:60,width:60)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v15/*: any*/)
            ],
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "notableArtworks",
            "plural": true,
            "selections": [
              (v11/*: any*/),
              (v3/*: any*/),
              (v12/*: any*/),
              (v9/*: any*/)
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
            "selections": (v13/*: any*/),
            "storageKey": "genes(size:10)"
          },
          (v10/*: any*/),
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
            "args": (v16/*: any*/),
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v17/*: any*/)
            ],
            "storageKey": "biographyBlurb(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "excludeBlanks",
                "value": true
              }
            ],
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
                "args": (v16/*: any*/),
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
            "storageKey": "insights(excludeBlanks:true)"
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
                      (v10/*: any*/),
                      (v1/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "byline",
                        "storageKey": null
                      },
                      (v11/*: any*/),
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
                      (v9/*: any*/)
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
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              }
            ],
            "concreteType": "ArtistSeriesConnection",
            "kind": "LinkedField",
            "name": "artistSeriesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistSeriesEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistSeries",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "forSaleArtworksCount",
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
                                "value": 210
                              },
                              (v5/*: any*/),
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 280
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v18/*: any*/),
                            "storageKey": "cropped(height:210,version:[\"larger\",\"large\"],width:280)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "featured",
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artistSeriesConnection(first:10)"
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
              (v15/*: any*/)
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
              (v15/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v20/*: any*/),
            "storageKey": "genes(geneFamilyID:\"medium-and-techniques\",minValue:50,size:3)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "vanguardYear",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistStory",
            "kind": "LinkedField",
            "name": "featuredStory",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistStoryVideo",
                "kind": "LinkedField",
                "name": "headerVideo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Video",
                    "kind": "LinkedField",
                    "name": "video",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "playerUrl",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "aspectRatio",
                        "storageKey": null
                      },
                      (v11/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/),
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistStoryImage",
                "kind": "LinkedField",
                "name": "headerImage",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "altText",
                    "storageKey": null
                  },
                  (v17/*: any*/),
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
                            "name": "version",
                            "value": [
                              "main",
                              "normalized",
                              "larger",
                              "large"
                            ]
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 1600
                          }
                        ],
                        "concreteType": "ResizedImageUrl",
                        "kind": "LinkedField",
                        "name": "resized",
                        "plural": false,
                        "selections": (v18/*: any*/),
                        "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:1600)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistStoryQuote",
                "kind": "LinkedField",
                "name": "pullQuote",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "attribution",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "f13191f4859ebebe6f9f66e7b8d98992",
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
        "artist.artistSeriesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistSeriesConnection"
        },
        "artist.artistSeriesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtistSeriesEdge"
        },
        "artist.artistSeriesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistSeries"
        },
        "artist.artistSeriesConnection.edges.node.featured": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artist.artistSeriesConnection.edges.node.forSaleArtworksCount": (v28/*: any*/),
        "artist.artistSeriesConnection.edges.node.id": (v23/*: any*/),
        "artist.artistSeriesConnection.edges.node.image": (v24/*: any*/),
        "artist.artistSeriesConnection.edges.node.image.cropped": (v25/*: any*/),
        "artist.artistSeriesConnection.edges.node.image.cropped.src": (v26/*: any*/),
        "artist.artistSeriesConnection.edges.node.image.cropped.srcSet": (v26/*: any*/),
        "artist.artistSeriesConnection.edges.node.internalID": (v23/*: any*/),
        "artist.artistSeriesConnection.edges.node.slug": (v26/*: any*/),
        "artist.artistSeriesConnection.edges.node.title": (v26/*: any*/),
        "artist.awards": (v22/*: any*/),
        "artist.biographyBlurb": (v29/*: any*/),
        "artist.biographyBlurb.credit": (v22/*: any*/),
        "artist.biographyBlurb.text": (v22/*: any*/),
        "artist.biographyBlurbPlain": (v29/*: any*/),
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
        "artist.coverArtwork.image.cropped.height": (v28/*: any*/),
        "artist.coverArtwork.image.cropped.src": (v26/*: any*/),
        "artist.coverArtwork.image.cropped.width": (v28/*: any*/),
        "artist.coverArtwork.image.height": (v27/*: any*/),
        "artist.coverArtwork.image.large": (v22/*: any*/),
        "artist.coverArtwork.image.src": (v22/*: any*/),
        "artist.coverArtwork.image.width": (v27/*: any*/),
        "artist.coverArtwork.imageTitle": (v22/*: any*/),
        "artist.coverArtwork.internalID": (v23/*: any*/),
        "artist.coverArtwork.slug": (v23/*: any*/),
        "artist.coverArtwork.title": (v22/*: any*/),
        "artist.deathday": (v22/*: any*/),
        "artist.featuredStory": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStory"
        },
        "artist.featuredStory.headerImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryImage"
        },
        "artist.featuredStory.headerImage.altText": (v26/*: any*/),
        "artist.featuredStory.headerImage.credit": (v22/*: any*/),
        "artist.featuredStory.headerImage.image": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Image"
        },
        "artist.featuredStory.headerImage.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artist.featuredStory.headerImage.image.resized.src": (v26/*: any*/),
        "artist.featuredStory.headerImage.image.resized.srcSet": (v26/*: any*/),
        "artist.featuredStory.headerVideo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryVideo"
        },
        "artist.featuredStory.headerVideo.id": (v23/*: any*/),
        "artist.featuredStory.headerVideo.internalID": (v23/*: any*/),
        "artist.featuredStory.headerVideo.video": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Video"
        },
        "artist.featuredStory.headerVideo.video.aspectRatio": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artist.featuredStory.headerVideo.video.id": (v23/*: any*/),
        "artist.featuredStory.headerVideo.video.playerUrl": (v26/*: any*/),
        "artist.featuredStory.headerVideo.video.title": (v26/*: any*/),
        "artist.featuredStory.id": (v23/*: any*/),
        "artist.featuredStory.pullQuote": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryQuote"
        },
        "artist.featuredStory.pullQuote.attribution": (v22/*: any*/),
        "artist.featuredStory.pullQuote.text": (v26/*: any*/),
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
        "artist.slug": (v23/*: any*/),
        "artist.vanguardYear": (v22/*: any*/),
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
    "text": "query ArtistAppTestQuery {\n  artist(id: \"example\") {\n    ...ArtistApp_artist\n    id\n  }\n}\n\nfragment ArtistApp_artist on Artist {\n  ...ArtistMeta_artist\n  ...ArtistHeader_artist\n  ...ArtistStoryHeader_artist\n  featuredStory {\n    headerVideo {\n      internalID\n      id\n    }\n    headerImage {\n      altText\n    }\n    id\n  }\n  internalID\n  name\n}\n\nfragment ArtistCareerHighlight_insight on ArtistInsight {\n  kind\n  label\n  entities\n  description(format: HTML)\n}\n\nfragment ArtistGenesRow_genes on Gene {\n  internalID\n  name\n  slug\n}\n\nfragment ArtistHeaderEditorialItem_article on Article {\n  internalID\n  slug\n  href\n  byline\n  title\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    small: cropped(width: 100, height: 100) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistHeaderEditorial_artist on Artist {\n  internalID\n  slug\n  name\n  href\n  articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      node {\n        ...ArtistHeaderEditorialItem_article\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistHeaderImage_artwork on Artwork {\n  imageTitle\n  image {\n    src: url(version: [\"larger\", \"larger\"])\n    width\n    height\n  }\n  fallbackArtist: artist {\n    name\n    id\n  }\n}\n\nfragment ArtistHeaderSeriesItem_artistSeries on ArtistSeries {\n  slug\n  title\n  forSaleArtworksCount\n  image {\n    cropped(width: 280, height: 210, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistHeaderSeries_artist on Artist {\n  name\n  href\n  artistSeriesConnection(first: 10) {\n    edges {\n      node {\n        ...ArtistHeaderSeriesItem_artistSeries\n        internalID\n        slug\n        featured\n        forSaleArtworksCount\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistHeader_artist on Artist {\n  internalID\n  slug\n  name\n  instagramHandle\n  formattedNationalityAndBirthday\n  counts {\n    follows\n  }\n  biographyBlurb(format: HTML) {\n    text\n    credit\n  }\n  insights(excludeBlanks: true) {\n    kind\n    entities\n    description(format: HTML)\n    ...ArtistCareerHighlight_insight\n  }\n  articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {\n    totalCount\n  }\n  ...ArtistHeaderEditorial_artist\n  ...ArtistHeaderSeries_artist\n  ...ArtistStylesAndTechniques_artist\n  verifiedRepresentatives {\n    partner {\n      internalID\n      name\n      href\n      profile {\n        icon {\n          src1x: cropped(width: 30, height: 30) {\n            src\n          }\n          src2x: cropped(width: 60, height: 60) {\n            src\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n  coverArtwork {\n    internalID\n    slug\n    href\n    title\n    date\n    image {\n      src: url(version: [\"larger\", \"larger\"])\n      width\n      height\n    }\n    ...ArtistHeaderImage_artwork\n    id\n  }\n}\n\nfragment ArtistMeta_artist on Artist {\n  ...ArtistStructuredData_artist\n  name\n  nationality\n  birthday\n  deathday\n  alternateNames\n  biographyBlurbPlain: biographyBlurb(format: PLAIN) {\n    text\n  }\n  coverArtwork {\n    image {\n      large: url(version: \"large\")\n    }\n    id\n  }\n}\n\nfragment ArtistStoryHeaderMedia_story on ArtistStory {\n  headerVideo {\n    video {\n      playerUrl\n      aspectRatio\n      title\n      id\n    }\n    id\n  }\n  headerImage {\n    altText\n    credit\n    image {\n      resized(width: 1600, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n        src\n        srcSet\n      }\n    }\n  }\n}\n\nfragment ArtistStoryHeader_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  vanguardYear\n  instagramHandle\n  counts {\n    follows\n  }\n  featuredStory {\n    ...ArtistStoryHeaderMedia_story\n    id\n  }\n  ...ArtistStoryIntro_artist\n  ...ArtistHeaderEditorial_artist\n}\n\nfragment ArtistStoryIntro_artist on Artist {\n  biographyBlurb(format: HTML) {\n    text\n    credit\n  }\n  featuredStory {\n    pullQuote {\n      text\n      attribution\n    }\n    id\n  }\n  ...ArtistStylesAndTechniques_artist\n  ...ArtistStoryRepresentation_artist\n}\n\nfragment ArtistStoryRepresentation_artist on Artist {\n  verifiedRepresentatives {\n    partner {\n      internalID\n      name\n      href\n      profile {\n        icon {\n          src1x: cropped(width: 30, height: 30) {\n            src\n          }\n          src2x: cropped(width: 60, height: 60) {\n            src\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment ArtistStructuredData_artist on Artist {\n  slug\n  name\n  alternateNames\n  awards\n  birthday\n  deathday\n  gender\n  hometown\n  nationality\n  instagramHandle\n  href\n  biographyBlurbPlain: biographyBlurb(format: PLAIN) {\n    text\n  }\n  coverArtwork {\n    image {\n      cropped(width: 1200, height: 900, version: [\"larger\", \"large\"]) {\n        src\n        width\n        height\n      }\n    }\n    id\n  }\n  verifiedRepresentatives {\n    partner {\n      name\n      href\n      id\n    }\n    id\n  }\n  notableArtworks(size: 3) {\n    title\n    href\n    date\n    id\n  }\n  genes(size: 10) {\n    name\n    id\n  }\n}\n\nfragment ArtistStylesAndTechniques_artist on Artist {\n  movementGenes: genes(geneFamilyID: \"styles-and-movements\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n  mediumGenes: genes(geneFamilyID: \"medium-and-techniques\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b8a70a61d5c6efbc518d02d4254c50f4";

export default node;
