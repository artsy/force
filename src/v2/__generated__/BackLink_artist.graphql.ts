/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BackLink_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly " $refType": "BackLink_artist";
};
export type BackLink_artist$data = BackLink_artist;
export type BackLink_artist$key = {
    readonly " $data"?: BackLink_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"BackLink_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BackLink_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '05d2d72ae348ed85752b8fee5b1f39ae';
export default node;
