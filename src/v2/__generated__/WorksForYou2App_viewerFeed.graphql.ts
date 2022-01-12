/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForYou2App_viewerFeed = {
    readonly " $fragmentRefs": FragmentRefs<"WorksForYou2Feed_viewer">;
    readonly " $refType": "WorksForYou2App_viewerFeed";
};
export type WorksForYou2App_viewerFeed$data = WorksForYou2App_viewerFeed;
export type WorksForYou2App_viewerFeed$key = {
    readonly " $data"?: WorksForYou2App_viewerFeed$data;
    readonly " $fragmentRefs": FragmentRefs<"WorksForYou2App_viewerFeed">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorksForYou2App_viewerFeed",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorksForYou2Feed_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'fd90758e44d3605c193b6f06c0b508a1';
export default node;
