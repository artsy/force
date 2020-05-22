/* tslint:disable */

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
  "kind": "Fragment",
  "name": "FollowProfileButton_profile",
  "type": "Profile",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_followed",
      "name": "isFollowed",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '377ae8b366b06be26ad5ce795bb56144';
export default node;
