/**
 * @generated SignedSource<<64b11ff42a2eac32de06d670ad543bc7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShippingQuotes2_shippingQuotes$data = ReadonlyArray<{
  readonly node: {
    readonly id: string;
    readonly isSelected: boolean;
    readonly price: string | null | undefined;
    readonly priceCents: number;
    readonly typeName: string;
  } | null | undefined;
  readonly " $fragmentType": "ShippingQuotes2_shippingQuotes";
}>;
export type ShippingQuotes2_shippingQuotes$key = ReadonlyArray<{
  readonly " $data"?: ShippingQuotes2_shippingQuotes$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShippingQuotes2_shippingQuotes">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ShippingQuotes2_shippingQuotes",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceShippingQuote",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSelected",
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
          "name": "price",
          "storageKey": "price(precision:2)"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "priceCents",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "typeName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceShippingQuoteEdge",
  "abstractKey": null
};

(node as any).hash = "357585ae751fba06409777f9a544d8ae";

export default node;
