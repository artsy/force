/**
 * @generated SignedSource<<cf4c34e87caf82abb789c5042796ff5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistStoryHeaderImage_artist$data = {
  readonly coverArtwork: {
    readonly image: {
      readonly height: number | null | undefined;
      readonly src: string | null | undefined;
      readonly width: number | null | undefined;
    } | null | undefined;
    readonly imageTitle: string | null | undefined;
  } | null | undefined;
  readonly featuredStory: {
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
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ArtistStoryHeaderImage_artist";
};
export type ArtistStoryHeaderImage_artist$key = {
  readonly " $data"?: ArtistStoryHeaderImage_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistStoryHeaderImage_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistStoryHeaderImage_artist",
  "selections": [
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "2783f5ff87ec1d38c6430148db3707ae";

export default node;
