/**
 * @generated SignedSource<<95454473491b87f75f18f402853fbe6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowProfileButton_me$data = {
  readonly counts: {
    readonly followedProfiles: number;
  } | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "FollowProfileButton_me";
};
export type FollowProfileButton_me$key = {
  readonly " $data"?: FollowProfileButton_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowProfileButton_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowProfileButton_me",
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
      "concreteType": "MeCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "followedProfiles",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "98dcbc972ddfeccfd09e91ea3d3f576d";

export default node;
