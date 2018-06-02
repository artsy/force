/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type ArtistToolTip_artist = {
  readonly name: string | null
  readonly id: string
  readonly _id: string
  readonly formatted_nationality_and_birthday: string | null
  readonly href: string | null
  readonly blurb: string | null
  readonly carousel:
    | ({
        readonly images: ReadonlyArray<
          | ({
              readonly resized:
                | ({
                    readonly url: string | null
                    readonly width: number | null
                    readonly height: number | null
                  })
                | null
            })
          | null
        > | null
      })
    | null
  readonly genes: ReadonlyArray<
    | ({
        readonly name: string | null
      })
    | null
  > | null
}

const node: ConcreteFragment = (function() {
  var v0 = {
      kind: 'ScalarField',
      alias: null,
      name: 'name',
      args: null,
      storageKey: null,
    },
    v1 = {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    }
  return {
    kind: 'Fragment',
    name: 'ArtistToolTip_artist',
    type: 'Artist',
    metadata: null,
    argumentDefinitions: [],
    selections: [
      v0,
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
        name: 'formatted_nationality_and_birthday',
        args: null,
        storageKey: null,
      },
      {
        kind: 'ScalarField',
        alias: null,
        name: 'href',
        args: null,
        storageKey: null,
      },
      {
        kind: 'ScalarField',
        alias: null,
        name: 'blurb',
        args: null,
        storageKey: null,
      },
      {
        kind: 'LinkedField',
        alias: null,
        name: 'carousel',
        storageKey: null,
        args: null,
        concreteType: 'ArtistCarousel',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            name: 'images',
            storageKey: null,
            args: null,
            concreteType: 'Image',
            plural: true,
            selections: [
              {
                kind: 'LinkedField',
                alias: null,
                name: 'resized',
                storageKey: 'resized(height:200)',
                args: [
                  {
                    kind: 'Literal',
                    name: 'height',
                    value: 200,
                    type: 'Int',
                  },
                ],
                concreteType: 'ResizedImageUrl',
                plural: false,
                selections: [
                  {
                    kind: 'ScalarField',
                    alias: null,
                    name: 'url',
                    args: null,
                    storageKey: null,
                  },
                  {
                    kind: 'ScalarField',
                    alias: null,
                    name: 'width',
                    args: null,
                    storageKey: null,
                  },
                  {
                    kind: 'ScalarField',
                    alias: null,
                    name: 'height',
                    args: null,
                    storageKey: null,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        kind: 'LinkedField',
        alias: null,
        name: 'genes',
        storageKey: null,
        args: null,
        concreteType: 'Gene',
        plural: true,
        selections: [v0, v1],
      },
      v1,
    ],
  }
})()
;(node as any).hash = 'b66365bad87a0ff55816fd0106213acb'
export default node
