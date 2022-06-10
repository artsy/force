/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BankAccountPicker_me = {
    readonly creditCards: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly lastDigits: string;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "BankAccountPicker_me";
};
export type BankAccountPicker_me$data = BankAccountPicker_me;
export type BankAccountPicker_me$key = {
    readonly " $data"?: BankAccountPicker_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"BankAccountPicker_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BankAccountPicker_me",
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
                  "name": "lastDigits",
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
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '8a00e464bb180ac247de767d22468e38';
export default node;
