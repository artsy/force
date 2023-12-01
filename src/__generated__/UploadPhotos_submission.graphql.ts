/**
 * @generated SignedSource<<a72ca88303bf272bd5ff43caac523196>>
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
    readonly filename: string | null | undefined;
    readonly geminiToken: string | null | undefined;
    readonly id: string;
    readonly imageUrls: any | null | undefined;
    readonly size: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly externalId: string;
  readonly userEmail: string | null | undefined;
  readonly userId: string;
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
      "kind": "ScalarField",
      "name": "userId",
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

(node as any).hash = "6cbff21ab8e0943f456bc0b251b4e505";

export default node;
