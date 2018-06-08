/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type routes_ArtistRouteQueryVariables = {
  readonly id: string
}
export type routes_ArtistRouteQueryResponse = {
  readonly artist:
    | ({
        readonly id: string
      })
    | null
}

/*
query routes_ArtistRouteQuery(
  $id: String!
) {
  artist(id: $id) {
    id
    ...ArtistRoute_artist
    __id
  }
}

fragment ArtistRoute_artist on Artist {
  id
  name
  bio
  artworks {
    ...ArtistArtworks_artworks
    __id
  }
  __id
}

fragment ArtistArtworks_artworks on Artwork {
  artist {
    name
    __id
  }
  meta {
    title
  }
  partner {
    name
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
      name: 'id',
      args: null,
      storageKey: null,
    },
    v3 = {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    },
    v4 = {
      kind: 'ScalarField',
      alias: null,
      name: 'name',
      args: null,
      storageKey: null,
    },
    v5 = [v4, v3]
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'routes_ArtistRouteQuery',
    id: null,
    text:
      'query routes_ArtistRouteQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    id\n    ...ArtistRoute_artist\n    __id\n  }\n}\n\nfragment ArtistRoute_artist on Artist {\n  id\n  name\n  bio\n  artworks {\n    ...ArtistArtworks_artworks\n    __id\n  }\n  __id\n}\n\nfragment ArtistArtworks_artworks on Artwork {\n  artist {\n    name\n    __id\n  }\n  meta {\n    title\n  }\n  partner {\n    name\n    __id\n  }\n  __id\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'routes_ArtistRouteQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'artist',
          storageKey: null,
          args: v1,
          concreteType: 'Artist',
          plural: false,
          selections: [
            v2,
            {
              kind: 'FragmentSpread',
              name: 'ArtistRoute_artist',
              args: null,
            },
            v3,
          ],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'routes_ArtistRouteQuery',
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'artist',
          storageKey: null,
          args: v1,
          concreteType: 'Artist',
          plural: false,
          selections: [
            v2,
            v4,
            {
              kind: 'ScalarField',
              alias: null,
              name: 'bio',
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
              selections: [
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'artist',
                  storageKey: null,
                  args: null,
                  concreteType: 'Artist',
                  plural: false,
                  selections: v5,
                },
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'meta',
                  storageKey: null,
                  args: null,
                  concreteType: 'ArtworkMeta',
                  plural: false,
                  selections: [
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'title',
                      args: null,
                      storageKey: null,
                    },
                  ],
                },
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'partner',
                  storageKey: null,
                  args: null,
                  concreteType: 'Partner',
                  plural: false,
                  selections: v5,
                },
                v3,
              ],
            },
            v3,
          ],
        },
      ],
    },
  }
})()
;(node as any).hash = '98dc504e26f0e99d0c664eed2ec491fd'
export default node
