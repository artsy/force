/**
 * @generated SignedSource<<c61d6a719ce99d932e6c42c6d6aebef8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewQueryRendererQuery$variables = {
  artistID: string;
};
export type ArtistOverviewQueryRendererQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistOverview_artist">;
  } | null | undefined;
};
export type ArtistOverviewQueryRendererQuery = {
  response: ArtistOverviewQueryRendererQuery$data;
  variables: ArtistOverviewQueryRendererQuery$variables;
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "playerUrl",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v9 = {
  "kind": "Literal",
  "name": "first",
  "value": 0
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistOverviewQueryRendererQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistOverview_artist"
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
    "name": "ArtistOverviewQueryRendererQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistStoryAccentColor",
                "kind": "LinkedField",
                "name": "accentColor",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hex",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "textColor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistStoryAbout",
                "kind": "LinkedField",
                "name": "about",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "tagline",
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
                    "kind": "ScalarField",
                    "name": "body",
                    "storageKey": "body(format:\"HTML\")"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistStoryImage",
                    "kind": "LinkedField",
                    "name": "portrait",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "altText",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "credit",
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
                                "value": 800
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": [
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
                            "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
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
                "alias": null,
                "args": null,
                "concreteType": "ArtistStoryVideo",
                "kind": "LinkedField",
                "name": "processVideo",
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
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtistStoryVideo",
                "kind": "LinkedField",
                "name": "motionVideos",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "caption",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistStoryQuote",
                    "kind": "LinkedField",
                    "name": "quote",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "text",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "attribution",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Video",
                    "kind": "LinkedField",
                    "name": "video",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "aspectRatio",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
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
                "name": "excludeBlanks",
                "value": true
              }
            ],
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": [
              (v6/*: any*/)
            ],
            "storageKey": "insights(excludeBlanks:true)"
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": "articlesConnection(first:1)"
          },
          {
            "alias": null,
            "args": [
              (v9/*: any*/)
            ],
            "concreteType": "ArtistSeriesConnection",
            "kind": "LinkedField",
            "name": "artistSeriesConnection",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": "artistSeriesConnection(first:0)"
          },
          {
            "alias": null,
            "args": [
              (v9/*: any*/),
              {
                "kind": "Literal",
                "name": "status",
                "value": "running"
              }
            ],
            "concreteType": "ShowConnection",
            "kind": "LinkedField",
            "name": "showsConnection",
            "plural": false,
            "selections": (v8/*: any*/),
            "storageKey": "showsConnection(first:0,status:\"running\")"
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
                "name": "relatedArtists",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "GeneConnection",
                "kind": "LinkedField",
                "name": "genes",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Gene",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "genes(first:1)"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a2aa8a8efdbfa7c5c1dd7cde537c515f",
    "id": null,
    "metadata": {},
    "name": "ArtistOverviewQueryRendererQuery",
    "operationKind": "query",
    "text": "query ArtistOverviewQueryRendererQuery(\n  $artistID: String!\n) @cacheable {\n  artist(id: $artistID) {\n    ...ArtistOverview_artist\n    id\n  }\n}\n\nfragment ArtistOverview_artist on Artist {\n  internalID\n  href\n  name\n  featuredStory {\n    internalID\n    id\n  }\n  ...ArtistStoryAbout_artist\n  insights(excludeBlanks: true) {\n    __typename\n  }\n  articlesConnection(first: 1) {\n    totalCount\n  }\n  artistSeriesConnection(first: 0) {\n    totalCount\n  }\n  showsConnection(first: 0, status: \"running\") {\n    totalCount\n  }\n  counts {\n    relatedArtists\n  }\n  related {\n    genes(first: 1) {\n      edges {\n        node {\n          __typename\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistStoryAbout_artist on Artist {\n  featuredStory {\n    accentColor {\n      hex\n      textColor\n    }\n    about {\n      tagline\n      body(format: HTML)\n      portrait {\n        altText\n        credit\n        image {\n          resized(width: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n            src\n            srcSet\n          }\n        }\n      }\n    }\n    processVideo {\n      video {\n        ...ArtistStoryProcessVideo_video\n        id\n      }\n      id\n    }\n    motionVideos {\n      ...ArtistStoryMotionVideos_motionVideos\n      id\n    }\n    id\n  }\n}\n\nfragment ArtistStoryMotionVideos_motionVideos on ArtistStoryVideo {\n  internalID\n  caption\n  quote {\n    text\n    attribution\n  }\n  video {\n    playerUrl\n    aspectRatio\n    title\n    id\n  }\n}\n\nfragment ArtistStoryProcessVideo_video on Video {\n  playerUrl\n  title\n}\n"
  }
};
})();

(node as any).hash = "6b2f703df3e6ecee17f75b5ee14d1e2b";

export default node;
