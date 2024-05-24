/**
 * @generated SignedSource<<b09b8d88c66c7ca32f2de9130ba60a86>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DetailsRoute_submission$data = {
  readonly category: string | null | undefined;
  readonly medium: string | null | undefined;
  readonly year: string | null | undefined;
  readonly " $fragmentType": "DetailsRoute_submission";
};
export type DetailsRoute_submission$key = {
  readonly " $data"?: DetailsRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"DetailsRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DetailsRoute_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "year",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medium",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "6af5a65e73da78e2c6fcea8dfa77e14f";

export default node;
