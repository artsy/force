/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairTimer_fair = {
    readonly endAt: string | null;
    readonly " $refType": "FairTimer_fair";
};
export type FairTimer_fair$data = FairTimer_fair;
export type FairTimer_fair$key = {
    readonly " $data"?: FairTimer_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairTimer_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairTimer_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    }
  ],
  "type": "Fair"
};
(node as any).hash = '7b2de54fb447d1613f29d8b18074f1ea';
export default node;
