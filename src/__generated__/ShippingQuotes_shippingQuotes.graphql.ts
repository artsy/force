/**
 * @generated SignedSource<<20f721a04d900f4d48b5ec0823702adb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShippingQuotes_shippingQuotes$data = ReadonlyArray<{
  readonly node: {
    readonly id: string;
    readonly isSelected: boolean;
    readonly price: string | null;
    readonly priceCents: number;
    readonly typeName: string;
  } | null;
  readonly " $fragmentType": "ShippingQuotes_shippingQuotes";
}>;
export type ShippingQuotes_shippingQuotes$key = ReadonlyArray<{
  readonly " $data"?: ShippingQuotes_shippingQuotes$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShippingQuotes_shippingQuotes">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ShippingQuotes_shippingQuotes",
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

(node as any).hash = "c15399ea645f153cad7c5409ad44fa49";

export default node;
