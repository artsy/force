/**
 * @generated SignedSource<<f6c617d74295f5386f0be10ae715abfe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BankAccountTypes = "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2PaymentForm_me$data = {
  readonly bankAccounts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "BankAccount";
        readonly bankName: string | null | undefined;
        readonly internalID: string;
        readonly last4: string;
        readonly type: BankAccountTypes;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly creditCards: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "CreditCard";
        readonly brand: string;
        readonly expirationMonth: number;
        readonly expirationYear: number;
        readonly internalID: string;
        readonly lastDigits: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Order2PaymentForm_me";
};
export type Order2PaymentForm_me$key = {
  readonly " $data"?: Order2PaymentForm_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentForm_me">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2PaymentForm_me",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
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
                (v1/*: any*/),
                (v2/*: any*/),
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
          "storageKey": null
        }
      ],
      "storageKey": "creditCards(first:10)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "type",
                  "storageKey": null
                },
                (v2/*: any*/),
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
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "bankAccounts(first:10)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "287ef80423a80132687d624f7eafa271";

export default node;
