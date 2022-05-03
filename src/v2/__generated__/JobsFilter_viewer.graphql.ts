/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type JobsFilter_viewer = {
    readonly jobs: ReadonlyArray<{
        readonly id: string;
        readonly location: string;
        readonly " $fragmentRefs": FragmentRefs<"JobLink_job">;
    }>;
    readonly departments: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly jobs: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"JobLink_job">;
        }>;
    }>;
    readonly " $refType": "JobsFilter_viewer";
};
export type JobsFilter_viewer$data = JobsFilter_viewer;
export type JobsFilter_viewer$key = {
    readonly " $data"?: JobsFilter_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"JobsFilter_viewer">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "JobLink_job"
};
return {
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "location",
          "storageKey": null
        },
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Department",
      "kind": "LinkedField",
      "name": "departments",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Job",
          "kind": "LinkedField",
          "name": "jobs",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();
(node as any).hash = '5764dc61fad90d31d46ceb9ba92f41e0';
export default node;
