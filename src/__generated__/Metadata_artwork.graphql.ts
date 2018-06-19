/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type Metadata_artwork = {}

const node: ConcreteFragment = {
  kind: 'Fragment',
  name: 'Metadata_artwork',
  type: 'Artwork',
  metadata: null,
  argumentDefinitions: [],
  selections: [
    {
      kind: 'FragmentSpread',
      name: 'Details_artwork',
      args: null,
    },
    {
      kind: 'FragmentSpread',
      name: 'Contact_artwork',
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
;(node as any).hash = '429d7bf897069aa9099d5938e9b6169d'
export default node
