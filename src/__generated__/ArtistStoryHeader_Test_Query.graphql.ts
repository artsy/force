/**
 * @generated SignedSource<<455dc664b4fbc0bc70e963869da4c32c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryHeader_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistStoryHeader_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryHeader_artist">;
  } | null | undefined;
};
export type ArtistStoryHeader_Test_Query = {
  response: ArtistStoryHeader_Test_Query$data;
  variables: ArtistStoryHeader_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "jane-example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "credit",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v6 = [
  (v5/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
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
  "name": "slug",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v11 = {
  "kind": "Literal",
  "name": "minValue",
  "value": 50
},
v12 = {
  "kind": "Literal",
  "name": "size",
  "value": 3
},
v13 = [
  (v1/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  (v2/*: any*/)
],
v14 = [
  (v5/*: any*/)
],
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Article"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v22 = {
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
    "name": "ArtistStoryHeader_Test_Query",
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
            "name": "ArtistStoryHeader_artist"
          }
        ],
        "storageKey": "artist(id:\"jane-example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistStoryHeader_Test_Query",
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
                  (v1/*: any*/),
                  (v2/*: any*/),
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
                      (v3/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/),
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
                  (v4/*: any*/),
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
                        "selections": (v6/*: any*/),
                        "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:1600)"
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
                "concreteType": "ArtistStoryQuote",
                "kind": "LinkedField",
                "name": "pullQuote",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
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
          (v1/*: any*/),
          (v8/*: any*/),
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
            "kind": "ScalarField",
            "name": "vanguardYear",
            "storageKey": null
          },
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
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "coverArtwork",
            "plural": false,
            "selections": [
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
                          "larger"
                        ]
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:[\"larger\",\"larger\"])"
                  },
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
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "vanguardArticle",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v10/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
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
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": "biographyBlurb(format:\"HTML\")"
          },
          {
            "alias": "movementGenes",
            "args": [
              {
                "kind": "Literal",
                "name": "geneFamilyID",
                "value": "styles-and-movements"
              },
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v13/*: any*/),
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
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v13/*: any*/),
            "storageKey": "genes(geneFamilyID:\"medium-and-techniques\",minValue:50,size:3)"
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
                  (v1/*: any*/),
                  (v8/*: any*/),
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/),
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
                      (v1/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "byline",
                        "storageKey": null
                      },
                      (v3/*: any*/),
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
                            "selections": (v6/*: any*/),
                            "storageKey": "cropped(height:100,width:100)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:3,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": "artist(id:\"jane-example\")"
      }
    ]
  },
  "params": {
    "cacheID": "a47ae31fd896f5915e32941a63fcecf7",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
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
        "artist.articlesConnection.edges.node": (v15/*: any*/),
        "artist.articlesConnection.edges.node.byline": (v16/*: any*/),
        "artist.articlesConnection.edges.node.href": (v16/*: any*/),
        "artist.articlesConnection.edges.node.id": (v17/*: any*/),
        "artist.articlesConnection.edges.node.internalID": (v17/*: any*/),
        "artist.articlesConnection.edges.node.publishedAt": (v16/*: any*/),
        "artist.articlesConnection.edges.node.slug": (v16/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage": (v18/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small": (v19/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small.src": (v20/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small.srcSet": (v20/*: any*/),
        "artist.articlesConnection.edges.node.title": (v16/*: any*/),
        "artist.articlesConnection.totalCount": (v21/*: any*/),
        "artist.biographyBlurb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistBlurb"
        },
        "artist.biographyBlurb.credit": (v16/*: any*/),
        "artist.biographyBlurb.text": (v16/*: any*/),
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
        "artist.coverArtwork.id": (v17/*: any*/),
        "artist.coverArtwork.image": (v18/*: any*/),
        "artist.coverArtwork.image.height": (v21/*: any*/),
        "artist.coverArtwork.image.src": (v16/*: any*/),
        "artist.coverArtwork.image.width": (v21/*: any*/),
        "artist.coverArtwork.imageTitle": (v16/*: any*/),
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
        "artist.featuredStory.headerImage.altText": (v20/*: any*/),
        "artist.featuredStory.headerImage.credit": (v16/*: any*/),
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
        "artist.featuredStory.headerImage.image.resized.src": (v20/*: any*/),
        "artist.featuredStory.headerImage.image.resized.srcSet": (v20/*: any*/),
        "artist.featuredStory.headerVideo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryVideo"
        },
        "artist.featuredStory.headerVideo.id": (v17/*: any*/),
        "artist.featuredStory.headerVideo.internalID": (v17/*: any*/),
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
        "artist.featuredStory.headerVideo.video.id": (v17/*: any*/),
        "artist.featuredStory.headerVideo.video.playerUrl": (v20/*: any*/),
        "artist.featuredStory.headerVideo.video.title": (v20/*: any*/),
        "artist.featuredStory.id": (v17/*: any*/),
        "artist.featuredStory.pullQuote": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryQuote"
        },
        "artist.featuredStory.pullQuote.attribution": (v16/*: any*/),
        "artist.featuredStory.pullQuote.text": (v20/*: any*/),
        "artist.formattedNationalityAndBirthday": (v16/*: any*/),
        "artist.href": (v16/*: any*/),
        "artist.id": (v17/*: any*/),
        "artist.instagramHandle": (v16/*: any*/),
        "artist.internalID": (v17/*: any*/),
        "artist.mediumGenes": (v22/*: any*/),
        "artist.mediumGenes.id": (v17/*: any*/),
        "artist.mediumGenes.internalID": (v17/*: any*/),
        "artist.mediumGenes.name": (v16/*: any*/),
        "artist.mediumGenes.slug": (v17/*: any*/),
        "artist.movementGenes": (v22/*: any*/),
        "artist.movementGenes.id": (v17/*: any*/),
        "artist.movementGenes.internalID": (v17/*: any*/),
        "artist.movementGenes.name": (v16/*: any*/),
        "artist.movementGenes.slug": (v17/*: any*/),
        "artist.name": (v16/*: any*/),
        "artist.slug": (v17/*: any*/),
        "artist.vanguardArticle": (v15/*: any*/),
        "artist.vanguardArticle.href": (v16/*: any*/),
        "artist.vanguardArticle.id": (v17/*: any*/),
        "artist.vanguardArticle.slug": (v16/*: any*/),
        "artist.vanguardYear": (v16/*: any*/),
        "artist.verifiedRepresentatives": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "VerifiedRepresentative"
        },
        "artist.verifiedRepresentatives.id": (v17/*: any*/),
        "artist.verifiedRepresentatives.partner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Partner"
        },
        "artist.verifiedRepresentatives.partner.href": (v16/*: any*/),
        "artist.verifiedRepresentatives.partner.id": (v17/*: any*/),
        "artist.verifiedRepresentatives.partner.internalID": (v17/*: any*/),
        "artist.verifiedRepresentatives.partner.name": (v16/*: any*/),
        "artist.verifiedRepresentatives.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artist.verifiedRepresentatives.partner.profile.icon": (v18/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src1x": (v19/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src1x.src": (v20/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src2x": (v19/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src2x.src": (v20/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.id": (v17/*: any*/)
      }
    },
    "name": "ArtistStoryHeader_Test_Query",
    "operationKind": "query",
    "text": "query ArtistStoryHeader_Test_Query {\n  artist(id: \"jane-example\") {\n    ...ArtistStoryHeader_artist\n    id\n  }\n}\n\nfragment ArtistGenesRow_genes on Gene {\n  internalID\n  name\n  slug\n}\n\nfragment ArtistHeaderEditorialItem_article on Article {\n  internalID\n  slug\n  href\n  byline\n  title\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    small: cropped(width: 100, height: 100) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistHeaderEditorial_artist on Artist {\n  internalID\n  slug\n  name\n  href\n  articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      node {\n        ...ArtistHeaderEditorialItem_article\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistStoryBiography_artist on Artist {\n  biographyBlurb(format: HTML) {\n    text\n    credit\n  }\n}\n\nfragment ArtistStoryHeaderImage_artist on Artist {\n  name\n  featuredStory {\n    headerImage {\n      altText\n      credit\n      image {\n        resized(width: 1600, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n          srcSet\n        }\n      }\n    }\n    id\n  }\n  coverArtwork {\n    imageTitle\n    image {\n      src: url(version: [\"larger\", \"larger\"])\n      width\n      height\n    }\n    id\n  }\n}\n\nfragment ArtistStoryHeaderMedia_artist on Artist {\n  featuredStory {\n    headerVideo {\n      video {\n        playerUrl\n        aspectRatio\n        title\n        id\n      }\n      id\n    }\n    headerImage {\n      image {\n        resized(width: 1600, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n          src\n        }\n      }\n    }\n    id\n  }\n  ...ArtistStoryHeaderImage_artist\n}\n\nfragment ArtistStoryHeader_artist on Artist {\n  featuredStory {\n    headerVideo {\n      internalID\n      id\n    }\n    id\n  }\n  ...ArtistStoryMobileHeader_artist\n  ...ArtistStorySplitHeader_artist\n  ...ArtistStoryVideoHeader_artist\n  ...ArtistStoryIntro_artist\n  ...ArtistHeaderEditorial_artist\n}\n\nfragment ArtistStoryIntro_artist on Artist {\n  slug\n  ...ArtistStoryPullQuote_artist\n  ...ArtistStoryBiography_artist\n  ...ArtistStylesAndTechniques_artist\n  ...ArtistStoryRepresentation_artist\n}\n\nfragment ArtistStoryMobileHeader_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  vanguardYear\n  instagramHandle\n  counts {\n    follows\n  }\n  ...ArtistStoryHeaderImage_artist\n  ...ArtistStoryVanguardBadge_artist\n}\n\nfragment ArtistStoryPullQuote_artist on Artist {\n  featuredStory {\n    pullQuote {\n      text\n      attribution\n    }\n    id\n  }\n}\n\nfragment ArtistStoryRepresentation_artist on Artist {\n  verifiedRepresentatives {\n    partner {\n      internalID\n      name\n      href\n      profile {\n        icon {\n          src1x: cropped(width: 30, height: 30) {\n            src\n          }\n          src2x: cropped(width: 60, height: 60) {\n            src\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment ArtistStorySplitHeader_artist on Artist {\n  internalID\n  slug\n  name\n  formattedNationalityAndBirthday\n  vanguardYear\n  instagramHandle\n  counts {\n    follows\n  }\n  ...ArtistStoryHeaderImage_artist\n  ...ArtistStoryVanguardBadge_artist\n  ...ArtistStoryPullQuote_artist\n  ...ArtistStoryBiography_artist\n  ...ArtistStylesAndTechniques_artist\n  ...ArtistStoryRepresentation_artist\n}\n\nfragment ArtistStoryVanguardBadge_artist on Artist {\n  vanguardYear\n  vanguardArticle {\n    slug\n    href\n    id\n  }\n}\n\nfragment ArtistStoryVideoHeader_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  vanguardYear\n  instagramHandle\n  counts {\n    follows\n  }\n  ...ArtistStoryHeaderMedia_artist\n  ...ArtistStoryVanguardBadge_artist\n}\n\nfragment ArtistStylesAndTechniques_artist on Artist {\n  movementGenes: genes(geneFamilyID: \"styles-and-movements\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n  mediumGenes: genes(geneFamilyID: \"medium-and-techniques\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "85727e4721c0f7b5abade8e5889960a0";

export default node;
