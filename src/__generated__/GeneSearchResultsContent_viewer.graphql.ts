/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type GeneSearchResultsContent_viewer = {
  readonly match_gene: ReadonlyArray<
    | ({
        readonly name: string | null
        readonly id: string
        readonly _id: string
        readonly image:
          | ({
              readonly cropped:
                | ({
                    readonly url: string | null
                  })
                | null
            })
          | null
      })
    | null
  > | null
}

const node: ConcreteFragment = {
  kind: 'Fragment',
  name: 'GeneSearchResultsContent_viewer',
  type: 'Viewer',
  metadata: null,
  argumentDefinitions: [
    {
      kind: 'RootArgument',
      name: 'term',
      type: 'String!',
    },
  ],
  selections: [
    {
      kind: 'LinkedField',
      alias: null,
      name: 'match_gene',
      storageKey: null,
      args: [
        {
          kind: 'Variable',
          name: 'term',
          variableName: 'term',
          type: 'String!',
        },
      ],
      concreteType: 'Gene',
      plural: true,
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
        {
          kind: 'ScalarField',
          alias: null,
          name: '__id',
          args: null,
          storageKey: null,
        },
      ],
    },
  ],
}
;(node as any).hash = '0bea268b7e1c4adf4585567dbc12f2ca'
export default node
