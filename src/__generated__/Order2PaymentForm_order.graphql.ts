/**
 * @generated SignedSource<<bd1b8d9121bc09a321c59fbc9955b319>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderPaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2PaymentForm_order$data = {
  readonly availablePaymentMethods: ReadonlyArray<OrderPaymentMethodEnum>;
  readonly code: string;
  readonly internalID: string;
  readonly itemsTotal: {
    readonly currencyCode: string;
    readonly minor: any;
  } | null | undefined;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly artworkMeta: {
        readonly share: string | null | undefined;
      } | null | undefined;
      readonly href: string | null | undefined;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly seller: {
    readonly merchantAccount?: {
      readonly externalId: string;
    } | null | undefined;
  } | null | undefined;
  readonly source: OrderSourceEnum;
  readonly " $fragmentType": "Order2PaymentForm_order";
};
export type Order2PaymentForm_order$key = {
  readonly " $data"?: Order2PaymentForm_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentForm_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2PaymentForm_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
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
      "name": "internalID",
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
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "itemsTotal",
      "plural": false,
      "selections": [
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
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "seller",
      "plural": false,
      "selections": [
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
              "name": "href",
              "storageKey": null
            },
            {
              "alias": "artworkMeta",
              "args": null,
              "concreteType": "ArtworkMeta",
              "kind": "LinkedField",
              "name": "meta",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "share",
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
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "44fa2db387b66b66bc2c24f5e14543cb";

export default node;
