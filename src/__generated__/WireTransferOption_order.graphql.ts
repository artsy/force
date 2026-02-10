/**
 * @generated SignedSource<<1de807bd74c4b31a8c53f3c499b33327>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WireTransferOption_order$data = {
  readonly code: string;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly href: string | null | undefined;
      readonly meta: {
        readonly share: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined>;
  readonly " $fragmentType": "WireTransferOption_order";
};
export type WireTransferOption_order$key = {
  readonly " $data"?: WireTransferOption_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"WireTransferOption_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WireTransferOption_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LineItem",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "artwork",
          "plural": false,
          "selections": [
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
              "concreteType": "ArtworkMeta",
              "kind": "LinkedField",
              "name": "meta",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "share",
                  "storageKey": null
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
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "bbcad2890a5e95556aca2afc006fc697";

export default node;
