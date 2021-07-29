/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerFollowButton_fair = {
    readonly id: string;
    readonly slug: string;
    readonly name: string | null;
    readonly profile: {
        readonly id: string;
        readonly internalID: string;
        readonly isFollowed: boolean | null;
    } | null;
    readonly " $refType": "FairOrganizerFollowButton_fair";
};
export type FairOrganizerFollowButton_fair$data = FairOrganizerFollowButton_fair;
export type FairOrganizerFollowButton_fair$key = {
    readonly " $data"?: FairOrganizerFollowButton_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerFollowButton_fair">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerFollowButton_fair",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
      "storageKey": null
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = '6cb78c0b786b06bfcef991cc8a9fd0a3';
export default node;
