/**
 * @generated SignedSource<<4a3b832eed1a43289aeabacc3716cb34>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_Artist2AppQuery$variables = {
  artistID: string;
};
export type artistRoutes_Artist2AppQuery$data = {
  readonly artist: {
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"Artist2App_artist" | "ArtistCombinedRoute_artist">;
  } | null | undefined;
};
export type artistRoutes_Artist2AppQuery = {
  response: artistRoutes_Artist2AppQuery$data;
  variables: artistRoutes_Artist2AppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "version",
    "value": "large"
  }
],
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
  "name": "src",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "height",
      "value": 420
    },
    {
      "kind": "Literal",
      "name": "width",
      "value": 420
    }
  ],
  "concreteType": "ResizedImageUrl",
  "kind": "LinkedField",
  "name": "resized",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/)
  ],
  "storageKey": "resized(height:420,width:420)"
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v16 = {
  "kind": "Literal",
  "name": "first",
  "value": 3
},
v17 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v18 = {
  "kind": "Literal",
  "name": "minValue",
  "value": 50
},
v19 = {
  "kind": "Literal",
  "name": "size",
  "value": 3
},
v20 = [
  (v13/*: any*/),
  (v3/*: any*/),
  (v2/*: any*/),
  (v12/*: any*/)
],
v21 = [
  (v9/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "artistRoutes_Artist2AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Artist2App_artist"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistCombinedRoute_artist"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "artistRoutes_Artist2AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
            "name": "nationality",
            "storageKey": null
          },
          (v4/*: any*/),
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
              (v5/*: any*/)
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
                    "args": (v6/*: any*/),
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"large\")"
                  },
                  {
                    "alias": "large",
                    "args": (v6/*: any*/),
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"large\")"
                  },
                  (v11/*: any*/),
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
              (v12/*: any*/),
              (v13/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
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
                "selections": [
                  (v3/*: any*/),
                  (v12/*: any*/)
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
                "name": "first",
                "value": 10
              }
            ],
            "concreteType": "PartnerArtistConnection",
            "kind": "LinkedField",
            "name": "partnersConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnerArtistEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "partnersConnection(first:10)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "alternateNames",
            "storageKey": null
          },
          (v13/*: any*/),
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
            "args": [
              (v16/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "ICONICITY_DESC"
              }
            ],
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkEdge",
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
                      (v13/*: any*/),
                      (v2/*: any*/),
                      (v4/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artworksConnection(first:3,sort:\"ICONICITY_DESC\")"
          },
          {
            "alias": null,
            "args": (v17/*: any*/),
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              (v5/*: any*/),
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
            "alias": "movementGenes",
            "args": [
              {
                "kind": "Literal",
                "name": "geneFamilyID",
                "value": "styles-and-movements"
              },
              (v18/*: any*/),
              (v19/*: any*/)
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
              (v18/*: any*/),
              (v19/*: any*/)
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
                  (v13/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
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
                            "alias": "_1x",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 45
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 45
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v21/*: any*/),
                            "storageKey": "cropped(height:45,width:45)"
                          },
                          {
                            "alias": "_2x",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 90
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 90
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v21/*: any*/),
                            "storageKey": "cropped(height:90,width:90)"
                          },
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
                            "selections": (v21/*: any*/),
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
                            "selections": (v21/*: any*/),
                            "storageKey": "cropped(height:60,width:60)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v16/*: any*/),
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
                      (v13/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "byline",
                        "storageKey": null
                      },
                      (v14/*: any*/),
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
                              (v9/*: any*/),
                              (v10/*: any*/)
                            ],
                            "storageKey": "cropped(height:125,width:125)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v12/*: any*/)
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
                "name": "label",
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
              }
            ],
            "storageKey": null
          },
          (v12/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3cef254560bd9a02c55f1479a7e9da52",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_Artist2AppQuery",
    "operationKind": "query",
    "text": "query artistRoutes_Artist2AppQuery(\n  $artistID: String!\n) @cacheable {\n  artist(id: $artistID) @principalField {\n    slug\n    ...Artist2App_artist\n    ...ArtistCombinedRoute_artist\n    id\n  }\n}\n\nfragment Artist2App_artist on Artist {\n  ...ArtistMeta_artist\n  ...ArtistAbove_artist\n  ...ArtistHeader_artist\n  internalID\n  slug\n  name\n}\n\nfragment ArtistAbout_artist on Artist {\n  name\n  biographyBlurb(format: HTML) {\n    text\n    credit\n  }\n  movementGenes: genes(geneFamilyID: \"styles-and-movements\", minValue: 50, size: 3) {\n    internalID\n    name\n    slug\n    id\n  }\n  mediumGenes: genes(geneFamilyID: \"medium-and-techniques\", minValue: 50, size: 3) {\n    internalID\n    name\n    slug\n    id\n  }\n}\n\nfragment ArtistAbove_artist on Artist {\n  ...ArtistBreadcrumb_artist\n  ...ArtistTombstone_artist\n  ...ArtistNotableWorks_artist\n  ...ArtistAbout_artist\n  ...ArtistRepresentation_artist\n  ...ArtistEditorial_artist\n}\n\nfragment ArtistBreadcrumb_artist on Artist {\n  name\n  href\n}\n\nfragment ArtistCareerHighlight_insight on ArtistInsight {\n  kind\n  label\n  entities\n  description(format: HTML)\n}\n\nfragment ArtistCombinedRoute_artist on Artist {\n  internalID\n}\n\nfragment ArtistEditorialItem_article on Article {\n  internalID\n  href\n  byline\n  title\n  publishedAt(format: \"MMM D, YYYY\")\n  thumbnailImage {\n    small: cropped(width: 125, height: 125) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtistEditorial_artist on Artist {\n  name\n  articlesConnection(first: 3, sort: PUBLISHED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        ...ArtistEditorialItem_article\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistHeaderImage_artwork on Artwork {\n  imageTitle\n  image {\n    src: url(version: [\"larger\", \"larger\"])\n    width\n    height\n  }\n  fallbackArtist: artist {\n    name\n    id\n  }\n}\n\nfragment ArtistHeader_artist on Artist {\n  internalID\n  slug\n  name\n  formattedNationalityAndBirthday\n  counts {\n    follows\n  }\n  biographyBlurb(format: HTML) {\n    text\n    credit\n  }\n  insights {\n    kind\n    ...ArtistCareerHighlight_insight\n  }\n  verifiedRepresentatives {\n    partner {\n      internalID\n      name\n      href\n      profile {\n        icon {\n          src1x: cropped(width: 30, height: 30) {\n            src\n          }\n          src2x: cropped(width: 60, height: 60) {\n            src\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n  coverArtwork {\n    internalID\n    slug\n    href\n    image {\n      src: url(version: [\"larger\", \"larger\"])\n      width\n      height\n    }\n    ...ArtistHeaderImage_artwork\n    id\n  }\n}\n\nfragment ArtistMeta_artist on Artist {\n  ...ArtistStructuredData_artist\n  name\n  nationality\n  birthday\n  deathday\n  alternateNames\n  biographyBlurbPlain: biographyBlurb(format: PLAIN) {\n    text\n  }\n  coverArtwork {\n    image {\n      large: url(version: \"large\")\n    }\n    id\n  }\n}\n\nfragment ArtistNotableWorksArtworks_artist on Artist {\n  coverArtwork {\n    internalID\n    slug\n    href\n    title\n    date\n    image {\n      resized(width: 420, height: 420) {\n        width\n        height\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  artworksConnection(first: 3, sort: ICONICITY_DESC) {\n    edges {\n      node {\n        internalID\n        slug\n        href\n        title\n        date\n        image {\n          resized(width: 420, height: 420) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistNotableWorks_artist on Artist {\n  ...ArtistNotableWorksArtworks_artist\n  artworksConnection(first: 3, sort: ICONICITY_DESC) {\n    edges {\n      node {\n        internalID\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistRepresentation_artist on Artist {\n  verifiedRepresentatives {\n    partner {\n      internalID\n      name\n      href\n      profile {\n        icon {\n          _1x: cropped(width: 45, height: 45) {\n            src\n          }\n          _2x: cropped(width: 90, height: 90) {\n            src\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment ArtistStructuredData_artist on Artist {\n  slug\n  name\n  birthday\n  deathday\n  gender\n  nationality\n  href\n  biographyBlurbPlain: biographyBlurb(format: PLAIN) {\n    text\n  }\n  coverArtwork {\n    image {\n      url(version: \"large\")\n    }\n    id\n  }\n  partnersConnection(first: 10) {\n    edges {\n      node {\n        href\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment ArtistTombstone_artist on Artist {\n  internalID\n  name\n  formattedNationalityAndBirthday\n  counts {\n    follows\n  }\n}\n"
  }
};
})();

(node as any).hash = "60304f8b8cfce1cf40f418ef31160dcc";

export default node;
