/**
 * @generated SignedSource<<4dbd9e2ec51e49a02d0cb48de7c9cfe3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FulfillmentOptionTypeEnum = "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2DeliveryOptionsStep_order$data = {
  readonly internalID: string;
  readonly selectedFulfillmentOption: {
    readonly amount: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly type: FulfillmentOptionTypeEnum;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryOptionsCompletedView_order" | "Order2DeliveryOptionsForm_order">;
  readonly " $fragmentType": "Order2DeliveryOptionsStep_order";
};
export type Order2DeliveryOptionsStep_order$key = {
  readonly " $data"?: Order2DeliveryOptionsStep_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryOptionsStep_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DeliveryOptionsStep_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DeliveryOptionsForm_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DeliveryOptionsCompletedView_order"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FulfillmentOption",
      "kind": "LinkedField",
      "name": "selectedFulfillmentOption",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "amount",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "display",
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

(node as any).hash = "ab89dc2f509bb55b8f69297e0b5f775a";

export default node;
