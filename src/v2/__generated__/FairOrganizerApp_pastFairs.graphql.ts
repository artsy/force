/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerApp_pastFairs = {
    readonly " $fragmentRefs": FragmentRefs<"PastEventsRail_fairs">;
    readonly " $refType": "FairOrganizerApp_pastFairs";
};
export type FairOrganizerApp_pastFairs$data = FairOrganizerApp_pastFairs;
export type FairOrganizerApp_pastFairs$key = {
    readonly " $data"?: FairOrganizerApp_pastFairs$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerApp_pastFairs">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerApp_pastFairs",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PastEventsRail_fairs"
    }
  ],
  "type": "FairConnection"
};
(node as any).hash = 'ace5c2d9c6f82f3d7b130be48420f132';
export default node;
