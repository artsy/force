/**
 * @generated SignedSource<<934d91e1d4735d7a16de76222f0773a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtworkSidebarCreateAlert_Test_Query$variables = Record<
  PropertyKey,
  never
>
export type ArtworkSidebarCreateAlert_Test_Query$data = {
  readonly artwork:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarCreateAlert_artwork">
      }
    | null
    | undefined
}
export type ArtworkSidebarCreateAlert_Test_Query = {
  response: ArtworkSidebarCreateAlert_Test_Query$data
  variables: ArtworkSidebarCreateAlert_Test_Query$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      kind: "Literal",
      name: "id",
      value: "test-artwork-id",
    },
  ]
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "ArtworkSidebarCreateAlert_Test_Query",
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
              name: "ArtworkSidebarCreateAlert_artwork",
            },
          ],
          storageKey: 'artwork(id:"test-artwork-id")',
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "ArtworkSidebarCreateAlert_Test_Query",
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
              name: "isEligibleToCreateAlert",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          storageKey: 'artwork(id:"test-artwork-id")',
        },
      ],
    },
    params: {
      cacheID: "3f06f72e2ea9ac8596233583ba61b790",
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          artwork: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "Artwork",
          },
          "artwork.id": {
            enumValues: null,
            nullable: false,
            plural: false,
            type: "ID",
          },
          "artwork.isEligibleToCreateAlert": {
            enumValues: null,
            nullable: false,
            plural: false,
            type: "Boolean",
          },
        },
      },
      name: "ArtworkSidebarCreateAlert_Test_Query",
      operationKind: "query",
      text: 'query ArtworkSidebarCreateAlert_Test_Query {\n  artwork(id: "test-artwork-id") {\n    ...ArtworkSidebarCreateAlert_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarCreateAlert_artwork on Artwork {\n  isEligibleToCreateAlert\n}\n',
    },
  }
})()

;(node as any).hash = "01698e77bddcea656d75652bd1f357bf"

export default node
