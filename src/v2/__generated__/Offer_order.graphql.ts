/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type Offer_order = {
    readonly internalID: string;
    readonly mode: CommerceOrderModeEnum | null;
    readonly state: CommerceOrderStateEnum;
    readonly totalListPriceCents: number;
    readonly currencyCode: string;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artwork: {
                    readonly slug: string;
                    readonly price: string | null;
                    readonly isPriceRange: boolean | null;
                    readonly price_currency: string | null;
                    readonly listPrice: {
                        readonly major?: number;
                        readonly currencyCode?: string;
                        readonly maxPrice?: {
                            readonly major: number;
                            readonly currencyCode: string;
                        } | null;
                        readonly minPrice?: {
                            readonly major: number;
                            readonly currencyCode: string;
                        } | null;
                    } | null;
                } | null;
                readonly artworkOrEditionSet: ({
                    readonly __typename: "Artwork";
                    readonly price: string | null;
                    readonly displayPriceRange: boolean | null;
                } | {
                    readonly __typename: "EditionSet";
                    readonly price: string | null;
                    readonly displayPriceRange: boolean | null;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }) | null;
            } | null;
        } | null> | null;
    } | null;
    readonly isInquiryOrder?: boolean;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSummaryItem_order" | "TransactionDetailsSummaryItem_order">;
    readonly " $refType": "Offer_order";
};
export type Offer_order$data = Offer_order;
export type Offer_order$key = {
    readonly " $data"?: Offer_order$data;
    readonly " $fragmentRefs": FragmentRefs<"Offer_order">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencyCode",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  },
  (v0/*: any*/)
],
v3 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "displayPriceRange",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Offer_order",
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
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalListPriceCents",
      "storageKey": null
    },
    (v0/*: any*/),
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
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "artwork",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "slug",
                      "storageKey": null
                    },
                    (v1/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isPriceRange",
                      "storageKey": null
                    },
                    {
                      "alias": "price_currency",
                      "args": null,
                      "kind": "ScalarField",
                      "name": "priceCurrency",
                      "storageKey": null
                    },
                    {
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
                          "type": "Money"
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
                          "type": "PriceRange"
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
                      "selections": (v3/*: any*/),
                      "type": "Artwork"
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": (v3/*: any*/),
                      "type": "EditionSet"
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
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isInquiryOrder",
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order"
    }
  ],
  "type": "CommerceOrder"
};
})();
(node as any).hash = 'ea0cec28da9a5d9a90aedfc2ebb11ad8';
export default node;
