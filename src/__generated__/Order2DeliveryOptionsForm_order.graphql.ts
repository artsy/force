/**
 * @generated SignedSource<<6fd998e66dfde9244ecabd42ffa36b23>>
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
export type Order2DeliveryOptionsForm_order$data = {
  readonly fulfillmentOptions: ReadonlyArray<{
    readonly amount: {
      readonly currencyCode: string;
      readonly display: string | null | undefined;
      readonly minor: any;
    } | null | undefined;
    readonly selected: boolean | null | undefined;
    readonly shippingQuoteId: string | null | undefined;
    readonly type: FulfillmentOptionTypeEnum;
  }>;
  readonly internalID: string;
  readonly mode: OrderModeEnum;
  readonly selectedFulfillmentOption: {
    readonly type: FulfillmentOptionTypeEnum;
  } | null | undefined;
  readonly shippingOrigin: string | null | undefined;
  readonly shippingRadius: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"useCompleteFulfillmentDetailsData_order">;
  readonly " $fragmentType": "Order2DeliveryOptionsForm_order";
};
export type Order2DeliveryOptionsForm_order$key = {
  readonly " $data"?: Order2DeliveryOptionsForm_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryOptionsForm_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DeliveryOptionsForm_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCompleteFulfillmentDetailsData_order"
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
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FulfillmentOption",
      "kind": "LinkedField",
      "name": "fulfillmentOptions",
      "plural": true,
      "selections": [
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
            },
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
              "name": "currencyCode",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "selected",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "shippingQuoteId",
          "storageKey": null
        }
      ],
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
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingOrigin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingRadius",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "ec32d0840ce21218923418a0909c9200";

export default node;
