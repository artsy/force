/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_me = {
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar_me">;
    readonly " $refType": "ArtworkApp_me";
};
export type ArtworkApp_me$data = ArtworkApp_me;
export type ArtworkApp_me$key = {
    readonly " $data"?: ArtworkApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkApp_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkApp_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar_me",
      "args": null
    }
  ]
};
(node as any).hash = 'aae03275c844ec61c6893b5eee528e86';
export default node;
