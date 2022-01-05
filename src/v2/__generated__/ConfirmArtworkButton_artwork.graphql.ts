/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConfirmArtworkButton_artwork = {
    readonly internalID: string;
    readonly " $refType": "ConfirmArtworkButton_artwork";
};
export type ConfirmArtworkButton_artwork$data = ConfirmArtworkButton_artwork;
export type ConfirmArtworkButton_artwork$key = {
    readonly " $data"?: ConfirmArtworkButton_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ConfirmArtworkButton_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConfirmArtworkButton_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '2882134b827fadd6c09b9db8aaa05ffe';
export default node;
