/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShow_show = {
    readonly internalID: string;
    readonly slug: string;
    readonly " $fragmentRefs": FragmentRefs<"CellShow_show">;
    readonly " $refType": "HomeFeaturedShow_show";
};
export type HomeFeaturedShow_show$data = HomeFeaturedShow_show;
export type HomeFeaturedShow_show$key = {
    readonly " $data"?: HomeFeaturedShow_show$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedShow_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeFeaturedShow_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CellShow_show"
    }
  ],
  "type": "Show",
  "abstractKey": null
};
(node as any).hash = '014d4afd3a3ef6ddcf09f229e5baa2eb';
export default node;
