/**
 * @generated SignedSource<<ce17d9813bf5a1fd24b71c84316fc1e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DimensionsRoute_submission$data = {
  readonly depth: string | null | undefined;
  readonly dimensionsMetric: string | null | undefined;
  readonly height: string | null | undefined;
  readonly width: string | null | undefined;
  readonly " $fragmentType": "DimensionsRoute_submission";
};
export type DimensionsRoute_submission$key = {
  readonly " $data"?: DimensionsRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"DimensionsRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DimensionsRoute_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "width",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "height",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "depth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dimensionsMetric",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "d3e40dec87e9a6d19bfdd30cf8c18409";

export default node;
