/**
 * @generated SignedSource<<136aab5d716474084e99cb294b3755f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2ExactPriceOfferForm_order$data = {
  readonly currencyCode: string;
  readonly lineItems: ReadonlyArray<{
    readonly listPrice: {
      readonly major: number;
    } | null | undefined;
  } | null | undefined>;
  readonly " $fragmentType": "Order2ExactPriceOfferForm_order";
};
export type Order2ExactPriceOfferForm_order$key = {
  readonly " $data"?: Order2ExactPriceOfferForm_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2ExactPriceOfferForm_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2ExactPriceOfferForm_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencyCode",
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
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "listPrice",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "major",
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

(node as any).hash = "062951d8466c3d0c376fb6fe848363bd";

export default node;
