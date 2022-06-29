/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BankAccountPicker_me = {
    readonly bankAccounts: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly last4: string;
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
      "concreteType": "BankAccountConnection",
      "kind": "LinkedField",
      "name": "bankAccounts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "BankAccountEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "BankAccount",
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
                  "name": "last4",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "bankAccounts(first:100)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '903c46229440013b8ff64bfcb566b4fe';
export default node;
