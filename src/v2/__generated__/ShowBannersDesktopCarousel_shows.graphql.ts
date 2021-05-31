/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowBannersDesktopCarousel_shows = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"ShowBanner_show">;
    readonly " $refType": "ShowBannersDesktopCarousel_shows";
}>;
export type ShowBannersDesktopCarousel_shows$data = ShowBannersDesktopCarousel_shows;
export type ShowBannersDesktopCarousel_shows$key = ReadonlyArray<{
    readonly " $data"?: ShowBannersDesktopCarousel_shows$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowBannersDesktopCarousel_shows">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ShowBannersDesktopCarousel_shows",
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
(node as any).hash = 'bf065a20abb2eb628477abdcbbe023b7';
export default node;
