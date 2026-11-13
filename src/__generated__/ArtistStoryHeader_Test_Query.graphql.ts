/**
 * @generated SignedSource<<7a1783053e4808b8c80f81b587d776ca>>
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
    "value": "heidi-lau"
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
  "name": "name",
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
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "credit",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v7 = [
  (v6/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
v9 = {
  "kind": "Literal",
  "name": "minValue",
  "value": 50
},
v10 = {
  "kind": "Literal",
  "name": "size",
  "value": 3
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v12 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v11/*: any*/),
  (v4/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v14 = [
  (v6/*: any*/)
],
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v19 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v20 = {
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
        "storageKey": "artist(id:\"heidi-lau\")"
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
          (v1/*: any*/),
          (v2/*: any*/),
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
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
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
                  (v5/*: any*/),
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
                        "selections": (v7/*: any*/),
                        "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:1600)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistStoryQuote",
                "kind": "LinkedField",
                "name": "pullQuote",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
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
              (v8/*: any*/),
              (v5/*: any*/)
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
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v12/*: any*/),
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
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "concreteType": "Gene",
            "kind": "LinkedField",
            "name": "genes",
            "plural": true,
            "selections": (v12/*: any*/),
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
                  (v2/*: any*/),
                  (v13/*: any*/),
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
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v11/*: any*/),
          (v13/*: any*/),
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
                      (v11/*: any*/),
                      (v13/*: any*/),
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
                            "selections": (v7/*: any*/),
                            "storageKey": "cropped(height:100,width:100)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "articlesConnection(first:3,sort:\"PUBLISHED_AT_DESC\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": "artist(id:\"heidi-lau\")"
      }
    ]
  },
  "params": {
    "cacheID": "5781659e0771724945c223138d2129b6",
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
        "artist.articlesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Article"
        },
        "artist.articlesConnection.edges.node.byline": (v15/*: any*/),
        "artist.articlesConnection.edges.node.href": (v15/*: any*/),
        "artist.articlesConnection.edges.node.id": (v16/*: any*/),
        "artist.articlesConnection.edges.node.internalID": (v16/*: any*/),
        "artist.articlesConnection.edges.node.publishedAt": (v15/*: any*/),
        "artist.articlesConnection.edges.node.slug": (v15/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage": (v17/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small": (v18/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small.src": (v19/*: any*/),
        "artist.articlesConnection.edges.node.thumbnailImage.small.srcSet": (v19/*: any*/),
        "artist.articlesConnection.edges.node.title": (v15/*: any*/),
        "artist.articlesConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "artist.biographyBlurb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistBlurb"
        },
        "artist.biographyBlurb.credit": (v15/*: any*/),
        "artist.biographyBlurb.text": (v15/*: any*/),
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
        "artist.featuredStory.headerImage.altText": (v19/*: any*/),
        "artist.featuredStory.headerImage.credit": (v15/*: any*/),
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
        "artist.featuredStory.headerImage.image.resized.src": (v19/*: any*/),
        "artist.featuredStory.headerImage.image.resized.srcSet": (v19/*: any*/),
        "artist.featuredStory.headerVideo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryVideo"
        },
        "artist.featuredStory.headerVideo.id": (v16/*: any*/),
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
        "artist.featuredStory.headerVideo.video.id": (v16/*: any*/),
        "artist.featuredStory.headerVideo.video.playerUrl": (v19/*: any*/),
        "artist.featuredStory.headerVideo.video.title": (v19/*: any*/),
        "artist.featuredStory.id": (v16/*: any*/),
        "artist.featuredStory.pullQuote": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryQuote"
        },
        "artist.featuredStory.pullQuote.attribution": (v15/*: any*/),
        "artist.featuredStory.pullQuote.text": (v19/*: any*/),
        "artist.formattedNationalityAndBirthday": (v15/*: any*/),
        "artist.href": (v15/*: any*/),
        "artist.id": (v16/*: any*/),
        "artist.instagramHandle": (v15/*: any*/),
        "artist.internalID": (v16/*: any*/),
        "artist.mediumGenes": (v20/*: any*/),
        "artist.mediumGenes.id": (v16/*: any*/),
        "artist.mediumGenes.internalID": (v16/*: any*/),
        "artist.mediumGenes.name": (v15/*: any*/),
        "artist.mediumGenes.slug": (v16/*: any*/),
        "artist.movementGenes": (v20/*: any*/),
        "artist.movementGenes.id": (v16/*: any*/),
        "artist.movementGenes.internalID": (v16/*: any*/),
        "artist.movementGenes.name": (v15/*: any*/),
        "artist.movementGenes.slug": (v16/*: any*/),
        "artist.name": (v15/*: any*/),
        "artist.slug": (v16/*: any*/),
        "artist.vanguardYear": (v15/*: any*/),
        "artist.verifiedRepresentatives": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "VerifiedRepresentative"
        },
        "artist.verifiedRepresentatives.id": (v16/*: any*/),
        "artist.verifiedRepresentatives.partner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Partner"
        },
        "artist.verifiedRepresentatives.partner.href": (v15/*: any*/),
        "artist.verifiedRepresentatives.partner.id": (v16/*: any*/),
        "artist.verifiedRepresentatives.partner.internalID": (v16/*: any*/),
        "artist.verifiedRepresentatives.partner.name": (v15/*: any*/),
        "artist.verifiedRepresentatives.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artist.verifiedRepresentatives.partner.profile.icon": (v17/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src1x": (v18/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src1x.src": (v19/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src2x": (v18/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.icon.src2x.src": (v19/*: any*/),
        "artist.verifiedRepresentatives.partner.profile.id": (v16/*: any*/)
      }
    },
    "name": "ArtistStoryHeader_Test_Query",
    "operationKind": "query",
    "text": "query ArtistStoryHeader_Test_Query {\n  artist(id: \"heidi-lau\") {\n    ...ArtistStoryHeader_artist\n    id\n  }\n}\n\nfragment ArtistGenesRow_genes on Gene {\n  internalID\n  name\n  slug\n}\n\nfragment ArtistHeaderEditorialItem_article on Article {\n  internalID\n  slug\n  href\n  byline\n  title\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    small: cropped(width: 100, height: 100) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistHeaderEditorial_artist on Artist {\n  internalID\n  slug\n  name\n  href\n  articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {\n    totalCount\n    edges {\n      node {\n        ...ArtistHeaderEditorialItem_article\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistStoryHeaderMedia_story on ArtistStory {\n  headerVideo {\n    video {\n      playerUrl\n      aspectRatio\n      title\n      id\n    }\n    id\n  }\n  headerImage {\n    altText\n    credit\n    image {\n      resized(width: 1600, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n        src\n        srcSet\n      }\n    }\n  }\n}\n\nfragment ArtistStoryHeader_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  vanguardYear\n  instagramHandle\n  counts {\n    follows\n  }\n  featuredStory {\n    ...ArtistStoryHeaderMedia_story\n    id\n  }\n  ...ArtistStoryIntro_artist\n  ...ArtistHeaderEditorial_artist\n}\n\nfragment ArtistStoryIntro_artist on Artist {\n  biographyBlurb(format: HTML) {\n    text\n    credit\n  }\n  featuredStory {\n    pullQuote {\n      text\n      attribution\n    }\n    id\n  }\n  ...ArtistStylesAndTechniques_artist\n  ...ArtistStoryRepresentation_artist\n}\n\nfragment ArtistStoryRepresentation_artist on Artist {\n  verifiedRepresentatives {\n    partner {\n      internalID\n      name\n      href\n      profile {\n        icon {\n          src1x: cropped(width: 30, height: 30) {\n            src\n          }\n          src2x: cropped(width: 60, height: 60) {\n            src\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment ArtistStylesAndTechniques_artist on Artist {\n  movementGenes: genes(geneFamilyID: \"styles-and-movements\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n  mediumGenes: genes(geneFamilyID: \"medium-and-techniques\", minValue: 50, size: 3) {\n    ...ArtistGenesRow_genes\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "978aa5e1c7d017a2017edb582ac54878";

export default node;
