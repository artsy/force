/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairArtworks_fair = {
    readonly " $fragmentRefs": FragmentRefs<"FairAboveFold_fair">;
    readonly " $refType": "FairArtworks_fair";
};
export type FairArtworks_fair$data = FairArtworks_fair;
export type FairArtworks_fair$key = {
    readonly " $data"?: FairArtworks_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairArtworks_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairArtworks_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairAboveFold_fair"
    }
  ],
  "type": "Fair"
};
(node as any).hash = '9e49b830c418095c79f4a684dc5b4889';
export default node;
