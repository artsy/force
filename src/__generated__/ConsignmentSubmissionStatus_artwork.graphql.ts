/**
 * @generated SignedSource<<8dc25bddfc81c7012580c21c96d6e8cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtworkConsignmentSubmissionState = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConsignmentSubmissionStatus_artwork$data = {
  readonly consignmentSubmission: {
    readonly actionLabel: string | null | undefined;
    readonly internalID: string | null | undefined;
    readonly state: ArtworkConsignmentSubmissionState;
    readonly stateLabel: string | null | undefined;
    readonly stateLabelColor: string | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly isListed: boolean;
  readonly " $fragmentType": "ConsignmentSubmissionStatus_artwork";
};
export type ConsignmentSubmissionStatus_artwork$key = {
  readonly " $data"?: ConsignmentSubmissionStatus_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConsignmentSubmissionStatus_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConsignmentSubmissionStatus_artwork",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isListed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkConsignmentSubmission",
      "kind": "LinkedField",
      "name": "consignmentSubmission",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "state",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "stateLabel",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "actionLabel",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "stateLabelColor",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "993e3fac706fc60d28b756c923e5e4a4";

export default node;
