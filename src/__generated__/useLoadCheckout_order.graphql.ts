/**
 * @generated SignedSource<<350985bb6b5e7e2c5f233544f7fb0292>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useLoadCheckout_order$data = {
  readonly fulfillmentDetails: {
    readonly addressLine1: string | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly isAcquireable: boolean | null | undefined;
    } | null | undefined;
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
      "concreteType": "FulfillmentDetails",
      "kind": "LinkedField",
      "name": "fulfillmentDetails",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "addressLine1",
          "storageKey": null
        }
      ],
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
              "name": "isAcquireable",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
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

(node as any).hash = "fb498b042ba94157ee27836aafbea7dc";

export default node;
