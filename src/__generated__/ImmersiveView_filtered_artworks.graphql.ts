/**
 * @generated SignedSource<<c97dc1ac296e4381c7ecfd552386c197>>
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
        readonly url: string | null | undefined;
      } | null | undefined;
      readonly slug: string;
    } | null | undefined;
  } | null | undefined> | null | undefined;
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

(node as any).hash = "881595f70a412848181aa8d16eda7d04";

export default node;
