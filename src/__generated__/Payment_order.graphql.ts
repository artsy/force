/**
 * @generated SignedSource<<dd8913ccea36dcfe2a3d25c0f8cdeb9c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommercePaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Payment_order$data = {
  readonly availablePaymentMethods: ReadonlyArray<CommercePaymentMethodEnum>;
  readonly bankAccountId: string | null;
  readonly buyerTotal: string | null;
  readonly buyerTotalCents: number | null;
  readonly currencyCode: string;
  readonly internalID: string;
  readonly lineItems: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artwork: {
          readonly slug: string;
        } | null;
      } | null;
    } | null> | null;
  } | null;
  readonly mode: CommerceOrderModeEnum | null;
  readonly paymentMethod: CommercePaymentMethodEnum | null;
  readonly paymentMethodDetails: {
    readonly __typename: "BankAccount";
    readonly id: string;
  } | {
    readonly __typename: "CreditCard";
    readonly id: string;
  } | {
    readonly __typename: "WireTransfer";
    readonly isManualPayment: boolean;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSummaryItem_order" | "BankAccountPicker_order" | "CreditCardPicker_order" | "TransactionDetailsSummaryItem_order">;
  readonly " $fragmentType": "Payment_order";
};
export type Payment_order$key = {
  readonly " $data"?: Payment_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Payment_order">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Payment_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bankAccountId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availablePaymentMethods",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "buyerTotalCents",
      "storageKey": null
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
      "name": "currencyCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "precision",
          "value": 2
        }
      ],
      "kind": "ScalarField",
      "name": "buyerTotal",
      "storageKey": "buyerTotal(precision:2)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceLineItemConnection",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceLineItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceLineItem",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
          "selections": (v0/*: any*/),
          "type": "CreditCard",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v0/*: any*/),
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreditCardPicker_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BankAccountPicker_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order"
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "36bd58e36dba50cf9a0c1a266ee9b9e2";

export default node;
