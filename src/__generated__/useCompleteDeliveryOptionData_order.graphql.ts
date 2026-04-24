/**
 * @generated SignedSource<<89d04a70a520145c74d388c77e6b1a71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FulfillmentOptionTypeEnum = "ARTSY_EXPRESS" | "ARTSY_STANDARD" | "ARTSY_WHITE_GLOVE" | "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useCompleteDeliveryOptionData_order$data = {
  readonly selectedFulfillmentOption: {
    readonly amount: {
      readonly display: string | null | undefined;
      readonly minor: any;
    } | null | undefined;
    readonly type: FulfillmentOptionTypeEnum;
  } | null | undefined;
  readonly " $fragmentType": "useCompleteDeliveryOptionData_order";
};
export type useCompleteDeliveryOptionData_order$key = {
  readonly " $data"?: useCompleteDeliveryOptionData_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCompleteDeliveryOptionData_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCompleteDeliveryOptionData_order",
  "selections": [
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
              "name": "minor",
              "storageKey": null
            },
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

(node as any).hash = "c5dc01b6407690ba0260e2655acc7507";

export default node;
