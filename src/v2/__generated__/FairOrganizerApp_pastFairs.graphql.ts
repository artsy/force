/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerApp_pastFairs = {
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerPastEventsRail_fairs">;
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
      "name": "FairOrganizerPastEventsRail_fairs"
    }
  ],
  "type": "FairConnection"
};
(node as any).hash = 'd7ca4fed331d8a8722ceb109e081de0e';
export default node;
