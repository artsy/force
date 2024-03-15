/**
 * @generated SignedSource<<34b528d26963f49d81f2e24b46755c58>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectArtworkListItem_item$data = {
  readonly artworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly image: {
          readonly url: string | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly artworksCount: number;
  readonly name: string;
  readonly shareableWithPartners: boolean;
  readonly " $fragmentType": "SelectArtworkListItem_item";
};
export type SelectArtworkListItem_item$key = {
  readonly " $data"?: SelectArtworkListItem_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectArtworkListItem_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectArtworkListItem_item",
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
      "args": null,
      "kind": "ScalarField",
      "name": "shareableWithPartners",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "SAVED_AT_DESC"
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
                          "name": "version",
                          "value": "square"
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "url",
                      "storageKey": "url(version:\"square\")"
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
      "storageKey": "artworksConnection(first:1,sort:\"SAVED_AT_DESC\")"
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "076b370155eb2a71d13fae1c19d214da";

export default node;
