/**
 * @generated SignedSource<<553734721e8d988041cefebf3719bee4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtworkConsignmentSubmissionState = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkSWASectionSubmitted_submissionState$data = {
  readonly consignmentSubmission: {
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

(node as any).hash = "313d5e5d8baf7c5cbba15ec6ad2ee7a9";

export default node;
