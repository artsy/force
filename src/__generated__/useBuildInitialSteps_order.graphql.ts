/**
 * @generated SignedSource<<1482ab7226d55205f9a34e8d9005d61e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FulfillmentOptionTypeEnum = "ARTSY_EXPRESS" | "ARTSY_STANDARD" | "ARTSY_WHITE_GLOVE" | "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useBuildInitialSteps_order$data = {
  readonly mode: OrderModeEnum;
  readonly selectedFulfillmentOption: {
    readonly type: FulfillmentOptionTypeEnum;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"useCompleteDeliveryOptionData_order" | "useCompleteFulfillmentDetailsData_order" | "useCompleteOfferData_order" | "useCompletePaymentData_order">;
  readonly " $fragmentType": "useBuildInitialSteps_order";
};
export type useBuildInitialSteps_order$key = {
  readonly " $data"?: useBuildInitialSteps_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"useBuildInitialSteps_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useBuildInitialSteps_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCompleteOfferData_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCompleteFulfillmentDetailsData_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCompleteDeliveryOptionData_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCompletePaymentData_order"
    },
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

(node as any).hash = "7e2e1202334435bb152c02562a652184";

export default node;
