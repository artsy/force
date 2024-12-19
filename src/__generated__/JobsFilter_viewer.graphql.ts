/**
 * @generated SignedSource<<2a71ef57164d680ca40592d1a6764a64>>
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
    readonly departmentName: string;
    readonly id: string;
    readonly location: string;
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
          "name": "departmentName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "1e422c2a88d8fb876274311737f8873b";

export default node;
