/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerApp_fairOrganizer = {
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerFollowButton_fairOrganizer">;
    readonly " $refType": "FairOrganizerApp_fairOrganizer";
};
export type FairOrganizerApp_fairOrganizer$data = FairOrganizerApp_fairOrganizer;
export type FairOrganizerApp_fairOrganizer$key = {
    readonly " $data"?: FairOrganizerApp_fairOrganizer$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_fairOrganizer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerApp_fairOrganizer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairOrganizerFollowButton_fairOrganizer"
    }
  ],
  "type": "FairOrganizer"
};
(node as any).hash = 'c40c37704157ab5b252aded282bf3d71';
export default node;
