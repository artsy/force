/**
 * @generated SignedSource<<6bda51a8524a43125f49702f916c93a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryHeaderMedia_story$data = {
  readonly headerImage: {
    readonly altText: string;
    readonly credit: string | null | undefined;
    readonly image: {
      readonly resized: {
        readonly src: string;
        readonly srcSet: string;
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
  readonly " $fragmentType": "ArtistStoryHeaderMedia_story";
};
export type ArtistStoryHeaderMedia_story$key = {
  readonly " $data"?: ArtistStoryHeaderMedia_story$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryHeaderMedia_story">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryHeaderMedia_story",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "srcSet",
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
  "type": "ArtistStory",
  "abstractKey": null
};

(node as any).hash = "847502077b539dbb8800a5a0cb269864";

export default node;
