/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type RouterQueryVariables = {
  readonly artistID: string
}
export type RouterQueryResponse = {
  readonly artist:
    | ({
        readonly name: string | null
        readonly bio: string | null
      })
    | null
}

/*
query RouterQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    name
    bio
    __id
  }
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'artistID',
        type: 'String!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'artist',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'id',
            variableName: 'artistID',
            type: 'String!',
          },
        ],
        concreteType: 'Artist',
        plural: false,
        selections: [
          {
            kind: 'ScalarField',
            alias: null,
            name: 'name',
            args: null,
            storageKey: null,
          },
          {
            kind: 'ScalarField',
            alias: null,
            name: 'bio',
            args: null,
            storageKey: null,
          },
          {
            kind: 'ScalarField',
            alias: null,
            name: '__id',
            args: null,
            storageKey: null,
          },
        ],
      },
    ]
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'RouterQuery',
    id: null,
    text:
      'query RouterQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    name\n    bio\n    __id\n  }\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'RouterQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0,
      selections: v1,
    },
    operation: {
      kind: 'Operation',
      name: 'RouterQuery',
      argumentDefinitions: v0,
      selections: v1,
    },
  }
})()
;(node as any).hash = '77c943d093be0b5dd2cdad6a932bbb9e'
export default node
