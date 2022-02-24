/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PriceOptions_order = {
    readonly internalID: string;
    readonly currencyCode: string;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artworkOrEditionSet: ({
                    readonly __typename: "Artwork";
                    readonly displayPriceRange: boolean | null;
                    readonly listPrice: {
                        readonly major?: number;
                        readonly maxPrice?: {
                            readonly major: number;
                        } | null;
                        readonly minPrice?: {
                            readonly major: number;
                        } | null;
                    } | null;
                } | {
                    readonly __typename: "EditionSet";
                    readonly internalID: string;
                    readonly price: string | null;
                    readonly displayPriceRange: boolean | null;
                    readonly listPrice: {
                        readonly major?: number;
                        readonly maxPrice?: {
                            readonly major: number;
                        } | null;
                        readonly minPrice?: {
                            readonly major: number;
                        } | null;
                    } | null;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }) | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "PriceOptions_order";
};
export type PriceOptions_order$data = PriceOptions_order;
export type PriceOptions_order$key = {
    readonly " $data"?: PriceOptions_order$data;
    readonly " $fragmentRefs": FragmentRefs<"PriceOptions_order">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayPriceRange",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "listPrice",
  "plural": false,
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": (v2/*: any*/),
      "type": "Money",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "maxPrice",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "minPrice",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "type": "PriceRange",
      "abstractKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceOptions_order",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencyCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceLineItemConnection",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceLineItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceLineItem",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "artworkOrEditionSet",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__typename",
                      "storageKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        (v1/*: any*/),
                        (v3/*: any*/)
                      ],
                      "type": "Artwork",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        (v0/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "price",
                          "storageKey": null
                        },
                        (v1/*: any*/),
                        (v3/*: any*/)
                      ],
                      "type": "EditionSet",
                      "abstractKey": null
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
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();
(node as any).hash = '597487a0e910591488117a01010d3cb0';
export default node;
