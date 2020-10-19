/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConsignApp_artist = {
    readonly name: string | null;
    readonly " $refType": "ConsignApp_artist";
};
export type ConsignApp_artist$data = ConsignApp_artist;
export type ConsignApp_artist$key = {
    readonly " $data"?: ConsignApp_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ConsignApp_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConsignApp_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '98b0c6b6424a92c196e8fdc136293f43';
export default node;
