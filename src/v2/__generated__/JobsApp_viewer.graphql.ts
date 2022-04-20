/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type JobsApp_viewer = {
    readonly departments: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly jobs: ReadonlyArray<{
            readonly id: string;
            readonly title: string;
            readonly location: string;
        }>;
    }>;
    readonly " $refType": "JobsApp_viewer";
};
export type JobsApp_viewer$data = JobsApp_viewer;
export type JobsApp_viewer$key = {
    readonly " $data"?: JobsApp_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"JobsApp_viewer">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobsApp_viewer",
  "selections": [
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
            }
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
(node as any).hash = 'e62b0809691ef30c32fcd54f029ab452';
export default node;
