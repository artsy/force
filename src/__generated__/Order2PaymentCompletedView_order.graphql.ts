/**
 * @generated SignedSource<<9a46817beeeb6be38395b13c3c92aaaf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderPaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2PaymentCompletedView_order$data = {
  readonly paymentMethod: OrderPaymentMethodEnum | null | undefined;
  readonly paymentMethodDetails: {
    readonly __typename: "BankAccount";
    readonly last4: string;
  } | {
    readonly __typename: "CreditCard";
    readonly brand: string;
    readonly lastDigits: string;
  } | {
    readonly __typename: "WireTransfer";
    readonly isManualPayment: boolean;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly " $fragmentType": "Order2PaymentCompletedView_order";
};
export type Order2PaymentCompletedView_order$key = {
  readonly " $data"?: Order2PaymentCompletedView_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentCompletedView_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2PaymentCompletedView_order",
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
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "9caebceab5dbaed682812e05cbfe7e3c";

export default node;
