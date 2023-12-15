/**
 * @generated SignedSource<<a77358e3011f15581b8ecfe482d1c73d>>
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
export type Shipping2_order$data = {
  readonly __typename: string;
  readonly id: string;
  readonly internalID: string;
  readonly lineItems: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artwork: {
          readonly artsyShippingInternational: boolean | null | undefined;
          readonly euShippingOrigin: boolean | null | undefined;
          readonly onlyShipsDomestically: boolean | null | undefined;
          readonly pickup_available: boolean | null | undefined;
          readonly processWithArtsyShippingDomestic: boolean | null | undefined;
          readonly shippingCountry: string | null | undefined;
          readonly slug: string;
        } | null | undefined;
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
        readonly " $fragmentSpreads": FragmentRefs<"ShippingQuotes2_commerceLineItem">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly mode: CommerceOrderModeEnum | null | undefined;
  readonly requestedFulfillment: {
    readonly __typename: "CommercePickup";
    readonly phoneNumber: string | null | undefined;
  } | {
    readonly __typename: "CommerceShip";
    readonly addressLine1: string | null | undefined;
    readonly addressLine2: string | null | undefined;
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly name: string | null | undefined;
    readonly phoneNumber: string | null | undefined;
    readonly postalCode: string | null | undefined;
    readonly region: string | null | undefined;
  } | {
    readonly __typename: "CommerceShipArta";
    readonly addressLine1: string | null | undefined;
    readonly addressLine2: string | null | undefined;
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly name: string | null | undefined;
    readonly phoneNumber: string | null | undefined;
    readonly postalCode: string | null | undefined;
    readonly region: string | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly state: CommerceOrderStateEnum;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSummaryItem_order" | "FulfillmentDetailsForm_order" | "OrderStepper_order" | "SaveAndContinueButton_order" | "TransactionDetailsSummaryItem_order">;
  readonly " $fragmentType": "Shipping2_order";
};
export type Shipping2_order$key = {
  readonly " $data"?: Shipping2_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Shipping2_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phoneNumber",
  "storageKey": null
},
v3 = [
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
    "name": "addressLine1",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine2",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "city",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "country",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "postalCode",
    "storageKey": null
  },
  (v2/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Shipping2_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FulfillmentDetailsForm_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaveAndContinueButton_order"
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
      "name": "OrderStepper_order"
    },
    (v0/*: any*/),
    (v1/*: any*/),
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "requestedFulfillment",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "InlineFragment",
          "selections": [
            (v2/*: any*/)
          ],
          "type": "CommercePickup",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v3/*: any*/),
          "type": "CommerceShip",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v3/*: any*/),
          "type": "CommerceShipArta",
          "abstractKey": null
        }
      ],
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShippingQuotes2_commerceLineItem"
                },
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
                            (v1/*: any*/),
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
                      "name": "slug",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "processWithArtsyShippingDomestic",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "artsyShippingInternational",
                      "storageKey": null
                    },
                    {
                      "alias": "pickup_available",
                      "args": null,
                      "kind": "ScalarField",
                      "name": "pickupAvailable",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "onlyShipsDomestically",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "euShippingOrigin",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "shippingCountry",
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
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "c04babe27eb1a64becf14793ee701eb9";

export default node;
