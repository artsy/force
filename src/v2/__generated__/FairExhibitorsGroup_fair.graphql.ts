/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorsGroup_fair = {
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorCard_fair">;
    readonly " $refType": "FairExhibitorsGroup_fair";
};
export type FairExhibitorsGroup_fair$data = FairExhibitorsGroup_fair;
export type FairExhibitorsGroup_fair$key = {
    readonly " $data"?: FairExhibitorsGroup_fair$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorsGroup_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorsGroup_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairExhibitorCard_fair"
    }
  ],
  "type": "Fair",
  "abstractKey": null
};
(node as any).hash = '7ce4ce6af0d5dd9160a094ac0c67eb04';
export default node;
