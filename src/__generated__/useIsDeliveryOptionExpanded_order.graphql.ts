/**
 * @generated SignedSource<<58a87b1c152859921c46c28771a1984b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FulfillmentOptionTypeEnum = "ARTSY_EXPRESS" | "ARTSY_STANDARD" | "ARTSY_WHITE_GLOVE" | "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useIsDeliveryOptionExpanded_order$data = {
  readonly selectedFulfillmentOption: {
    readonly type: FulfillmentOptionTypeEnum;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"useCompleteFulfillmentDetailsData_order">;
  readonly " $fragmentType": "useIsDeliveryOptionExpanded_order";
};
export type useIsDeliveryOptionExpanded_order$key = {
  readonly " $data"?: useIsDeliveryOptionExpanded_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"useIsDeliveryOptionExpanded_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useIsDeliveryOptionExpanded_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCompleteFulfillmentDetailsData_order"
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "6ac603b9ec18cd647480ad0d7ac8bd7e";

export default node;
