/**
 * @generated SignedSource<<b62f7a253f339884bf221cf606652629>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderPaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2RespondApp_order$data = {
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly slug: string;
    } | null | undefined;
  } | null | undefined>;
  readonly paymentMethod: OrderPaymentMethodEnum | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2HelpLinks_order" | "Order2OfferHistory_order" | "Order2PaymentCompletedView_order" | "Order2RespondForm_order" | "Order2RespondSummary_order" | "useCompleteDeliveryOptionData_order" | "useCompleteFulfillmentDetailsData_order">;
  readonly " $fragmentType": "Order2RespondApp_order";
};
export type Order2RespondApp_order$key = {
  readonly " $data"?: Order2RespondApp_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondApp_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2RespondApp_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paymentMethod",
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
              "name": "slug",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondSummary_order"
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
      "name": "Order2PaymentCompletedView_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondForm_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2OfferHistory_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2HelpLinks_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "1d6550aacc0db40a3f5196d1e1aa65af";

export default node;
