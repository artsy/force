/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PaymentPicker_me = {
    readonly creditCards: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly brand: string;
                readonly lastDigits: string;
                readonly expirationMonth: number;
                readonly expirationYear: number;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "PaymentPicker_me";
};
export type PaymentPicker_me$data = PaymentPicker_me;
export type PaymentPicker_me$key = {
    readonly " $data"?: PaymentPicker_me$data;
    readonly " $fragmentRefs": FragmentRefs<"PaymentPicker_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentPicker_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 100
        }
      ],
      "concreteType": "CreditCardConnection",
      "kind": "LinkedField",
      "name": "creditCards",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CreditCardEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CreditCard",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
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
                  "name": "expirationMonth",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "expirationYear",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "creditCards(first:100)"
    }
  ],
  "type": "Me"
};
(node as any).hash = '7c560989a1629a7d702ebca42324ab84';
export default node;
