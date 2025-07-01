/**
 * @generated SignedSource<<011002da556636378cff02f980750832>>
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

(node as any).hash = "16690dfb255db233eddcbd2e127f5590";

export default node;
