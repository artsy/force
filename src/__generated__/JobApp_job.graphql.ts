/**
 * @generated SignedSource<<a544e3d5cf4685655d3504d324ac1a73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JobApp_job$data = {
  readonly content: string;
  readonly externalURL: string;
  readonly id: string;
  readonly location: string;
  readonly title: string;
  readonly " $fragmentType": "JobApp_job";
};
export type JobApp_job$key = {
  readonly " $data"?: JobApp_job$data;
  readonly " $fragmentSpreads": FragmentRefs<"JobApp_job">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobApp_job",
  "selections": [
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
      "name": "title",
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
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "externalURL",
      "storageKey": null
    }
  ],
  "type": "Job",
  "abstractKey": null
};

(node as any).hash = "ec690c0f899637fd65f90e8e81104f88";

export default node;
