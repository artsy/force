/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowProfileButton_profile = {
    readonly id: string;
    readonly internalID: string;
    readonly is_followed: boolean | null;
    readonly " $refType": "FollowProfileButton_profile";
};
export type FollowProfileButton_profile$data = FollowProfileButton_profile;
export type FollowProfileButton_profile$key = {
    readonly " $data"?: FollowProfileButton_profile$data;
    readonly " $fragmentRefs": FragmentRefs<"FollowProfileButton_profile">;
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
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": "is_followed",
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowed",
      "storageKey": null
    }
  ],
  "type": "Profile"
};
(node as any).hash = '377ae8b366b06be26ad5ce795bb56144';
export default node;
