/**
 * @generated SignedSource<<49e8e7c48be39a8dae384897c9e07fe9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type DeprecatedSaveButtonQuery$variables = {
  id: string
}
export type DeprecatedSaveButtonQuery$data = {
  readonly artwork:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"DeprecatedSaveButton_artwork">
      }
    | null
    | undefined
}
export type DeprecatedSaveButtonQuery = {
  response: DeprecatedSaveButtonQuery$data
  variables: DeprecatedSaveButtonQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "id",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "id",
      },
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "DeprecatedSaveButtonQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
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
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "DeprecatedSaveButtonQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
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
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "0be565b25dc02f4d578cffce7d14fe63",
      id: null,
      metadata: {},
      name: "DeprecatedSaveButtonQuery",
      operationKind: "query",
      text: "query DeprecatedSaveButtonQuery(\n  $id: String!\n) {\n  artwork(id: $id) {\n    ...DeprecatedSaveButton_artwork\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSavedToAnyList\n  title\n  collectorSignals {\n    auction {\n      lotWatcherCount\n    }\n  }\n}\n",
    },
  }
})()

;(node as any).hash = "201e1ca07144065f7d931774e8c114ed"

export default node
