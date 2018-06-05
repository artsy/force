/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type routes_TopAuctionRouteQueryVariables = {
  readonly id: string
}
export type routes_TopAuctionRouteQueryResponse = {
  readonly sale: ({}) | null
}

/*
query routes_TopAuctionRouteQuery(
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
    name: 'routes_TopAuctionRouteQuery',
    id: null,
    text:
      'query routes_TopAuctionRouteQuery(\n  $id: String!\n) {\n  sale(id: $id) {\n    ...AuctionRoute_sale\n    __id\n  }\n}\n\nfragment AuctionRoute_sale on Sale {\n  id\n  name\n  description\n  artworks {\n    id\n    __id\n  }\n  __id\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'routes_TopAuctionRouteQuery',
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
      name: 'routes_TopAuctionRouteQuery',
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
;(node as any).hash = '0b72ff883b883f79c88dd1038033448b'
export default node
