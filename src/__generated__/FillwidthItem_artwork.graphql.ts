/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type FillwidthItem_artwork = {
  readonly image:
    | ({
        readonly placeholder: string | null
        readonly url: string | null
        readonly aspect_ratio: number | null
      })
    | null
  readonly href: string | null
}

const node: ConcreteFragment = {
  kind: 'Fragment',
  name: 'FillwidthItem_artwork',
  type: 'Artwork',
  metadata: null,
  argumentDefinitions: [],
  selections: [
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
          kind: 'ScalarField',
          alias: null,
          name: 'placeholder',
          args: null,
          storageKey: null,
        },
        {
          kind: 'ScalarField',
          alias: null,
          name: 'url',
          args: [
            {
              kind: 'Literal',
              name: 'version',
              value: 'large',
              type: '[String]',
            },
          ],
          storageKey: 'url(version:"large")',
        },
        {
          kind: 'ScalarField',
          alias: null,
          name: 'aspect_ratio',
          args: null,
          storageKey: null,
        },
      ],
    },
    {
      kind: 'ScalarField',
      alias: null,
      name: 'href',
      args: null,
      storageKey: null,
    },
    {
      kind: 'FragmentSpread',
      name: 'Metadata_artwork',
      args: null,
    },
    {
      kind: 'FragmentSpread',
      name: 'Save_artwork',
      args: null,
    },
    {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    },
  ],
}
;(node as any).hash = 'e7d7e05dbcfbc935f92f7d36e8d0fd3e'
export default node
