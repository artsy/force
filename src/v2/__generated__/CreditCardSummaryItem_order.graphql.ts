/* tslint:disable */

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
  "kind": "Fragment",
  "name": "CreditCardSummaryItem_order",
  "type": "CommerceOrder",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "creditCard",
      "storageKey": null,
      "args": null,
      "concreteType": "CreditCard",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "brand",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "lastDigits",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "expirationYear",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "expirationMonth",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'a92d2e7b3be6db434a54e7812b352637';
export default node;
