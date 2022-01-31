/**
 * @generated SignedSource<<f77456f4d31988a78d46c20bdae075a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreditCardSummaryItem_order$data = {
  readonly creditCard: {
    readonly brand: string;
    readonly lastDigits: string;
    readonly expirationYear: number;
    readonly expirationMonth: number;
  } | null;
  readonly " $fragmentType": "CreditCardSummaryItem_order";
};
export type CreditCardSummaryItem_order$key = {
  readonly " $data"?: CreditCardSummaryItem_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreditCardSummaryItem_order">;
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
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "a92d2e7b3be6db434a54e7812b352637";

export default node;
