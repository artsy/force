/**
 * @generated SignedSource<<f24afb71a73d728dac9f34a15c533331>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArtistSeriesMeta_TestQuery$variables = {
  slug: string
}
export type ArtistSeriesMeta_TestQuery$data = {
  readonly artistSeries:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesMeta_artistSeries">
      }
    | null
    | undefined
}
export type ArtistSeriesMeta_TestQuery$rawResponse = {
  readonly artistSeries:
    | {
        readonly artists: ReadonlyArray<{
          readonly id: string
          readonly name: string | null | undefined
        }>
        readonly description: string | null | undefined
        readonly id: string
        readonly slug: string
        readonly title: string
      }
    | null
    | undefined
}
export type ArtistSeriesMeta_TestQuery = {
  rawResponse: ArtistSeriesMeta_TestQuery$rawResponse
  response: ArtistSeriesMeta_TestQuery$data
  variables: ArtistSeriesMeta_TestQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "slug",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "slug",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v3 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: "ID",
    },
    v4 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: "String",
    },
    v5 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: "String",
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "ArtistSeriesMeta_TestQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "ArtistSeries",
          kind: "LinkedField",
          name: "artistSeries",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "ArtistSeriesMeta_artistSeries",
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
      name: "ArtistSeriesMeta_TestQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "ArtistSeries",
          kind: "LinkedField",
          name: "artistSeries",
          plural: false,
          selections: [
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
              name: "description",
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
              args: [
                {
                  kind: "Literal",
                  name: "size",
                  value: 1,
                },
              ],
              concreteType: "Artist",
              kind: "LinkedField",
              name: "artists",
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "name",
                  storageKey: null,
                },
                v2 /*: any*/,
              ],
              storageKey: "artists(size:1)",
            },
            v2 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "3481091fc45f362edfbd3ae67c5df81d",
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          artistSeries: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "ArtistSeries",
          },
          "artistSeries.artists": {
            enumValues: null,
            nullable: false,
            plural: true,
            type: "Artist",
          },
          "artistSeries.artists.id": v3 /*: any*/,
          "artistSeries.artists.name": v4 /*: any*/,
          "artistSeries.description": v4 /*: any*/,
          "artistSeries.id": v3 /*: any*/,
          "artistSeries.slug": v5 /*: any*/,
          "artistSeries.title": v5 /*: any*/,
        },
      },
      name: "ArtistSeriesMeta_TestQuery",
      operationKind: "query",
      text: "query ArtistSeriesMeta_TestQuery(\n  $slug: ID!\n) {\n  artistSeries(id: $slug) {\n    ...ArtistSeriesMeta_artistSeries\n    id\n  }\n}\n\nfragment ArtistSeriesMeta_artistSeries on ArtistSeries {\n  title\n  description\n  slug\n  artists(size: 1) {\n    name\n    id\n  }\n}\n",
    },
  }
})()

;(node as any).hash = "27c6e0b258d7f3cb315cc33ecabbd839"

export default node
