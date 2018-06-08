/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type FollowGeneButton_gene = {
  readonly __id: string
  readonly id: string
  readonly is_followed: boolean | null
}

const node: ConcreteFragment = {
  kind: 'Fragment',
  name: 'FollowGeneButton_gene',
  type: 'Gene',
  metadata: null,
  argumentDefinitions: [],
  selections: [
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
      name: 'id',
      args: null,
      storageKey: null,
    },
    {
      kind: 'ScalarField',
      alias: null,
      name: 'is_followed',
      args: null,
      storageKey: null,
    },
  ],
}
;(node as any).hash = '56411a7fc651d6c3a3e5ab27b241b1c0'
export default node
