/**
 * @generated SignedSource<<0fa5cc6995db2ac785654e784804d14c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsPaymentsMethods_me$data = {
  readonly bankAccounts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"SettingsBankAccount_bankAccount">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly creditCards: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"SettingsCreditCard_creditCard">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "SettingsPaymentsMethods_me";
};
export type SettingsPaymentsMethods_me$key = {
  readonly " $data"?: SettingsPaymentsMethods_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsPaymentsMethods_me">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
],
v1 = {
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
  "name": "SettingsPaymentsMethods_me",
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
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SettingsCreditCard_creditCard"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "creditCards(first:50)"
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SettingsBankAccount_bankAccount"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "bankAccounts(first:50)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "ac17c5262c90aa4d9a410b45fce4ab47";

export default node;
