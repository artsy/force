/**
 * @generated SignedSource<<a1415ffad78aa09fa113377c3e1a3801>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Payment_me$data = {
  readonly bankAccounts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly last4: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"BankAccountPicker_me" | "CreditCardPicker_me">;
  readonly " $fragmentType": "Payment_me";
};
export type Payment_me$key = {
  readonly " $data"?: Payment_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Payment_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Payment_me",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreditCardPicker_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BankAccountPicker_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "1286c3ebd7b93b1c12d1c450fc570c6e";

export default node;
