/**
 * @generated SignedSource<<3e47186b8907094419b3b8988dc6a2c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorksForYouApp_viewerArtist$data = {
  readonly " $fragmentSpreads": FragmentRefs<"WorksForYouArtistFeed_viewer">;
  readonly " $fragmentType": "WorksForYouApp_viewerArtist";
};
export type WorksForYouApp_viewerArtist$key = {
  readonly " $data"?: WorksForYouApp_viewerArtist$data;
  readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerArtist">;
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
  "name": "WorksForYouApp_viewerArtist",
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
      "name": "WorksForYouArtistFeed_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "1324655321f954a4c25f9ae98a758282";

export default node;
