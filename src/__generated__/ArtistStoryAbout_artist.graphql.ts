/**
 * @generated SignedSource<<a576a5f4f46a0c51778f7ffdf6289b3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ArtistStoryTextColor = "BLACK" | "WHITE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryAbout_artist$data = {
  readonly featuredStory: {
    readonly about: {
      readonly body: string | null | undefined;
      readonly portrait: {
        readonly altText: string;
        readonly credit: string | null | undefined;
        readonly image: {
          readonly resized: {
            readonly src: string;
            readonly srcSet: string;
          } | null | undefined;
        };
      } | null | undefined;
      readonly tagline: string | null | undefined;
    } | null | undefined;
    readonly accentColor: {
      readonly hex: string;
      readonly textColor: ArtistStoryTextColor;
    } | null | undefined;
    readonly motionVideos: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryMotionVideos_motionVideos">;
    }>;
    readonly processVideo: {
      readonly video: {
        readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryProcessVideo_video">;
      };
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtistStoryAbout_artist";
};
export type ArtistStoryAbout_artist$key = {
  readonly " $data"?: ArtistStoryAbout_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryAbout_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryAbout_artist",
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
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtistStoryProcessVideo_video"
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
          "name": "motionVideos",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArtistStoryMotionVideos_motionVideos"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "41f2dae0b7741ba5cd79b0537104d16f";

export default node;
