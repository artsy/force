/**
 * @generated SignedSource<<c76d90ce07f29fea5d57c69684075612>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2ExpressCheckoutStep_order$data = {
  readonly internalID: string;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly isFixedShippingFeeOnly: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly " $fragmentType": "Order2ExpressCheckoutStep_order";
};
export type Order2ExpressCheckoutStep_order$key = {
  readonly " $data"?: Order2ExpressCheckoutStep_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2ExpressCheckoutStep_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2ExpressCheckoutStep_order",
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

(node as any).hash = "61714a97d836b5be922f7517c6cd8464";

export default node;
