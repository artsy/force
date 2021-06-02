/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowBannersMobileCarousel_shows = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"ShowBanner_show">;
    readonly " $refType": "ShowBannersMobileCarousel_shows";
}>;
export type ShowBannersMobileCarousel_shows$data = ShowBannersMobileCarousel_shows;
export type ShowBannersMobileCarousel_shows$key = ReadonlyArray<{
    readonly " $data"?: ShowBannersMobileCarousel_shows$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowBannersMobileCarousel_shows">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ShowBannersMobileCarousel_shows",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowBanner_show"
    }
  ],
  "type": "Show"
};
(node as any).hash = '732ca082d7395dcd1e0035f049d65295';
export default node;
