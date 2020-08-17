/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairApp_fair = {
    readonly " $fragmentRefs": FragmentRefs<"FairHeader_fair">;
    readonly " $refType": "FairApp_fair";
};
export type FairApp_fair$data = FairApp_fair;
export type FairApp_fair$key = {
    readonly " $data"?: FairApp_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairApp_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairApp_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeader_fair"
    }
  ],
  "type": "Fair"
};
(node as any).hash = '64cfd90722039e0fdaea83516c278516';
export default node;
