/**
 * @generated SignedSource<<ae5a504eb163ea9c99dc1d46a3d5dd7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type DeprecatedSaveButtonTestQuery$variables = Record<PropertyKey, never>
export type DeprecatedSaveButtonTestQuery$data = {
  readonly artwork:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"DeprecatedSaveButton_artwork">
      }
    | null
    | undefined
}
export type DeprecatedSaveButtonTestQuery = {
  response: DeprecatedSaveButtonTestQuery$data
  variables: DeprecatedSaveButtonTestQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: "Literal",
        name: "id",
        value: "example-artwork-id",
      },
    ],
    v1 = {
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
      name: "DeprecatedSaveButtonTestQuery",
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
              name: "DeprecatedSaveButton_artwork",
            },
          ],
          storageKey: 'artwork(id:"example-artwork-id")',
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "DeprecatedSaveButtonTestQuery",
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
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "internalID",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "slug",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "isSavedToAnyList",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "title",
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
                      name: "lotWatcherCount",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: 'artwork(id:"example-artwork-id")',
        },
      ],
    },
    params: {
      cacheID: "b702f948d12f009352a48ac4ddd84744",
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
          "artwork.collectorSignals.auction.lotWatcherCount": {
            enumValues: null,
            nullable: false,
            plural: false,
            type: "Int",
          },
          "artwork.id": v1 /*: any*/,
          "artwork.internalID": v1 /*: any*/,
          "artwork.isSavedToAnyList": {
            enumValues: null,
            nullable: false,
            plural: false,
            type: "Boolean",
          },
          "artwork.slug": v1 /*: any*/,
          "artwork.title": {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "String",
          },
        },
      },
      name: "DeprecatedSaveButtonTestQuery",
      operationKind: "query",
      text: 'query DeprecatedSaveButtonTestQuery {\n  artwork(id: "example-artwork-id") {\n    ...DeprecatedSaveButton_artwork\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSavedToAnyList\n  title\n  collectorSignals {\n    auction {\n      lotWatcherCount\n    }\n  }\n}\n',
    },
  }
})()
;(node as any).hash = "aad83146eaf8ba415d9a6e42e723e4ac"

export default node
