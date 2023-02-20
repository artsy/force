/**
 * @generated SignedSource<<0967f63b7a37bb42f3bae7ab7cb850b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectListItem_item$data = {
  readonly artworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly image: {
          readonly url: string | null;
        } | null;
      } | null;
    } | null> | null;
  } | null;
  readonly artworksCount: number;
  readonly name: string;
  readonly " $fragmentType": "SelectListItem_item";
};
export type SelectListItem_item$key = {
  readonly " $data"?: SelectListItem_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectListItem_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectListItem_item",
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
      "name": "artworksCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
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
      "storageKey": "artworksConnection(first:1)"
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "373729c726892165d91d80908b9129b1";

export default node;
