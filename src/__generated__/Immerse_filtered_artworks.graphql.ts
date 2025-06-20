/**
 * @generated SignedSource<<9b158ab2844ad395d4b58a1bb251168e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Immerse_filtered_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly formattedMetadata: string | null | undefined;
      readonly immersiveImage: {
        readonly aspectRatio: number;
        readonly blurhash: string | null | undefined;
        readonly resized: {
          readonly height: number | null | undefined;
          readonly src: string;
          readonly srcSet: string;
          readonly width: number | null | undefined;
        } | null | undefined;
        readonly url: string | null | undefined;
      } | null | undefined;
      readonly slug: string;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "Immerse_filtered_artworks";
};
export type Immerse_filtered_artworks$key = {
  readonly " $data"?: Immerse_filtered_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"Immerse_filtered_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Immerse_filtered_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "formattedMetadata",
              "storageKey": null
            },
            {
              "alias": "immersiveImage",
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
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
                  "name": "blurhash",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "version",
                      "value": [
                        "larger",
                        "large"
                      ]
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": "url(version:[\"larger\",\"large\"])"
                },
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 1000
                    },
                    {
                      "kind": "Literal",
                      "name": "version",
                      "value": [
                        "main",
                        "larger",
                        "large"
                      ]
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
                      "name": "height",
                      "storageKey": null
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
                  "storageKey": "resized(height:1000,version:[\"main\",\"larger\",\"large\"])"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FilterArtworksConnection",
  "abstractKey": null
};

(node as any).hash = "e2fd9f6fc060aa3d37e87b4a2504ab4f";

export default node;
