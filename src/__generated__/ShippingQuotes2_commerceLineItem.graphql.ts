/**
 * @generated SignedSource<<28c32566519c51a8e85a5e74dd17bc7d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShippingQuotes2_commerceLineItem$data = {
  readonly shippingQuoteOptions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly isSelected: boolean;
        readonly price: string | null | undefined;
        readonly priceCents: number;
        readonly typeName: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ShippingQuotes2_commerceLineItem";
};
export type ShippingQuotes2_commerceLineItem$key = {
  readonly " $data"?: ShippingQuotes2_commerceLineItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShippingQuotes2_commerceLineItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShippingQuotes2_commerceLineItem",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceShippingQuoteConnection",
      "kind": "LinkedField",
      "name": "shippingQuoteOptions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceShippingQuoteEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
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
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceLineItem",
  "abstractKey": null
};

(node as any).hash = "3c0a0b20f3fded2f22c3fda22c107138";

export default node;
