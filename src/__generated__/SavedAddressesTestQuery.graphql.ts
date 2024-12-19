/**
 * @generated SignedSource<<bb37487ef0232b9eea496c7d7c64d3f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
export type SavedAddressesTestQuery$variables = Record<PropertyKey, never>
export type SavedAddressesTestQuery$data = {
  readonly me:
    | {
        readonly email: string | null | undefined
      }
    | null
    | undefined
}
export type SavedAddressesTestQuery = {
  response: SavedAddressesTestQuery$data
  variables: SavedAddressesTestQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: "ScalarField",
    name: "email",
    storageKey: null,
  }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "SavedAddressesTestQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Me",
          kind: "LinkedField",
          name: "me",
          plural: false,
          selections: [v0 /*: any*/],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "SavedAddressesTestQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Me",
          kind: "LinkedField",
          name: "me",
          plural: false,
          selections: [
            v0 /*: any*/,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "d40af8102a19f44dea2bd6699a1a52ed",
      id: null,
      metadata: {},
      name: "SavedAddressesTestQuery",
      operationKind: "query",
      text: "query SavedAddressesTestQuery {\n  me {\n    email\n    id\n  }\n}\n",
    },
  }
})()

;(node as any).hash = "1a6c0ba8fe55459138403740bd174de0"

export default node
