/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForYou2App_viewerArtist = {
    readonly " $fragmentRefs": FragmentRefs<"WorksForYou2ArtistFeed_viewer">;
    readonly " $refType": "WorksForYou2App_viewerArtist";
};
export type WorksForYou2App_viewerArtist$data = WorksForYou2App_viewerArtist;
export type WorksForYou2App_viewerArtist$key = {
    readonly " $data"?: WorksForYou2App_viewerArtist$data;
    readonly " $fragmentRefs": FragmentRefs<"WorksForYou2App_viewerArtist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "artistSlug"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorksForYou2App_viewerArtist",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "artistSlug",
          "variableName": "artistSlug"
        }
      ],
      "kind": "FragmentSpread",
      "name": "WorksForYou2ArtistFeed_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '6328ff25094ec8bd2865edecaa1f74a3';
export default node;
