/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type routes_AuctionRouteQueryVariables = {
  readonly id: string
}
export type routes_AuctionRouteQueryResponse = {
  readonly sale: ({}) | null
}

/*
query routes_AuctionRouteQuery(
  $id: String!
) {
  sale(id: $id) {
    ...AuctionRoute_sale
    __id
  }
}

fragment AuctionRoute_sale on Sale {
  id
  name
  description
  artworks {
    id
    __id
  }
  __id
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'id',
        type: 'String!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'id',
        type: 'String!',
      },
    ],
    v2 = {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    },
    v3 = {
      kind: 'ScalarField',
      alias: null,
      name: 'id',
      args: null,
      storageKey: null,
    }
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'routes_AuctionRouteQuery',
    id: null,
    text:
      'query routes_AuctionRouteQuery(\n  $id: String!\n) {\n  sale(id: $id) {\n    ...AuctionRoute_sale\n    __id\n  }\n}\n\nfragment AuctionRoute_sale on Sale {\n  id\n  name\n  description\n  artworks {\n    id\n    __id\n  }\n  __id\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'routes_AuctionRouteQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'sale',
          storageKey: null,
          args: v1,
          concreteType: 'Sale',
          plural: false,
          selections: [
            {
              kind: 'FragmentSpread',
              name: 'AuctionRoute_sale',
              args: null,
            },
            v2,
          ],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'routes_AuctionRouteQuery',
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'sale',
          storageKey: null,
          args: v1,
          concreteType: 'Sale',
          plural: false,
          selections: [
            v3,
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
              name: 'description',
              args: null,
              storageKey: null,
            },
            {
              kind: 'LinkedField',
              alias: null,
              name: 'artworks',
              storageKey: null,
              args: null,
              concreteType: 'Artwork',
              plural: true,
              selections: [v3, v2],
            },
            v2,
          ],
        },
      ],
    },
  }
})()
;(node as any).hash = 'b4bcb4ed4a8580b496b8bd7589142c8d'
export default node
