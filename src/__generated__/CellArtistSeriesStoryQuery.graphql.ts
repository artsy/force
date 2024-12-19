/**
 * @generated SignedSource<<636af53d727cefae868c622d50813051>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type CellArtistSeriesStoryQuery$variables = {
  id: string
}
export type CellArtistSeriesStoryQuery$data = {
  readonly artistSeries:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"CellArtistSeries_artistSeries">
      }
    | null
    | undefined
}
export type CellArtistSeriesStoryQuery = {
  response: CellArtistSeriesStoryQuery$data
  variables: CellArtistSeriesStoryQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "id",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "id",
      },
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "CellArtistSeriesStoryQuery",
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
              name: "CellArtistSeries_artistSeries",
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
      name: "CellArtistSeriesStoryQuery",
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
              name: "slug",
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
              name: "artworksCountMessage",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "Image",
              kind: "LinkedField",
              name: "image",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: [
                    {
                      kind: "Literal",
                      name: "height",
                      value: 334,
                    },
                    {
                      kind: "Literal",
                      name: "version",
                      value: ["larger", "large"],
                    },
                    {
                      kind: "Literal",
                      name: "width",
                      value: 445,
                    },
                  ],
                  concreteType: "CroppedImageUrl",
                  kind: "LinkedField",
                  name: "cropped",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "src",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "srcSet",
                      storageKey: null,
                    },
                  ],
                  storageKey:
                    'cropped(height:334,version:["larger","large"],width:445)',
                },
              ],
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
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "0861d56cb02263928a7b1588d3adb963",
      id: null,
      metadata: {},
      name: "CellArtistSeriesStoryQuery",
      operationKind: "query",
      text: 'query CellArtistSeriesStoryQuery(\n  $id: ID!\n) {\n  artistSeries(id: $id) {\n    ...CellArtistSeries_artistSeries\n    id\n  }\n}\n\nfragment CellArtistSeries_artistSeries on ArtistSeries {\n  slug\n  title\n  artworksCountMessage\n  image {\n    cropped(width: 445, height: 334, version: ["larger", "large"]) {\n      src\n      srcSet\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = "ffa5e9f05148ff49e0ba25129265ba85"

export default node
