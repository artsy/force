/**
 * @generated SignedSource<<660f05bd5715976e2e519dae798809b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsPaymentsMethods_me$data = {
  readonly creditCards: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"SettingsPaymentsMethod_method">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "SettingsPaymentsMethods_me";
};
export type SettingsPaymentsMethods_me$key = {
  readonly " $data"?: SettingsPaymentsMethods_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsPaymentsMethods_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsPaymentsMethods_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SettingsPaymentsMethod_method"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "creditCards(first:50)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "3668597e56c9dd0028659b5a362fd72b";

export default node;
