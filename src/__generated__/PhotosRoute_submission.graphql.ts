/**
 * @generated SignedSource<<209b547f524db8b164c0c5ac72ff2eb3>>
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
    readonly id: string;
    readonly imageUrls: any | null | undefined;
  } | null | undefined> | null | undefined;
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "0c6321eb3f163f91743944868d70bfc4";

export default node;
