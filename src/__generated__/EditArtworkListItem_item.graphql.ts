/**
 * @generated SignedSource<<79c680d68b73cf9d364928a7da2a1c10>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditArtworkListItem_item$data = {
  readonly artworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly image: {
          readonly resized: {
            readonly src: string;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly artworksCount: number;
  readonly internalID: string;
  readonly name: string;
  readonly " $fragmentType": "EditArtworkListItem_item";
};
export type EditArtworkListItem_item$key = {
  readonly " $data"?: EditArtworkListItem_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditArtworkListItem_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditArtworkListItem_item",
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
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "onlyVisible",
          "value": true
        }
      ],
      "kind": "ScalarField",
      "name": "artworksCount",
      "storageKey": "artworksCount(onlyVisible:true)"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 4
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkEdge",
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
                          "name": "height",
                          "value": 60
                        },
                        {
                          "kind": "Literal",
                          "name": "version",
                          "value": [
                            "square"
                          ]
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 60
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
                      "storageKey": "resized(height:60,version:[\"square\"],width:60)"
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
      "storageKey": "artworksConnection(first:4)"
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "0f58e8527fcb3366f8722093b978dc8d";

export default node;
