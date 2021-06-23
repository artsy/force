/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShippingQuotes_shippingQuotes = ReadonlyArray<{
    readonly node: {
        readonly id: string;
        readonly tier: string;
        readonly name: string | null;
        readonly isSelected: boolean;
        readonly priceCents: number;
        readonly priceCurrency: string;
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
          "name": "tier",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
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
          "args": null,
          "kind": "ScalarField",
          "name": "priceCents",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "priceCurrency",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceShippingQuoteEdge"
};
(node as any).hash = 'bccebb5c7ddf1154f30807e034b08230';
export default node;
