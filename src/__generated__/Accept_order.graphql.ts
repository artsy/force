/**
 * @generated SignedSource<<103a475a4bfac0b486e0598834aca8f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type Accept_order$data = {
  readonly creditCardId: string | null | undefined
  readonly internalID: string
  readonly lastOffer?:
    | {
        readonly createdAt: string
        readonly internalID: string
      }
    | null
    | undefined
  readonly lineItems:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly artwork:
                          | {
                              readonly artists:
                                | ReadonlyArray<
                                    | {
                                        readonly slug: string
                                      }
                                    | null
                                    | undefined
                                  >
                                | null
                                | undefined
                              readonly slug: string
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
  readonly stateExpiresAt: string | null | undefined
  readonly " $fragmentSpreads": FragmentRefs<
    | "ArtworkSummaryItem_order"
    | "OrderStepper_order"
    | "PaymentMethodSummaryItem_order"
    | "ShippingSummaryItem_order"
    | "TransactionDetailsSummaryItem_order"
  >
  readonly " $fragmentType": "Accept_order"
}
export type Accept_order$key = {
  readonly " $data"?: Accept_order$data
  readonly " $fragmentSpreads": FragmentRefs<"Accept_order">
}

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "internalID",
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "slug",
      storageKey: null,
    }
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "Accept_order",
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "stateExpiresAt",
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
                      v1 /*: any*/,
                      {
                        alias: null,
                        args: [
                          {
                            kind: "Literal",
                            name: "shallow",
                            value: true,
                          },
                        ],
                        concreteType: "Artist",
                        kind: "LinkedField",
                        name: "artists",
                        plural: true,
                        selections: [v1 /*: any*/],
                        storageKey: "artists(shallow:true)",
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
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "creditCardId",
        storageKey: null,
      },
      {
        kind: "InlineFragment",
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "CommerceOffer",
            kind: "LinkedField",
            name: "lastOffer",
            plural: false,
            selections: [
              v0 /*: any*/,
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "createdAt",
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        type: "CommerceOfferOrder",
        abstractKey: null,
      },
      {
        args: null,
        kind: "FragmentSpread",
        name: "TransactionDetailsSummaryItem_order",
      },
      {
        args: null,
        kind: "FragmentSpread",
        name: "ArtworkSummaryItem_order",
      },
      {
        args: null,
        kind: "FragmentSpread",
        name: "ShippingSummaryItem_order",
      },
      {
        args: null,
        kind: "FragmentSpread",
        name: "PaymentMethodSummaryItem_order",
      },
      {
        args: null,
        kind: "FragmentSpread",
        name: "OrderStepper_order",
      },
    ],
    type: "CommerceOrder",
    abstractKey: "__isCommerceOrder",
  }
})()

;(node as any).hash = "806679e5521a031e6918fb411652b062"

export default node
