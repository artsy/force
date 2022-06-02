/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PaymentMethodSummaryItem_order = {
    readonly creditCard: {
        readonly brand: string;
        readonly lastDigits: string;
        readonly expirationYear: number;
        readonly expirationMonth: number;
    } | null;
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
      "concreteType": "CreditCard",
      "kind": "LinkedField",
      "name": "creditCard",
      "plural": false,
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
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
(node as any).hash = '7233567ad05bebb1fcf1734206a5b003';
export default node;
