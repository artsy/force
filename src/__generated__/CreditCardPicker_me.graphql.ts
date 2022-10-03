/**
 * @generated SignedSource<<30bc860d920f66329038abc7871dcc7b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreditCardPicker_me$data = {
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
  readonly " $fragmentType": "CreditCardPicker_me";
};
export type CreditCardPicker_me$key = {
  readonly " $data"?: CreditCardPicker_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreditCardPicker_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreditCardPicker_me",
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
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "8eeccee9b7b0eb1c81409e58eca74f21";

export default node;
