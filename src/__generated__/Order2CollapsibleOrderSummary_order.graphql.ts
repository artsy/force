/**
 * @generated SignedSource<<6775e8370a55333e52a806aebf66291f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2CollapsibleOrderSummary_order$data = {
  readonly buyerTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly itemsTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly figures: ReadonlyArray<{
        readonly __typename: "Image";
        readonly resizedSquare: {
          readonly url: string;
        } | null | undefined;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      }>;
      readonly internalID: string;
    } | null | undefined;
    readonly artworkVersion: {
      readonly artistNames: string | null | undefined;
      readonly date: string | null | undefined;
      readonly thumbnail: {
        readonly resizedSquare: {
          readonly url: string;
        } | null | undefined;
        readonly url: string | null | undefined;
      } | null | undefined;
      readonly title: string | null | undefined;
    } | null | undefined;
  } | null | undefined>;
  readonly shippingTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly source: OrderSourceEnum;
  readonly taxTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutPricingBreakdown_order">;
  readonly " $fragmentType": "Order2CollapsibleOrderSummary_order";
};
export type Order2CollapsibleOrderSummary_order$key = {
  readonly " $data"?: Order2CollapsibleOrderSummary_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CollapsibleOrderSummary_order">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v2 = {
  "alias": "resizedSquare",
  "args": [
    {
      "kind": "Literal",
      "name": "height",
      "value": 200
    },
    {
      "kind": "Literal",
      "name": "version",
      "value": [
        "square"
      ]
    }
  ],
  "concreteType": "ResizedImageUrl",
  "kind": "LinkedField",
  "name": "resized",
  "plural": false,
  "selections": [
    (v1/*: any*/)
  ],
  "storageKey": "resized(height:200,version:[\"square\"])"
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CollapsibleOrderSummary_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2CheckoutPricingBreakdown_order"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "source",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "buyerTotal",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "itemsTotal",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "shippingTotal",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "taxTotal",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LineItem",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkVersion",
          "kind": "LinkedField",
          "name": "artworkVersion",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "artistNames",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "date",
              "storageKey": null
            },
            {
              "alias": "thumbnail",
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                (v2/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "artwork",
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
              "args": [
                {
                  "kind": "Literal",
                  "name": "includeAll",
                  "value": false
                }
              ],
              "concreteType": null,
              "kind": "LinkedField",
              "name": "figures",
              "plural": true,
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
                    (v2/*: any*/)
                  ],
                  "type": "Image",
                  "abstractKey": null
                }
              ],
              "storageKey": "figures(includeAll:false)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "8bf2577505fdf8b5b622473804949c47";

export default node;
