/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type ArtistSearchResultsQueryVariables = {
  readonly term: string
}
export type ArtistSearchResultsQueryResponse = {
  readonly viewer: ({}) | null
}

/*
query ArtistSearchResultsQuery(
  $term: String!
) {
  viewer {
    ...ArtistSearchResultsContent_viewer
  }
}

fragment ArtistSearchResultsContent_viewer on Viewer {
  match_artist(term: $term) {
    id
    _id
    __id
    name
    image {
      cropped(width: 100, height: 100) {
        url
      }
    }
  }
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
    {
      kind: 'LocalArgument',
      name: 'term',
      type: 'String!',
      defaultValue: null,
    },
  ]
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'ArtistSearchResultsQuery',
    id: null,
    text:
      'query ArtistSearchResultsQuery(\n  $term: String!\n) {\n  viewer {\n    ...ArtistSearchResultsContent_viewer\n  }\n}\n\nfragment ArtistSearchResultsContent_viewer on Viewer {\n  match_artist(term: $term) {\n    id\n    _id\n    __id\n    name\n    image {\n      cropped(width: 100, height: 100) {\n        url\n      }\n    }\n  }\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'ArtistSearchResultsQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: 'viewer',
          name: '__viewer_viewer',
          storageKey: null,
          args: null,
          concreteType: 'Viewer',
          plural: false,
          selections: [
            {
              kind: 'FragmentSpread',
              name: 'ArtistSearchResultsContent_viewer',
              args: null,
            },
          ],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'ArtistSearchResultsQuery',
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'viewer',
          storageKey: null,
          args: null,
          concreteType: 'Viewer',
          plural: false,
          selections: [
            {
              kind: 'LinkedField',
              alias: null,
              name: 'match_artist',
              storageKey: null,
              args: [
                {
                  kind: 'Variable',
                  name: 'term',
                  variableName: 'term',
                  type: 'String!',
                },
              ],
              concreteType: 'Artist',
              plural: true,
              selections: [
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'id',
                  args: null,
                  storageKey: null,
                },
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: '_id',
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
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'name',
                  args: null,
                  storageKey: null,
                },
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'image',
                  storageKey: null,
                  args: null,
                  concreteType: 'Image',
                  plural: false,
                  selections: [
                    {
                      kind: 'LinkedField',
                      alias: null,
                      name: 'cropped',
                      storageKey: 'cropped(height:100,width:100)',
                      args: [
                        {
                          kind: 'Literal',
                          name: 'height',
                          value: 100,
                          type: 'Int!',
                        },
                        {
                          kind: 'Literal',
                          name: 'width',
                          value: 100,
                          type: 'Int!',
                        },
                      ],
                      concreteType: 'CroppedImageUrl',
                      plural: false,
                      selections: [
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: 'url',
                          args: null,
                          storageKey: null,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: 'LinkedHandle',
          alias: null,
          name: 'viewer',
          args: null,
          handle: 'viewer',
          key: '',
          filters: null,
        },
      ],
    },
  }
})()
;(node as any).hash = '98c64d4adbf4a0b483eb75d8eb196853'
export default node
