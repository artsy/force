/**
 * @generated SignedSource<<749a31ffa7dc4ed59cabbabcb6e90045>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContactInformation_submission$data = {
  readonly externalId: string;
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
      "name": "externalId",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "403f4a265149c820349eb773cd1f812d";

export default node;
