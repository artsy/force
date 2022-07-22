/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowAbout_show = {
    readonly about: string | null;
    readonly " $refType": "ShowAbout_show";
};
export type ShowAbout_show$data = ShowAbout_show;
export type ShowAbout_show$key = {
    readonly " $data"?: ShowAbout_show$data | undefined;
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
    }
  ],
  "type": "Show",
  "abstractKey": null
};
(node as any).hash = '92f8732ee2cb13fd54f4824aea8e2fe6';
export default node;
