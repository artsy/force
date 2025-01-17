/**
 * @generated SignedSource<<b72a60f762ad325dd7837b5339a9f4cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JobsFilter_viewer$data = {
  readonly jobs: ReadonlyArray<{
    readonly id: string;
    readonly location: string;
    readonly teamName: string;
    readonly " $fragmentSpreads": FragmentRefs<"JobLink_job">;
  }>;
  readonly " $fragmentType": "JobsFilter_viewer";
};
export type JobsFilter_viewer$key = {
  readonly " $data"?: JobsFilter_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"JobsFilter_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobsFilter_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Job",
      "kind": "LinkedField",
      "name": "jobs",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "JobLink_job"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "location",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "teamName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "b7580339d984370a7ab56d5e1bb2457f";

export default node;
