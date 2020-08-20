/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairSubApp_fair = {
    readonly id: string;
    readonly name: string | null;
    readonly slug: string;
    readonly " $refType": "FairSubApp_fair";
};
export type FairSubApp_fair$data = FairSubApp_fair;
export type FairSubApp_fair$key = {
    readonly " $data"?: FairSubApp_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairSubApp_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairSubApp_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Fair"
};
(node as any).hash = '2d90c15c2c380a1d65b0d347eb1e21f3';
export default node;
