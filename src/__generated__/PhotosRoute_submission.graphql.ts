/**
 * @generated SignedSource<<426e7cc1ce30df4c09b5418d67c84111>>
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
  readonly myCollectionArtwork: {
    readonly images: ReadonlyArray<{
      readonly url: string | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
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
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "myCollectionArtwork",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "images",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "large"
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:\"large\")"
            }
          ],
          "storageKey": null
        }
      ],
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

(node as any).hash = "c64280d04b3f622527c15ed31d37b169";

export default node;
