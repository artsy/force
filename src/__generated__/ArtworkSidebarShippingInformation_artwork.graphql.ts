/**
 * @generated SignedSource<<07b9ab0e745a139834411da0a73f5a79>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkSidebarShippingInformation_artwork$data = {
  readonly isUnlisted: boolean
  readonly priceIncludesTaxDisplay: string | null | undefined
  readonly shippingInfo: string | null | undefined
  readonly shippingOrigin: string | null | undefined
  readonly taxInfo:
    | {
        readonly displayText: string
        readonly moreInfo: {
          readonly displayText: string
          readonly url: string
        }
      }
    | null
    | undefined
  readonly " $fragmentType": "ArtworkSidebarShippingInformation_artwork"
}
export type ArtworkSidebarShippingInformation_artwork$key = {
  readonly " $data"?: ArtworkSidebarShippingInformation_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarShippingInformation_artwork">
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "displayText",
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "ArtworkSidebarShippingInformation_artwork",
    selections: [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "isUnlisted",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "priceIncludesTaxDisplay",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "shippingOrigin",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "shippingInfo",
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: "TaxInfo",
        kind: "LinkedField",
        name: "taxInfo",
        plural: false,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            concreteType: "TaxMoreInfo",
            kind: "LinkedField",
            name: "moreInfo",
            plural: false,
            selections: [
              v0 /*: any*/,
              {
                alias: null,
                args: null,
                kind: "ScalarField",
                name: "url",
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: "Artwork",
    abstractKey: null,
  }
})()

;(node as any).hash = "41fc822248c0ef2a098f0fb185131c51"

export default node
