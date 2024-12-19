/**
 * @generated SignedSource<<c6d1122bc73373f851272d7f70443251>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type JobLink_job$data = {
  readonly id: string
  readonly location: string
  readonly title: string
  readonly " $fragmentType": "JobLink_job"
}
export type JobLink_job$key = {
  readonly " $data"?: JobLink_job$data
  readonly " $fragmentSpreads": FragmentRefs<"JobLink_job">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "JobLink_job",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
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
      name: "location",
      storageKey: null,
    },
  ],
  type: "Job",
  abstractKey: null,
}

;(node as any).hash = "286fd27a4e4a939d2fef0a0273631bcd"

export default node
