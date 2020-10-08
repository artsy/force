/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowApp_show = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"ShowContextualLink_show" | "ShowMeta_show" | "ShowInstallShots_show">;
    readonly " $refType": "ShowApp_show";
};
export type ShowApp_show$data = ShowApp_show;
export type ShowApp_show$key = {
    readonly " $data"?: ShowApp_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowApp_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowApp_show",
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
      "name": "ShowContextualLink_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowMeta_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowInstallShots_show"
    }
  ],
  "type": "Show"
};
(node as any).hash = '7fdc785a6024be96e72075cf08f34bca';
export default node;
