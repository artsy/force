/**
 * @generated SignedSource<<871bb027b150ce9c1c70434d5aea5560>>
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
        readonly resized: {
          readonly height: number | null | undefined;
          readonly src: string;
          readonly srcSet: string;
          readonly url: string;
          readonly width: number | null | undefined;
        } | null | undefined;
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

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "larger",
    "large"
  ]
};
return {
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
                    (v0/*: any*/)
                  ],
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": "url(version:[\"main\",\"larger\",\"large\"])"
                },
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 2000
                    },
                    {
                      "kind": "Literal",
                      "name": "quality",
                      "value": 85
                    },
                    (v0/*: any*/),
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 2000
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
                      "name": "src",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "srcSet",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "url",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "width",
                      "storageKey": null
                    }
                  ],
                  "storageKey": "resized(height:2000,quality:85,version:[\"main\",\"larger\",\"large\"],width:2000)"
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
})();

(node as any).hash = "4d3381c4cdd5316abcb3eb1176788f0c";

export default node;
