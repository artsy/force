/**
 * @generated SignedSource<<d580adb27d9efdf3f4ebbf03cbbb53f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadPhotos_submission$data = {
  readonly assets: ReadonlyArray<{
    readonly filename: string | null;
    readonly geminiToken: string | null;
    readonly id: string;
    readonly imageUrls: any | null;
    readonly size: string | null;
  } | null> | null;
  readonly externalId: string;
  readonly " $fragmentType": "UploadPhotos_submission";
};
export type UploadPhotos_submission$key = {
  readonly " $data"?: UploadPhotos_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadPhotos_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadPhotos_submission",
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
          "name": "imageUrls",
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
          "name": "size",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "filename",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "8c71b40126392ffdfdd810306a7f861d";

export default node;
