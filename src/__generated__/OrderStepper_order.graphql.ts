/**
 * @generated SignedSource<<3e66848189671d99426ffb5e25e72da6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value"
import { FragmentRefs } from "relay-runtime"
export type OrderStepper_order$data = {
  readonly lineItems:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly artwork:
                          | {
                              readonly slug: string
                            }
                          | null
                          | undefined
                        readonly shippingQuoteOptions:
                          | {
                              readonly edges:
                                | ReadonlyArray<
                                    | {
                                        readonly node:
                                          | {
                                              readonly isSelected: boolean
                                            }
                                          | null
                                          | undefined
                                      }
                                    | null
                                    | undefined
                                  >
                                | null
                                | undefined
                            }
                          | null
                          | undefined
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
  readonly mode: CommerceOrderModeEnum | null | undefined
  readonly paymentMethodDetails:
    | {
        readonly __typename: "BankAccount"
        readonly id: string
      }
    | {
        readonly __typename: "CreditCard"
        readonly id: string
      }
    | {
        readonly __typename: "WireTransfer"
        readonly isManualPayment: boolean
      }
    | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other"
      }
    | null
    | undefined
  readonly paymentSet: boolean
  readonly requestedFulfillment:
    | {
        readonly __typename: string
      }
    | null
    | undefined
  readonly " $fragmentType": "OrderStepper_order"
}
export type OrderStepper_order$key = {
  readonly " $data"?: OrderStepper_order$data
  readonly " $fragmentSpreads": FragmentRefs<"OrderStepper_order">
}

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v1 = [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "id",
        storageKey: null,
      },
    ]
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "OrderStepper_order",
    selections: [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "mode",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "paymentSet",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: null,
        kind: "LinkedField",
        name: "requestedFulfillment",
        plural: false,
        selections: [v0 /*: any*/],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: null,
        kind: "LinkedField",
        name: "paymentMethodDetails",
        plural: false,
        selections: [
          v0 /*: any*/,
          {
            kind: "InlineFragment",
            selections: v1 /*: any*/,
            type: "CreditCard",
            abstractKey: null,
          },
          {
            kind: "InlineFragment",
            selections: v1 /*: any*/,
            type: "BankAccount",
            abstractKey: null,
          },
          {
            kind: "InlineFragment",
            selections: [
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "isManualPayment",
                storageKey: null,
              },
            ],
            type: "WireTransfer",
            abstractKey: null,
          },
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "CommerceLineItemConnection",
        kind: "LinkedField",
        name: "lineItems",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "CommerceLineItemEdge",
            kind: "LinkedField",
            name: "edges",
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "CommerceLineItem",
                kind: "LinkedField",
                name: "node",
                plural: false,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "Artwork",
                    kind: "LinkedField",
                    name: "artwork",
                    plural: false,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "slug",
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    concreteType: "CommerceShippingQuoteConnection",
                    kind: "LinkedField",
                    name: "shippingQuoteOptions",
                    plural: false,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        concreteType: "CommerceShippingQuoteEdge",
                        kind: "LinkedField",
                        name: "edges",
                        plural: true,
                        selections: [
                          {
                            alias: null,
                            args: null,
                            concreteType: "CommerceShippingQuote",
                            kind: "LinkedField",
                            name: "node",
                            plural: false,
                            selections: [
                              {
                                alias: null,
                                args: null,
                                kind: "ScalarField",
                                name: "isSelected",
                                storageKey: null,
                              },
                            ],
                            storageKey: null,
                          },
                        ],
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: "CommerceOrder",
    abstractKey: "__isCommerceOrder",
  }
})()
;(node as any).hash = "475608c6cb79e5efeae1173f7b13e08e"

export default node
