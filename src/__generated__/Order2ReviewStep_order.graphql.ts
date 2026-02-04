/**
 * @generated SignedSource<<56a04a83127ac271ec5c87c2f4e986ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderPaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2ReviewStep_order$data = {
  readonly buyerTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly itemsTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly figures: ReadonlyArray<{
        readonly __typename: "Image";
        readonly resized: {
          readonly url: string;
        } | null | undefined;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      }>;
      readonly internalID: string;
    } | null | undefined;
    readonly artworkOrEditionSet: {
      readonly __typename: "Artwork";
      readonly dimensions: {
        readonly cm: string | null | undefined;
        readonly in: string | null | undefined;
      } | null | undefined;
      readonly price: string | null | undefined;
    } | {
      readonly __typename: "EditionSet";
      readonly dimensions: {
        readonly cm: string | null | undefined;
        readonly in: string | null | undefined;
      } | null | undefined;
      readonly price: string | null | undefined;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
    readonly artworkVersion: {
      readonly artistNames: string | null | undefined;
      readonly attributionClass: {
        readonly shortDescription: string | null | undefined;
      } | null | undefined;
      readonly date: string | null | undefined;
      readonly image: {
        readonly resized: {
          readonly url: string;
        } | null | undefined;
        readonly url: string | null | undefined;
      } | null | undefined;
      readonly title: string | null | undefined;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly paymentMethod: OrderPaymentMethodEnum | null | undefined;
  readonly pendingOffer: {
    readonly internalID: string;
  } | null | undefined;
  readonly shippingTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly source: OrderSourceEnum;
  readonly stripeConfirmationToken: string | null | undefined;
  readonly taxTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutPricingBreakdown_order">;
  readonly " $fragmentType": "Order2ReviewStep_order";
};
export type Order2ReviewStep_order$key = {
  readonly " $data"?: Order2ReviewStep_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2ReviewStep_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "price",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "dimensions",
    "kind": "LinkedField",
    "name": "dimensions",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "in",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cm",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "height",
      "value": 138
    },
    {
      "kind": "Literal",
      "name": "width",
      "value": 185
    }
  ],
  "concreteType": "ResizedImageUrl",
  "kind": "LinkedField",
  "name": "resized",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": "resized(height:138,width:185)"
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2ReviewStep_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2CheckoutPricingBreakdown_order"
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
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
      "kind": "ScalarField",
      "name": "stripeConfirmationToken",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paymentMethod",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "buyerTotal",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "itemsTotal",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "shippingTotal",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "taxTotal",
      "plural": false,
      "selections": (v1/*: any*/),
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "artworkOrEditionSet",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
              "type": "Artwork",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
              "type": "EditionSet",
              "abstractKey": null
            }
          ],
          "storageKey": null
        },
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
              "alias": null,
              "args": null,
              "concreteType": "AttributionClass",
              "kind": "LinkedField",
              "name": "attributionClass",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "shortDescription",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
                (v4/*: any*/),
                (v5/*: any*/)
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
            (v0/*: any*/),
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
                (v2/*: any*/),
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v5/*: any*/)
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "pendingOffer",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "c1391f79711e91a6f8030b0ee21dc46f";

export default node;
