/**
 * @generated SignedSource<<a53e7f4d88f0f6e3f66405808b2e6734>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderCreditCardWalletTypeEnum = "APPLE_PAY" | "GOOGLE_PAY" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type OrderDetailsPaymentInfo_order$data = {
  readonly creditCardWalletType: OrderCreditCardWalletTypeEnum | null | undefined;
  readonly paymentMethodDetails: {
    readonly __typename: "BankAccount";
    readonly bankName: string | null | undefined;
    readonly last4: string;
  } | {
    readonly __typename: "CreditCard";
    readonly brand: string;
    readonly expirationMonth: number;
    readonly expirationYear: number;
    readonly lastDigits: string;
  } | {
    readonly __typename: "WireTransfer";
    readonly isManualPayment: boolean;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly " $fragmentType": "OrderDetailsPaymentInfo_order";
};
export type OrderDetailsPaymentInfo_order$key = {
  readonly " $data"?: OrderDetailsPaymentInfo_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsPaymentInfo_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderDetailsPaymentInfo_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "creditCardWalletType",
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "bankName",
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

(node as any).hash = "6f3be68203f57ff46f2a367e62c4c8d6";

export default node;
