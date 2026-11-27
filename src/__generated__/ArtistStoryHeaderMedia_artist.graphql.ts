/**
 * @generated SignedSource<<e3f3d870634dfea5123175dc5936d5fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryHeaderMedia_artist$data = {
  readonly featuredStory: {
    readonly headerImage: {
      readonly image: {
        readonly resized: {
          readonly src: string;
        } | null | undefined;
      };
    } | null | undefined;
    readonly headerVideo: {
      readonly video: {
        readonly aspectRatio: number | null | undefined;
        readonly playerUrl: string;
        readonly title: string;
      };
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryHeaderImage_artist">;
  readonly " $fragmentType": "ArtistStoryHeaderMedia_artist";
};
export type ArtistStoryHeaderMedia_artist$key = {
  readonly " $data"?: ArtistStoryHeaderMedia_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryHeaderMedia_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryHeaderMedia_artist",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
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
          "concreteType": "ArtistStoryImage",
          "kind": "LinkedField",
          "name": "headerImage",
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
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "src",
                      "storageKey": null
                    }
                  ],
                  "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:1600)"
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStoryHeaderImage_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "893ef03d9822e2587f1e355305d62341";

export default node;
