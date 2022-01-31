/**
 * @generated SignedSource<<ccf122ecdf2846816624dfbc2fa437a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorksForYouApp_viewerFeed$data = {
  readonly " $fragmentSpreads": FragmentRefs<"WorksForYouFeed_viewer">;
  readonly " $fragmentType": "WorksForYouApp_viewerFeed";
};
export type WorksForYouApp_viewerFeed$key = {
  readonly " $data"?: WorksForYouApp_viewerFeed$data;
  readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerFeed">;
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

(node as any).hash = "f6f656402068f13654b3f0f3b471229b";

export default node;
