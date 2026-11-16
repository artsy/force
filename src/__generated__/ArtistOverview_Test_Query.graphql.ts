/**
 * @generated SignedSource<<9efbbc4aa90d60ce49fc0a5ce3c517d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistOverview_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistOverview_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistOverview_artist">;
  } | null | undefined;
};
export type ArtistOverview_Test_Query = {
  response: ArtistOverview_Test_Query$data;
  variables: ArtistOverview_Test_Query$variables;
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
  "name": "playerUrl",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v8 = {
  "kind": "Literal",
  "name": "first",
  "value": 0
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Video"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistOverview_Test_Query",
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
            "name": "ArtistOverview_artist"
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
    "name": "ArtistOverview_Test_Query",
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
              (v1/*: any*/),
              (v2/*: any*/),
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
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v2/*: any*/)
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
                "concreteType": "ArtistStoryVideo",
                "kind": "LinkedField",
                "name": "motionVideos",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
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
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "aspectRatio",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
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
              (v5/*: any*/)
            ],
            "storageKey": "insights(excludeBlanks:true)"
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": "articlesConnection(first:1)"
          },
          {
            "alias": null,
            "args": [
              (v8/*: any*/)
            ],
            "concreteType": "ArtistSeriesConnection",
            "kind": "LinkedField",
            "name": "artistSeriesConnection",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": "artistSeriesConnection(first:0)"
          },
          {
            "alias": null,
            "args": [
              (v8/*: any*/),
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
            "selections": (v7/*: any*/),
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
                "args": (v6/*: any*/),
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
                          (v5/*: any*/),
                          (v2/*: any*/)
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
          (v2/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "100d822d7282eace40c3521d5d99d606",
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
        "artist.articlesConnection.totalCount": (v9/*: any*/),
        "artist.artistSeriesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistSeriesConnection"
        },
        "artist.artistSeriesConnection.totalCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "artist.counts.relatedArtists": (v9/*: any*/),
        "artist.featuredStory": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStory"
        },
        "artist.featuredStory.about": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryAbout"
        },
        "artist.featuredStory.about.body": (v10/*: any*/),
        "artist.featuredStory.about.portrait": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryImage"
        },
        "artist.featuredStory.about.portrait.altText": (v11/*: any*/),
        "artist.featuredStory.about.portrait.credit": (v10/*: any*/),
        "artist.featuredStory.about.portrait.image": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Image"
        },
        "artist.featuredStory.about.portrait.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artist.featuredStory.about.portrait.image.resized.src": (v11/*: any*/),
        "artist.featuredStory.about.portrait.image.resized.srcSet": (v11/*: any*/),
        "artist.featuredStory.about.tagline": (v10/*: any*/),
        "artist.featuredStory.accentColor": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryAccentColor"
        },
        "artist.featuredStory.accentColor.hex": (v11/*: any*/),
        "artist.featuredStory.accentColor.textColor": {
          "enumValues": [
            "BLACK",
            "WHITE"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArtistStoryTextColor"
        },
        "artist.featuredStory.id": (v12/*: any*/),
        "artist.featuredStory.internalID": (v12/*: any*/),
        "artist.featuredStory.motionVideos": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistStoryVideo"
        },
        "artist.featuredStory.motionVideos.caption": (v10/*: any*/),
        "artist.featuredStory.motionVideos.id": (v12/*: any*/),
        "artist.featuredStory.motionVideos.internalID": (v12/*: any*/),
        "artist.featuredStory.motionVideos.quote": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryQuote"
        },
        "artist.featuredStory.motionVideos.quote.attribution": (v10/*: any*/),
        "artist.featuredStory.motionVideos.quote.text": (v11/*: any*/),
        "artist.featuredStory.motionVideos.video": (v13/*: any*/),
        "artist.featuredStory.motionVideos.video.aspectRatio": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artist.featuredStory.motionVideos.video.id": (v12/*: any*/),
        "artist.featuredStory.motionVideos.video.playerUrl": (v11/*: any*/),
        "artist.featuredStory.motionVideos.video.title": (v11/*: any*/),
        "artist.featuredStory.processVideo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryVideo"
        },
        "artist.featuredStory.processVideo.id": (v12/*: any*/),
        "artist.featuredStory.processVideo.video": (v13/*: any*/),
        "artist.featuredStory.processVideo.video.id": (v12/*: any*/),
        "artist.featuredStory.processVideo.video.playerUrl": (v11/*: any*/),
        "artist.featuredStory.processVideo.video.title": (v11/*: any*/),
        "artist.href": (v10/*: any*/),
        "artist.id": (v12/*: any*/),
        "artist.insights": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistInsight"
        },
        "artist.insights.__typename": (v11/*: any*/),
        "artist.internalID": (v12/*: any*/),
        "artist.name": (v10/*: any*/),
        "artist.related": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistRelatedData"
        },
        "artist.related.genes": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GeneConnection"
        },
        "artist.related.genes.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "GeneEdge"
        },
        "artist.related.genes.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artist.related.genes.edges.node.__typename": (v11/*: any*/),
        "artist.related.genes.edges.node.id": (v12/*: any*/),
        "artist.showsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowConnection"
        },
        "artist.showsConnection.totalCount": (v9/*: any*/)
      }
    },
    "name": "ArtistOverview_Test_Query",
    "operationKind": "query",
    "text": "query ArtistOverview_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistOverview_artist\n    id\n  }\n}\n\nfragment ArtistOverview_artist on Artist {\n  internalID\n  href\n  name\n  featuredStory {\n    internalID\n    id\n  }\n  ...ArtistStoryAbout_artist\n  insights(excludeBlanks: true) {\n    __typename\n  }\n  articlesConnection(first: 1) {\n    totalCount\n  }\n  artistSeriesConnection(first: 0) {\n    totalCount\n  }\n  showsConnection(first: 0, status: \"running\") {\n    totalCount\n  }\n  counts {\n    relatedArtists\n  }\n  related {\n    genes(first: 1) {\n      edges {\n        node {\n          __typename\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistStoryAbout_artist on Artist {\n  featuredStory {\n    accentColor {\n      hex\n      textColor\n    }\n    about {\n      tagline\n      body(format: HTML)\n      portrait {\n        altText\n        credit\n        image {\n          resized(width: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n            src\n            srcSet\n          }\n        }\n      }\n    }\n    processVideo {\n      video {\n        ...ArtistStoryProcessVideo_video\n        id\n      }\n      id\n    }\n    motionVideos {\n      ...ArtistStoryMotionVideos_motionVideos\n      id\n    }\n    id\n  }\n}\n\nfragment ArtistStoryMotionVideos_motionVideos on ArtistStoryVideo {\n  internalID\n  caption\n  quote {\n    text\n    attribution\n  }\n  video {\n    playerUrl\n    aspectRatio\n    title\n    id\n  }\n}\n\nfragment ArtistStoryProcessVideo_video on Video {\n  playerUrl\n  title\n}\n"
  }
};
})();

(node as any).hash = "7f1fce185738c92829ec2902d2211a17";

export default node;
