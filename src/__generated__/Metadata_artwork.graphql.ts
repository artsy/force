/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Metadata_artwork = {
    readonly internalID: string;
    readonly href: string | null;
    readonly " $fragmentRefs": FragmentRefs<"Details_artwork">;
    readonly " $refType": "Metadata_artwork";
};
export type Metadata_artwork$data = Metadata_artwork;
export type Metadata_artwork$key = {
    readonly " $data"?: Metadata_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Metadata_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Details_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'b32ff35e55d3159ffb6bfb362459aff9';
export default node;
