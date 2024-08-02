/**
 * @generated SignedSource<<73c72741c04209adcc1fd97a67580c20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtworkConsignmentSubmissionState = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSWASectionSubmitted_submissionState$data = {
  readonly consignmentSubmission: {
    readonly internalID: string | null | undefined;
    readonly state: ArtworkConsignmentSubmissionState;
    readonly stateHelpMessage: string | null | undefined;
    readonly stateLabel: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "MyCollectionArtworkSWASectionSubmitted_submissionState";
};
export type MyCollectionArtworkSWASectionSubmitted_submissionState$key = {
  readonly " $data"?: MyCollectionArtworkSWASectionSubmitted_submissionState$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkSWASectionSubmitted_submissionState">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkSWASectionSubmitted_submissionState",
  "selections": [
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

(node as any).hash = "1903546687b7941c99e819aab1b220d5";

export default node;
