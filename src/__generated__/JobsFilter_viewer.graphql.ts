/**
 * @generated SignedSource<<636911e58f2a19e401555b178dd6c2ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JobsFilter_viewer$data = {
  readonly departments: ReadonlyArray<{
    readonly id: string;
    readonly jobs: ReadonlyArray<{
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"JobLink_job">;
    }>;
    readonly name: string;
  }>;
  readonly jobs: ReadonlyArray<{
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

const node: ReaderFragment = (function(){
var v0 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "JobLink_job"
},
v1 = {
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
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "location",
          "storageKey": null
        }
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
        (v1/*: any*/),
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

(node as any).hash = "5764dc61fad90d31d46ceb9ba92f41e0";

export default node;
