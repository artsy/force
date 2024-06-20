/**
 * @generated SignedSource<<cd0c9b484512228e665fc7f97b1c7253>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PhotosRoute_submission$data = {
  readonly assets: ReadonlyArray<{
    readonly filename: string | null | undefined;
    readonly geminiToken: string | null | undefined;
    readonly id: string;
    readonly imageUrls: any | null | undefined;
    readonly size: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly externalId: string;
  readonly " $fragmentType": "PhotosRoute_submission";
};
export type PhotosRoute_submission$key = {
  readonly " $data"?: PhotosRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"PhotosRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PhotosRoute_submission",
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
      "concreteType": "ConsignmentSubmissionCategoryAsset",
      "kind": "LinkedField",
      "name": "assets",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "size",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "filename",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "geminiToken",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "imageUrls",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "427e6443319e04c11ec187d2a9d34983";

export default node;
