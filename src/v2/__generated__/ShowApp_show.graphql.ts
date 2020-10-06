/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowApp_show = {
    readonly name: string | null;
    readonly about: string | null;
    readonly pressRelease: string | null;
    readonly " $fragmentRefs": FragmentRefs<"ShowContextualLink_show" | "ShowHeader_show" | "ShowAbout_show" | "ShowMeta_show" | "ShowInstallShots_show">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowContextualLink_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowHeader_show"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowAbout_show"
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
(node as any).hash = '040a14bc6813179ea2b51f9c51c622db';
export default node;
