/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GalleriesRoute_viewer = {
    readonly " $fragmentRefs": FragmentRefs<"PartnersFeaturedCarousel_viewer">;
    readonly " $refType": "GalleriesRoute_viewer";
};
export type GalleriesRoute_viewer$data = GalleriesRoute_viewer;
export type GalleriesRoute_viewer$key = {
    readonly " $data"?: GalleriesRoute_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"GalleriesRoute_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GalleriesRoute_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "5638fdfb7261690296000031"
        }
      ],
      "kind": "FragmentSpread",
      "name": "PartnersFeaturedCarousel_viewer"
    }
  ],
  "type": "Viewer"
};
(node as any).hash = 'ce6e81cc90204e38ed5a0a996d92e310';
export default node;
