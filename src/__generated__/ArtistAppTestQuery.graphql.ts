/**
 * @generated SignedSource<<719243f8237eadb0121ff151a895324a>>
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v12 = [
  (v2/*: any*/),
  (v8/*: any*/)
],
v13 = [
  (v5/*: any*/)
],
v14 = {
  "kind": "Literal",
  "name": "size",
  "value": 3
},
v15 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v16 = {
  "kind": "Literal",
  "name": "minValue",
  "value": 50
},
v17 = [
  (v9/*: any*/),
  (v2/*: any*/),
  (v1/*: any*/),
  (v8/*: any*/)
],
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistBlurb"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v27 = {
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
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/)
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
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/),
              (v9/*: any*/),
              (v1/*: any*/),
              (v3/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
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
                "selections": (v12/*: any*/),
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
                  (v8/*: any*/),
                  (v9/*: any*/),
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
                            "selections": (v13/*: any*/),
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
                            "selections": (v13/*: any*/),
                            "storageKey": "cropped(height:60,width:60)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v14/*: any*/)
            ],
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "notableArtworks",
            "plural": true,
            "selections": [
              (v10/*: any*/),
              (v3/*: any*/),
              (v11/*: any*/),
              (v8/*: any*/)
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
            "selections": (v12/*: any*/),
            "storageKey": "genes(size:10)"
          },
          (v9/*: any*/),
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
            "args": (v15/*: any*/),
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
                "args": (v15/*: any*/),
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
                      (v9/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "byline",
                        "storageKey": null
                      },
                      (v10/*: any*/),
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
                                "value": 125
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 125
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "srcSet",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "cropped(height:125,width:125)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/)
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
            "alias": "movementGenes",
            "args": [
              {
                "kind": "Literal",
                "name": "geneFamilyID",
                "value": "styles-and-movements"
              },
              (v16/*: any*/),
              (v14/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v17/*: any*/),
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
              (v16/*: any*/),
              (v14/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v17/*: any*/),
            "storageKey": "genes(geneFamilyID:\"medium-and-techniques\",minValue:50,size:3)"
          },
          (v8/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "368a0d39b42b149714e453fea659ef53",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": (v18/*: any*/),
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
        "artist.articlesConnection.edges.node.byline": (v19/*: any*/),
        "artist.articlesConnection.edges.node.href": (v19/*: any*/),
        "artist.articlesConnection.edges.node.id": (v20/*: any*/),
        "artist.articlesConnection.edges.node.internalID": (v20/*: any*/),
        "artist.articlesConnection.edges.node.publishedAt": (v19/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage": (v21/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small": (v22/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small.src": (v23/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small.srcSet": (v23/*: any*/),
        "artist.articlesConnection.edges.node.title": (v19/*: any*/),
        "artist.articlesConnection.totalCount": (v24/*: any*/),
        "artist.awards": (v19/*: any*/),
        "artist.biographyBlurb": (v25/*: any*/),
        "artist.biographyBlurb.credit": (v19/*: any*/),
        "artist.biographyBlurb.text": (v19/*: any*/),
        "artist.biographyBlurbPlain": (v25/*: any*/),
        "artist.biographyBlurbPlain.text": (v19/*: any*/),
        "artist.birthday": (v19/*: any*/),
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
        "artist.coverArtwork.date": (v19/*: any*/),
        "artist.coverArtwork.fallbackArtist": (v18/*: any*/),
        "artist.coverArtwork.fallbackArtist.id": (v20/*: any*/),
        "artist.coverArtwork.fallbackArtist.name": (v19/*: any*/),
        "artist.coverArtwork.href": (v19/*: any*/),
        "artist.coverArtwork.id": (v20/*: any*/),
        "artist.coverArtwork.image": (v21/*: any*/),
        "artist.coverArtwork.image.cropped": (v22/*: any*/),
        "artist.coverArtwork.image.cropped.height": (v26/*: any*/),
        "artist.coverArtwork.image.cropped.src": (v23/*: any*/),
        "artist.coverArtwork.image.cropped.width": (v26/*: any*/),
        "artist.coverArtwork.image.height": (v24/*: any*/),
        "artist.coverArtwork.image.large": (v19/*: any*/),
        "artist.coverArtwork.image.src": (v19/*: any*/),
        "artist.coverArtwork.image.width": (v24/*: any*/),
        "artist.coverArtwork.imageTitle": (v19/*: any*/),
        "artist.coverArtwork.internalID": (v20/*: any*/),
        "artist.coverArtwork.slug": (v20/*: any*/),
        "artist.coverArtwork.title": (v19/*: any*/),
        "artist.deathday": (v19/*: any*/),
        "artist.formattedNationalityAndBirthday": (v19/*: any*/),
        "artist.gender": (v19/*: any*/),
        "artist.genes": (v27/*: any*/),
        "artist.genes.id": (v20/*: any*/),
        "artist.genes.name": (v19/*: any*/),
        "artist.hometown": (v19/*: any*/),
        "artist.href": (v19/*: any*/),
        "artist.id": (v20/*: any*/),
        "artist.insights": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistInsight"
        },
        "artist.insights.description": (v19/*: any*/),
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
        "artist.insights.label": (v23/*: any*/),
        "artist.internalID": (v20/*: any*/),
        "artist.mediumGenes": (v27/*: any*/),
        "artist.mediumGenes.id": (v20/*: any*/),
        "artist.mediumGenes.internalID": (v20/*: any*/),
        "artist.mediumGenes.name": (v19/*: any*/),
        "artist.mediumGenes.slug": (v20/*: any*/),
        "artist.movementGenes": (v27/*: any*/),
        "artist.movementGenes.id": (v20/*: any*/),
        "artist.movementGenes.internalID": (v20/*: any*/),
        "artist.movementGenes.name": (v19/*: any*/),
        "artist.movementGenes.slug": (v20/*: any*/),
        "artist.name": (v19/*: any*/),
        "artist.nationality": (v19/*: any*/),
        "artist.notableArtworks": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Artwork"
        },
        "artist.notableArtworks.date": (v19/*: any*/),
        "artist.notableArtworks.href": (v19/*: any*/),
        "artist.notableArtworks.id": (v20/*: any*/),
        "artist.notableArtworks.title": (v19/*: any*/),
        "artist.slug": (v20/*: any*/),
        "artist.verifiedRepresentatives": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "VerifiedRepresentative"
        },
        "artist.verifiedRepresentatives.id": (v20/*: any*/),
        "artist.verifiedRepresentatives.partner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Partner"
        },
        "artist.verifiedRepresentatives.partner.href": (v19/*: any*/),
        "artist.verifiedRepresentatives.partner.id": (v20/*: any*/),
        "artist.verifiedRepresentatives.partner.internalID": (v20/*: any*/),
        "artist.verifiedRepresentatives.partner.name": (v19/*: any*/),
        "artist.verifiedRepresentatives.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artist.verifiedRepresentatives.partner.profile.icon": (v21/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src1x": (v22/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src1x.src": (v23/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src2x": (v22/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src2x.src": (v23/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.id": (v20/*: any*/)
      }
    },
    "name": "ArtistAppTestQuery",
    "operationKind": "query",
    "text": "query ArtistAppTestQuery {\n  artist(id: \"example\") {\n    ...ArtistApp_artist\n    id\n  }\n}\n\nfragment ArtistApp_artist on Artist {\n  ...ArtistMeta_artist\n  ...ArtistHeader_artist\n  internalID\n  name\n}\n\nfragment ArtistCareerHighlight_insight on ArtistInsight {\n  kind\n  label\n  entities\n  description(format: HTML)\n}\n\nfragment ArtistGenesRow_genes on Gene {\n  internalID\n  name\n  slug\n}\n\nfragment ArtistHeaderEditorialItem_article on Article {\n  internalID\n  href\n  byline\n  title\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    small: cropped(width: 125, height: 125) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistHeaderEditorial_artist on Artist {\n  name\n  href\n  articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      node {\n        ...ArtistHeaderEditorialItem_article\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistHeaderImage_artwork on Artwork {\n  imageTitle\n  image {\n    src: url(version: [\"larger\", \"larger\"])\n    width\n    height\n  }\n  fallbackArtist: artist {\n    name\n    id\n  }\n}\n\nfragment ArtistHeader_artist on Artist {\n  internalID\n  slug\n  name\n  formattedNationalityAndBirthday\n  counts {\n    follows\n  }\n  biographyBlurb(format: HTML) {\n    text\n    credit\n  }\n  insights {\n    kind\n    entities\n    description(format: HTML)\n    ...ArtistCareerHighlight_insight\n  }\n  articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {\n    totalCount\n  }\n  ...ArtistHeaderEditorial_artist\n  ...ArtistStylesAndTechniques_artist\n  verifiedRepresentatives {\n    partner {\n      internalID\n      name\n      href\n      profile {\n        icon {\n          src1x: cropped(width: 30, height: 30) {\n            src\n          }\n          src2x: cropped(width: 60, height: 60) {\n            src\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n  coverArtwork {\n    internalID\n    slug\n    href\n    title\n    date\n    image {\n      src: url(version: [\"larger\", \"larger\"])\n      width\n      height\n    }\n    ...ArtistHeaderImage_artwork\n    id\n  }\n}\n\nfragment ArtistMeta_artist on Artist {\n  ...ArtistStructuredData_artist\n  name\n  nationality\n  birthday\n  deathday\n  alternateNames\n  biographyBlurbPlain: biographyBlurb(format: PLAIN) {\n    text\n  }\n  coverArtwork {\n    image {\n      large: url(version: \"large\")\n    }\n    id\n  }\n}\n\nfragment ArtistStructuredData_artist on Artist {\n  slug\n  name\n  alternateNames\n  awards\n  birthday\n  deathday\n  gender\n  hometown\n  nationality\n  href\n  biographyBlurbPlain: biographyBlurb(format: PLAIN) {\n    text\n  }\n  coverArtwork {\n    image {\n      cropped(width: 1200, height: 900, version: [\"larger\", \"large\"]) {\n        src\n        width\n        height\n      }\n    }\n    id\n  }\n  verifiedRepresentatives {\n    partner {\n      name\n      href\n      id\n    }\n    id\n  }\n  notableArtworks(size: 3) {\n    title\n    href\n    date\n    id\n  }\n  genes(size: 10) {\n    name\n    id\n  }\n}\n\nfragment ArtistStylesAndTechniques_artist on Artist {\n  movementGenes: genes(geneFamilyID: \"styles-and-movements\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n  mediumGenes: genes(geneFamilyID: \"medium-and-techniques\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b8a70a61d5c6efbc518d02d4254c50f4";

export default node;
