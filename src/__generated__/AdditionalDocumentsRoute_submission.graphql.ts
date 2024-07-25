/**
 * @generated SignedSource<<d16321ec62ac0cab2e8d1767a02fbe91>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdditionalDocumentsRoute_submission$data = {
  readonly assets: ReadonlyArray<{
    readonly documentPath: string | null | undefined;
    readonly filename: string | null | undefined;
    readonly id: string;
    readonly s3Bucket: string | null | undefined;
    readonly s3Path: string | null | undefined;
    readonly size: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly externalId: string;
  readonly " $fragmentType": "AdditionalDocumentsRoute_submission";
};
export type AdditionalDocumentsRoute_submission$key = {
  readonly " $data"?: AdditionalDocumentsRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdditionalDocumentsRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdditionalDocumentsRoute_submission",
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
      "args": [
        {
          "kind": "Literal",
          "name": "assetType",
          "value": [
            "ADDITIONAL_FILE"
          ]
        }
      ],
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
          "name": "documentPath",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "s3Path",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "s3Bucket",
          "storageKey": null
        }
      ],
      "storageKey": "assets(assetType:[\"ADDITIONAL_FILE\"])"
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "238221064e9f98d42d8bda831d5e793a";

export default node;
