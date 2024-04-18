/**
 * @generated SignedSource<<9f3faff2d3a541f80722ebb2dc39ae72>>
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
  readonly userEmail: string | null | undefined;
  readonly userName: string | null | undefined;
  readonly userPhone: string | null | undefined;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userEmail",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userPhone",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "1a7d8a788118c645057a534e897770f6";

export default node;
