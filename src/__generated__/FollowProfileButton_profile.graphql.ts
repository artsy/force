/**
 * @generated SignedSource<<c743de44bddd25dd47e4a737fd8a6681>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowProfileButton_profile$data = {
  readonly id: string;
  readonly slug: string;
  readonly name: string | null;
  readonly internalID: string;
  readonly isFollowed: boolean | null;
  readonly " $fragmentType": "FollowProfileButton_profile";
};
export type FollowProfileButton_profile$key = {
  readonly " $data"?: FollowProfileButton_profile$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowProfileButton_profile">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowProfileButton_profile",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowed",
      "storageKey": null
    }
  ],
  "type": "Profile",
  "abstractKey": null
};

(node as any).hash = "5e106dc0f6d28037e1b1cb894aa58dca";

export default node;
