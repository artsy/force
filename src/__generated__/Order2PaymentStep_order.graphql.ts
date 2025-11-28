/**
 * @generated SignedSource<<9fd71db63f7da12adec299d65d800cc7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderPaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2PaymentStep_order$data = {
  readonly buyerTotal: {
    readonly currencyCode: string;
    readonly minor: any;
  } | null | undefined;
  readonly internalID: string;
  readonly itemsTotal: {
    readonly currencyCode: string;
    readonly minor: any;
  } | null | undefined;
  readonly paymentMethod: OrderPaymentMethodEnum | null | undefined;
  readonly paymentMethodDetails: {
    readonly __typename: "BankAccount";
    readonly internalID: string;
  } | {
    readonly __typename: "CreditCard";
    readonly internalID: string;
  } | {
    readonly __typename: "WireTransfer";
    readonly isManualPayment: boolean;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly seller: {
    readonly __typename: "Partner";
    readonly merchantAccount: {
      readonly externalId: string;
    } | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly shippingTotal: {
    readonly minor: any;
  } | null | undefined;
  readonly taxTotal: {
    readonly minor: any;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentCompletedView_order" | "Order2PaymentForm_order" | "useCompletePaymentData_order">;
  readonly " $fragmentType": "Order2PaymentStep_order";
};
export type Order2PaymentStep_order$key = {
  readonly " $data"?: Order2PaymentStep_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentStep_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = [
  (v0/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minor",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  }
],
v5 = [
  (v3/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2PaymentStep_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCompletePaymentData_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PaymentForm_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PaymentCompletedView_order"
    },
    (v0/*: any*/),
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
        (v1/*: any*/),
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "CreditCard",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "buyerTotal",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "itemsTotal",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "shippingTotal",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "taxTotal",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "seller",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerMerchantAccount",
              "kind": "LinkedField",
              "name": "merchantAccount",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "externalId",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "Partner",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "4882a4d16dd63a7883a19be2cdc5b2b4";

export default node;
