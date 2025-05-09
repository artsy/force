/**
 * @generated SignedSource<<b1211049603a483c65937c15d26141b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useLoadCheckout_order$data = {
  readonly lineItems: ReadonlyArray<{
    readonly artworkVersion: {
      readonly internalID: string;
    } | null | undefined;
  } | null | undefined>;
  readonly " $fragmentType": "useLoadCheckout_order";
};
export type useLoadCheckout_order$key = {
  readonly " $data"?: useLoadCheckout_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"useLoadCheckout_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useLoadCheckout_order",
  "selections": [
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
          "concreteType": "ArtworkVersion",
          "kind": "LinkedField",
          "name": "artworkVersion",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
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

(node as any).hash = "f9bf9c0ed46bfcd945996ad2bb8c62e0";

export default node;
