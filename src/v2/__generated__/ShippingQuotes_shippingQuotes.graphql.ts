/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShippingQuotes_shippingQuotes = ReadonlyArray<{
    readonly node: {
        readonly id: string;
        readonly displayName: string;
        readonly isSelected: boolean;
        readonly price: string | null;
        readonly priceCents: number;
    } | null;
    readonly " $refType": "ShippingQuotes_shippingQuotes";
}>;
export type ShippingQuotes_shippingQuotes$data = ShippingQuotes_shippingQuotes;
export type ShippingQuotes_shippingQuotes$key = ReadonlyArray<{
    readonly " $data"?: ShippingQuotes_shippingQuotes$data;
    readonly " $fragmentRefs": FragmentRefs<"ShippingQuotes_shippingQuotes">;
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
          "name": "displayName",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceShippingQuoteEdge",
  "abstractKey": null
};
(node as any).hash = '1dabc2ba10cf7dd51b73926fb1d4c99f';
export default node;
