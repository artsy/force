/**
 * @generated SignedSource<<7f79dd8a12c31054038d8e7ad1509aff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowGeneButton_gene$data = {
  readonly id: string;
  readonly image: {
    readonly aspectRatio: number;
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly isFollowed?: boolean | null | undefined;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "FollowGeneButton_gene";
};
export type FollowGeneButton_gene$key = {
  readonly " $data"?: FollowGeneButton_gene$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowGeneButton_gene">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "isLoggedIn"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowGeneButton_gene",
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
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "condition": "isLoggedIn",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isFollowed",
          "storageKey": null
        }
      ]
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Gene",
  "abstractKey": null
};

(node as any).hash = "6a89c70f50de3dd450959bd763f3a058";

export default node;
