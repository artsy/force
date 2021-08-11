/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeader_fair = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"FairHeaderIcon_fair" | "FairTiming_fair">;
    readonly " $refType": "FairHeader_fair";
};
export type FairHeader_fair$data = FairHeader_fair;
export type FairHeader_fair$key = {
    readonly " $data"?: FairHeader_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairHeader_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeader_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeaderIcon_fair"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairTiming_fair"
    }
  ],
  "type": "Fair"
};
(node as any).hash = '595661ce8e609dab5d1fe56ee28f04de';
export default node;
