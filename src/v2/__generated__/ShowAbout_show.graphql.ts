/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowAbout_show = {
    readonly about: string | null;
    readonly pressRelease: string | null;
    readonly " $refType": "ShowAbout_show";
};
export type ShowAbout_show$data = ShowAbout_show;
export type ShowAbout_show$key = {
    readonly " $data"?: ShowAbout_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowAbout_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowAbout_show",
  "selections": [
    {
      "alias": "about",
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pressRelease",
      "storageKey": null
    }
  ],
  "type": "Show"
};
(node as any).hash = '19ef21a17eb8b4afafa25582ece2ed52';
export default node;
