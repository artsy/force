/**
 * @generated SignedSource<<d3762685c617b59c5af9a053d7bbfcff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type MyCollectionArtworkTitleTestQuery$variables = Record<
  PropertyKey,
  never
>
export type MyCollectionArtworkTitleTestQuery$data = {
  readonly artwork:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkTitle_artwork">
      }
    | null
    | undefined
}
export type MyCollectionArtworkTitleTestQuery = {
  response: MyCollectionArtworkTitleTestQuery$data
  variables: MyCollectionArtworkTitleTestQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: "Literal",
        name: "id",
        value: "foo",
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v2 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: "String",
    },
    v3 = {
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
      name: "MyCollectionArtworkTitleTestQuery",
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
              name: "MyCollectionArtworkTitle_artwork",
            },
          ],
          storageKey: 'artwork(id:"foo")',
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "MyCollectionArtworkTitleTestQuery",
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
              name: "artistNames",
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
              kind: "ScalarField",
              name: "date",
              storageKey: null,
            },
            {
              alias: null,
              args: [
                {
                  kind: "Literal",
                  name: "shallow",
                  value: true,
                },
              ],
              concreteType: "Artist",
              kind: "LinkedField",
              name: "artist",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "href",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "isPersonalArtist",
                  storageKey: null,
                },
                v1 /*: any*/,
              ],
              storageKey: "artist(shallow:true)",
            },
            v1 /*: any*/,
          ],
          storageKey: 'artwork(id:"foo")',
        },
      ],
    },
    params: {
      cacheID: "27814b52bd0ea5db9e5d0f4b7461f0d5",
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          artwork: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "Artwork",
          },
          "artwork.artist": {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "Artist",
          },
          "artwork.artist.href": v2 /*: any*/,
          "artwork.artist.id": v3 /*: any*/,
          "artwork.artist.isPersonalArtist": {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "Boolean",
          },
          "artwork.artistNames": v2 /*: any*/,
          "artwork.date": v2 /*: any*/,
          "artwork.id": v3 /*: any*/,
          "artwork.title": v2 /*: any*/,
        },
      },
      name: "MyCollectionArtworkTitleTestQuery",
      operationKind: "query",
      text: 'query MyCollectionArtworkTitleTestQuery {\n  artwork(id: "foo") {\n    ...MyCollectionArtworkTitle_artwork\n    id\n  }\n}\n\nfragment MyCollectionArtworkTitle_artwork on Artwork {\n  artistNames\n  title\n  date\n  artist(shallow: true) {\n    href\n    isPersonalArtist\n    id\n  }\n}\n',
    },
  }
})()
;(node as any).hash = "d1434a5128b2fdbd262dc9d55c8e2072"

export default node
