/**
 * @generated SignedSource<<a8f3ad66558f9a303ef9a71238789a2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
export type AddressModalTestQuery$variables = Record<PropertyKey, never>
export type AddressModalTestQuery$data = {
  readonly _unused:
    | {
        readonly name: string | null | undefined
      }
    | null
    | undefined
}
export type AddressModalTestQuery = {
  response: AddressModalTestQuery$data
  variables: AddressModalTestQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: "Literal",
        name: "id",
        value: "whocare",
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "AddressModalTestQuery",
      selections: [
        {
          alias: "_unused",
          args: v0 /*: any*/,
          concreteType: "Artist",
          kind: "LinkedField",
          name: "artist",
          plural: false,
          selections: [v1 /*: any*/],
          storageKey: 'artist(id:"whocare")',
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "AddressModalTestQuery",
      selections: [
        {
          alias: "_unused",
          args: v0 /*: any*/,
          concreteType: "Artist",
          kind: "LinkedField",
          name: "artist",
          plural: false,
          selections: [
            v1 /*: any*/,
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          storageKey: 'artist(id:"whocare")',
        },
      ],
    },
    params: {
      cacheID: "eac7d336c233bb012cfa500991bb3ed7",
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          _unused: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "Artist",
          },
          "_unused.id": {
            enumValues: null,
            nullable: false,
            plural: false,
            type: "ID",
          },
          "_unused.name": {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "String",
          },
        },
      },
      name: "AddressModalTestQuery",
      operationKind: "query",
      text: 'query AddressModalTestQuery {\n  _unused: artist(id: "whocare") {\n    name\n    id\n  }\n}\n',
    },
  }
})()

;(node as any).hash = "f324dfe97aaee9357b4cb6c344df9ca7"

export default node
