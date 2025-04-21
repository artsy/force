/**
 * @generated SignedSource<<e2d87c5310c5a5ea8864fe5e14526916>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ExpressCheckoutSection_order$data = {
  readonly internalID: string;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly isFixedShippingFeeOnly: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly " $fragmentType": "ExpressCheckoutSection_order";
};
export type ExpressCheckoutSection_order$key = {
  readonly " $data"?: ExpressCheckoutSection_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExpressCheckoutSection_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExpressCheckoutSection_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
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
              "name": "isFixedShippingFeeOnly",
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

(node as any).hash = "1619c2e4d112a7322eb535c9fb7e4948";

export default node;
