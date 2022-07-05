/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommercePaymentMethodEnum = "ACH_TRANSFER" | "CREDIT_CARD" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
export type PaymentMethodSummaryItem_order = {
    readonly paymentMethod: CommercePaymentMethodEnum | null;
    readonly paymentMethodDetails: ({
        readonly __typename: "CreditCard";
        readonly brand: string;
        readonly lastDigits: string;
        readonly expirationYear: number;
        readonly expirationMonth: number;
    } | {
        readonly __typename: "BankAccount";
        readonly last4: string;
    } | {
        readonly __typename: "WireTransfer";
        readonly isManualPayment: boolean;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly " $refType": "PaymentMethodSummaryItem_order";
};
export type PaymentMethodSummaryItem_order$data = PaymentMethodSummaryItem_order;
export type PaymentMethodSummaryItem_order$key = {
    readonly " $data"?: PaymentMethodSummaryItem_order$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PaymentMethodSummaryItem_order">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentMethodSummaryItem_order",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "paymentMethodDetails",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "brand",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lastDigits",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "expirationYear",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "expirationMonth",
              "storageKey": null
            }
          ],
          "type": "CreditCard",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "last4",
              "storageKey": null
            }
          ],
          "type": "BankAccount",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isManualPayment",
              "storageKey": null
            }
          ],
          "type": "WireTransfer",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
(node as any).hash = '4938da2b1934e0f537ef9e699c47eff8';
export default node;
