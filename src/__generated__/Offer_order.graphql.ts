/**
 * @generated SignedSource<<8e579cf3ef130e86f2aa483f09fb5358>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Offer_order$data = {
  readonly currencyCode: string;
  readonly internalID: string;
  readonly isInquiryOrder?: boolean;
  readonly lineItems: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artwork: {
          readonly editionSets: ReadonlyArray<{
            readonly internalID: string;
          } | null | undefined> | null | undefined;
          readonly isPriceRange: boolean | null | undefined;
          readonly listPrice: {
            readonly __typename: "Money";
            readonly major: number;
          } | {
            readonly __typename: "PriceRange";
            readonly maxPrice: {
              readonly major: number;
            } | null | undefined;
            readonly minPrice: {
              readonly major: number;
            } | null | undefined;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          } | null | undefined;
          readonly price: string | null | undefined;
          readonly slug: string;
          readonly " $fragmentSpreads": FragmentRefs<"PriceOptions_artwork">;
        } | null | undefined;
        readonly artworkOrEditionSet: {
          readonly __typename: "Artwork";
          readonly displayPriceRange: boolean | null | undefined;
          readonly price: string | null | undefined;
        } | {
          readonly __typename: "EditionSet";
          readonly displayPriceRange: boolean | null | undefined;
          readonly price: string | null | undefined;
        } | {
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          readonly __typename: "%other";
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly mode: CommerceOrderModeEnum | null | undefined;
  readonly myLastOffer?: {
    readonly note: string | null | undefined;
  } | null | undefined;
  readonly state: CommerceOrderStateEnum;
  readonly totalListPriceCents: number;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSummaryItem_order" | "OrderStepper_order" | "PriceOptions_order" | "TransactionDetailsSummaryItem_order">;
  readonly " $fragmentType": "Offer_order";
};
export type Offer_order$key = {
  readonly " $data"?: Offer_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Offer_order">;
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
  "name": "price",
  "storageKey": null
},
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
    "name": "major",
    "storageKey": null
  }
],
v4 = [
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
                      "alias": null,
                      "args": null,
                      "concreteType": null,
                      "kind": "LinkedField",
                      "name": "listPrice",
                      "plural": false,
                      "selections": [
                        (v2/*: any*/),
                        {
                          "kind": "InlineFragment",
                          "selections": (v3/*: any*/),
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
                              "selections": (v3/*: any*/),
                              "storageKey": null
                            },
                            {
                              "alias": null,
                              "args": null,
                              "concreteType": "Money",
                              "kind": "LinkedField",
                              "name": "minPrice",
                              "plural": false,
                              "selections": (v3/*: any*/),
                              "storageKey": null
                            }
                          ],
                          "type": "PriceRange",
                          "abstractKey": null
                        }
                      ],
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "EditionSet",
                      "kind": "LinkedField",
                      "name": "editionSets",
                      "plural": true,
                      "selections": [
                        (v0/*: any*/)
                      ],
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "PriceOptions_artwork"
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
                    (v2/*: any*/),
                    {
                      "kind": "InlineFragment",
                      "selections": (v4/*: any*/),
                      "type": "Artwork",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": (v4/*: any*/),
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "myLastOffer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "note",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder",
      "abstractKey": null
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PriceOptions_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderStepper_order"
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "29644a990f455d037931e680e2f88f62";

export default node;
