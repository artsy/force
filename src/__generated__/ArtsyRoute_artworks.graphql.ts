/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type ArtsyRoute_artworks = ReadonlyArray<{
  readonly id: string
}>

const node: ConcreteFragment = {
  kind: 'Fragment',
  name: 'ArtsyRoute_artworks',
  type: 'Artwork',
  metadata: {
    plural: true,
  },
  argumentDefinitions: [],
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
      name: '__id',
      args: null,
      storageKey: null,
    },
  ],
}
;(node as any).hash = '790de3dba7854f66f183f6c62a74d9f3'
export default node
