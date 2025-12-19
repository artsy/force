/**
 * @generated SignedSource<<8ce28735dd0e1a8c981074c66cc10ee4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FulfillmentOptionTypeEnum = "ARTSY_EXPRESS" | "ARTSY_STANDARD" | "ARTSY_WHITE_GLOVE" | "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutContext_order$data = {
  readonly internalID: string;
  readonly mode: OrderModeEnum;
  readonly selectedFulfillmentOption: {
    readonly type: FulfillmentOptionTypeEnum;
  } | null | undefined;
  readonly source: OrderSourceEnum;
  readonly stripeConfirmationToken: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"useBuildInitialSteps_order">;
  readonly " $fragmentType": "Order2CheckoutContext_order";
};
export type Order2CheckoutContext_order$key = {
  readonly " $data"?: Order2CheckoutContext_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutContext_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CheckoutContext_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useBuildInitialSteps_order"
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
      "kind": "ScalarField",
      "name": "source",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stripeConfirmationToken",
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

(node as any).hash = "0d57f6fcf0bbc3519fe4340629abb142";

export default node;
