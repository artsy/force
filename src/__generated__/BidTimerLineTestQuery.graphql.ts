/**
 * @generated SignedSource<<08fe23fba598d98b1acf841ba6aceb8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type BidTimerLineTestQuery$variables = Record<PropertyKey, never>
export type BidTimerLineTestQuery$data = {
  readonly artwork:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"BidTimerLine_artwork">
      }
    | null
    | undefined
}
export type BidTimerLineTestQuery = {
  response: BidTimerLineTestQuery$data
  variables: BidTimerLineTestQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: "Literal",
        name: "id",
        value: "artwork-id",
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v2 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: "String",
    },
    v3 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: "ID",
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "BidTimerLineTestQuery",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: "Artwork",
          kind: "LinkedField",
          name: "artwork",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "BidTimerLine_artwork",
            },
          ],
          storageKey: 'artwork(id:"artwork-id")',
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "BidTimerLineTestQuery",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: "Artwork",
          kind: "LinkedField",
          name: "artwork",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "SaleArtwork",
              kind: "LinkedField",
              name: "saleArtwork",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "lotID",
                  storageKey: null,
                },
                v1 /*: any*/,
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "CollectorSignals",
              kind: "LinkedField",
              name: "collectorSignals",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "AuctionCollectorSignals",
                  kind: "LinkedField",
                  name: "auction",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "lotClosesAt",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "registrationEndsAt",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "onlineBiddingExtended",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            v1 /*: any*/,
          ],
          storageKey: 'artwork(id:"artwork-id")',
        },
      ],
    },
    params: {
      cacheID: "e74f91d14867e856663c782f8ce05d6b",
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          artwork: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "Artwork",
          },
          "artwork.collectorSignals": {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "CollectorSignals",
          },
          "artwork.collectorSignals.auction": {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "AuctionCollectorSignals",
          },
          "artwork.collectorSignals.auction.lotClosesAt": v2 /*: any*/,
          "artwork.collectorSignals.auction.onlineBiddingExtended": {
            enumValues: null,
            nullable: false,
            plural: false,
            type: "Boolean",
          },
          "artwork.collectorSignals.auction.registrationEndsAt": v2 /*: any*/,
          "artwork.id": v3 /*: any*/,
          "artwork.saleArtwork": {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "SaleArtwork",
          },
          "artwork.saleArtwork.id": v3 /*: any*/,
          "artwork.saleArtwork.lotID": v2 /*: any*/,
        },
      },
      name: "BidTimerLineTestQuery",
      operationKind: "query",
      text: 'query BidTimerLineTestQuery {\n  artwork(id: "artwork-id") {\n    ...BidTimerLine_artwork\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = "aa33eea40d30ae5413eff83b52fabf68"

export default node
