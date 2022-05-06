/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForYouApp_viewerFeed = {
    readonly " $fragmentRefs": FragmentRefs<"WorksForYouFeed_viewer">;
    readonly " $refType": "WorksForYouApp_viewerFeed";
};
export type WorksForYouApp_viewerFeed$data = WorksForYouApp_viewerFeed;
export type WorksForYouApp_viewerFeed$key = {
    readonly " $data"?: WorksForYouApp_viewerFeed$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"WorksForYouApp_viewerFeed">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorksForYouApp_viewerFeed",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorksForYouFeed_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'f6f656402068f13654b3f0f3b471229b';
export default node;
