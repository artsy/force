/**
 * @generated SignedSource<<15c8aa851a0a445c14a394de73af25a2>>
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
          } | null> | null;
          readonly isPriceRange: boolean | null;
          readonly listPrice: {
            readonly __typename: "Money";
            readonly major: number;
          } | {
            readonly __typename: "PriceRange";
            readonly maxPrice: {
              readonly major: number;
            } | null;
            readonly minPrice: {
              readonly major: number;
            } | null;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          } | null;
          readonly price: string | null;
          readonly slug: string;
          readonly " $fragmentSpreads": FragmentRefs<"PriceOptions_artwork">;
        } | null;
        readonly artworkOrEditionSet: {
          readonly __typename: "Artwork";
          readonly displayPriceRange: boolean | null;
          readonly price: string | null;
        } | {
          readonly __typename: "EditionSet";
          readonly displayPriceRange: boolean | null;
          readonly price: string | null;
        } | {
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          readonly __typename: "%other";
        } | null;
      } | null;
    } | null> | null;
  } | null;
  readonly mode: CommerceOrderModeEnum | null;
  readonly state: CommerceOrderStateEnum;
  readonly totalListPriceCents: number;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSummaryItem_order" | "PriceOptions_order" | "TransactionDetailsSummaryItem_order">;
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
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "a1867bbac372e425b11e65589e96fc5a";

export default node;
