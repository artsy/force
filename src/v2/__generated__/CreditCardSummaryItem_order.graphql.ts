/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CreditCardSummaryItem_order = {
    readonly creditCard: {
        readonly brand: string;
        readonly lastDigits: string;
        readonly expirationYear: number;
        readonly expirationMonth: number;
    } | null;
    readonly " $refType": "CreditCardSummaryItem_order";
};
export type CreditCardSummaryItem_order$data = CreditCardSummaryItem_order;
export type CreditCardSummaryItem_order$key = {
    readonly " $data"?: CreditCardSummaryItem_order$data;
    readonly " $fragmentRefs": FragmentRefs<"CreditCardSummaryItem_order">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreditCardSummaryItem_order",
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
  "type": "CommerceOrder"
};
(node as any).hash = 'a92d2e7b3be6db434a54e7812b352637';
export default node;
