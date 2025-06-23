/**
 * @generated SignedSource<<1d7982e90b0725504d013dc5b8035735>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceDrop_priceDrop$data = {
  readonly artwork: {
    readonly artistNames: string | null | undefined;
    readonly href: string | null | undefined;
    readonly image: {
      readonly height: number | null | undefined;
      readonly src: string | null | undefined;
      readonly width: number | null | undefined;
    } | null | undefined;
    readonly title: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ExclusiveAccessBadge_artwork" | "Metadata_artwork">;
  };
  readonly newPrice: number;
  readonly oldPrice: number;
  readonly " $fragmentType": "PriceDrop_priceDrop";
};
export type PriceDrop_priceDrop$key = {
  readonly " $data"?: PriceDrop_priceDrop$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceDrop_priceDrop">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceDrop_priceDrop",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "oldPrice",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "newPrice",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "artwork",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ExclusiveAccessBadge_artwork"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Metadata_artwork"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artistNames",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
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
  "type": "PriceDrop",
  "abstractKey": null
};

(node as any).hash = "1d4de70811b85747218e020b84dc8f1c";

export default node;
