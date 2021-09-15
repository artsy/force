/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairAbout_fair = {
    readonly about: string | null;
    readonly " $fragmentRefs": FragmentRefs<"FairTimer_fair">;
    readonly " $refType": "FairAbout_fair";
};
export type FairAbout_fair$data = FairAbout_fair;
export type FairAbout_fair$key = {
    readonly " $data"?: FairAbout_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairAbout_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairAbout_fair",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "about",
      "storageKey": "about(format:\"HTML\")"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairTimer_fair"
    }
  ],
  "type": "Fair"
};
(node as any).hash = '648a39c0f14cfdc5bd31a80ef0b4d532';
export default node;
