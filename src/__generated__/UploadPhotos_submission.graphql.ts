/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadPhotos_submission = {
    readonly externalId: string;
    readonly assets: ReadonlyArray<{
        readonly id: string;
        readonly imageUrls: unknown | null;
        readonly geminiToken: string | null;
        readonly size: string | null;
        readonly filename: string | null;
    } | null> | null;
    readonly " $refType": "UploadPhotos_submission";
};
export type UploadPhotos_submission$data = UploadPhotos_submission;
export type UploadPhotos_submission$key = {
    readonly " $data"?: UploadPhotos_submission$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadPhotos_submission">;
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
(node as any).hash = '8c71b40126392ffdfdd810306a7f861d';
export default node;
