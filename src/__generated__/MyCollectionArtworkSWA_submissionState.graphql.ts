/**
 * @generated SignedSource<<e8a040be5a67799171ceba3e8d3da052>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtworkConsignmentSubmissionState = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSWA_submissionState$data = {
  readonly consignmentSubmission: {
    readonly internalID: string | null | undefined;
    readonly state: ArtworkConsignmentSubmissionState;
    readonly stateHelpMessage: string | null | undefined;
    readonly stateLabel: string | null | undefined;
  } | null | undefined;
  readonly submissionId: string | null | undefined;
  readonly " $fragmentType": "MyCollectionArtworkSWA_submissionState";
};
export type MyCollectionArtworkSWA_submissionState$key = {
  readonly " $data"?: MyCollectionArtworkSWA_submissionState$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkSWA_submissionState">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkSWA_submissionState",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "submissionId",
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
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
          "name": "stateHelpMessage",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "2777dc37d1e7f2249fafbba9911a0416";

export default node;
