/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOverview_fair = {
    readonly " $fragmentRefs": FragmentRefs<"FairHeader_fair">;
    readonly " $refType": "FairOverview_fair";
};
export type FairOverview_fair$data = FairOverview_fair;
export type FairOverview_fair$key = {
    readonly " $data"?: FairOverview_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOverview_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOverview_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeader_fair"
    }
  ],
  "type": "Fair"
};
(node as any).hash = 'ce592077153e19952b2a3763bc853eea';
export default node;
