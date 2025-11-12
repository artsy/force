/**
 * @generated SignedSource<<3f013f0d8cf18dbc6cf54d0e2e44cac9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ImmersiveView_filtered_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly immersiveArtworkNode: {
      readonly formattedMetadata: string | null | undefined;
      readonly image: {
        readonly aspectRatio: number;
        readonly blurhash: string | null | undefined;
        readonly url: string | null | undefined;
      } | null | undefined;
      readonly internalID: string;
      readonly slug: string;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly pageInfo: {
    readonly hasNextPage: boolean;
  };
  readonly " $fragmentType": "ImmersiveView_filtered_artworks";
};
export type ImmersiveView_filtered_artworks$key = {
  readonly " $data"?: ImmersiveView_filtered_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"ImmersiveView_filtered_artworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ImmersiveView_filtered_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PageInfo",
      "kind": "LinkedField",
      "name": "pageInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasNextPage",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": "immersiveArtworkNode",
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
              "name": "internalID",
              "storageKey": null
            },
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
              "alias": null,
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
                        "main",
                        "larger",
                        "large"
                      ]
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": "url(version:[\"main\",\"larger\",\"large\"])"
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

(node as any).hash = "e2e852afaeb4efa6801b5adbeaee1372";

export default node;
