/**
 * @generated SignedSource<<0345b09db5b87c263164bd0de0244bfc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useLoadCheckout_order$data = {
  readonly internalID: string;
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

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useLoadCheckout_order",
  "selections": [
    (v0/*: any*/),
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
            (v0/*: any*/)
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
})();

(node as any).hash = "4608db26c5b40d99999ece7ad6d7cf72";

export default node;
