/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type JobsApp_viewer = {
    readonly " $fragmentRefs": FragmentRefs<"JobsFilter_viewer">;
    readonly " $refType": "JobsApp_viewer";
};
export type JobsApp_viewer$data = JobsApp_viewer;
export type JobsApp_viewer$key = {
    readonly " $data"?: JobsApp_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"JobsApp_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobsApp_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JobsFilter_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '9f8ac2fe7c98208cbcde0bf6bf403191';
export default node;
