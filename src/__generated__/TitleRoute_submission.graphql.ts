/**
 * @generated SignedSource<<3b40be133d4d40191d734819e580326a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TitleRoute_submission$data = {
  readonly title: string | null | undefined;
  readonly " $fragmentType": "TitleRoute_submission";
};
export type TitleRoute_submission$key = {
  readonly " $data"?: TitleRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"TitleRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TitleRoute_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "b1aea6c0e3b44e5cbe8ee79da2192218";

export default node;
