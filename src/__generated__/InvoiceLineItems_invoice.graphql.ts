/**
 * @generated SignedSource<<7fe51c611f81107e575a050701d99219>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvoiceLineItems_invoice$data = {
  readonly lineItems: ReadonlyArray<{
    readonly amount: string | null | undefined;
    readonly description: string;
  }>;
  readonly " $fragmentType": "InvoiceLineItems_invoice";
};
export type InvoiceLineItems_invoice$key = {
  readonly " $data"?: InvoiceLineItems_invoice$data;
  readonly " $fragmentSpreads": FragmentRefs<"InvoiceLineItems_invoice">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InvoiceLineItems_invoice",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "InvoiceLineItem",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "precision",
              "value": 2
            }
          ],
          "kind": "ScalarField",
          "name": "amount",
          "storageKey": "amount(precision:2)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Invoice",
  "abstractKey": null
};

(node as any).hash = "a99daa90c2adba129b513e3fdc252924";

export default node;
