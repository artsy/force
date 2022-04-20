/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type JobApp_job = {
    readonly id: string;
    readonly title: string;
    readonly location: string;
    readonly content: string;
    readonly externalURL: string;
    readonly " $refType": "JobApp_job";
};
export type JobApp_job$data = JobApp_job;
export type JobApp_job$key = {
    readonly " $data"?: JobApp_job$data;
    readonly " $fragmentRefs": FragmentRefs<"JobApp_job">;
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
(node as any).hash = 'ec690c0f899637fd65f90e8e81104f88';
export default node;
