/**
 * @generated SignedSource<<7f9f3471ff569752ba84b9678e1c4606>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryAbout_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistStoryAbout_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryAbout_artist">;
  } | null | undefined;
};
export type ArtistStoryAbout_Test_Query = {
  response: ArtistStoryAbout_Test_Query$data;
  variables: ArtistStoryAbout_Test_Query$variables;
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
  "name": "playerUrl",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
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
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
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
    "name": "ArtistStoryAbout_Test_Query",
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
            "name": "ArtistStoryAbout_artist"
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
    "name": "ArtistStoryAbout_Test_Query",
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
                      (v1/*: any*/),
                      (v2/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "internalID",
                    "storageKey": null
                  },
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
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "aspectRatio",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "artist(id:\"heidi-lau\")"
      }
    ]
  },
  "params": {
    "cacheID": "cd732827e242285d83f7515d021c1a4a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
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
        "artist.featuredStory.about.body": (v4/*: any*/),
        "artist.featuredStory.about.portrait": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryImage"
        },
        "artist.featuredStory.about.portrait.altText": (v5/*: any*/),
        "artist.featuredStory.about.portrait.credit": (v4/*: any*/),
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
        "artist.featuredStory.about.portrait.image.resized.src": (v5/*: any*/),
        "artist.featuredStory.about.portrait.image.resized.srcSet": (v5/*: any*/),
        "artist.featuredStory.about.tagline": (v4/*: any*/),
        "artist.featuredStory.accentColor": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryAccentColor"
        },
        "artist.featuredStory.accentColor.hex": (v5/*: any*/),
        "artist.featuredStory.accentColor.textColor": {
          "enumValues": [
            "BLACK",
            "WHITE"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArtistStoryTextColor"
        },
        "artist.featuredStory.id": (v6/*: any*/),
        "artist.featuredStory.motionVideos": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtistStoryVideo"
        },
        "artist.featuredStory.motionVideos.caption": (v4/*: any*/),
        "artist.featuredStory.motionVideos.id": (v6/*: any*/),
        "artist.featuredStory.motionVideos.internalID": (v6/*: any*/),
        "artist.featuredStory.motionVideos.quote": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryQuote"
        },
        "artist.featuredStory.motionVideos.quote.attribution": (v4/*: any*/),
        "artist.featuredStory.motionVideos.quote.text": (v5/*: any*/),
        "artist.featuredStory.motionVideos.video": (v7/*: any*/),
        "artist.featuredStory.motionVideos.video.aspectRatio": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artist.featuredStory.motionVideos.video.id": (v6/*: any*/),
        "artist.featuredStory.motionVideos.video.playerUrl": (v5/*: any*/),
        "artist.featuredStory.motionVideos.video.title": (v5/*: any*/),
        "artist.featuredStory.processVideo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStoryVideo"
        },
        "artist.featuredStory.processVideo.id": (v6/*: any*/),
        "artist.featuredStory.processVideo.video": (v7/*: any*/),
        "artist.featuredStory.processVideo.video.id": (v6/*: any*/),
        "artist.featuredStory.processVideo.video.playerUrl": (v5/*: any*/),
        "artist.featuredStory.processVideo.video.title": (v5/*: any*/),
        "artist.id": (v6/*: any*/)
      }
    },
    "name": "ArtistStoryAbout_Test_Query",
    "operationKind": "query",
    "text": "query ArtistStoryAbout_Test_Query {\n  artist(id: \"heidi-lau\") {\n    ...ArtistStoryAbout_artist\n    id\n  }\n}\n\nfragment ArtistStoryAbout_artist on Artist {\n  featuredStory {\n    accentColor {\n      hex\n      textColor\n    }\n    about {\n      tagline\n      body(format: HTML)\n      portrait {\n        altText\n        credit\n        image {\n          resized(width: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n            src\n            srcSet\n          }\n        }\n      }\n    }\n    processVideo {\n      video {\n        ...ArtistStoryProcessVideo_video\n        id\n      }\n      id\n    }\n    motionVideos {\n      ...ArtistStoryMotionVideos_motionVideos\n      id\n    }\n    id\n  }\n}\n\nfragment ArtistStoryMotionVideos_motionVideos on ArtistStoryVideo {\n  internalID\n  caption\n  quote {\n    text\n    attribution\n  }\n  video {\n    playerUrl\n    aspectRatio\n    title\n    id\n  }\n}\n\nfragment ArtistStoryProcessVideo_video on Video {\n  playerUrl\n  title\n}\n"
  }
};
})();

(node as any).hash = "89a1980d8495290a5cb746ac6fb38f2f";

export default node;
