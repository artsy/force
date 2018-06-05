/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type InquiryArtwork_artwork = {}

const node: ConcreteFragment = {
  kind: 'Fragment',
  name: 'InquiryArtwork_artwork',
  type: 'Artwork',
  metadata: null,
  argumentDefinitions: [],
  selections: [
    {
      kind: 'FragmentSpread',
      name: 'Artwork_artwork',
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
;(node as any).hash = '395ab37180661dd93a2a1ee189b363b5'
export default node
