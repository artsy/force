/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerApp_fair = {
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerFollowButton_fair">;
    readonly " $refType": "FairOrganizerApp_fair";
};
export type FairOrganizerApp_fair$data = FairOrganizerApp_fair;
export type FairOrganizerApp_fair$key = {
    readonly " $data"?: FairOrganizerApp_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerApp_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerFollowButton_fair"
    }
  ],
  "type": "Fair"
};
(node as any).hash = '3a574150f410cd63a1ac15426aecbd56';
export default node;
