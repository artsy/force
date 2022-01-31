/**
 * @generated SignedSource<<c8220f67578e74a6404c2ec7a78e246d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContactInformation_submission$data = {
  readonly id: string;
  readonly " $fragmentType": "ContactInformation_submission";
};
export type ContactInformation_submission$key = {
  readonly " $data"?: ContactInformation_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContactInformation_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContactInformation_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "5ae005fd76817564634de5eb1fe5353c";

export default node;
